<template>
    <section class="pa2 pa3-l">
        <table-display class="fl w-100 overflow-scroll" style="max-height:30vh">
            <template slot="tableHead" class="fixed">
                <tr class="tl bg-black white w-100">
                    <td class="w2 pa1 f7 tc">
                        <input type="checkbox" class="f1" v-model="isChecked" @click="checkAll"/>
                    </td>
                    <td class="pa2 w4 w3-l">File</td>
                    <td class="pa2 w4">Title</td>
                    <td class="pa2 w5">Document Type</td>
                    <td class="pa2 w5">File Type</td>
                </tr>
            </template>
            <template slot="tableBody">
                <tr class="stripe-dark" v-for="(line, index) in recordList" :key="index">
                    <td class="w2 ph1 tc f7">
                        <input type="checkbox" class="f1" v-model="line.Checked" />
                    </td>
                    <td class="ph1 w4 f7 tc"> 
                        <input type="file" class="dn" @change="uploadDocumentLine($event, line)" :ref="index"/>
                        <span class="pointer f7 link pv1 pr2 bg-black white br2" @click="$refs[index][0].click()" >
                            <span class="oi mr1 ph2 pv1 bg-white black br2 br--left" data-glyph="cloud-upload"></span>
                            Upload
                        </span>
                    </td>
                    <td class=" ph1 w4 f7">
                        <input class="pa1 ba b--silver br2 bg-white w-100" type="text" v-model="line.Title">
                    </td>
                    <td class=" ph1 w5 f7">
                        <input class="pa1 ba b--silver br2 bg-white w-100" type="text" v-model="line.Doctype">
                    </td>
                    <td class=" ph1 w4 f7">
                        <input disabled="disabled" class="pa1 ba b--silver br2 bg-white w-100" type="text" v-model="line.Filetype">
                    </td>
                </tr>
                <tr class="h2"></tr>
            </template>
        </table-display>
        <div class="fl w-100 pa1 mv3">
            <div class="fl pv1 ph2 br1 bg-red hover-bg-dark-red pointer f7 white tc" @click="delDocument">
                -
            </div>

            <div class="fr pv1 ph2 br1 bg-green hover-bg-dark-green pointer f7 white tc" @click="addDocument">
                +
            </div>
        </div>
    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import {checkRedirect} from "@/common"
  import {scrollTop} from "@/common"

  import {uploadDocumentLine} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"
  export default {
	data() {return{
	  url:"/api/documents", recordList:[], isChecked:false, isSave:false,
	  search:{text: "", field: "Workflow", limit: 100, page:1, skip: 0, filter:{}, RefField:"OwnerID", RefID: parseInt(this.refid)}
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
				} else { app.addEmployer(); }
			}).catch((e) => { console.log(e) })
		},
        uploadDocumentLine(event, line) {
			uploadDocumentLine(event, line, this.$parent)
		},
		addDocument(){
            const app = this;
			var curLine = {OwnerID: parseInt(this.refid), ID:0, Title:"", Doctype:"", Filename:""}
			app.recordList.push(curLine)
		},
		checkAll(){
			const app = this;
			for (var index = 0, len = app.recordList.length; index < len; index++) {
				app.recordList[index].Checked = !app.isChecked
			}
		},
		delDocument(){
			const app = this;
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
                app.recordList[index].OwnerID = ID;
                HTTP.post(app.url, app.recordList[index], {withCredentials: true}) .then((response) => {
                    app.$parent.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)
                    if(response.data.Body !== null && response.data.Code == 200){
                        // app.recordList[index].ID = response.data.Body
                        scrollTop()
                        app.$parent.$router.push({name:"suppliers-view",params:{id:ID}})
                    } 
                    
                }).catch((e) => { console.log(e) })
            }
        },
	}
  }
</script>