<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Bill of Material / Edit
        </div>
        <router-link :to="{name:'billofmaterials-view',params:{id:record.ID}}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>

      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="bg-light-gray br4 cf pa2">
        
        	<div class="mt3 pa2 dib">
				<label class="db fw4 lh-copy f7 black">Select Status </label>
				<select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
					<option></option>
					<option>enabled</option>
					<option>disabled</option>
				</select>
			</div>
			

			<div class="mt3 pa2 dib">
				<label class="db fw4 lh-copy f7 black">Currency </label>
				<input class="pa1 ba b--silver br2 bg-white w3 " type="text" v-model="record.Currency">
			</div>


			<div class="w-100">
				<div class="fl pa2 mt3 mt0-ns w-100">
					<label class="db fw4 lh-copy f6 black"> Title</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Doc No</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" placeholder="Auto-Generated"  readonly="readonly" v-model="record.Docno">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Doc Date</label>
					<input class="pa1-l pa2 ba b--silver br2 bg-white w-100 " type="date" v-model="record.Docdate">
				</div>
				
				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class=" fw4 lh-copy f6 black"> Owner</label>
					<label class=" fw4 lh-copy f7 red fr" @click="ownerList=[],record.Owner='',record.OwnerID=0">- clear</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchOwner" type="text" v-model="record.Owner">
					<div class="relative w-100">
						<small>
						<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
							<li class="pa2 black bt b--near-white" @click="record.OwnerID = owner.ID, record.Owner=owner.Fullname, ownerList = []" v-for="(owner, index) in ownerList" :key="index">
							<span class="f7">#{{index+1}}</span> {{owner.Fullname}}
							</li>
						</ul>
						</small>
					</div>
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class=" fw4 lh-copy f6 black"> Partner</label>
					<label class=" fw4 lh-copy f7 red fr" @click="partnerList=[],record.Partner='',record.PartnerID=0">- clear</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchPartner" type="text" v-model="record.Partner">
					<div class="relative w-100">
						<small>
						<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
							<li class="pa2 black bt b--near-white" @click="record.PartnerID = partner.ID, record.Partner=partner.Fullname, partnerList = []" v-for="(partner, index) in partnerList" :key="index">
							<span class="f7">#{{index+1}}</span> {{partner.Fullname}}
							</li>
						</ul>
						</small>
					</div>
				</div>
			</div>

			<div class="w-100 tc pv1">
				<label class="center fw4 lh-copy f7 pointer" :class="otherfields.color" @click="toggleOtherfields">--click to <span class="fw6 ttu">{{otherfields.text}}</span> other fields--</label>
			</div>

			<div class="w-100" :class="otherfields.show">
				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Valid From</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" v-model="record.Validfrom">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Valid Till</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" v-model="record.Validtill">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Shipping Date</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" v-model="record.Shippingdate">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Delivery Date</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" v-model="record.Deliverydate">
				</div>
			</div>

			<billofmateriallines :refid="$route.params.id" ref="billofmateriallines" />
			
			<div class="w-100" :class="otherfields.show">
				<div class="fl pa2 mt3 mt0-ns w-100">
					<label class="db fw4 lh-copy f6 black"> Notes</label>
					<textarea class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Description"></textarea>
				</div>
			</div>


			<div class="w-100">
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

				<div class="fl w-100 pa2">
					<div class="fr ph3 pv2 br4 bg-green pointer f6 white tc no-underline"  @click="save" >
						Save
					</div>
				</div>
			</div>

      </div>

      <div v-else>
        <p class="black f6 tc ma5">Please Wait, Searching...</p>
      </div>

    </section>
</template>

<script type="text/javascript">
import {HTTP} from "@/common"
import {displayImage} from "@/common"
import {checkRedirect} from "@/common"
import notify from "@/components/notify"
import billofmateriallines from "@/components/dashboard/productions/billofmaterials/billofmaterials-edit-lines"

export default {
    data() {return{
		url: "/api/billofmaterials",
		record: {},
		notifications:[],
		isFound:false,
		isSave:true,
		otherfields:{show:"dn",text:"SHOW",color:"dark-green"},
		partnerList:[],
		ownerList:[],
    }},
    components: { notify, billofmateriallines },
    created () {
		this.getRecord(this.$route.params.id)
    },
    methods: {
		getRecord (id) {
			const app = this;
			HTTP.get(this.url+'?id='+id, {withCredentials: true}).then((response) => {
			this.record = response.data.Body
			this.notifications.push(response.data)
			setTimeout(checkRedirect(response.data),1500)

			if(response.data.Body.ID == id){
				app.isFound = true
			}
			}).catch((e) => { console.log(e) })
		},
		save () {
			const app = this;
			HTTP.post(app.url, app.record, {withCredentials: true}).then((response) => {
			this.notifications.push(response.data)
				setTimeout(checkRedirect(response.data),1500)
				if(response.data.Body !== null){
					app.$refs.billofmateriallines.saveLines();
				} 
			}).catch((e) => { console.log(e) })
		},
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
		toggleOtherfields(){
			const app = this;
			if (app.otherfields.show == "") {
				app.otherfields = {show:"dn",text:"SHOW",color:"dark-green"}
			} else {
				app.otherfields = {show:"",text:"HIDE",color:"dark-red"}
			}
		},
    }
}
</script>
