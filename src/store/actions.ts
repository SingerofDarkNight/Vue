import * as types from './mutation-types';
import {state} from './index';
import { Commit} from 'vuex';
import {Game} from "@/proto/bbuhot/service/game_pb";


const actions = {
  checkout (context: { commit: Commit, state: state}, products:[Game]) {
    context.commit(types.STORE_MATCH)
  }

}

// export default {
//   commitMatch({commit: any}, data: any) {
//     commit(types.STORE_MATCH, data)
//   }
// }
