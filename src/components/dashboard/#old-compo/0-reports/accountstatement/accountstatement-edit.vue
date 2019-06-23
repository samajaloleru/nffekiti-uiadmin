<template>
    <section class="pa2 pa3-l">
      <div class="w-100 pa2 bg-light-gray br4 cf inline-flex items-center relative">
        <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
         Account Statement / Edit
        </div>
        <router-link :to="{name:'postings-view',params:{id:record.ID}}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">
          Go Back
        </router-link>
      </div>


      <notify class="mv2" :notifications="notifications"></notify>



      <div v-if="isFound" class="">
        <div class="f6 w-100 bg-light-gray gray bb bt  b--white-40 br4 br--top cf inline-flex items-center relative">
            <span class="w-20 tc pointer dim pa3 br4 br--left br--top " :class="tabProps.personClass" @click="toggleTab('person')">
              <span class="oi" data-glyph="person"></span>
              <label class="dn dib-ns">Personal</label>
            </span>
            <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.occupationClass" @click="toggleTab('occupation')">
              <span class="oi" data-glyph="briefcase"></span>
              <label class="dn dib-ns">Occupation</label>
            </span>
            <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.ecclesiaClass" @click="toggleTab('ecclesia')">
              <span class="oi" data-glyph="medical-cross"></span>
              <label class="dn dib-ns">Ecclesia</label>
            </span>
            <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.designationClass" @click="toggleTab('designation')">
              <span class="oi" data-glyph="tag"></span>
              <label class="dn dib-ns">Designation</label>
            </span>
            <span class="w-20 tc pointer dim pa3 bl b--white-40 br4 br--right br--top " :class="tabProps.groupunit" @click="toggleTab('groupunit')">
              <span class="oi" data-glyph="people"></span>
              <label class="dn dib-ns">Group/Unit</label>
            </span>
        </div>
        
        <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">
          
          <div class="ph2" v-if="tabProps.personShow">
              <p class="w-100 cf  gray tracked"> PERSONAL Information</p>
              
                <div class="fl w-30-l pa1">
                  <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="postingImage"/>
                  <img :src="record.Image" @error="record.Image = postingIcon" class="w5 br-100 bg-near-white pa1" @click="uploadImage('postingImage')" />
                </div>

                <div class="fl w-70-l">

                  <div class="fl w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black"> Tag No:</label>
                    <input class="pa2 ba b--silver br2 bg-white w3 " type="text" v-model="record.Code">
                  </div>

                  

                  <div class="fl w-100"></div>
                  
                  <div class="fl mv2 w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black"> Title:</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Title">
                  </div>

                  <div class="fl mv2 w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black">Surname:</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Lastname">
                  </div>
              
                  <div class="fl mv2 w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black">First Name:</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Firstname">
                  </div>

                  <div class="fl mv2 w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black">Middle Name:</label>
                    <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Othername">
                  </div>

                  <div class="fl mv2 w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black">Date of Birth:</label>
                    <input class="pl1 pv1 ba b--silver br2 bg-white w-100 f7 " type="date" v-model="record.Dob">
                  </div>

                  <div class="fl mv2 w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black">Gender:</label>
                    <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Gender">
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div class="fl mv2 w-100 w-25-l pa1">
                    <label class="db fw4 lh-copy f6 black">Marital Status:</label>
                    <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.MaritalStatus">
                      <option value="">Select Marital Status</option>
                      <option value="Married">Married</option>
                      <option value="Single">Single</option>
                    </select>
                  </div>

                  <div class="fl w-100 bt b--near-white"></div>
                    <div class="fl mv2 w-100 w-25-l pa1">
                      <label class="db fw4 lh-copy f6 black">Phone 1 </label>
                      <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Phone">
                    </div>

                    <div class="fl mv2 w-100 w-25-l pa1">
                      <label class="db fw4 lh-copy f6 black">Phone 2 </label>
                      <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Phone2">
                    </div>
                  
                    <div class="fl mv2 w-100 w-50-l pa1">
                      <label class="db fw4 lh-copy f6 black">Email Address</label>
                      <input class="pa2 ba b--silver br2 bg-white w-100 " type="email" v-model="record.Email">
                    </div>


                    <div class="fl mv2 w-100 pa1">
                      <label class="db fw4 lh-copy f6 black">Home Address</label>
                      <textarea class="pa2 ba b--silver br2 bg-white w-100 h3" v-model="record.Address"></textarea>
                    </div>
                </div>
              

          </div>

          <div class="pa2" v-if="tabProps.occupationShow">
              <p class="w-100 cf  gray tracked"> Occupation</p>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black">Employment Status </label>
                <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.EmploymentStatus">
                  <option value="">Select Employment</option>
                  <option value="Employed">Employed</option>
                  <option value="Not Employed">Not Employed</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                </select>
              </div>

              <div class="fl mv2 w-100 w-75-l pa1">
                <label class="db fw4 lh-copy f6 black">Profession</label>
                <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Profession">
                  <option value="">Select Profession</option>
                  <optgroup label="Healthcare Practitioners and Technical Occupations">
                    <option value="Chiropractor">Chiropractor</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Dietitian or Nutritionist">Dietitian or Nutritionist</option>
                    <option value="Optometrist">Optometrist</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Physician">Physician</option>
                    <option value="Physician Assistant">Physician Assistant</option>
                    <option value="Podiatrist">Podiatrist</option>
                    <option value="Registered Nurse">Registered Nurse</option>
                    <option value="Therapist">Therapist</option>
                    <option value="Veterinarian">Veterinarian</option>
                    <option value="Veterinarian">Veterinarian</option>
                    <option value="Health Technologist or Technician">Health Technologist or Technician</option>
                    <option value="Other Healthcare Practitioners and Technical Occupation">Other Healthcare Practitioners and Technical Occupation</option>
                  </optgroup>
                  <optgroup label="Healthcare Support Occupations">
                    <option value="Nursing/Psychiatric/or Home Health Aide">Nursing/Psychiatric/or Home Health Aide</option>
                    <option value="Occupational and Physical Therapist Assistant/Aide">Occupational and Physical Therapist Assistant/Aide</option>
                    <option value="Other Healthcare Support Occupation">Other Healthcare Support Occupation</option>
                  </optgroup>
                  <optgroup label="Business, Executive, Management, and Financial Occupations">
                    <option value="Chief Executive">Chief Executive</option>
                    <option value="General and Operations Manager">General and Operations Manager</option>
                    <option value="Advertising/Marketing/Promotions/Public Relations/and Sales Manager">Advertising/Marketing/Promotions/Public Relations/and Sales Manager</option>
                    <option value="Operations Specialties Manager (e.g., IT or HR Manager)">Operations Specialties Manager (e.g., IT or HR Manager)</option>
                    <option value="Construction Manager">Construction Manager</option>
                    <option value="Engineering Manager">Engineering Manager</option>
                    <option value="Accountant/Auditor">Accountant/Auditor</option>
                    <option value="Business Operations/Financial Specialist">Business Operations/Financial Specialist</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Other Business/Executive/Management/Financial Occupation">Other Business/Executive/Management/Financial Occupation</option>
                  </optgroup>
                  <optgroup label="Architecture and Engineering Occupations:">
                    <option value="Architect/Surveyor/Cartographer">Architect/Surveyor/Cartographer</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Other Architecture and Engineering Occupation">Other Architecture and Engineering Occupation</option>
                  </optgroup>
                  <optgroup label="Education, Training, and Library Occupations:">
                    <option value="Postsecondary Teacher (e.g., College Professor)">Postsecondary Teacher (e.g., College Professor)</option>
                    <option value="Primary/Secondary/Special Education School Teacher">Primary/Secondary/Special Education School Teacher</option>
                    <option value="Other Teacher/Instructor">Other Teacher/Instructor</option>
                    <option value="Other Education, Training, and Library Occupation">Other Education, Training, and Library Occupation</option>
                  </optgroup>
                  <optgroup label="Other Professional Occupations:">
                    <option value="Arts, Design, Entertainment, Sports, and Media Occupations">Arts, Design, Entertainment, Sports, and Media Occupations</option>
                    <option value="Computer Specialist/Mathematical Science">Computer Specialist/Mathematical Science</option>
                    <option value="Counselor/Social Worker/Other Community and Social Service Specialist">Counselor/Social Worker/Other Community and Social Service Specialist</option>
                    <option value="Lawyer/Judge">Lawyer/Judge</option>
                    <option value="Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)">Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)</option>
                    <option value="Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)">Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)</option>
                    <option value="Religious Worker (e.g., Clergy, Director of Religious Activities or Education)">Religious Worker (e.g., Clergy, Director of Religious Activities or Education)</option>
                    <option value="Social Scientist and Related Worker">Social Scientist and Related Worker</option>
                    <option value="Other Professional Occupation">Other Professional Occupation</option>
                  </optgroup>
                  <optgroup label="Office and Administrative Support Occupations:">
                    <option value="Supervisor of Administrative Support Workers">Supervisor of Administrative Support Workers</option>
                    <option value="Financial Clerk">Financial Clerk</option>
                    <option value="Secretary or Administrative Assistant">Secretary or Administrative Assistant</option>
                    <option value="Material Recording, Scheduling, and Dispatching Worker">Material Recording, Scheduling, and Dispatching Worker</option>
                    <option value="Other Office and Administrative Support Occupation">Other Office and Administrative Support Occupation</option>
                  </optgroup>
                  <optgroup label="Services Occupations:">
                    <option value="SProtective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)">SProtective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)</option>
                    <option value="Chef/Head Cook">Chef/Head Cook</option>
                    <option value="Cook/Food Preparation Worker">Cook/Food Preparation Worker</option>
                    <option value="Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)">Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)</option>
                    <option value="Building and Grounds Cleaning and Maintenance">Building and Grounds Cleaning and Maintenance</option>
                    <option value="Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)">Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)</option>
                    <option value="Sales Supervisor/Retail Sales">Sales Supervisor/Retail Sales</option>
                    <option value="Insurance Sales Agent">Insurance Sales Agent</option>
                    <option value="Sales Representative">Sales Representative</option>
                    <option value="Real Estate Sales Agent">Real Estate Sales Agent</option>
                    <option value="Other Services Occupation">Other Services Occupation</option>
                  </optgroup>
                  <optgroup label="Agriculture, Maintenance, Repair, and Skilled Crafts Occupations:">
                    <option value="Construction and Extraction (e.g., Construction Laborer, Electrician)">Construction and Extraction (e.g., Construction Laborer, Electrician)</option>
                    <option value="Farming/Fishing/and Forestry">Farming/Fishing/and Forestry</option>
                    <option value="Installation, Maintenance, and Repair">Installation, Maintenance, and Repair</option>
                    <option value="Production Occupations">Production Occupations</option>
                    <option value="Other Agriculture, Maintenance, Repair, and Skilled Crafts Occupation">Other Agriculture, Maintenance, Repair, and Skilled Crafts Occupation</option>
                  </optgroup>
                  <optgroup label="Transportation Occupations:">
                    <option value="Aircraft Pilot/Flight Engineer">Aircraft Pilot/Flight Engineer</option>
                    <option value="Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)">Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)</option>
                    <option value="Other Transportation Occupation">Other Transportation Occupation</option>
                  </optgroup>
                  <optgroup label="Other Occupations:">
                    <option value="Military">Military</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Other Occupation">Other Occupation</option>
                    <option value="Don't Know">Don't Know</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </optgroup>
                </select>
              </div>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black">Employer Name </label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.EmployerName">
              </div>

              <div class="fl mv2 w-100 w-75-l pa1">
                <label class="db fw4 lh-copy f6 black">Employer Address </label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.EmployerAddress">
              </div>
          </div>

          <div class="pa2" v-if="tabProps.ecclesiaShow">
              <p class="w-100 cf  gray tracked"> Ecclesia</p>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black"> WOFBI Status</label>
                <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.WOFBIStatus">
                  <option value="">Select Status</option>
                  <option value="Beginner" >Beginner</option>
                  <option value="Intermediate" >Intermediate</option>
                  <option value="Graduated" >Graduated</option>
                </select>
              </div>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black"> WSF Status</label>
                <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.WSFStatus">
                  <option value="">Select Status</option>
                  <option :value="wsf" v-for="(wsf, index ) in wsfStatus" :key="index">{{wsf}}</option>
                </select>
              </div>

              <div class="fl w-100"></div>
              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black"> Date of New Birth: </label>
                <input class="pa1 f7 ba b--silver br2 bg-white w-100 " type="date" v-model="record.DobNewBirth">
              </div>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black">Date of Holy Ghost Baptism : </label>
                <input class="pa1 f7 ba b--silver br2 bg-white w-100 " type="date" v-model="record.DateOfBaptism">
              </div>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black"> Date Joined LFC: </label>
                <input class="pa1 f7 ba b--silver br2 bg-white w-100 " type="date" v-model="record.DateJoinedLfc">
              </div>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black">Ordination Year : </label>
                <input class="pa1 f7 ba b--silver br2 bg-white w-100 " type="date" v-model="record.OrdinationYear">
              </div>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black">Province </label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Province">
              </div>
            
              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black">District </label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.District">
              </div>

              <div class="fl mv2 w-100 w-25-l pa1">
                <label class="db fw4 lh-copy f6 black">Zone </label>
                <input class="pa2 ba b--silver br2 bg-white w-100 " type="text" v-model="record.Zone">
              </div>
            
          </div>

          <div class="pa2" v-if="tabProps.designationShow">
            <p class="w-100 cf  gray tracked"> Designation</p>

            <div class="mt3 mt0 fl-ns w-100 w-50-ns pa1">
              <label class="db fw4 lh-copy f6 black"> Designation</label>
              <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.Designation">
                <option value="">Select Designation</option>
                <option :value="designation" v-for="(designation, index ) in designations" :key="index">{{designation}}</option>
              </select>
            </div>
            <div class="fr-ns mt3 w-100 w-50-ns pa1">
              <label class="db fw4 lh-copy f6 black"> Designation History</label>
              <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.DesignationHistory">
                <option value="">Select Designation History</option>
                <option :value="designation" v-for="(designation, index ) in designations" :key="index">{{designation}}</option>
              </select>
            </div>
          </div>

          <div class="pa2" v-if="tabProps.groupunitShow">
            <p class="w-100 cf  gray tracked"> Group Unit</p>

            <div class="fl mv2 w-100 w-25-l pa1">
              <label class="db fw4 lh-copy f6 black"> Service Groups / Units</label>
              <select class="pa2 ba b--silver br2 bg-white w-100 " v-model="record.ServiceGroup">
                <option value="">Select Designation History</option>
                <option v-for="(group, index ) in deaconateGroups" :key="index">{{group}}</option>
              </select>
            </div>
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
      url: "/api/postings",
      record: {},
      notifications:[],
      isFound:false,
      isSave:true,
      userIcon,
      tabProps:{},
      designations: [
        "CHAIRMAN",
        "VICE CHAIRMAN",
        "EXECUTIVE SECRETARY",
        "HEAD OF OPERATIONS",
        "ASSISTANT HEAD OF OPERATIONS",
        "SECRETARY, OPERATIONS",
        "HEAD OF COLLATION",
        "HEAD OF COMMUNION GROUP",
        "HEAD OF SALES AND MONITORING TASK FORCE",
        "HEAD OF STEWARDSHIP COUNCIL",
        "HEAD OF GROUP A",
        "HEAD OF GROUP B",
        "HEAD OF GROUP C",
        "BIG BOWL"
      ],
      deaconateGroups: [
        "GROUP A",
        "GROUP B",
        "GROUP C"
      ],
      wsfStatus: [
        "ZONAL MINISTER",
        "ASSISTANT ZONAL MINISTER",
        "WSF MINISTER",
        "ASSISTANT WSF MINISTER",
        "WSF SECRETARY",
        "ZONAL COMMITTEE CHAIRMAN",
        "ZONAL COMMITTEE MEMBER"
      ]
    }},
    components: { notify },
    created () {
      this.toggleTab("");
      this.getRecord(this.$route.params.id)
    },
    methods: {
      uploadImageDisplay(field) {
        displayImage(event, this, field)
      },
      uploadImage(imageRef) {
        this.$refs[imageRef].click()
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
              app.$router.push({name:"postings-view",params:{id:response.data.Body}})
            },1000)
          } else {
            app.isSave = true;
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      toggleTab(tabname) {
        switch(tabname) {
          default:
            this.tabProps = {personClass:"bg-gray white",personShow:true}
            break;
          case "occupation":
            this.tabProps = {occupationClass:"bg-gray white",occupationShow:true}
            break;
          case "ecclesia":
            this.tabProps = {ecclesiaClass:"bg-gray white",ecclesiaShow:true}
            break;
          case "designation":
            this.tabProps = {designationClass:"bg-gray white",designationShow:true}
            break;
          case "groupunit":
            this.tabProps = {groupunitClass:"bg-gray white",groupunitShow:true}
            break;
        }
      }
    }
  }
</script>
