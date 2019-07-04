<template>
    <section class="pa2 pa3-l">
        <table-display class="fl w-100 overflow-scroll" style="max-height:30vh">
            <template slot="tableHead" class="fixed">
                <tr class="tl bg-navy f7">
                    <td class="tc">
                        <span @click="searchRecords" class="oi bg-gray white pv1 b db" data-glyph="magnifying-glass"></span>
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.code" placeholder="File" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.title" placeholder="Title" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.partner" placeholder="Document Type" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                    <td class="">
                        <input type="text" v-model="search.filter.status" placeholder="File Type" class="ba b--black-10 f7 fl tracked bg-white black pa1 w-100 br1">
                    </td>
                </tr>
                <tr class="tl bg-black white w-100">
                    <td class="pa2 w2">#</td>
                    <td class="pa2 w4 w3-l">Code</td>
                    <td class="pa2 w4">Title</td>
                    <td class="pa2 w5">Partner</td>
                    <td class="pa2 w5">Status</td>
                </tr>
            </template>
            <template slot="tableBody" v-if="recordList.length > 0">
                <tr class="stripe-dark" v-for="(line, index) in recordList" :key="index">
                    <td class="w2 ph1 pv2 tc f7">
                        <span class="f7">#</span>{{index+1}}
                    </td>

                    <td class="ph1 pv2 w5 f7 tc">  
                        {{line.Code}}
                    </td>

                    <td class=" ph1 pv2 w3 f7"> {{line.Title}}</td>

                    <td class=" ph1 pv2 w4 f7"> {{line.Partner}}</td>

                    <td class=" ph1 pv2 w4 f7"> {{line.Status}}</td>
                </tr>
                <tr class="h2"></tr>
            </template>
        </table-display>
        <div v-if="recordList.length < 1">
            <h1 class="black f6 tc ">There are currently no records </h1>
        </div>
    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import {humanNumber} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"
  export default {
	data() {return{
	  url:"/api/settings", recordList:[], 
	  search: {text: "", field: "Workflow", limit: 50, page:1, skip: 0, filter:{}, RefField:"OwnerID", RefID: parseInt(this.refid) },
	}},
	props:['refid'],
	created() {this.searchRecords()},
	components: { tableDisplay },
	methods: {
        humanNumber,
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