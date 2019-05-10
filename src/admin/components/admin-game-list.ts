import Vue, {CreateElement, VNode} from "vue";
import Component from "vue-class-component";
import {ApiService} from '@/common/api.service';
import {ListGameReply, ListGameRequest, Game} from '@/proto/bbuhot/service/game_pb'

@Component({
})
export default class AdminGameList extends Vue {
    gamesList: Array<Game> = new Array<Game>();

    // request
    private async listGameRequest() {
        const listGameRequest = new ListGameRequest();
        listGameRequest.setGameStatus(Game.Status.PUBLISHED);
        listGameRequest.setIsAdminRequest(true);

        var listGameReply: ListGameReply = await ApiService.listGame(listGameRequest);

        if (listGameReply.hasAuthErrorCode()) {
        // TODO: deal with error.
        }

        this.gamesList = listGameReply.getGamesList();
    }

    async mounted() {
        this.listGameRequest();
    }
}