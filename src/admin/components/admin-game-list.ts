import Vue from "vue";
import Component from "vue-class-component";
import {ApiService} from '@/common/api.service';
import {EditModel} from "./edit-model"
import {
  AdminGameStatusRequest,
  AdminGameStatusReply,
  Game,
  ListGameReply,
  ListGameRequest, AdminGameRequest, AdminGameReply
} from '@/proto/bbuhot/service/game_pb'


@Component({
  components: {
  }
})

export default class AdminGameList extends Vue {
  // Table game data
  gamesList: Array<Game> = new Array<Game>();
  // Current table data game status
  gameStatus: Game.Status = Game.Status.PUBLISHED;
  // Is show edit drawer
  showEditDrawer: boolean = false;
  //  Current table data game status title map
  statusStr = {
    0: "草稿",
    1: "公开",
    2: "结算",
    3: "流局",
  };

  editModel: EditModel = new EditModel();


  private changeGameListRequest(idx: number) {
    this.gameStatus = idx;
    this.listGameRequest(this.gameStatus);
  }

  private editGame(game: Game) {
    this.showEditDrawer = !this.showEditDrawer;
    this.editModel = new EditModel(game);
  }

  private pushBetOption() {
    this.editModel.bettingOptionList.push({
      name: '',
      odd: ''
    });
  }

  private popBetOption() {
    this.editModel.bettingOptionList.pop();
  }

  // request
  private async listGameRequest(status: Game.Status) {
    const listGameRequest = new ListGameRequest();
    listGameRequest.setGameStatus(status);
    listGameRequest.setIsAdminRequest(true);

    let listGameReply: ListGameReply = await ApiService.listGame(listGameRequest);

    if (listGameReply.hasAuthErrorCode()) {
      // TODO: deal with error.
    }

    this.gamesList = listGameReply.getGamesList();
  }

  private async changeGameStatusRequest(game: Game, type: number) {
    const adminGameStatusRequest: AdminGameStatusRequest = new AdminGameStatusRequest();
    adminGameStatusRequest.setGameId(game.getId()!);
    let status: Game.Status = Game.Status.DRAFT;
    /*
      0: 公开
      1: 编辑
      2: 结算
      3: 流局
     */
    if (type == 0) {
      status = Game.Status.PUBLISHED;
    } else if (type == 2) {
      status = Game.Status.SETTLED;
    } else if (type == 3) {
      status = Game.Status.CANCELLED;
    }

    let idx = this.gamesList.indexOf(game);
    this.gamesList.splice(idx, 1);

    adminGameStatusRequest.setGameStatus(status);

    let adminGameStatusReply: AdminGameStatusReply = await ApiService.adminGameStatus(adminGameStatusRequest);
    if (adminGameStatusReply.hasAuthErrorCode()) {
      // TODO: deal with error.
    }
  }

  private async updateGameRequest(editGame: EditModel) {
    const adminGameRequest: AdminGameRequest = new AdminGameRequest();

    const game: Game = new Game();
    game.setId(editGame.id);
    game.setName(editGame.name);
    game.setDescription(editGame.desc);
    game.setNormalUserVisible(editGame.visible);
    game.setBetOptionLimit(editGame.limit);
    game.setBetAmountLowest(editGame.lowest);
    game.setBetAmountHighest(editGame.highest);
    const endTs = new Date(editGame.endTimeStr).getTime();
    game.setEndTimeMs(endTs);
    const betOptionList : Array<Game.BettingOption> = new Array<Game.BettingOption>();
    await this.editModel.bettingOptionList.forEach(
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
    this.showEditDrawer = !this.showEditDrawer;
    this.listGameRequest(this.gameStatus);
  }

  async mounted() {
    this.listGameRequest(this.gameStatus);
  }
}
