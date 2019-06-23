<template>
	<section class="ph2">
	  <table-display class="fl w-100 overflow-scroll" style="max-height:50vh">
		<template slot="tableHead">
		  <tr class="tl bg-black black f7">
			<td class="tc">
			  <span @click="searchRecords" class="oi bg-green white pv1 b db" data-glyph="magnifying-glass"></span>
			</td>
			<td class="">
			  <input type="number" v-model="search.filter.quantity" placeholder="Quantity" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
			<td class="">
              <input type="text" v-model="search.filter.title" placeholder="Item" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
			<td class="">
			  <input type="text" v-model="search.filter.amount" placeholder="Amount" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
			<td class="">
			  <input type="number" v-model="search.filter.totalexcltax" placeholder="Total Excl Tax" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
			</td>
		  </tr>
		  <tr class="tl bg-black white">
			<td class="pa2 w3">Line No</td>
			<td class="pa2 w3">Quantity</td>
			<td class="pa2 ">Item</td>
			<td class="pa2 w4">Amount</td>
			<td class="pa2 w4">Total Excl Tax</td>
		  </tr>
		</template>
		<template slot="tableBody" v-if="recordList.length > 0">
            <tr class="stripe-dark" v-for="(workorder, index) in recordList" :key="index">
                <td class=" pa1">
                    <span class="f7">#</span>{{workorder.Lineno}}
                </td>
                <td class=" pa2"> {{workorder.Quantity}}</td>
                <td class=" pa2 f7">{{workorder.Title}}</td>
                <td class=" pa2 f7">{{workorder.Amount}}</td>
                <td class=" pa2 f7">{{workorder.Totalexcltax}}</td>
            </tr>
		</template>
	  </table-display>
	  
  
	  <div v-if="recordList.length < 1">
		<h1 class="black f6 tc ">There are currently no workorder lines record </h1>
	  </div>

	</section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"

  export default {
	data() {return{
	  url: "/api/workorderlines", recordList: [],
      search: {text: "", field: "Title", limit: 100, page:1, skip: 0, filter:{}, RefField:"WorkorderID", RefID: parseInt(this.refid) },
    }},
    props:['refid'],
	components: { tableDisplay },
	created() {this.searchRecords()},
	methods: {
	  searchRecords() {
        const app = this
		app.isSearch = true
		this.recordList = []
		app.search.skip = app.search.page-1;

		HTTP.post(app.url+'/search', app.search,{withCredentials: true}).then((response) => {
		  if (response.data.Body !== null && response.data.Body !== undefined ) {
			app.recordList = response.data.Body
		  }
		}).catch((e) => { console.log(e) })
	  },
	}
  }
</script>
