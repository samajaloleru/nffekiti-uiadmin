<template>
    
    <li class="bb b--white pointer bg-white" @click="toggleMenu" >
        <p class="ph2 mr3 h3 inline-flex items-center mv0 mid-gray dim ">
            <i class="mr1 f7 fal " :class="icon" ></i>
            {{title}}
        </p>
        <ul class="list pv0 ph0 button dn" :class="{'db':lShow}" > 
            <menulistitem :to="sub.to" :icon="sub.icon" :title="sub.title" v-for="(sub, index) in submenu" :key="index" />
        </ul>
    </li>
  
</template>
<script type="text/javascript">
    import menulistitemComponent from "@/components/dashboard/menulistitem"
    export default {
        data() {return{
            lShow:false,
            icon:"fa-chevron-right",
        }},
        methods: {
            toggleMenu() {
                this.lShow = !this.lShow
                this.icon = (this.lShow) ? "fa-chevron-down": "fa-chevron-right"
            }
        },
        props: ['title', 'submenu' ],
        components: {
           "menulistitem": menulistitemComponent,
        },
    }
</script>