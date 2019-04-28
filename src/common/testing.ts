import { ApiService } from "./api.service";
import { ListGameRequest, Game } from "../proto/bbuhot/service/game_pb";

const listGameRequest = new ListGameRequest();
listGameRequest.setGameStatus(Game.Status.PUBLISHED);
ApiService.listGame(listGameRequest).then(
    listGameReply => console.log(listGameReply.toObject())
);
