import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:''
  },
  mutations: {
    setName(state,username){
      state.username =username
    }
  },
  actions: {

  }
})
