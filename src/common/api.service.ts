import axios from 'axios';
import {Message} from 'google-protobuf';
import {AuthReply, AuthRequest} from 'bbuhot-ts-proto/proto/bbuhot/service/auth_pb';
import {
  ListGameReply, ListGameRequest,
  AdminGameReply, AdminGameRequest,
  AdminGameStatusReply, AdminGameStatusRequest,
  BetReply, BetRequest
} from 'bbuhot-ts-proto/proto/bbuhot/service/game_pb';

export class ApiService {

  constructor() {
  }

  private static callServiceImpl<I extends Message, O>(
      input: I,
      path: string,
      transform: (bytes: Uint8Array) => O): Promise<O> {
    axios.interceptors.request.use(
        config => {
          console.log('interceptors dosomething');
          return config;
        }, err => {
          return Promise.reject(err)
        }
    );
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

  public static async adminGame(adminGameRequest: AdminGameRequest): Promise<AdminGameReply> {
    return await this.callServiceImpl(adminGameRequest, '/api/bet/admin_game', AdminGameReply.deserializeBinary);
  }

  public static async adminGameStatus(adminGameStatusRequest: AdminGameStatusRequest): Promise<AdminGameStatusReply> {
    return await this.callServiceImpl(adminGameStatusRequest, '/api/bet/admin_status', AdminGameStatusReply.deserializeBinary);
  }

  public static async listGame(listGameRequest: ListGameRequest): Promise<ListGameReply> {
    return await this.callServiceImpl(listGameRequest, '/api/bet/list_game', ListGameReply.deserializeBinary);
  }

  public static async bet(betRequest: BetRequest): Promise<BetReply> {
    return await this.callServiceImpl(betRequest, '/api/bet/bet', BetReply.deserializeBinary);
  }

  //mark: Auth
  public static async checkAuth(authRequest: AuthRequest): Promise<AuthReply> {
    return await this.callServiceImpl(authRequest, '/api/auth', AuthReply.deserializeBinary);
  }

}
