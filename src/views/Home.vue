<template>
	<div>
		<div class="content-bg">
			<div class="content-pic-font"></div>
			<headPic></headPic>
		</div>
		<div class="content-game-title">
			<div class="coming-game"></div>
		</div>
		<div v-for="game in gamesList" :key="game.id" class="game-content">
			<div class="game-bg">
				<div class="game-id" style="font-size: 20px">比赛编号: {{game.getId()}}</div>
				<div class="game-name">{{game.getName()}}</div>
				<div class="game-deadline">下注截至日期:<br> {{new Date(game.getEndTimeMs())}}</div>
				<Button class="game-button" @click="showBetModal(game)">查看详情</Button>
				<Modal
						:mask-closable="false"
						v-model="isShowBetModal"
						title="下注选项"
						@on-ok="betRequest"
				>
					<CheckboxGroup v-model="betsOptionList">
						<Checkbox size="large" class="bet-bg" v-for="(option, key) in pickedGame.getBettingOptionsList()" :key="key" :label="key">
							<span class="bet-opt-name">
								{{option.getName()}}
							</span>
							<br>
							<span class="bet-opt-odd">
								赔率: {{option.getOdds()}}
							</span>
							<Input class="bet-money" v-model="moneyList[key]" placeholder="输入金额" />
						</Checkbox>
					</CheckboxGroup>
				</Modal>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import headPic from '../components/headPic.vue';
  import {ApiService} from '@/common/api.service';
  import {ListGameReply, ListGameRequest, Game, BetRequest, BetReply} from '@/proto/bbuhot/service/game_pb'

  @Component({
    components: {
      headPic: headPic,
    }
  })

  export default class Home extends Vue {

    isShowBetModal: boolean = false;

    pickedGame: Game = new Game();

    gamesList: Array<Game> = new Array<Game>();
    betsOptionList: Array<number> = new Array<number>();
    moneyList: Array<number> = new Array<number>();

    // request
    private async listGameRequest() {
      const listGameRequest = new ListGameRequest();
      listGameRequest.setGameStatus(Game.Status.PUBLISHED);

      var listGameReply: ListGameReply = await ApiService.listGame(listGameRequest);

      if (listGameReply.hasAuthErrorCode()) {
        // TODO: deal with error.
      }

      this.gamesList = listGameReply.getGamesList();
    }

    private async betRequest() {
      const betRequest = new BetRequest();
      betRequest.setGameId(this.pickedGame.getId()!);
      var betsList: Array<Game.Bet> = new Array<Game.Bet>();
      await this.betsOptionList.forEach(value => {
        if (this.moneyList[value] > 0) {
          var bet: Game.Bet = new Game.Bet;
          bet.setBettingOptionId(value);
          bet.setMoney(this.moneyList[value]);
          betsList.push(bet);
        }
      });

      if (betsList.length == 0) {
        return;
      }

      betRequest.setBetsList(betsList);
      var betReply: BetReply = new BetReply();
      betReply = await ApiService.bet(betRequest);
      if (betReply.hasBetErrorCode() || betReply.hasAuthErrorCode()) {
        // TODO: deal with error.
      }
    }

    private showBetModal(game: Game) {
      this.isShowBetModal = !this.isShowBetModal;
      this.betsOptionList = new Array<number>();
      this.pickedGame = game;
      this.moneyList = new Array<number>();
      this.pickedGame.getBettingOptionsList().forEach(val => {
        this.moneyList.push(0);
      })
    }

    async mounted() {
      this.listGameRequest();
    }

  }
</script>

<style>
	.content-bg {
		width: 100%;
		height: 400px;
		background: url('../assets/imgs/bg.png');
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 50px;
	}

	.content-pic-font {
		width: 600px;
		height: 160px;
		background: url('../assets/imgs/banner.png');
		background-size: 100% 100%;
	}

	.coming-game {
		width: 221px;
		height: 66px;
		background: url('../assets/imgs/logo.png');
		background-size: 100% 100%;
	}

	.content-game-title {
		padding: 50px;
	}

	.game-content {
		padding: 0 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.game-bg {
		width: 1200px;
		height: 170px;
		background: #fff;
		margin-bottom: 16px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 20px;
	}

	.game-id {
		flex-grow: 1;
		max-width: 150px;
	}

	.game-name {
		font-size: 48px;
		font-weight: 600;
		color: rgba(245, 51, 19, 1);
		text-align: left;
		max-width: 400px;
		flex-grow: 2;
	}

	.game-deadline {
		width: 400px;
		height: 68px;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 16px;
		font-weight: 600;
		color: rgba(85, 85, 85, 1);
		text-align: center;
		max-width: 450px;
		flex-grow: 1;
	}

	.game-button {
		flex-grow: 1;
		max-width: 150px;
	}

	.bet-bg {
		display: flex;
		flex-direction:row;
		justify-content: flex-start;
		margin: 10px;
	}

	.bet-opt-name{
		font-size: 20px;
		font-weight: bold;
	}
	.bet-opt-odd {
		color: orangered;
	}

	.bet-money {
		max-width: 150px;
	}

</style>

