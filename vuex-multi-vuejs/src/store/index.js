import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    registStatus:'', //登録状況
    goodsList:[], //仮登録商品
    registedGoodsList:[] //新規登録商品
  },
  mutations: {
	
	//仮登録商品設定
	kariRegistGoods: function(state, value){
		let goods = {'code':value.code, 'name':value.name, 'category':value.category}
		state.goodsList.push( goods )
	},
	
	//仮登録商品クリア
	clearKariRegistGoods: function(state){
		state.goodsList = []
	},
	
	//登録状況設定
    setRegistStatus: function(state, value) {
      state.registStatus = value
    },
    
    //新規登録商品設定
    setRegistedGoodsList: function(state, value) {
      state.registedGoodsList = value
    },
  },
  actions: {
	
	//商品仮登録、stateのgoodsListに設定
	kariRegistGoods: function( { commit }, goods ){
		commit( "kariRegistGoods", goods );
	},

	//商品本登録、サーバに登録処理を依頼し返ってきた商品情報を新規登録商品として
	//stateのregistedGoodsListに設定
    registGoods: function({ commit }){

		commit('setRegistStatus', "処理中")
		
		axios.post('http://localhost:8080/goods/regist', this.state.goodsList)
			.then(response => {
			
			if( response.status == 200 ){
				commit('clearKariRegistGoods')
				commit('setRegistedGoodsList', response.data)
				commit('setRegistStatus', "登録完了")
			}else{
				commit('setRegistStatus', "登録エラー")
			}
		})
		
	}
  },
  modules: {
  },
  
  getters:{
	getGoodsList( state ){ return state.goodsList; },
	getRegistStatus( state ){ return state.registStatus; }
  
  }
})