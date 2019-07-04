<template>
    <section>
        <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
            <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
                Records / Profile Manager / New
            </div>

            <div class="white pa2 br1 tc tr-ns f7 fl w-100 db dib-ns absolute-ns left-0-ns w-80-l">
                <router-link :to="{'name':'profiles-search'}" class="ph2 br1 bg-near-white pointer f6 near-black tc no-underline">
                    <i class="fal fa-chevron-left"></i> Back
                </router-link>
            </div>
        </div>


        <div class="w-100 fl h2-ns h3"></div>
        <div class="pa2 fl w-100">
            <notify class="mv2" :notifications="notifications"></notify>

            <div class="ph2 mt3 mw8 center">
                <div class="f6 w-100 bg-near-white near-black bb bt  b--white-40 br4 br--top cf inline-flex items-center relative">
                    <span class="w-20 tc pointer dim pa3 br4 br--left br--top " :class="tabProps.personalClass" @click="toggleTab('personal')">
                        <span class="oi" data-glyph="person"></span>
                        <label class="dn dib-ns">Profile Info</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.documentsClass" @click="toggleTab('documents')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Documents</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.ordersClass" @click="toggleTab('orders')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Documents</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.invoicesClass" @click="toggleTab('invoices')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Documents</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.settingsClass" @click="toggleTab('settings')">
                        <span class="oi" data-glyph="cog"></span>
                        <label class="dn dib-ns">Documents</label>
                    </span>
                </div>
                
                <div class="bg-washed-yellow ph2 pb2 br4 br--bottom cf black">
                    
                    <div class="" v-if="tabProps.personalShow">
                        <p class="w-100 cf  gray tracked"> Profile Information</p>
                        
                        <div class="fl w-30-l pa1">
                            <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="profileImage"/>
                            <img :src="record.Image" @error="record.Image = profileIcon" class="w5 br-100 bg-near-white pa1" @click="uploadImage('profileImage')" />
                        </div>

                        <div class="fl w-70-l">
                            
                            <div class="mt3 w-100 ph1">
                                <label class="db fw4 lh-copy f7 black">Select Status </label>
                                <select class="pa1 ba b--silver br2 bg-white  " v-model="record.Workflow">
                                <option></option>
                                <option>enabled</option>
                                <option>disabled</option>
                                </select>
                            </div>

                            <div class="fl w-100 ph1">
                                <div class="fl mt3 tl w-50 w-third-m w-20-l">
                                    <label class="fw4 lh-copy f6 black">Is A Player: </label>
                                    <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="record.IsPlayer">
                                </div>
    
                                <div class="fl mt3 tl w-50 w-third-m w-20-l">
                                    <label class="fw4 lh-copy f6 black">Is A Club Official: </label>
                                    <input class="pa2 ba b--silver br2 bg-white " type="checkbox" v-model="record.IsClubOfficial">
                                </div>
                            </div>
                            


                            <div class="fl mv2 w-30 w-20-m w-25-l pa1">
                                <label class="db fw4 lh-copy f6 black"> Title:</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
                            </div>

                            <div class="fl w-100 db-m dn"></div>

                            <div class="fl mv2 w-70 w-third-m w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Surname:</label>
                            <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Lastname">
                            </div>
                        
                            <div class="fl mv2 w-50 w-third-m w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">First Name:</label>
                            <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Firstname">
                            </div>

                            <div class="fl mv2 w-50 w-third-m w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Middle Name:</label>
                            <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Othername">
                            </div>

                            <div class="fl mv2 w-50 w-25-m w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Date of Birth:</label>
                            <input class="pl1 pv1 ba b--silver br2 bg-white w-100 f7 " type="date" v-model="record.Dob">
                            </div>

                            <div class="fl mv2 w-50 w-25-m w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Gender:</label>
                            <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Gender">
                                <option value="">-select-</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            </div>

                            <div class="fl mv2 w-50 w-25-m w-25-l pa1">
                                <label class="db fw4 lh-copy f6 black">Marital Status:</label>
                                <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.MaritalStatus">
                                    <option value="">-select-</option>
                                    <option value="Married">Married</option>
                                    <option value="Single">Single</option>
                                </select>
                            </div>

                            <div class="fl mv2 w-50 w-25-m w-25-l pa1">
                                <label class="db fw4 lh-copy f6 black">Rank</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Rank">
                            </div>

                            <div class="dn fl w-100 bt b--near-white"></div>
                            <div class="fl mv2 w-100 w-30-m w-25-l pa1">
                                <label class="db fw4 lh-copy f6 black">Mobile</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Mobile">
                            </div>

                            <div class="fl mv2 w-100 w-70-m w-75-l pa1">
                                <label class="db fw4 lh-copy f6 black">Email Address</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.Email">
                            </div>

                            <div class="fl mv2 w-100 w-40-ns pa1">
                                <label class="db fw4 lh-copy f6 black">Street</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.Street">
                            </div>

                            <div class="fl mv2 w-third w-20-ns pa1">
                                <label class="db fw4 lh-copy f6 black">City</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.City">
                            </div>

                            <div class="fl mv2 w-third w-20-ns pa1">
                                <label class="db fw4 lh-copy f6 black">State</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.State">
                            </div>
                            
                            <div class="fl mv2 w-third w-20-ns pa1">
                                <label class="db fw4 lh-copy f6 black">Country</label>
                                <input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.Country">
                            </div>
                            </div>
                        

                    </div>

                    <div class="pa2" v-if="tabProps.documentsShow">
                        <p class="w-100 cf  gray tracked"> Documents</p>
                    </div>

                    <div class="pa2" v-if="tabProps.settingsShow">
                        <p class="w-100 cf  gray tracked"> Settings</p>
                    </div>

                    <div class="pa2" v-if="tabProps.ordersShow">
                        <p class="w-100 cf  gray tracked"> Work Orders</p>
                    </div>

                    <div class="pa2" v-if="tabProps.invoicesShow">
                        <p class="w-100 cf  gray tracked"> Invoices</p>
                    </div>

                    
                    <div class="fl w-100 pa1">
                    <div v-if="isSave" class="fr ph3 pv2 br2 bg-green pointer f6 white tc no-underline"  @click="save" >
                    <i class="fal fa-save"></i> Submit
                    </div>
                    </div>
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

  import profileIcon from "@/assets/user.png"

  export default {
    created(){this.toggleTab("")},
    data() {return{
      url: "/api/profiles",
      record: {Image:""},
      notifications:[],
      isSave:true,
      profileIcon,
      tabProps:{},
    }},
    components: { notify },
    methods: {
      uploadImageDisplay(field) {
        displayImage(event, this, field)
      },
      uploadImage(imageRef) {
        this.$refs[imageRef].click()
      },
      save () {
        const app = this;
        app.isSave = false;
        HTTP.post(app.url, app.record, {withCredentials: true})
        .then((response) => {
          this.notifications.push(response.data)
          setTimeout(checkRedirect(response.data),1500)

          app.isSave = true;
          if(response.data.Body !== null && response.data.Body !== undefined ){
            app.record = {Image:""}
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      toggleTab(tabname) {
        switch(tabname) {
          default:
            this.tabProps = {personalClass:"bg-washed-yellow near-black",personalShow:true}
            break;
          case "documents":
            this.tabProps = {documentsClass:"bg-washed-yellow near-black",documentsShow:true}
            break;
          case "settings":
            this.tabProps = {settingsClass:"bg-washed-yellow near-black",settingsShow:true}
            break;
          case "orders":
            this.tabProps = {ordersClass:"bg-washed-yellow near-black",ordersShow:true}
            break;
          case "invoices":
            this.tabProps = {invoicesClass:"bg-washed-yellow near-black",invoicesShow:true}
            break;
        }
      }
    }
  }
</script>
