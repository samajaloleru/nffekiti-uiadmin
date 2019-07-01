<template>
		<section class="pa2 pa3-l">
			<div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
				<div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
					Inventory / Other Inventory / New
				</div>
				<router-link :to="{name:'others-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
					Back
				</router-link>
			</div>

            <notify class="mv2" :notifications="notifications"></notify>
            
			<div class="pa2 bg-washed-yellow br2 cf">

				<div class="w-100">
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-third-l">
						<label class="db fw4 lh-copy f6 black"> Doc No</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" readonly="readonly" placeholder="AUTO GENERATED" v-model="record.Docno">
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-third-l">
						<label class="db fw4 lh-copy f6 black"> Doc Date</label>
						<input class="pa1-l pa2 ba b--silver br2 bg-white w-100 " type="date" v-model="record.Docdate">
					</div>
					<div class="fl pa2 mt3 mt0-ns w-100 w-third-l">
						<label class="db fw4 lh-copy f6 black"> Other Title</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
					</div>
				</div>

                <otherlines refid="0" ref="otherlines" />

                <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
                    <label class="db fw4 lh-copy f6 black"> Discount Amount</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " step=".01" type="number" v-model="record.Discountamount">
                </div>

                <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
                    <label class="db fw4 lh-copy f6 black"> Total Excl Tax</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " step=".01" type="number" v-model="record.Totalexcltax">
                </div>
                
                <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
                    <label class="db fw4 lh-copy f6 black"> Tax Amount</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " step=".01" type="number" v-model="record.Taxamount">
                </div>

                <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
                    <label class="db fw4 lh-copy f6 black"> Total Incl Tax</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " step=".01" type="number" v-model="record.Totalincltax">
                </div>

				<div class="w-100" v-if="otherfields.show">
                    <div class="w-100">
                        <div class="fl pa2 mt3 mt0-ns w-100">
                            <label class="db fw4 lh-copy f6 black"> Notes</label>
                            <textarea class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Description"></textarea>
                        </div>
                    </div>
				</div>
				
				

                <div class="fl w-100 tc">
					<label class="center fw4 lh-copy f7 pointer" :class="otherfields.color" @click="toggleOtherfields">--click to <span class="fw6 ttu">{{otherfields.text}}</span> other fields--</label>
				</div>

				<div class="fl w-100 mt3">
					<div v-if="isSave" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline"  @click="save" >
						Submit
					</div>
				</div>
			</div>
			

		</section>
</template>

<script type="text/javascript">
	import {HTTP} from "@/common"
	import {checkRedirect} from "@/common"
	import {displayImage} from "@/common"
    import notify from "@/components/notify"
    import otherlines from "@/components/dashboard/inventory/others/others-new-lines"

	export default {
		created(){},
		data() {return{
			url: "/api/stocks",
			record: {Code:"other", Currency:"ZAR", Workflow:"draft", Docdate: new Date().toISOString().slice(0,10), Totalincltax:0, Taxamount:0, Totalexcltax:0, Discountamount:0},
			notifications:[],
			partnerList:[],
			ownerList:[],
			isSave:true,
			otherfields:{show:false,text:"SHOW",color:"dark-green"},
        }},
        mounted(){},
		components: { notify, otherlines },
		methods: {
			searchOwner(){
				this.searchProfile("ownerList");
			},
			searchPartner(){
				this.searchProfile("partnerList");
			},
			searchProfile(fieldName) {
				const app = this;
				const url = "/api/profiles/search";
				const search = {text: app.record.Setting, field: "Title", limit: 20, skip: 0};
				HTTP.post(url, search,{withCredentials: true}).then((response) => {
					app[fieldName] = response.data.Body
				}).catch((e) => { console.log(e) })
            },
            updateTotal(){
                const app = this
                app.record.Totalincltax = 0;
                app.record.Taxamount = parseFloat((app.record.Totalexcltax*0.15).toFixed(2));
                app.record.Totalincltax = parseFloat((parseFloat(app.record.Taxamount) + (app.record.Totalexcltax-app.record.Discountamount)).toFixed(2));
            },
			toggleOtherfields(){
				const app = this;
				if (app.otherfields.show) {
					app.otherfields = {show:false,text:"SHOW",color:"dark-green"}
				} else {
					app.otherfields = {show:true,text:"HIDE",color:"dark-red"}
				}
			},
			save () {
				const app = this;
				app.isSave = false;
				HTTP.post(app.url, app.record, {withCredentials: true})
				.then((response) => {
					app.notifications.push(response.data);
					setTimeout(checkRedirect(response.data),1500)

                    app.isSave = true;
                    if(response.data.Body !== null && response.data.Code == 200){
                        app.record.ID = parseInt(response.data.Body)
                        app.$refs.otherlines.saveLines(parseInt(response.data.Body));
                    }
				}).catch((e) => {
					console.log(e)
				})
			},
		}
	}
</script>
