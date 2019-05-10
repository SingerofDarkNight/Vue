import Vue from "vue";
import Component from "vue-class-component";
import {ApiService} from '@/common/api.service';
import {AdminGameStatusRequest, AdminGameStatusReply, Game, ListGameReply, ListGameRequest} from '@/proto/bbuhot/service/game_pb'


@Component({})
export default class AdminGameList extends Vue {
  gamesList: Array<Game> = new Array<Game>();
  gameStatus: Game.Status = Game.Status.PUBLISHED;
  statusStr = {
    0: "草稿",
    1: "公开",
    2: "已结算",
    3: "已取消",
  };

  private changeGameListRequest(idx: number) {
    this.gameStatus = idx;
    this.listGameRequest(this.gameStatus);
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

  async mounted() {
    this.listGameRequest(this.gameStatus);
  }

  private async changeGameStatus(game: Game, type: number) {
    const adminGameStatusRequest: AdminGameStatusRequest = new AdminGameStatusRequest();
    adminGameStatusRequest.setGameId(game.getId()!);
    let status: Game.Status = Game.Status.DRAFT;
    if (type == 0) {
      status = Game.Status.PUBLISHED;
    } else if (type == 1) {
      status = Game.Status.SETTLED;
    } else if (type == 3) {
      status = Game.Status.CANCELLED;
    }

    let idx = this.gamesList.indexOf(game);
    this.gamesList.splice(idx, 1);

    adminGameStatusRequest.setGameStatus(status);

    let adminGameStatusReply: AdminGameStatusReply  = await ApiService.adminGameStatus(adminGameStatusRequest);
    if (adminGameStatusReply.hasAuthErrorCode()) {
      // TODO: deal with error.
    }
  }
}
