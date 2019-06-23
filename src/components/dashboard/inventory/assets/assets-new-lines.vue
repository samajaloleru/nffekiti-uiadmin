<template>
	<section class="ph2">
        <table-display class="fl w-100" style="max-height:30vh">
            <template slot="tableHead" class="fixed">
                <tr class="tl bg-black white w-100">
                    <td class="w2 pa1 f7 tc">
                        <input type="checkbox" class="f1" v-model="isChecked" @click="checkAll"/>
                    </td>
                    <td class="pa1 w5">Name of Item</td>
                    <td class="pa1 w3">Quantity</td>
                    <td class="pa1 w4">Price</td>
                    <td class="pa1 w4">Year of Purchase</td>
                    <td class="pa1 w4">Total Value</td>
                </tr>
            </template>
            <template slot="tableBody">
                <tr class="stripe-dark" v-for="(line, index) in recordList" :key="index">
                    <td class="w2 ph1 tc f7">
                        <input type="checkbox" class="f1" v-model="line.Checked" />
                    </td>
                    <td class=" ph1 w5">
                        <div class="items-center flex-row">
                            <input class="pa1 ba b--silver br2 bg-white w-80-l w-70"  @keyup="searchItem(index)" type="text" v-model="line.Title">
                            <small class="ph1 br1 bg-red hover-bg-dark-red pointer white tc" @click="line.itemList=[],line.Item='',line.ItemID=0,line.Color='', line.Uom='', line.Unit=0, line.Quantity=0, line.Amount=0,line.Totalexcltax=0" >CLEAR</small>
                        </div>
                        <div class="relative">
                            <ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-y-scroll" @blur="line.itemList=[]"  style="max-height:6em" >
                                <li class="pa2 black bt b--near-white" @click="line.ItemID = parseInt(item.ID), line.Item=item.Title, line.Title=item.Title, line.Color=item.Color, line.Uom=item.Uom, line.Unit=item.Unit, line.itemList = []" v-for="(item, index) in line.itemList"   :key="index" >
                                    <span class="f7">#{{index+1}}</span> {{item.Title}}
                                </li>
                            </ul>
                        </div>
                    </td>
                    
                    <td class="w3 ph1 f7">
                        <input class="pa1 ba b--silver br2 bg-white w-100" type="number" min="1" @change="updateParentTotal" @keyup="updateParentTotal" v-model.number="line.Quantity">
                    </td>
                    <td class="w4 ph1 f7">
                        <input class="pa1 ba b--silver br2 bg-white w-100" type="number" min="1" @change="updateParentTotal" @keyup="updateParentTotal" v-model.number="line.Amount">
                    </td>
                    <td class="w4 ph1 f7">
                        <input class="pa1 ba b--silver br2 bg-white w-100" type="text" v-model="line.Description" >
                    </td>
                    <td class="w4 ph1 f7">
                        <input class="pa1 ba b--silver br2 bg-white w-100" readonly="readonly" type="number" min="1" v-model.number="line.Totalexcltax=line.Amount*line.Quantity">
                    </td>
                </tr>
                <tr class="h2"></tr>
            </template>
        </table-display>

		<div class="fl w-100 pa1">
			<div class="fl pv1 ph2 br1 bg-red hover-bg-dark-red pointer f7 white tc" @click="delItem">
				-
			</div>
						
			<div class="fr pv1 ph2 br1 bg-green hover-bg-dark-green pointer f7 white tc" @click="addItem">
				+
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
	  url: "/api/stocklines", recordList: [],  itemList:[], isChecked: false, isSave: false,
	  search: {text: "", field: "Title", limit: 100, page:1, skip: 0, filter:{}, RefField:"StockID", RefID: parseInt(this.refid) },
	}},
	props:['refid'],
	components: { tableDisplay },
	created() {this.addItem()},
	methods: {
	  	searchItem(index) {
			const url = "/api/items/search";
			const app = this;
			const search = {text: app.recordList[index].Title, field: "Title", filter:{Code:"asset"}, limit: 20, skip: 0};
			HTTP.post(url, search,{withCredentials: true}).then((response) => {
				if (response.data.Body !== null) {
					app.recordList[index].itemList = response.data.Body
				}
			}).catch((e) => { console.log(e) })
		},
		addItem(){
            const app = this
			var curLine = {ID:0, Code:"asset", StockID:parseInt(app.refid), Checked:false, Lineno:app.recordList.length+1, Quantity:1, Item:"", ItemID:0, Amount:0, Totalexcltax:0, itemList:[]}
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
		saveLines(ID){
			const app = this;
			for (var index = 0, len = app.recordList.length; index < len; index++) {
				app.recordList[index].StockID = ID;
			}
			const recordLines = {lines:app.recordList}
			HTTP.post(app.url, recordLines, {withCredentials: true}) .then((response) => {
				app.$parent.notifications.push(response.data)
				setTimeout(checkRedirect(response.data),1500)
				if (response.data.Code == 200) {
					app.$router.push({name:"assets-view",params:{id:ID } });
				}
			}).catch((e) => { console.log(e) })
        },
        updateParentTotal(){
            const app = this
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
