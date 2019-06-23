<template>
    <section class="pa2 pa3-l">
        <table-display class="fl w-100 overflow-scroll" style="max-height:30vh">
            <template slot="tableHead" class="fixed">
                <tr class="tl bg-black white w-100">
                    <td class="w2 pa1 f7 tc">
                        <input type="checkbox" class="f1" v-model="isChecked" @click="checkAll"/>
                    </td>
                    <td class="pa2 w3 w2-l">Status</td>
                    <td class="pa2 w4">Code</td>
                    <td class="pa2 w5">Title</td>
                    <td class="pa2 w5">Partner</td>
                </tr>
            </template>
            <template slot="tableBody">
                <tr class="stripe-dark" v-for="(line, index) in recordList" :key="index">
                    <td class="w2 ph1 tc f7">
                        <input type="checkbox" class="f1" v-model="line.Checked" />
                    </td>
                    <td class=" ph1 w3 w2-l f7">
                        <select class="pa1 ba b--silver br2 bg-white  " v-model="line.Workflow">
                            <option></option>
                            <option>enabled</option>
                            <option>disabled</option>
                        </select>
                    </td>
                    <td class="ph1 w4 f7 tc"> 
                        <input class="pa1 ba b--silver br2 bg-white w-100" type="text" v-model="line.Code">
                    </td>
                    <td class=" ph1 w5 f7">
                        <input class="pa1 ba b--silver br2 bg-white w-100" type="text" v-model="line.Title">
                    </td>
                    <td class="ph1 w5 f7">
                        <span class="items-center flex-row">
                            <input class="pa1 ba b--silver br2 bg-white w-80-l w-100" @keyup="searchPartner(index)" type="text" v-model="line.Partner">
                            <span class="dn di-l ph2 br1 bg-red hover-bg-dark-red pointer f7 white tc no-underline" @click="line.partnerList=[],line.Partner='',line.PartnerID=0">
                                CLEAR
                            </span>
                        </span>
						<div class="relative w-100">
							<small>
								<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
									<li class="pa2 black bt b--near-white" @click="line.PartnerID = partner.ID, line.Partner=partner.Fullname, partnerList = []" v-for="(partner, index) in partnerList" :key="index">
										<span class="f7">#{{index+1}}</span> {{partner.Fullname}}
									</li>
								</ul>
							</small>
						</div>
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
  import {uploadDocumentLine} from "@/common"
  import tableDisplay from "@/components/dashboard/tableDisplay"

  export default {
	data() {return{
	  url:"/api/documents", recordList:[], isChecked:false, isSave:false,
	  search:{text: "", field: "Workflow", limit: 100, page:1, skip: 0, filter:{}, RefField:"OwnerID", RefID: parseInt(this.refid)}
	}},
	props:['refid'],
	components: { tableDisplay },
	created() {},
	methods: {
        uploadDocumentLine(event, line) {
			uploadDocumentLine(event, line, this.$parent)
		},
		addDocument(){
            const app = this;
			var curLine = {OwnerID: parseInt(this.refid), ID:0, Title:"", Doctype:"", Filename:"", IssuedBy:"", Validfrom:"", Validtill:""}
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
                    if(response.data.Body !== null){
                        app.recordList[index].ID = response.data.Body
                    }
                    if (response.data.Code == 200) {
                        app.$parent.hasError = true;
                        app.$parent.record = {Image:""}
                        app.recordList = []
                    }
                    
                }).catch((e) => { console.log(e) })
            }
        },
        searchPartner(){
            this.searchProfile("partnerList");
        },
        searchProfile(fieldName) {
            const app = this;
            const url = "/api/profiles/search";
            const search = {text: app.line.Setting, field: "Fullname", limit: 20, skip: 0};
            HTTP.post(url, search,{withCredentials: true}).then((response) => {
                app[fieldName] = response.data.Body
            }).catch((e) => { console.log(e) })
        },
	}
  }
</script>