<template>
	<section class="pa2 pa3-l">
	  <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
		<div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
		  Inventory / Stock Inventory / Search
		</div>

		<router-link :to="{'name':'stocks-new'}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">
		  + New
		</router-link>
	  </div>

	  <div class="cf pv3"></div>

	  <div class="cf w-100">
		<div class="black fl w-50 dib tl h2 f7">
		  <span class="bg-black white pa2 br1 fl">page: 
			<input type="number" class="w3 black bn tc br2 bg-white " @click="searchRecords" min="1" v-model.number="search.page">
		  </span>
		</div>
		<div class="black fr w-50 dib tr h2 f7">
		  <span class="bg-black white pa2 br1 fr">
			<input type="number" class="w3 black bn tc br2 bg-white " v-model.number="search.limit">
			records
		  </span>
		</div>
	  </div>

	  <table-display>
		<template slot="tableHead">
		  <tr class="tl bg-black black f7">
			<td class="tc">
			  <span @click="searchRecords" class="oi bg-green white pv1 b db" data-glyph="magnifying-glass"></span>
			</td>
			<td class="">
			  <input type="text" v-model="search.filter.title" placeholder="Name of Item" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
			<td class="">
			  <input type="text" v-model="search.filter.color" placeholder="Color" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
			<td class="">
			  <input type="text" v-model="search.filter.amount" placeholder="Price" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
            <td class="">
			  <input type="text" v-model="search.filter.quantity" placeholder="Quantity" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
            <td class="">
			  <input type="text" v-model="search.filter.totalexcltax" placeholder="Total" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
            <td class="">
			  <input type="text" v-model="search.filter.docno" placeholder="Doc No" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
		  </tr>
		  <tr class="tl bg-black white">
			<td class=""></td>
			<td class="pa2 ">Name of Item</td>
			<td class="pa2 ">Color</td>
			<td class="pa2 ">Price</td>
			<td class="pa2 ">Quantity</td>
			<td class="pa2 ">Total</td>
            <td class="pa2 ">Doc No</td>
			<td class="dn pa2 ">Created By / On</td>
			<td class="dn pa2 ">Updated By / On</td>
		  </tr>
		</template>
		<template slot="tableBody" v-if="recordList.length > 0">
		  <tr class="stripe-dark" v-for="(stock, index) in recordList" :key="index">
			<td class="">
			  <router-link data-glyph="eye" class="f7 oi br-pill bg-green hover-bg-dark-green ph1 pt1 near-white" :to="{name:'stocks-view',params:{id:stock.StockID}}" ></router-link>
			</td>
			<td class=" pa2">
			  <span class="f7">#{{(index+1)+(search.skip*search.limit)}}.</span> {{stock.Title}}
			</td>
			<td class=" pa2 f7">{{stock.Color}}</td>
			<td class=" pa2 f7">{{stock.Amount}}</td>
			<td class=" pa2 f7">{{stock.Quantity}}</td>
			<td class=" pa2 f7">{{stock.Totalexcltax}}</td>
			<td class=" pa2 f7"><small>{{stock.Docno}} - {{stock.Stock}} </small> </td>
			<td class="dn pa2 f7">{{stock.Createdbyuser}} <small>{{dateTimeConvert(stock.Createdate)}}</small> </td>
			<td class="dn pa2 f7">{{stock.Updatedbyuser}} <small>{{dateTimeConvert(stock.Updatedate)}}</small> </td>
		  </tr>
		</template>
	  </table-display>
	  
	  
	  <div v-if="recordList.length < 1">
		<h1 class="black f6 tc ma5">There are currently no stocks record </h1>
	  </div>

	</section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import {dateTimeConvert} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"

  export default {
	data() {return{
	  url: "/api/stocklines", recordList: [],
	  search: {text: "", field: "Title", limit: 50, page:1, skip: 0, filter:{Code:"stock"}},
	}},
	components: { tableDisplay },
	created() {this.searchRecords()},
	methods: {
        dateTimeConvert,
        searchRecords() {
            const app = this 
            app.isSearch = true
            this.recordList = []
            app.search.skip = app.search.page-1;

            HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
            
            if (response.data.Body !== null ) {
                app.recordList = response.data.Body
            }
            }).catch((e) => { console.log(e) })
        },
	}
  }
</script>
