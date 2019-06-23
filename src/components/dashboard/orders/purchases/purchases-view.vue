<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Purchases / View
        </div>
        <router-link :to="{name:'purchases-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="bg-light-gray br4 cf pa2">
      
		 	<div class="mt3 pa2 dib">
				<label class="db fw4 lh-copy f7 black">Select Status </label>
				<input class="pa1 ba b--silver br2 bg-white w3 " type="text" disabled="disabled" v-model="record.Workflow">
			</div>
			

			<div class="mt3 pa2 dib">
				<label class="db fw4 lh-copy f7 black">Currency </label>
				<input class="pa1 ba b--silver br2 bg-white w3 " type="text" disabled="disabled" v-model="record.Currency">
			</div>


			<div class="w-100">
				<div class="fl pa2 mt3 mt0-ns w-100">
					<label class="db fw4 lh-copy f6 black"> Delivery Address</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Title">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Doc No</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Docno">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Doc Date</label>
					<input class="pa1-l pa2 ba b--silver br2 bg-white w-100 " type="date" disabled="disabled" v-model="record.Docdate">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class=" fw4 lh-copy f6 black"> Supplier</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Partner">
				</div>
			</div>

			<div class="fl w-100 tc pv1">
				<label class="center fw4 lh-copy f7 pointer" :class="otherfields.color" @click="toggleOtherfields">--click to <span class="fw6 ttu">{{otherfields.text}}</span> other fields--</label>
			</div>

			<div class="w-100" :class="otherfields.show">
				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Valid From</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" disabled="disabled" v-model="record.Validfrom">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Valid Till</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" disabled="disabled" v-model="record.Validtill">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Shipping Date</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" disabled="disabled" v-model="record.Shippingdate">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Delivery Date</label>
					<input class="pa1 ba b--silver br2 bg-white w-100 " type="date" disabled="disabled" v-model="record.Deliverydate">
				</div>
			</div>

			<purchaselines :refid="$route.params.id" />
			
			<div class="w-100" :class="otherfields.show">
				<div class="fl pa2 mt3 mt0-ns w-100">
					<label class="db fw4 lh-copy f6 black"> Notes</label>
					<textarea class="pa2 ba b--silver br2 bg-white w-100 " disabled="disabled" v-model="record.Description"></textarea>
				</div>
			</div>


			<div class="w-100">
				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Discount Amout</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Discountamount">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Total Excl Tax</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Totalexcltax">
				</div>
				
				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Tax Amount</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Taxamount">
				</div>

				<div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-25-l">
					<label class="db fw4 lh-copy f6 black"> Total Incl Tax</label>
					<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Totalincltax">
				</div>
			</div>

			<div class="w-100 mt3">
				<router-link :to="{name:'purchases-edit',params:{id:record.ID}}" class="fr ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline" >
				Edit
				</router-link>
			</div>

      </div>
      <div v-else>
        <h1 class="black f6 tc ma5">Please Wait, Searching...</h1>
      </div>

    </section>
</template>

<script type="text/javascript">
import {HTTP} from "@/common"
import {checkRedirect} from "@/common"
import notify from "@/components/notify"
import purchaselines from "@/components/dashboard/orders/purchases/purchases-view-lines"


export default {
    data() {return{
      url: "/api/purchases",
      record: {},
      notifications:[],
	  isFound:false,
	  otherfields:{show:"dn",text:"SHOW",color:"dark-green"},
    }},
    components: { notify, purchaselines },
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
