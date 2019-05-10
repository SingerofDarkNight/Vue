<template>
	<div class="create-bg">
		<div>
			<drawer></drawer>
		</div>
		<div class="create-form-bg">
			<div class="create-form-title">
				创建比赛
			</div>
			<Form ref="formValidate" :model="formValidate" class="form-group-bg" :rules="ruleValidate">
				<FormItem class="form-item" label="名称" :prop="formValidate.name">
					<Input class="form-input" placeholder="输入名称" v-model="formValidate.name"/>
				</FormItem>
				<FormItem class="form-item" label="描述" prop="desc">
					<Input class="form-input" placeholder="输入描述" v-model="formValidate.desc"/>
				</FormItem>
				<!--<FormItem class="form-item" label="普通用户可见" prop="visible">-->
					<!--<Select style="width:300px" v-model="formValidate.visible">-->
						<!--<Option v-for="item in formValidate.visibleList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
					<!--</Select>-->
				<!--</FormItem>-->
				<!--<FormItem class="form-item" label="状态" prop="status">-->
					<!--<Select style="width:300px" v-model="formValidate.status">-->
						<!--<Option v-for="item in formValidate.statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
					<!--</Select>-->
				<!--</FormItem>-->
				<FormItem class="form-item" label="最大注数" prop="limit">
					<Input class="form-input" placeholder="输入最大下注数" v-model="formValidate.limit"/>
				</FormItem>
				<FormItem class="form-item" label="最低金额" prop="lowest">
					<Input class="form-input" placeholder="输入最低下注金额" v-model="formValidate.lowest"/>
				</FormItem>
				<FormItem class="form-item" label="最高金额" prop="highest">
					<Input class="form-input" placeholder="输入最高下注金额" v-model="formValidate.highest"/>
				</FormItem>
				<FormItem class="form-item" label="下注截至日期" prop="enddate">
					<DatePicker type="date" placeholder="下注截日期" style="width: 300px" v-model="formValidate.enddate"></DatePicker>
				</FormItem>
				<!--<FormItem class="form-item" label="下注截至时间" prop="endtime">-->
				<!--<TimePicker type="time" placeholder="下注截时间" style="width: 300px" v-model="formValidate.endtime"></TimePicker>-->
				<!--</FormItem>-->
				<div class="form-option-bg" v-for="(option, key) in formValidate.betOptionList" :key="option.id">
					<div class="form-item form-option-item">下注选项: {{key}}</div>
						<FormItem class="form-item form-option-item" label="下注名称" :prop="option.name">
							<Input class="form-input" placeholder="输入下注选项名称" v-model="formValidate.betOptionList[key].name"/>
						</FormItem>
						<FormItem class="form-item form-option-item" label="下注赔率" :prop="option.odd">
							<Input class="form-input" placeholder="输入金额" v-model="formValidate.betOptionList[key].odd"/>
						</FormItem>
				</div>
			</Form>
			<div class="create-button-bg">
				<Button type="primary" @click="pushBetOption">添加选项</Button>
				<Button type="warning" @click="popBetOption">删除选项</Button>
				<Button type="success" @click="createGameRequest(formValidate)">创建比赛</Button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import SideDrawer from "../components/drawer.vue"
  import {ApiService} from '@/common/api.service';
  import {AdminGameRequest, AdminGameReply, Game} from '@/proto/bbuhot/service/game_pb'
  import BettingOption = Game.BettingOption;

  @Component({
    components: {
      drawer: SideDrawer,
    }
  })
  export default class Create extends Vue {

    formValidate = {
      name: '',
      desc: '',
      limit: '',
      lowest: '',
      highest:'',
      enddate:'',
      endtime:'',
      money:'',
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
          label: "公开"
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
      enddate: [
        {required: true, message: '截至日期不能为空', trigger: 'blur'}
      ],
      money: [
        {required: true, message: '金额不能为空', trigger: 'blur'}
      ],
    });


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
       // game.setNormalUserVisible(Boolean(this.formValidate.visible));
      // game.setStatus(this.formValidate.status);

      const endTs = new Date(this.formValidate.enddate).getTime();
      game.setEndTimeMs(endTs);

      const betOptionList : Array<Game.BettingOption> = new Array<Game.BettingOption>();
      await this.formValidate.betOptionList.forEach(
          option => {
						const betOption: Game.BettingOption = new Game.BettingOption();
						betOption.setName(option.name);
						betOption.setOdds(Number(option.odd));
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

    mounted() {
    }
  }
</script>

<style scoped>
	.create-bg {
		display: flex;
		flex-direction: row;
	}

	.create-form-bg {
		padding: 30px;
		width: 100%;
	}

	.create-form-title {
		background-color: white;
		text-align: center;
		font-size: 20px;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.85);
	}

	.form-group-bg  {
		margin-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.form-item  {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 30%;
		min-width: 400px;
		font-weight: bold;
	}

	.form-input  {
		width: 300px;
	}

	.form-option-bg {
		width: 30%;
		min-width: 350px;
	}

	.form-option-item {
		width: 500px;
		height: 50px;
		line-height: 50px;
	}

	.create-button-bg  {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

</style>
