<template>
	<section class="ph2">
		
		<table-display class="fl w-100 " style="max-height:30vh">
			<template slot="tableHead" class="fixed">
				<tr class="tl bg-black white w-100">
					<td class="w2 pa1 f7 tc">
						<input type="checkbox" class="f1" v-model="isChecked" @click="checkAll"/>
					</td>
					<td class="pa2 w3">Line No</td>
					<td class="pa2 w3">Quantity</td>
					<td class="pa2 ">Item</td>
					<td class="pa2 w4">Amount</td>
					<td class="pa2 w4">Total Excl Tax</td>
				</tr>
			</template>
			<template slot="tableBody">
				<tr class="stripe-dark" v-for="(line, index) in recordList" :key="index">
					<td class="w2 ph1 tc f7">
						<input type="checkbox" class="f1" v-model="line.Checked" />
					</td>
					<td class="ph1 w3 f7"> 
						<input class="pa1 ba b--silver br2 bg-white w-100" type="number" min="1" v-model.number="line.Lineno">
					</td>
					<td class="ph1 w3 f7">
						<input class="pa1 ba b--silver br2 bg-white w-100" type="number" min="1"  v-model.number="line.Quantity">
					</td>
					<td class=" ph1 f7">
						<span class="items-center flex-row">
							<input class="pa1 ba b--silver br2 bg-white w-90-l w-100" @keyup="searchItem(index)" type="text" v-model="line.Item">
							<span class="dn di-l ph2 br1 bg-red hover-bg-dark-red pointer f7 white tc no-underline" @click="line.itemList=[],line.Item='',line.ItemID=0">
								CLEAR
							</span>
						</span>
						<div class="relative w-100">
							<small>
							<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
								<li class="pa2 black bt b--near-white" @click="line.ItemID = parseInt(item.ID), line.Item=item.Title, line.itemList = []" v-for="(item, index) in line.itemList" :key="index">
								<span class="f7">#{{index+1}}</span> {{item.Title}} <small class="i">{{item.Category}}</small>
								</li>
							</ul>
							</small>
						</div>
					</td>
					<td class="w4 ph1 f7">
						<input class="pa1 ba b--silver br2 bg-white w-100" type="number" min="1"  v-model.number="line.Amount">
					</td>
					<td class="w4 ph1 f7">
						<input class="pa1 ba b--silver br2 bg-white w-100" type="number" min="1"  v-model.number="line.Totalexcltax">
					</td>
				</tr>
				<tr class="h2"></tr>
			</template>
		</table-display>

        <div class="w-100 fl">
            <div class="fl w-10 pa1 f7 tl">
                <div class="fl pv1 ph2 br1 bg-red hover-bg-dark-red pointer f7 white tc" @click="delItem">
                    -
                </div>
            </div>
            <div class="fl w-80 black f6 tc"> &nbsp; 
                <span v-if="recordList.length < 1">
                    There are currently no line records
                </span>
            </div>
            <div class="fl w-10 pa1 f7 tr">
                <div class="fr pv1 ph2 br1 bg-green hover-bg-dark-green pointer f7 white tc" @click="addItem">
                    +
                </div>
            </div>
        </div>
	</section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import {checkRedirect} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"

  export default {
	data() {return{
	  url: "/api/pricelistlines", recordList: [], notifications:[], itemList:[], isChecked: false, isSave: false,
	  search: {text: "", field: "Title", limit: 100, page:1, skip: 0, filter:{}, RefField:"PricelistID", RefID: parseInt(this.refid) },
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
				if (response.data.Body !== null ) {
					app.recordList = response.data.Body
				} else { app.addItem(); }
			}).catch((e) => { console.log(e) })
		},
	  	searchItem(index) {
			const url = "/api/items/search";
			const app = this;
			const search = {text: app.recordList[index].Item, field: "Title", limit: 20, skip: 0};
			HTTP.post(url, search,{withCredentials: true}).then((response) => {
				if (response.data.Body !== null) {
					app.recordList[index].itemList = response.data.Body
				}
			}).catch((e) => { console.log(e) })
		},
		addItem(){
			const app = this
			var curLine = {ID:0, PricelistID:parseInt(app.refid), Checked:false, Lineno:app.recordList.length+1, Quantity:0, Item:"", ItemID:0, Amount:0, Totalexcltax:0, itemList:[]}
			app.recordList.push(curLine)
		},
		checkAll(){
			const app = this
			for (var index = 0, len = app.recordList.length; index < len; index++) {
				app.recordList[index].Checked = !app.isChecked
			}
		},
		delItem(){
			const app = this
			app.isChecked = false
			var curRecordList = app.recordList
			app.recordList = []
			for (var index = 0, len = curRecordList.length; index < len; index++) {
				var curLine = curRecordList[index];
				if (!curLine.Checked) {
					curLine.Lineno = app.recordList.length+1
					app.recordList.push(curLine)
				}
			}
		},
		saveLines(){
			const app = this;
			const recordLines = {lines:app.recordList}
			HTTP.post(app.url, recordLines, {withCredentials: true}) .then((response) => {
				app.$parent.notifications.push(response.data)
				setTimeout(checkRedirect(response.data),1500)
				if (response.data.Code == 200) {
					app.$router.push({name:"pricelists-view",params:{id:parseInt(app.refid)}})
				}
			}).catch((e) => { console.log(e) })
        },
        updateParentTotal() {
            const app = this;
            app.$parent.record.Totalexcltax = 0;
            for (var index = 0, len = app.recordList.length; index < len; index++) {
                var curLine = app.recordList[index];
                app.$parent.record.Totalexcltax += curLine.Totalexcltax;
            }
            app.$parent.updateTotal();
        }
	}
  }
</script>
