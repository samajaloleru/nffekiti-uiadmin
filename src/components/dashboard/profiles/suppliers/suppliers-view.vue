<template>
	<section class="pa2 pa3-l">
	  <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
		<div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
		  Suppliers / View
		</div>
		<router-link :to="{name:'suppliers-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
		  Go Back
		</router-link>
	  </div>


	  <notify class="mv2" :notifications="notifications"></notify>

	  <div v-if="isFound" class="bg-light-gray br4 cf">
	  
		<div class="f6 w-100 bg-light-gray gray bb bt  b--white-40 br4 br--top cf inline-flex items-center relative">
		  <span class="w-20 tc pointer dim pa3 br4 br--left br--top " :class="tabProps.supplierClass" @click="toggleTab('supplier')">
			<span class="oi" data-glyph="supplier"></span>
			<label class="dn dib-ns">Supplier Info</label>
		  </span>
		  <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.documentsClass" @click="toggleTab('documents')">
			<span class="oi" data-glyph="document"></span>
			<label class="dn dib-ns">Documents</label>
		  </span>
		  <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.ordersClass" @click="toggleTab('orders')">
			<span class="oi" data-glyph="document"></span>
			<label class="dn dib-ns">Work Orders</label>
		  </span>
		  <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.invoicesClass" @click="toggleTab('invoices')">
			<span class="oi" data-glyph="document"></span>
			<label class="dn dib-ns">Invoices</label>
		  </span>
		  <span class="w-20 tc pointer dim pa3 br4 br--right br--top  " :class="tabProps.settingsClass" @click="toggleTab('settings')">
			<span class="oi" data-glyph="cog"></span>
			<label class="dn dib-ns">Settings</label>
		  </span>
		</div>
	  
		<div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">

		  <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">
		  
				<div class="ph2" v-if="tabProps.supplierShow">
				    <p class="w-100 cf  gray tracked"> SUPPLIER Information</p>
				
					<div class="fl w-30-l pa1">
					<img :src="record.Image" @error="record.Image = supplierIcon" class="w5 br-100 bg-near-white pa1" />
					</div>

					<div class="fl w-70-l">

                        <div class="fl mv2 w-100 pa1">
                            <label class="db fw4 lh-copy f6 black"> Supplier Name:</label>
                            <input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Fullname"/>
                        </div>
            
                        <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black"> Title:</label>
                            <input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title"/>
                        </div>

                        <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Surname:</label>
                            <input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Lastname"/>
                        </div>
                    
                        <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">First Name:</label>
                            <input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Firstname"/>
                        </div>

                        <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Middle Name:</label>
                            <input disabled="disabled" class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Othername"/>
                        </div>


                        <div class="fl w-100 bt b--near-white">
                            <div class="fl mv2 w-100 w-25-l pa1">
                                <label class="db fw4 lh-copy f6 black">Mobile </label>
                                <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Mobile}}&nbsp;</div>
                            </div>

                            <div class="fl mv2 w-100 w-75-l pa1">
                                <label class="db fw4 lh-copy f6 black">Email Address</label>
                                <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Email}}&nbsp;</div>
                            </div>

                            <div class="fl mv2 w-100 w-40-l pa1">
                                <label class="db fw4 lh-copy f6 black">Street</label>
                                <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Street}}&nbsp;</div>
                            </div>

                            <div class="fl mv2 w-100 w-20-l pa1">
                                <label class="db fw4 lh-copy f6 black">City</label>
                                <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.City}}&nbsp;</div>
                            </div>

                            <div class="fl mv2 w-100 w-20-l pa1">
                                <label class="db fw4 lh-copy f6 black">State</label>
                                <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.State}}&nbsp;</div>
                            </div>

                            <div class="fl mv2 w-100 w-20-l pa1">
                                <label class="db fw4 lh-copy f6 black">Country</label>
                                <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Country}}&nbsp;</div>
                            </div>
                        </div>
			        </div>

                    <div class="fl w-100 pa1 mt3">
                       

                        <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('documents')" >
                            Next
                        </div>
                    </div>    
			    </div>

                <div class="ph2"  :class="{'':tabProps.documentsShow,'dn':!tabProps.documentsShow}">
                    <p class="w-100 cf  gray tracked"> Documents</p>

                    <documentlines :refid="$route.params.id" ref="documentlines" />

                    <div class="fl w-100 pa1 mt3">
                        <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('supplier')">
                            Back
                        </div>

                        <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('orders')" >
                            Next
                        </div>
                    </div>
                </div>

                <div class="ph2"  :class="{'':tabProps.ordersShow,'dn':!tabProps.ordersShow}">
                    <p class="w-100 cf  gray tracked"> Work Orders</p>

                    <div class="fl w-100 pa1 mt3">
                        <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('documents')">
                            Back
                        </div>

                        <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('invoices')" >
                            Next
                        </div>
                    </div>
                </div>

                <div class="ph2"  :class="{'':tabProps.invoicesShow,'dn':!tabProps.invoicesShow}">
                    <p class="w-100 cf  gray tracked"> Invoices</p>

                    <div class="fl w-100 pa1 mt3">
                        <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('orders')">
                            Back
                        </div>

                        <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('settings')" >
                            Next
                        </div>
                    </div>
                </div>

                <div class="ph2"  :class="{'':tabProps.settingsShow,'dn':!tabProps.settingsShow}">
                    <p class="w-100 cf  gray tracked"> Settings</p>

                    <div class="fl w-100 pa1 mt3">
                        <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('invoices')">
                            Back
                        </div>
                    </div>
                </div>
                
                <div class="fl w-100 pa1 tc pt3">
                    <router-link :to="{name:'suppliers-edit',params:{id:record.ID}}" class="ph3 pv2 br4 bg-green grow-ns pointer f6 white tc no-underline" >
                        Edit
                    </router-link>
                </div>
            </div>

		  
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
  import supplierIcon from "@/assets/user.png"

  import documentlines from "@/components/dashboard/profiles/suppliers/suppliers-view-document"

  export default {
	data() {return{
	  url: "/api/suppliers",
	  record: {},
	  notifications:[],
	  isFound:false,
	  supplierIcon,
	  tabProps:{},
	}},
	components: { notify, documentlines },
	created () {
	  this.toggleTab("");
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
	  toggleTab(tabname) {
		switch(tabname) {
		  default:
			this.tabProps = {supplierClass:"bg-gray white",supplierShow:true}
			break;
		  case "documents":
			this.tabProps = {documentsClass:"bg-gray white",documentsShow:true}
			break;
		  case "settings":
			this.tabProps = {settingsClass:"bg-gray white",settingsShow:true}
			break;
		  case "orders":
			this.tabProps = {ordersClass:"bg-gray white",ordersShow:true}
			break;
		  case "invoices":
			this.tabProps = {invoicesClass:"bg-gray white",invoicesShow:true}
			break;
		}
	  }
	}
  }
</script>
