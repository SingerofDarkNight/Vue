import axios from 'axios';
import { Message } from 'google-protobuf';
import { AuthReply, AuthRequest } from '../proto/bbuhot/service/auth_pb';
import { ListGameReply, ListGameRequest } from '../proto/bbuhot/service/game_pb';

export class ApiService {

    constructor() {}

    private static callServiceImpl<I extends Message, O>(
        input: I,
        path: string,
        transform: (bytes: Uint8Array) => O ): Promise<O> {
            return axios({
                url: path,
                method: 'post',
                data: input.serializeBinary(),
                responseType: 'arraybuffer',
            }).then(
                response => {
                    return transform(response.data);
                }
            );
    }

    public static async listGame(listGameRequest: ListGameRequest): Promise<ListGameReply> {
        return await this.callServiceImpl(listGameRequest, '/api/bet/list_game', ListGameReply.deserializeBinary);
    }

    public static async checkAuth(authRequest: AuthRequest): Promise<AuthReply> {
        return this.callServiceImpl(authRequest, '/api/auth', AuthReply.deserializeBinary);
    }
}
