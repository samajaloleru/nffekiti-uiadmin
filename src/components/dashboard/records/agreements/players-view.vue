<template>
    <section class="pa2 pa3-l">
        <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
            <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black ">
                Players / View
            </div>
            <router-link :to="{name:'players-search'}" class="fl right-1 absolute ph2 pv1 br4 bg-dark-red grow-ns pointer f6 white tc no-underline">
            Back
            </router-link>
        </div>


        <notify class="mv2" :notifications="notifications"></notify>

        <div v-if="isFound" class="bg-light-gray br4 cf">
            
            <div class="ph2 mt3 mw7 center">
                <div class="inline-flex items-center cf mt3 w-100 bg-near-white mid-gray br4 br--top f6">
                    <span class="w-20 tc pointer dim pa3 br4 br--left br--top " :class="tabProps.personalClass" @click="toggleTab('personal')">
                        <span class="oi" data-glyph="person"></span>
                        <label class="dn dib-ns">Personal</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.parentClass" @click="toggleTab('parent')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Parent</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.academicClass" @click="toggleTab('academic')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Academics</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.athleticsClass" @click="toggleTab('athletics')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Athletics</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 bl b--white-40 " :class="tabProps.medicalClass" @click="toggleTab('medical')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Medicals</label>
                    </span>
                    <span class="w-20 tc pointer dim pa3 br4 br--right br--top" :class="tabProps.mediaClass" @click="toggleTab('media')">
                        <span class="oi" data-glyph="document"></span>
                        <label class="dn dib-ns">Media</label>
                    </span>
                </div>
                <div class="bg-light-gray ph2 pb2 br4 br--bottom cf black">
                    <div class="ph2" v-if="tabProps.personalShow"  >
                        <p class="w-100 cf  gray tracked"> Personal Info</p>
                        <div class="w-100 cf pa3 ph5-l">
                            <div class="pa4 tc">
                                <div class="br4 bg-white h4 pt4 w4 dib" :src="record.Image" @error="record.Image = customerIcon"  @click="uploadImage('customerImage')">
                                    <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="customerImage"/>
                                    <span class="pt3"> Click to upload Picture </span>
                                </div>
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">First Name</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">Last Name</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">Other Name</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl mv2 w-40 pa1">
                                <label class="db fw4 lh-copy f6 black">Date of Birth:</label>
                                <input class=" w-100 ba b--silver bg-white " type="date">
                            </div>

                            <div class="fl mv2 w-20 pa1">
                                <label class="db fw4 lh-copy f6 black">Gender:</label>
                                <select class="w-100 pb2 ba b--silver br1">
                                    <option></option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>

                            <div class="fl mv2 w-40 pa1">
                                <label class="db fw4 lh-copy f6 black">Passport No:</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl w-100 ">
                                <div class="fl mv2 w-20 pa1">
                                    <label class="db fw4 lh-copy f6 black">Mobile:</label>
                                    <input class="pa1 pb2 w-100 ba b--silver bg-white " type="text">
                                </div>

                                <div class="fl mv2 w-60 pa1">
                                    <label class="db fw4 lh-copy f6 black">Email:</label>
                                    <textarea class="ba b--silver bg-white w-100 f7 " type="text"></textarea>
                                </div>
                                <div class="fl mv2 w-20 pa1">
                                    <label class="db fw4 lh-copy f6 black">State of Origin:</label>
                                    <select class="w-100 pa1 pb2 ba b--silver br1">
                                        <option>--select--</option>
                                        <option>Abuja FCT</option>
                                        <option>Abia</option>
                                        <option>Adamawa</option>
                                        <option>Akwa Ibom</option>
                                        <option>Anambra</option>
                                        <option>Bauchi</option>
                                        <option>Bayelsa</option>
                                        <option>Benue</option>
                                        <option>Borno</option>
                                        <option>Cross River</option>
                                        <option>Delta</option>
                                        <option>Ebonyi</option>
                                        <option>Edo</option>
                                        <option>Ekiti</option>
                                        <option>Enugu</option>
                                        <option>Gombe</option>
                                        <option>Imo</option>
                                        <option>Jigawa</option>
                                        <option>Kaduna</option>
                                        <option>Kano</option>
                                        <option>Katsina</option>
                                        <option>Kebbi</option>
                                        <option>Kogi</option>
                                        <option>Kwara</option>
                                        <option>Lagos</option>
                                        <option>Nasarawa</option>
                                        <option>Niger</option>
                                        <option>Ogun</option>
                                        <option>Ondo</option>
                                        <option>Osun</option>
                                        <option>Oyo</option>
                                        <option>Plateau</option>
                                        <option>Rivers</option>
                                        <option>Sokoto</option>
                                        <option>Taraba</option>
                                        <option>Yobe</option>
                                        <option>Zamfara</option>
                                    </select>
                                </div>
                            </div>

                            <div class="fl mv2 w-30 pa1">
                                <label class="db fw4 lh-copy f6 black">Local Govt. of Origin:</label>
                                <input class="pa1 pb2 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl mv2 w-70 pa1">
                                <label class="db fw4 lh-copy f6 black">Address:</label>
                                <textarea class=" ba b--silver bg-white w-100 f7 " type="text"></textarea>
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">City:</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">State:</label>
                                <select class="w-100 pa1 ba b--silver br1">
                                    <option>--select--</option>
                                    <option>Abuja FCT</option>
                                    <option>Abia</option>
                                    <option>Adamawa</option>
                                    <option>Akwa Ibom</option>
                                    <option>Anambra</option>
                                    <option>Bauchi</option>
                                    <option>Bayelsa</option>
                                    <option>Benue</option>
                                    <option>Borno</option>
                                    <option>Cross River</option>
                                    <option>Delta</option>
                                    <option>Ebonyi</option>
                                    <option>Edo</option>
                                    <option>Ekiti</option>
                                    <option>Enugu</option>
                                    <option>Gombe</option>
                                    <option>Imo</option>
                                    <option>Jigawa</option>
                                    <option>Kaduna</option>
                                    <option>Kano</option>
                                    <option>Katsina</option>
                                    <option>Kebbi</option>
                                    <option>Kogi</option>
                                    <option>Kwara</option>
                                    <option>Lagos</option>
                                    <option>Nasarawa</option>
                                    <option>Niger</option>
                                    <option>Ogun</option>
                                    <option>Ondo</option>
                                    <option>Osun</option>
                                    <option>Oyo</option>
                                    <option>Plateau</option>
                                    <option>Rivers</option>
                                    <option>Sokoto</option>
                                    <option>Taraba</option>
                                    <option>Yobe</option>
                                    <option>Zamfara</option>
                                </select>
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">Country</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>


                        </div>

                        <div class="fl w-100 pa1 mv3">
                            <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('parent')" >
                                Next
                            </div>
                        </div>
                    </div>
                    
                    <div class="ph2" :class="{'':tabProps.parentShow,'dn':!tabProps.parentShow}" >
                        <p class="w-100 cf  gray tracked">Parent/ Guardian  Info</p>
                        <div class="w-100 cf pa3 ph5-l">
                            <div class="fl mv2 w-20 pa1">
                                <label class="db fw4 lh-copy f6 black">Title:</label>
                                <select class="w-100 pa1 ba b--silver br1">
                                    <option>--select--</option>
                                    <option>Mr</option>
                                    <option>Miss</option>
                                    <option>Mrs</option>
                                    <option>Chief</option>
                                    <option>Dr.</option>
                                </select>
                            </div>

                            <div class="fl mv2 w-40 pa1">
                                <label class="db fw4 lh-copy f6 black">First Name:</label>
                                <input class="pa1 pb2 w-100 ba b--silver bg-white " type="text">
                            </div>
                            <div class="fl mv2 w-40 pa1">
                                <label class="db fw4 lh-copy f6 black">Last Name:</label>
                                <input class="pa1 pb2 w-100 ba b--silver bg-white " type="text">
                            </div>
                    
                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Relationship To Player:</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Occcupation:</label>
                                <input class="pl1 pv2 ba b--silver br2 bg-white w-100 f7 " type="text" v-model="record.occupation">
                            </div>

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Mobile:</label>
                                <input class="pl1 pv2 ba b--silver br2 bg-white w-100 f7 " type="text" >
                            </div>

                            <div class="fl mv2 w-100 w-40-l pa1">
                                <label class="db fw4 lh-copy f6 black">Email:</label>
                                <input class="pl1 pv2 ba b--silver br2 bg-white w-100 f7 " type="email" v-model="record.email">
                            </div>

                            <div class="fl mv2 w-100 w-60-l pa1">
                                <label class="db fw4 lh-copy f6 black">Address:</label>
                                <textarea class="pl1 ba b--silver br2 bg-white w-100 f7 " type="text"></textarea>
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">City:</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">State:</label>
                                <select class="w-100 pa1 ba b--silver br1">
                                    <option>--select--</option>
                                    <option>Abuja FCT</option>
                                    <option>Abia</option>
                                    <option>Adamawa</option>
                                    <option>Akwa Ibom</option>
                                    <option>Anambra</option>
                                    <option>Bauchi</option>
                                    <option>Bayelsa</option>
                                    <option>Benue</option>
                                    <option>Borno</option>
                                    <option>Cross River</option>
                                    <option>Delta</option>
                                    <option>Ebonyi</option>
                                    <option>Edo</option>
                                    <option>Ekiti</option>
                                    <option>Enugu</option>
                                    <option>Gombe</option>
                                    <option>Imo</option>
                                    <option>Jigawa</option>
                                    <option>Kaduna</option>
                                    <option>Kano</option>
                                    <option>Katsina</option>
                                    <option>Kebbi</option>
                                    <option>Kogi</option>
                                    <option>Kwara</option>
                                    <option>Lagos</option>
                                    <option>Nasarawa</option>
                                    <option>Niger</option>
                                    <option>Ogun</option>
                                    <option>Ondo</option>
                                    <option>Osun</option>
                                    <option>Oyo</option>
                                    <option>Plateau</option>
                                    <option>Rivers</option>
                                    <option>Sokoto</option>
                                    <option>Taraba</option>
                                    <option>Yobe</option>
                                    <option>Zamfara</option>
                                </select>
                            </div>

                            <div class="fl mv2 w-third pa1">
                                <label class="db fw4 lh-copy f6 black">Country</label>
                                <input class="pa1 w-100 ba b--silver bg-white " type="text">
                            </div>

                        </div>

                        <div class="fl w-100 pa1 mv3">
                            <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('personal')">
                                Back
                            </div>

                            <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('academic')" >
                                Next
                            </div>
                        </div>
                    </div>

                    <div class="ph2" :class="{'':tabProps.academicShow,'dn':!tabProps.academicShow}" >
                        <p class="w-100 cf  gray tracked">Academics Info</p>
                        <div class="w-100 cf pa3 ph5-l">

                        <div class="fl mv2 w-30 pa1">
                            <label class="db fw4 lh-copy f6 black">Class:</label>
                            <input class="pa1 pb2 w-100 ba b--silver bg-white " type="text">
                        </div>

                        <div class="fl mv2 w-70 pa1">
                            <label class="db fw4 lh-copy f6 black">School Name:</label>
                            <input class="pa1 pb2 w-100 ba b--silver bg-white " type="text">
                        </div>

                        <div class="fl mv2 w-100 pa1">
                            <label class="db fw4 lh-copy f6 black">Address:</label>
                            <input class="pa1 pb2 w-100 ba b--silver bg-white " type="text">
                        </div>

                        <div class="fl mv2 w-third pa1">
                            <label class="db fw4 lh-copy f6 black">City:</label>
                            <input class="pa1 w-100 ba b--silver bg-white " type="text">
                        </div>

                        <div class="fl mv2 w-third pa1">
                            <label class="db fw4 lh-copy f6 black">State:</label>
                            <select class="w-100 pa1 ba b--silver br1">
                                <option>--select--</option>
                                <option>Abuja FCT</option>
                                <option>Abia</option>
                                <option>Adamawa</option>
                                <option>Akwa Ibom</option>
                                <option>Anambra</option>
                                <option>Bauchi</option>
                                <option>Bayelsa</option>
                                <option>Benue</option>
                                <option>Borno</option>
                                <option>Cross River</option>
                                <option>Delta</option>
                                <option>Ebonyi</option>
                                <option>Edo</option>
                                <option>Ekiti</option>
                                <option>Enugu</option>
                                <option>Gombe</option>
                                <option>Imo</option>
                                <option>Jigawa</option>
                                <option>Kaduna</option>
                                <option>Kano</option>
                                <option>Katsina</option>
                                <option>Kebbi</option>
                                <option>Kogi</option>
                                <option>Kwara</option>
                                <option>Lagos</option>
                                <option>Nasarawa</option>
                                <option>Niger</option>
                                <option>Ogun</option>
                                <option>Ondo</option>
                                <option>Osun</option>
                                <option>Oyo</option>
                                <option>Plateau</option>
                                <option>Rivers</option>
                                <option>Sokoto</option>
                                <option>Taraba</option>
                                <option>Yobe</option>
                                <option>Zamfara</option>
                            </select>
                        </div>
                        
                        <div class="fl mv2 w-third pa1">
                            <label class="db fw4 lh-copy f6 black">Country</label>
                            <input class="pa1 w-100 ba b--silver bg-white " type="text">
                        </div>

                        </div>

                        <div class="fl w-100 pa1 mt3">
                            <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('parent')">
                                Back
                            </div>

                            <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('athletics')" >
                                Next
                            </div>
                        </div>
                    </div>

                    <div class="ph2" :class="{'':tabProps.athleticsShow,'dn':!tabProps.athleticsShow}" >
                        <p class="w-100 cf  gray tracked">Athletics Info</p>
                        <div class="w-100 cf pa3 ph5-l">

                            <div class="fl mv2 w-100 w-20-l pa1">
                                <label class="db fw4 lh-copy f6 black">Age Group:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-20-l pa1">
                                <label class="db fw4 lh-copy f6 black">Team Position:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-60-l pa1">
                                <label class="db fw4 lh-copy f6 black">Team Name:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Team Location:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Team Coach:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Previous Team:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-30-l pa1">
                                <label class="db fw4 lh-copy f6 black">Date joined:</label>
                                <input class="ba b--silver bg-white w-100 " type="date">
                            </div>

                            <div class="fl mv2 w-100 w-70-l pa1">
                                <label class="db fw4 lh-copy f6 black">Awards:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-50-l pa1">
                                <label class="db fw4 lh-copy f6 black">Other Sports Played:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-50-l pa1">
                                <label class="db fw4 lh-copy f6 black">Other Sports Awards:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                        </div>

                        <div class="fl w-100 pa1 mv3">
                            <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('academic')">
                                Back
                            </div>

                            <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('medical')" >
                                Next
                            </div>
                        </div>
                    </div>

                    <div class="ph2" :class="{'':tabProps.medicalShow,'dn':!tabProps.medicalShow}" >
                        <p class="w-100 cf  gray tracked">Medical Info</p>
                        <div class="w-100 cf pa3 ph5-l">

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Geno-Type:*</label>
                                <select class="w-100 pa1 ba b--silver br1">
                                    <option>--select--</option>
                                    <option>AA</option>
                                    <option>AS</option>
                                    <option>SS</option>
                                    <option>Not-Sure</option>
                                </select>
                            </div>

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Blood Group:*</label>
                                <select class="w-100 pa1 ba b--silver br1">
                                    <option>--select--</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>AB</option>
                                    <option>O</option>
                                    <option>Not-Sure</option>
                                </select>
                            </div>

                            <div class="fl mv2 w-100 w-third-l pa1">
                                <label class="db fw4 lh-copy f6 black">Height (Mtr):*</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl w-100">
                                <div class="fl mv2 w-100 w-30-l pa1">
                                    <label class="db fw4 lh-copy f6 black">Weight (KG):*</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                                </div>

                                <div class="fl mv2 w-100 w-70-l pa1">
                                    <label class="db fw4 lh-copy f6 black">Injuries:*</label>
                                    <input class="pa1 ba b--silver bg-white w-100 " type="text">
                                </div>
                            </div>

                            <div class="fl mv2 w-100 w-50-l pa1">
                                <label class="db fw4 lh-copy f6 black">Medications:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-50-l pa1">
                                <label class="db fw4 lh-copy f6 black">Allergies:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                        </div>

                        <div class="fl w-100 pa1 mv3">
                            <div class="fl ph3 pv2 br4 bg-gray pointer f6 white tc no-underline" @click="toggleTab('athletics')">
                                Back
                            </div>

                            <div class="fr ph3 pv2 br4 bg-navy pointer f6 white tc no-underline"  @click="toggleTab('media')" >
                                Next
                            </div>
                        </div>
                    </div>
                    
                    <div class="ph2" :class="{'':tabProps.mediaShow,'dn':!tabProps.mediaShow}">
                        <p class="w-100 cf  gray tracked">Media</p>
                        <div class="w-100 cf pa3 ph5-l">
                            <div class="fl mv2 w-100 w-50-l ph2 pa1">
                                <div class="pa2 tc">
                                    <div class="br4 bg-white h4 pt4 w4 dib" :src="record.Image" @error="record.Image = customerIcon"  @click="uploadImage('customerImage')">
                                        <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="customerImage"/>
                                        <span class="pt3"> Click to upload Picture </span>
                                    </div>
                                </div>
                                <label class="db fw4 lh-copy f6 black">Image One Title:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-50-l ph2 pa1">
                                <div class="pa2 tc">
                                    <div class="br4 bg-white h4 pt4 w4 dib" :src="record.Image" @error="record.Image = customerIcon"  @click="uploadImage('customerImage')">
                                        <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="customerImage"/>
                                        <span class="pt3"> Click to upload Picture </span>
                                    </div>
                                </div>
                                <label class="db fw4 lh-copy f6 black">Image Two Title:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-50-l ph2 pa1">
                                <div class="pa2 tc">
                                    <div class="br4 bg-white h4 pt4 w4 dib" :src="record.Image" @error="record.Image = customerIcon"  @click="uploadImage('customerImage')">
                                        <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="customerImage"/>
                                        <span class="pt3"> Click to upload Picture </span>
                                    </div>
                                </div>
                                <label class="db fw4 lh-copy f6 black">Image Three Title:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                            <div class="fl mv2 w-100 w-50-l ph2 pa1">
                                <div class="pa2 tc">
                                    <div class="br4 bg-white h4 pt4 w4 dib" :src="record.Image" @error="record.Image = customerIcon"  @click="uploadImage('customerImage')">
                                        <input type="file" class="dn" @change="uploadImageDisplay('Image')" ref="customerImage"/>
                                        <span class="pt3"> Click to upload Picture </span>
                                    </div>
                                </div>
                                <label class="db fw4 lh-copy f6 black">Image Four Title:</label>
                                <input class="pa1 ba b--silver bg-white w-100 " type="text">
                            </div>

                        </div>
                    </div>
                    <div class=" w-100 mv3">
                        <router-link :to="{name:'players-edit',params:{id:record.ID}}" class="ph3 pv2 br4 bg-green grow-ns pointer f6 white fr tc no-underline">
                            <i class="fas fa-edit"></i> Edit
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
    import userIcon from "@/assets/user.png"
    import documentlines from "@/components/dashboard/profiles/players/players-view-document"
    import settinglines from "@/components/dashboard/profiles/players/players-view-setting"
        
    export default {
        data() {return{
        url: "/api/customers",
        record: {},
        notifications:[],
        isFound:false,
        userIcon,
        tabProps:{},
        }},
        components: { notify, documentlines, settinglines },
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
                this.tabProps = {personalClass:"bg-white black-80",personalShow:true}
                break;
            case "parent":
                this.tabProps = {parentClass:"bg-white black-80",parentShow:true}
                break;
            case "academic":
                this.tabProps = {academicClass:"bg-white black-80",academicShow:true}
                break;
            case "athletics":
                this.tabProps = {athleticsClass:"bg-white black-80",athleticsShow:true}
                break;
            case "medical":
                this.tabProps = {medicalClass:"bg-white black-80",medicalShow:true}
                break;
            case "media":
                this.tabProps = {mediaClass:"bg-white black-80",mediaShow:true}
                break;
            
            }
        }
    }
}
</script>
