<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
          Item / Edit
        </div>
        <router-link :to="{name:'items-view',params:{id:record.ID}}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>

      <notify class="mv2" :notifications="notifications"></notify>

      <div v-if="isFound" class=""> 
        <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">
          
                <div class="mt3 pa2 dib">
					<label class="db fw4 lh-copy f7 black">Select Status </label>
					<select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
						<option></option>
						<option>active</option>
						<option>inactive</option>
					</select>
				</div>

                <div class="mt3 pa1 dib">
					<label class="db fw4 lh-copy f7 black">Select Type </label>
					<select class="pa1 ba b--silver br2 bg-white  " v-model="record.Code">
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
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
					</div>

                    <div class="fl mv2 w-20 pa1">
						<label class="db fw4 lh-copy f6 black">Color:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Color">
					</div>

                    <div class="fl mv2 w-20 pa1">
						<label class="db fw4 lh-copy f6 black">Unit of Measurement:</label>
						<input class="pa2 ba b--silver br2 br--left bg-white w-50 w-60-l pa1 fl mh0 " type="number" v-model.number="record.Unit">
						<input class="pa2 ba b--silver  br2 br--right bg-white w-50 w-40-l pa1 fl mh0 " type="text" placeholder="UOM" v-model="record.Uom">
					</div>

					<div class="fl mv2 w-20 pa1">
						<label class="db fw4 lh-copy f6 black">Brand:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Brand">
					</div>

                    <div class="fl w-100 tc pv1">
                        <label class="center fw4 lh-copy f7 pointer" :class="otherfields.color" @click="toggleOtherfields">--click to <span class="fw6 ttu">{{otherfields.text}}</span> other fields--</label>
                    </div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Model:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Model">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Barcode:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Barcode">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Partcode:</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Partcode">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Size:</label>
						<input class="pa2 ba b--silver br2 br--left bg-white w-50 w-60-l pa1 fl mh0 " type="number" v-model.number="record.Size">
						<input class="pa2 ba b--silver  br2 br--right bg-white w-50 w-40-l pa1 fl mh0 " type="text" placeholder="UOM" v-model="record.Sizeuom">
					</div>

					<div class="fl mv2 w-20 pa1" :class="otherfields.show">
						<label class="db fw4 lh-copy f6 black">Pack:</label>
						<input class="pa2 ba b--silver br2 br--left bg-white w-50 w-60-l pa1 fl mh0 " type="number" v-model.number="record.Pack">
						<input class="pa2 ba b--silver  br2 br--right bg-white w-50 w-40-l pa1 fl mh0 " type="text" placeholder="UOM" v-model="record.Packuom">
					</div>
				</div>

				<div class="w-100" :class="otherfields.show">
					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black"> Category</label>
						<label class=" fw4 lh-copy f7 red fr" @click="categoryList=[],record.Category='',record.CategoryID=0">- clear</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchCategory" type="text" v-model="record.Category">
						<div class="relative w-100">
							<small>
								<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
									<li class="pa2 black bt b--near-white" @click="record.CategoryID = category.ID, record.Category=category.Title, categoryList = []" v-for="(category, index) in categoryList" :key="index">
										<span class="f7">#{{index+1}}</span> {{category.Title}}
									</li>
								</ul>
							</small>
						</div>
					</div>

					<div class="fl pa2 mt3 mt0-ns w-100 w-50-ns">
						<label class=" fw4 lh-copy f6 black"> Profile</label>
						<label class=" fw4 lh-copy f7 red fr" @click="profileList=[],record.Profile='',record.ProfileID=0">- clear</label>
						<input class="pa2 ba b--silver br2 bg-white w-100 " @keyup="searchProfile" type="text" v-model="record.Profile">
						<div class="relative w-100">
							<small>
								<ul class="bg-white absolute w-100 pa0 br2 br--bottom mt0 list overflow-scroll" style="max-height:6em">
									<li class="pa2 black bt b--near-white" @click="record.ProfileID = profile.ID, record.Profile=profile.Title, profileList = []" v-for="(profile, index) in profileList" :key="index">
										<span class="f7">#{{index+1}}</span> {{profile.Title}} <small class="i">({{profile.Proposal}})</small>
									</li>
								</ul>
							</small>
						</div>
					</div>
				</div>
		
				<div class="fl pa2 mt3 mt0-ns w-100">
					<label class="db fw4 lh-copy f6 black"> Description</label>
					<textarea class="pa2 ba b--silver br2 bg-white w-100" v-model="record.Description"></textarea>
				</div>
          
          <div class="fl w-100 pa1">
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
  import userIcon from "@/assets/user.png"

  export default {
    data() {return{
		url: "/api/items",
		record: {},
		notifications:[],
		categoryList:[],
		profileList:[],
		isFound:false,
		isSave:true,
        userIcon,
        otherfields:{show:"dn",text:"SHOW",color:"dark-green"},
    }},
    components: { notify },
    created () {
      this.getRecord(this.$route.params.id)
    },
    methods: {
		uploadImageDisplay(field) {
			displayImage(event, this, field)
		},
		uploadImage(imageRef) {
			this.$refs[imageRef].click()
		},
		searchCategory() {
			const app = this;
			const url = "/api/categorys/search";
			const search = {text: app.record.Item, field: "Title", limit: 20, skip: 0};
			HTTP.post(url, search,{withCredentials: true}).then((response) => {
				app["categoryList"] = response.data.Body
			}).catch((e) => { console.log(e) })
		},
		searchProfile() {
			const app = this;
			const url = "/api/profiles/search";
			const search = {text: app.record.Profile, field: "Title", limit: 20, skip: 0};
			HTTP.post(url, search,{withCredentials: true}).then((response) => {
				app["profileList"] = response.data.Body
			}).catch((e) => { console.log(e) })
		},
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
			app.isSave = false;
			HTTP.post(app.url, app.record, {withCredentials: true})
			.then((response) => {
			this.notifications.push(response.data)
			setTimeout(checkRedirect(response.data),1500)

			if(response.data.Body !== null){
				setTimeout(function(){
				app.$router.push({name:"items-view",params:{id:response.data.Body}})
				},1000)
			} else {
				app.isSave = true;
			}
			}).catch((e) => {
			console.log(e)
			})
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
