import Vue from 'vue'
import Vuex from 'vuex'
import {Game} from "@/proto/bbuhot/service/game_pb";

Vue.use(Vuex)

export interface state  {
  storeMatch: Game
}

export default new Vuex.Store({
})
