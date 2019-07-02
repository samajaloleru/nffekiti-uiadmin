<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Items / View
        </div>
        <router-link :to="{name:'items-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
          Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class="bg-light-gray br4 cf">
     
        <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">
			
			    <div class="mt3 pa2 dib">
					<label class="db fw4 lh-copy f7 black">Select Status </label>
					<select class="pa1 ba b--silver br2 bg-white" disabled="disabled" v-model="record.Workflow">
						<option></option>
						<option>active</option>
						<option>inactive</option>
					</select>
				</div>
			    
                <div class="mt3 pa2 dib">
					<label class="db fw4 lh-copy f7 black">Select Type </label>
					<select class="pa1 ba b--silver br2 bg-white" disabled="disabled" v-model="record.Code">
						<option></option>
						<option>stock</option>
						<option>asset</option>
						<option>other</option>
						<option>material</option>
					</select>
				</div>

				<div class="w-100">
					<div class="fl mv2 w-40 pa1">
						<label class="db fw4 lh-copy f6 black">Item Name:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Title">
					</div>
					
                    <div class="fl mv2 w-20 pa1">
						<label class="db fw4 lh-copy f6 black">Color:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Color">
					</div>

                    <div class="fl mv2 w-20 pa1">
						<label class="db fw4 lh-copy f6 black">Unit of Measurement:</label>
						<input class="pa2 ba b--silver br2 br--left bg-white w-50 w-60-l pa1 fl mh0 " type="number" disabled="disabled" v-model.number="record.Unit">
						<input class="pa2 ba b--silver  br2 br--right bg-white w-50 w-40-l pa1 fl mh0 " type="text" placeholder="UOM" disabled="disabled" v-model="record.Uom">
					</div>

					<div class="fl mv2 w-20 pa1">
						<label class="db fw4 lh-copy f6 black">Brand:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Brand">
					</div>

                    <div class="fl w-100 tc pv1">
                        <label class="center fw4 lh-copy f7 pointer" :class="otherfields.color" @click="toggleOtherfields">--click to <span class="fw6 ttu">{{otherfields.text}}</span> other fields--</label>
                    </div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Model:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Model">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Barcode:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Barcode">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Partcode:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" disabled="disabled" v-model="record.Partcode">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Size:</label>
						<input class="pa2 ba b--silver br2 br--left bg-white w-50 w-60-l pa1 fl mh0 " type="number" disabled="disabled" v-model.number="record.Size">
						<input class="pa2 ba b--silver  br2 br--right bg-white w-50 w-40-l pa1 fl mh0 " type="text" placeholder="UOM" disabled="disabled" v-model="record.Sizeuom">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Pack:</label>
						<input class="pa2 ba b--silver br2 br--left bg-white w-50 w-60-l pa1 fl mh0 " type="number" disabled="disabled" v-model.number="record.Pack">
						<input class="pa2 ba b--silver  br2 br--right bg-white w-50 w-40-l pa1 fl mh0 " type="text" placeholder="UOM" disabled="disabled" v-model="record.Packuom">
					</div>
				</div>

				<div class="w-100" :class="otherfields.show">
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black"> Category</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Category" disabled="disabled">
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black"> Profile</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Profile" disabled="disabled">
					</div>
				</div>
		
				<div class="fl pa2 mt3 mt0-ns w-100">
					<label class="db fw4 lh-copy f6 black"> Description</label>
					<textarea class="pa2 ba b--silver br2 bg-white w-100" v-model="record.Description" disabled="disabled"></textarea>
				</div>

			<div class="w-100 mt3">
				<router-link :to="{name:'items-edit',params:{id:record.ID}}" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline" >
				<i class="fas fa-edit"></i> Edit
				</router-link>
			</div>
        </div>
      </div>

      <div v-else>
        <h1 class="black f6 tc ma2">Please Wait, Searching...</h1>
      </div>

    </section>
</template>

<script type="text/javascript">
  import {HTTP} from "@/common"
  import {checkRedirect} from "@/common"
  import notify from "@/components/notify"
  import userIcon from "@/assets/user.png"

  export default {
    data() {return{
		url: "/api/items",
		record: {},
		notifications:[],
		categoryList:[],
		profileList:[],
        isFound:false,
        otherfields:{show:"dn",text:"SHOW",color:"dark-green"},
    }},
    components: { notify },
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
