<template>
  <section class="white vh-100" :style="{backgroundImage:'url('+require('@/assets/backgroundimage.jpg')+')'}" >
    <div class="w-100 min-vh-100 bg-dashboard pa2 pa3-l">
        <span>Profiles:</span>
        <div class="flex flex-wrap items-center justify-left">
            <dashboarditem :to="sub.to" :icon="sub.icon" :title="sub.title" :size="sub.size" v-for="(sub, index) in submenu.profiles" :key="index" />

            <router-link to="/admin/profiles/customers" class="link no-underline pa3 black w4">
                <div class="tc bg-white br3 pa2">
                    <i class="near-black f2 fas fa-users"></i>
                    <p class="f6 i pt0 mv0 link no-underline black">CUSTOMERS</p>
                </div>
            </router-link>

            <router-link to="/admin/profiles/staffs" class="link no-underline pa3 black w4">
                <div class="tc bg-white br3 pa2">
                    <i class="near-black f2 fas fa-id-card"></i>
                    <p class="f6 i pt0 mv0 link no-underline black">STAFF</p>
                </div>
            </router-link>

            <router-link to="/admin/profiles/documents" class="link no-underline pa3 black w4">
                <div class="tc bg-white br3 pa2">
                    <i class="near-black f2 fas fa-folders"></i>
                    <p class="f6 i pt0 mv0 link no-underline black">DOCUMENTS</p>
                </div>
            </router-link>
        </div>

        <div class="cf mv3"></div>

        <span>Inventory:</span>
        <div class="flex flex-wrap items-center justify-left">
            <router-link v-for="(sub, index) in submenu.inventory" :key="index" class="link no-underline pa3 black w4" :to="sub.to">
                <div class="tc bg-white br3 pa2">
                    <i class="f2" :class="sub.icon"></i>
                    
                    <p class="f6 i pt2 mv0 link no-underline black">{{sub.title}}</p>
                </div>
            </router-link>
        </div>

        <div class="cf mv3"></div>

        <span>Production Manager:</span>
        <div class="flex flex-wrap items-center justify-left">
            <router-link v-for="(sub, index) in submenu.production" :key="index" class="link no-underline pa3 black" :to="sub.to">
                <div class="tc bg-white br3 pa2">
                    <i class="f2" :class="sub.icon"></i>
                    
                    <p class="f6 i pt2 mv0 link no-underline black">{{sub.title}}</p>
                </div>
            </router-link>
        </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import { HTTP } from "@/common";
import dashboarditem from "@/components/dashboard/dashboarditem";

import iconprofileszando from "@/assets/zando.png";
import iconProfilesThespace from "@/assets/thespace.png";
import iconProfilesSuperbalist from "@/assets/img/superbalist.png";


import iconInventoryStock from "@/assets/stock.png";
import iconInventoryMaterial from "@/assets/materials.png";
import iconInventoryAsset from "@/assets/assets.png";
import iconInventoryOthers from "@/assets/others.png";

import iconInventoryworkorder from "@/assets/workorder.jpg";
import iconInventoryproducts from "@/assets/products.png";

const submenu = {
    profiles: [
        { to: "/admin/profiles/suppliers/5", icon: iconProfilesSuperbalist, title: "SUPERBALLIST", size: "h2" },
        { to: "/admin/profiles/suppliers/6", icon: iconprofileszando, title: "ZANDO", size: "h2" },
        { to: "/admin/profiles/suppliers/2", icon: iconProfilesThespace, title: "THE SPACE", size: " h2" },
    ],

    inventory: [
        { to: "/admin/inventory/stocks", icon: "fal fa-clipboard-list-check", title: "STOCKS" },
        { to: "/admin/inventory/stocks", icon: "fal fa-clipboard-list", title: "MATERIALS" },
        { to: "/admin/inventory/stocks", icon: "fal fa-list-alt", title: "ASSETS" },
        { to: "/admin/inventory/stocks", icon: "fal fa-th-list", title: "OTHERS"  }
    ],

    production: [
        { to: "/admin/productions/billofmaterials", icon: "fas fa-book", title: "PRODUCT BIBLE", },
        { to: "/admin/productions/workorders", icon: "fas fa-book", title: "WORK ORDERS", }
    ]
};

export default {
    data() {
        return {
        screen,
        submenu,
        searchRecordParam: "",
        wings: [],
        notifications: []
        };
    },
    components: { dashboarditem },
    created() {
        
    }
};
</script>
