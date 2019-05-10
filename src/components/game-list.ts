import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator'
import {ApiService} from '@/common/api.service';
import {ListGameReply, ListGameRequest, Game, BetRequest, BetReply} from '@/proto/bbuhot/service/game_pb';
import { AuthReply } from '@/proto/bbuhot/service/auth_pb';

@Component({})
export default class GameList extends Vue {
	@Prop()
	game?: Game;

	showDrawer: Boolean = false;
	moneyList: Array<number> = new Array();

	mounted() {
		this.updateBetDataUsingGame();
	}

	private updateBetDataUsingGame() : void {
		this.moneyList = new Array<number>(this.game!.getBettingOptionsList().length);

		this.game!.getBetsList().forEach(bet => 
			this.moneyList[bet.getBettingOptionId()!] = bet.getMoney()!
		);
	}

	private updateGameUsingBetData() : void {
		this.game!.clearBetsList();
		this.moneyList.forEach((moneyAmount, index) => {
			if (moneyAmount > 0) {
				const bet = new Game.Bet();
				bet.setBettingOptionId(index);
				bet.setMoney(moneyAmount);
				this.game!.addBets(bet);
			}
		})
	}

	async updateBets() : Promise<void> {
		// TODO: show as waiting for network response.

		this.updateGameUsingBetData();
		const betRequest = this.generateBetRequest();
		const betReply = await ApiService.bet(betRequest);

		if (betReply.getBetErrorCode() != BetReply.BetErrorCode.NO_ERROR
				|| betReply.getAuthErrorCode() != AuthReply.AuthErrorCode.NO_ERROR) {
			console.log("auth error: " + betReply.getAuthErrorCode());
			console.log("bet error: " +  betReply.getBetErrorCode());
			// TODO: deal with error.
		} else {
			// Update result.
			this.game!.setBetsList(betReply.getBetsList());
		}

		// TODO: handle result.

		// Close drawer;
		this.showDrawer = false;
	}

	private generateBetRequest() : BetRequest {
		const betRequest = new BetRequest();
		betRequest.setGameId(this.game!.getId()!);
		betRequest.setBetsList(this.game!.getBetsList());

		return betRequest;
	}
}