<template>
    <section>
        <div class="w-100 pa2 bg-green fixed z-999 cf inline-flex-ns items-center-ns relative">
            <div class="fl w-100 pa1 tc tl-ns pb fw5 tracked ttu f7 white ">
                Records / Profile Manager / View
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

            <div v-if="isFound" class="bg-washed-yellow br4 cf">
            
                <div class="f6 w-100 bg-near-white gray bb bt  b--white-40 br4 br--top cf inline-flex items-center relative">
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
                        <label class="dn dib-ns">Work Orders</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.invoicesClass" @click="toggleTab('invoices')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Invoices</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.settingsClass" @click="toggleTab('settings')">
                        <span class="oi" data-glyph="cog"></span>
                        <label class="dn dib-ns">Settings</label>
                    </span>
                </div>
            
                <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">

                    <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">
                    
                        <div class="ph2" v-if="tabProps.personalShow">
                        <p class="w-100 cf  gray tracked"> PERSONAL Information</p>
                        
                        <div class="fl w-30-l pa1">
                            <img :src="record.Image" @error="record.Image = profileIcon" class="w5 br-100 bg-near-white pa1" />
                        </div>

                        <div class="fl w-70-l">

                            <div class="fl mv2 w-100 pa1">
                            <label class="db fw4 lh-copy f6 black"> Portfolio:</label>
                            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Occupation}}</div>
                            </div>
            
                            <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black"> Title:</label>
                            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Title}}</div>
                            </div>

                            <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Surname:</label>
                            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Lastname}}</div>
                            </div>
                        
                            <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">First Name:</label>
                            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Firstname}}</div>
                            </div>

                            <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Middle Name:</label>
                            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.Othername}}</div>
                            </div>

                            <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Date of Birth:</label>
                            <div class="pl1 pv1 ba b--silver br2 bg-white w-100 f7 ">{{record.Dob}}</div>
                            </div>

                            <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Gender:</label>
                            <div class="pl1 pv1 ba b--silver br2 bg-white w-100 f7 ">{{record.Gender}}</div>
                            </div>

                            <div class="fl mv2 w-100 w-25-l pa1">
                            <label class="db fw4 lh-copy f6 black">Marital Status:</label>
                            <div class="pa2 ba b--silver br2 bg-white w-100 ">{{record.MaritalStatus}}</div>
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
                        <div class="fr ph3 pv2 br2 bg-green pointer f6 white tc no-underline"  @click="save" >
                            Save
                        </div>
                        </div>
                    </div>

                    <div class="w-100 mt3">
                        <router-link :to="{name:'profiles-edit',params:{id:record.ID}}" class="fr ph3 pv2 br1 bg-near-black near-white grow-ns pointer f6 tc no-underline" >
                        <i class="fal fa-edit"></i> Edit
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else>
                <h1 class="black f6 tc ma2">Please Wait, Searching...</h1>
            </div>
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
      url: "/api/profiles",
      record: {},
      notifications:[],
      isFound:false,
      userIcon,
      tabProps:{},
    }},
    components: { notify },
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
          if(response.data.Body.ID !== undefined && response.data.Body.ID == id){
            app.isFound = true
          }
        }).catch((e) => { console.log(e) })
      },
      toggleTab(tabname) {
        switch(tabname) {
          default:
            this.tabProps = {personalClass:"bg-gray white",personalShow:true}
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
