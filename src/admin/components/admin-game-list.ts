import Vue from "vue";
import Component from "vue-class-component";
import {ApiService} from '@/common/api.service';
import {Game, ListGameReply, ListGameRequest} from '@/proto/bbuhot/service/game_pb'


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

  private changeGameStatus(idx: number) {
    this.gameStatus = idx;
    this.listGameRequest(this.gameStatus);
  }

  // request
  private async listGameRequest(status: Game.Status) {
    const listGameRequest = new ListGameRequest();
    listGameRequest.setGameStatus(status);
    listGameRequest.setIsAdminRequest(true);

    var listGameReply: ListGameReply = await ApiService.listGame(listGameRequest);

    if (listGameReply.hasAuthErrorCode()) {
      // TODO: deal with error.
    }

    this.gamesList = listGameReply.getGamesList();
  }

  async mounted() {
    this.listGameRequest(this.gameStatus);
  }
}
