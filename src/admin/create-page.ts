import Vue from "vue";
import Component from "vue-class-component";
import SideDrawer from "@/admin/components/drawer.vue"
import {ApiService} from '@/common/api.service';
import {AdminGameRequest, AdminGameReply, Game} from '@/proto/bbuhot/service/game_pb'

@Component({
  components: {
    drawer: SideDrawer,
  }
})

export default class CreatePage extends Vue {

  private formValidate = {
    name: '',
    desc: '',
    limit: '',
    lowest: '',
    highest:'',
    enddate:'',
    endtime:'',
    visibleList: [
      {
        value: 0,
        label: "否"
      },
      {
        value: 1,
        label: "是"
      }
    ],
    visible: '',
    statusList: [
      {
        value: 0,
        label: "草稿"
      },
      {
        value: 1,
        label: "发布"
      }, {
        value: 2,
        label: "封盘"
      }, {
        value: 3,
        label: "取消"
      },
      /*
       缺少   This will kick of worker to pay the rewards. optional Status status = 5
       */
    ],
    status: 0,
    betOptionList: [
      {
        name: '',
        odd: ''
      },
      {
        name: '',
        odd: ''
      },
    ]
  };

  private ruleValidate: Object = new Object({
    name: [
      {required: true, message: '名称不能为空', trigger: 'blur'}
    ],
    desc: [
      {required: true, message: '描述不能为空', trigger: 'blur'}
    ],
    limit: [
      {required: true, message: '最大下注数不能为空', trigger: 'blur'}
    ],
    lowest: [
      {required: true, message: '最低下注金额不能为空', trigger: 'blur'}
    ],
    highest: [
      {required: true, message: '最高下注金额不能为空', trigger: 'blur'}
    ],
    // enddate: [
    //   {required: true, message: '截至日期不能为空', trigger: 'blur'}
    // ],
  });

  private initForm :any;
  private pushBetOption() {
    this.formValidate.betOptionList.push({
      name: '',
      odd: ''
    });
  }

  private popBetOption() {
    this.formValidate.betOptionList.pop();
  }

  private async createGameRequest() {
    const adminGameRequest: AdminGameRequest = new AdminGameRequest();

    const game: Game = new Game();
    game.setId(-1);
    game.setName(this.formValidate.name.toString());
    game.setDescription(this.formValidate.desc.toString());
    game.setBetOptionLimit(Number(this.formValidate.limit));
    game.setBetAmountLowest(Number(this.formValidate.lowest));
    game.setBetAmountHighest(Number(this.formValidate.highest));

    const endTs = new Date(this.formValidate.enddate).getTime();
    game.setEndTimeMs(endTs);

    const betOptionList : Array<Game.BettingOption> = new Array<Game.BettingOption>();
    await this.formValidate.betOptionList.forEach(
        option => {
          const betOption: Game.BettingOption = new Game.BettingOption();
          betOption.setName(option.name);
          betOption.setOdds(Number(option.odd)* Math.pow(10, 6));
          betOptionList.push(betOption);
        }
    );
    game.setBettingOptionsList(betOptionList);

    adminGameRequest.setGame(game);
    const adminGameReply: AdminGameReply = await ApiService.adminGame(adminGameRequest);
    if (adminGameReply.hasAuthErrorCode()) {
      // TODO: deal with error.
    }
  }
}
