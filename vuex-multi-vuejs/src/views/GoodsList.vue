<template>
			登録状況：{{ store.getters.getRegistStatus }}<br/><br/>
			<button v-on:click="moveRegistGoods">商品登録</button><button v-on:click="getGoods">表示更新</button>
			<br/><br/>
			<center>
		<div class="th-sticky_wrap">

			<table class="st-tbl1">
				<thead>
					<tr>
						<th>コード</th>
						<th>名称</th>
						<th>カテゴリ</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(goods) in goodsList" v-bind:key="goods.code">
						<td>{{ goods.code}}</td>
						<td>{{ goods.name }}</td>
						<td>{{ goods.category }}</td>
					</tr>
				</tbody>
			</table>

		</div>
			</center>
		
</template>

<script>
	import axios from 'axios'
	import { ref, onMounted } from 'vue'
	import { useRouter  } from 'vue-router'
	import { useStore } from 'vuex'

export default {
	name: 'GoodsList',
	setup(){
		const router = useRouter()
		const store = useStore()
		const goodsList = ref(null)
		
		onMounted(() => {
			getGoods()
			
			//subscribeイベントが発火した際の処理を記述する。
			//商品一覧に新規登録商品を追加する
			store.subscribe((mutation, state) => {
				if (mutation.type === 'setregistedGoodsList') {
					state.registedGoodsList.forEach(element => goodsList.value.push( element ) );
				}
			})
		})
				
		
		const moveRegistGoods = () =>{
			router.push( "/regist" )
		}
		
		//商品をサーバから取得するメソッド
		const getGoods = () =>{
			axios.get('http://localhost:8080/goods/list')
				.then(response => {
					goodsList.value = response.data
					console.log( response.data );
			})
		}
		
		return{
			moveRegistGoods,
			getGoods,
			goodsList,
			store
		}
	}
	
}
</script>

