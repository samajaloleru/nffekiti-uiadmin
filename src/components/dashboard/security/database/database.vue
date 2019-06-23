<template>  
    <section>
        <article class=" dt w-100 center">
            <div class="dtc v-mid center near-white bg-black-70">
                <section class="mw7 center ph3">
                    <h1 class="f5 f4-m f3-l fw6 tracked tc near-white">DATABASE IMPORT TOOL </h1>
                </section>
            </div>
        </article>
        

        <article class="dt w-100 pa2">
            <div class="dtc v-mid tc black pv2">
                <p> This allows import of data in JSON Format. </p>
                <p class="dark-red"> Note: File must contain valid JSON <small>e.g:</small> </p>
                <p class="dark-red"> 
                    <small> [ &#123; "Fullname":"SAMPLE ONE" &#125;, &#123; "Fullname":"SAMPLE TWO" &#125; ] </small>
                </p>

                <b class="cf w-100">Tables Allowed to Import Records</b>
                
                <div class="pa2 fl tl w-25-l w-third-m w-50" v-for="(name, index) in tableList" :key="index"> {{name}} </div>
                
            </div>
        </article>

        <notify :notifications="notifications"></notify>

        <article class="dt w-100 center">
            <div class="dtc v-mid center near-white bg-black-70">
                <section class=" mw7 center pa3">
                    <div class = " tc near-white"><small>select file, table and click import button</small> </div>
                    <div class="tc f6 w-100 fl">
                        <input type="file" class="bg-gray navy-blue pa2" @change="uploadFile('File')" />
                    </div>
                    <div class = "tc f6 w-100 fl">
                        <select class="bn mt2 ba0 bg-white mh2" v-model="record.Bucket">
                            <option v-for="(name, index) in tableList" :key="index"> {{name}} </option>
                        </select>
                    </div> 
                    <div class = "tc f6 w-100 fl pv4">
                        <span class="pointer pa2 mb2 bg-dark-green near-white no-underline" @click="importRecords">
                            Import Records
                        </span>
                    </div>
                    <div class = "dn tc f6 w-100 fl pv4">
                        <span class="pointer pa2 mb2 bg-dark-green near-white no-underline" @click="exportRecords">
                            Export Records
                        </span>
                    </div>
                    <div class = "tc f6 w-100 fl pv4">
                        <span class="pointer pa2 mb2 bg-dark-red near-white no-underline" @click="createTable">
                            RE-CREATE TABLE
                        </span>
                    </div>
                </section>
            </div>
        </article>
	</section>
</template>

<script type="text/javascript">
    import {HTTP} from "@/common"
    import {uploadFile} from "@/common"
    import {checkRedirect} from "@/common"
    import notify from "@/components/notify"

    export default {
        data() {return{
            notifications:[],
            tablename:"",
            record:{File:"",Bucket:""},
            tableList:[
            "Activations","Albums","Attendances", "Billofmaterials", "Billofmateriallines", "Blacklists",
            "Blogs","Campaigns","Categorys", "Documentations","Documents","Domains","Followers","Groups",
            "Hits", "Items","Invoices","Invoicelines", "Medias","Members", "Messages","Newsletters",
            "Permissions","Posts","Printers","Profiles","Reports","Roles", "Sales","Salelines", 
            "Stocks", "Stocklines",
            "Orders","Orderlines", "Purchases","Purchaselines", "Receivings","Receivinglines",
            "Pricelists","Pricelistlines", "Quotations","Quotationlines", "Seocontents",
            "Services","Settings","Sms","Smtp","Ssh","Units","Users","Wings",
            "Workorders","Workorderlines", 
            ], 
        }},
        components: {
            "notify": notify,
        },
        methods: {
            uploadFile(field) {
                uploadFile(event, this, field)
            },
            importRecords() {
                const app = this
                HTTP.post("/api/import", this.record, {withCredentials: true})
                .then((response) => {
                    this.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)
                    app.record = {File:"",Bucket:""}
                }).catch((e) => {
                    console.log(e)
                })
            },
            exportRecords() {

            },
            createTable(){
                HTTP.post("/db/init/"+this.record.Bucket, {}, {withCredentials: true})
                .then((response) => {
                    this.notifications.push(response.data)
                    setTimeout(checkRedirect(response.data),1500)
                }).catch((e) => {
                    console.log(e)
                })
            }
        }
    }
</script>
