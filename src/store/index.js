import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import getters from '@/store/getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    steps: 0,
    puzzlePieces: []
  },
  mutations,
  actions,
  getters
})
