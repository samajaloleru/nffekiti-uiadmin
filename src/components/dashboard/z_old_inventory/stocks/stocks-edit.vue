<template>
    <section class="pa2 pa3-l">
        <div class="w-100 pa2 bg-light-gray br2 cf inline-flex items-center relative">
            <div class="fl bg-light-gray pa2 pb fw5 tracked ttu f7 black" >Inventory / Stock Inventory / Edit</div>
            <router-link :to="{name:'stocks-view',params:{id:record.ID}}" class="fl right-1 absolute ph2 pv1 br4 bg-red hover-bg-dark-red grow-ns pointer f6 white tc no-underline">Back</router-link>
        </div>

        <notify class="mv2" :notifications="notifications"></notify>

        <div v-if="isFound" class="bg-light-gray br4 cf pa2">
            <div class="w-100">
                <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-third-l">
                <label class="db fw4 lh-copy f6 black">Doc No</label>
                <input
                    class="pa2 ba b--silver br2 bg-white w-100"
                    type="text"
                    placeholder="Auto-Generated"
                    readonly="readonly"
                    v-model="record.Docno"
                >
                </div>

                <div class="fl pa2 mt3 mt0-ns w-100 w-50-m w-third-l">
                <label class="db fw4 lh-copy f6 black">Doc Date</label>
                <input
                    class="pa1-l pa2 ba b--silver br2 bg-white w-100"
                    type="date"
                    v-model="record.Docdate"
                >
                </div>

                <div class="fl pa2 mt3 mt0-ns w-100 w-third-l">
                <label class="db fw4 lh-copy f6 black">Title</label>
                <input class="pa2 ba b--silver br2 bg-white w-100" type="text" v-model="record.Title">
                </div>
            </div>

            <stocklines  :refid="$route.params.id" ref="stocklines" />
            
            <div class="fl pa2 mt3 mt0-ns w-100 w-25-m w-25-l">
                <label class="db fw4 lh-copy f6 black">Discount Amount</label>
                <input class="pa2 ba b--silver br2 bg-white w-100" step=".01" type="number" v-model="record.Discountamount">
            </div>

            <div class="fl pa2 mt3 mt0-ns w-100 w-25-m w-25-l">
                <label class="db fw4 lh-copy f6 black">Total Excl Tax</label>
                <input class="pa2 ba b--silver br2 bg-white w-100" step=".01" type="number" v-model="record.Totalexcltax" >
            </div>

            <div class="fl pa2 mt3 mt0-ns w-100 w-25-m w-25-l">
                <label class="db fw4 lh-copy f6 black">Tax Amount</label>
                <input class="pa2 ba b--silver br2 bg-white w-100" step=".01" type="number" v-model="record.Taxamount" >
            </div>

            <div class="fl pa2 mt3 mt0-ns w-100 w-25-m w-25-l">
                <label class="db fw4 lh-copy f6 black">Total Incl Tax</label>
                <input class="pa2 ba b--silver br2 bg-white w-100" step=".01" type="number" v-model="record.Totalincltax">
            </div>

            <div class="w-100" v-if="otherfields.show">
                <div class="w-100">
                    <div class="fl pa2 mt3 mt0-ns w-100">
                        <label class="db fw4 lh-copy f6 black">Notes</label>
                        <textarea class="pa2 ba b--silver br2 bg-white w-100" v-model="record.Description"></textarea>
                    </div>
                </div>
            </div>

            <div class="fl w-100 tc">
                <label class="center fw4 lh-copy f7 pointer" :class="otherfields.color" @click="toggleOtherfields">--click to <span class="fw6 ttu">{{otherfields.text}}</span> other fields--</label>
            </div>


            <div class="fl w-100 pa2">
                <div class="fr ph3 pv2 br2 bg-green pointer f6 white tc no-underline" @click="save">Save</div>
            </div>
        </div>

        <div v-else>
            <p class="black f6 tc ma5">Please Wait, Searching...</p>
        </div>
    </section>
</template>

<script type="text/javascript">
import { HTTP } from "@/common";
import { displayImage } from "@/common";
import { checkRedirect } from "@/common";
import { dateTimeConvert } from "@/common";
import notify from "@/components/notify";
import stocklines from "@/components/dashboard/inventory/stocks/stocks-edit-lines";

export default {
  data() {
    return {
      url: "/api/stocks",
      record: {},
      notifications: [],
      isFound: false,
      isSave: true,
      otherfields: { show: "dn", text: "SHOW", color: "dark-green" },
      partnerList: [],
      ownerList: []
    };
  },
  components: { notify, stocklines },
  created() {
    this.getRecord(this.$route.params.id);
  },
  methods: {
    getRecord(id) {
      const app = this;
      HTTP.get(this.url + "?id=" + id, { withCredentials: true })
        .then(response => {
          this.record = response.data.Body;
          this.notifications.push(response.data);
          setTimeout(checkRedirect(response.data), 1500);

          if (response.data.Body.ID == id) {
            app.isFound = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    save() {
      const app = this;
      HTTP.post(app.url, app.record, { withCredentials: true })
        .then(response => {
          this.notifications.push(response.data);
          setTimeout(checkRedirect(response.data), 1500);
          if (response.data.Body !== null && response.data.Body !== undefined ) {
            app.$refs.stocklines.saveLines();
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchOwner() {
      this.searchProfile("ownerList");
    },
    searchPartner() {
      this.searchProfile("partnerList");
    },
    searchProfile(fieldName) {
      const app = this;
      const url = "/api/profiles/search";
      const search = {
        text: app.record.Setting,
        field: "Title",
        limit: 20,
        skip: 0
      };
      HTTP.post(url, search, { withCredentials: true })
        .then(response => {
          app[fieldName] = response.data.Body;
        })
        .catch(e => {
          console.log(e);
        });
    },
    toggleOtherfields() {
      const app = this;
      if (app.otherfields.show == "") {
        app.otherfields = { show: "dn", text: "SHOW", color: "dark-green" };
      } else {
        app.otherfields = { show: "", text: "HIDE", color: "dark-red" };
      }
    },
    updateTotal() {
      const app = this;
      app.record.Totalincltax = 0;
      app.record.Taxamount = parseFloat(
        (app.record.Totalexcltax * 0.14).toFixed(2)
      );
      app.record.Totalincltax = parseFloat(
        (
          parseFloat(app.record.Taxamount) +
          (app.record.Totalexcltax - app.record.Discountamount)
        ).toFixed(2)
      );
    }
  }
};
</script>
