import Vue from "vue";
import Component from "vue-class-component";
import {ApiService} from '@/common/api.service';
import './filter';
import {EditGameModel} from "./edit-game-model"
import {
  AdminGameReply,
  AdminGameRequest,
  AdminGameStatusReply,
  AdminGameStatusRequest,
  Game,
  ListGameReply,
  ListGameRequest
} from 'bbuhot-ts-proto/proto/bbuhot/service/game_pb'


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
  showSettleDrawer: boolean = false;
  settleGame: Game = new Game();
  settleIdList: Array<number> = new Array<number>();
  //  Current table data game status title map
  statusStr = {
    0: "草稿",
    1: "发布",
    2: "结算",
    3: "流局",
  };

  ghost = [true, false, true, true];

  editModel: EditGameModel = new EditGameModel();

  private editGame(game: Game) {
    this.showEditDrawer = !this.showEditDrawer;
    this.editModel = new EditGameModel(game);
  }
  private settledDrawer(game: Game) {
    this.settleGame = game;
    this.settleIdList = [];
    this.showSettleDrawer = !this.showSettleDrawer;
    console.log('settle ', game.getBettingOptionsList().length);
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

  private convertDesc(desc: string, imgUrl1: string, imgUrl2: string): string {
    var res = '{"desc":"' + desc + '",' +
        '"img1":"'+ imgUrl1 + '",' +
        '"img2":"' + imgUrl2 + '"}';
    return res;
  }

  // request
  private changeGameListRequest(idx: number) {
    this.gameStatus = idx;
    this.ghost = [true, true, true, true];
    this.ghost[idx] = false;
    this.listGameRequest(this.gameStatus);
  }

  private async listGameRequest(status: Game.Status) {
    const listGameRequest = new ListGameRequest();
    listGameRequest.setGameStatus(status);
    listGameRequest.setIsAdminRequest(true);

    let listGameReply: ListGameReply = await ApiService.listGame(listGameRequest);

    if (listGameReply.hasAuthErrorCode()) {
      // TODO: deal with error.
    }

    this.gamesList = listGameReply.getGamesList();
    this.gamesList.reverse();
  }

  private async changeGameStatusRequest(game: Game, type: number) {
    const adminGameStatusRequest: AdminGameStatusRequest = new AdminGameStatusRequest();
    adminGameStatusRequest.setGameId(game.getId()!);
    let status: Game.Status = Game.Status.DRAFT;
    /*
      0: 草稿
      1: 发布
      2: 结算
      3: 流局
     */
    if (type == 0) {
      status = Game.Status.DRAFT;
    } else if (type == 1) {
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

  private async updateGameRequest(editGame: EditGameModel) {
    const adminGameRequest: AdminGameRequest = new AdminGameRequest();

    const game: Game = new Game();
    game.setId(editGame.id);
    game.setName(editGame.name);
    const desc = this.convertDesc(editGame.desc, editGame.imgUrl1, editGame.imgUrl2);
    game.setDescription(desc);
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

  private async settleGameRequest() {
    console.log('settle ', this.settleIdList);
    const adminGameStatusRequest: AdminGameStatusRequest = new AdminGameStatusRequest();
    adminGameStatusRequest.setGameId(this.settleGame.getId()!);

    let idx = this.gamesList.indexOf(this.settleGame);
    this.gamesList.splice(idx, 1);
    adminGameStatusRequest.setGameStatus(Game.Status.SETTLED);
    await this.settleIdList.forEach(
        id => {
          adminGameStatusRequest.setWinningOption(id);
        }
    );
    let adminGameStatusReply: AdminGameStatusReply = await ApiService.adminGameStatus(adminGameStatusRequest);
    if (adminGameStatusReply.hasAuthErrorCode()) {
      // TODO: deal with error.
    }
    this.showSettleDrawer = !this.showSettleDrawer;
  }

  async mounted() {
    this.listGameRequest(this.gameStatus);
  }
}
