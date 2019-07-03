<template >
  <section>
    <loadingscreen/>

    <div class="w-100 relative white">
        <nav @click="toggleMenu" class="w-100 center cf f6 f5-ns inline-flex items-center fw5 h3 bg-white fixed  z-max">
            <span class="fl w-80 dark-green">
                <span class="dn-l dib"><i class="ml2 fal fa-bars"></i></span>
                <span class="pl2-l pl1 b f5 f6-m"> Ekiti State Football Association </span>
            </span>
            <span class="fl w-20 pa2">
                <router-link :to="{name: 'dashboard'}">
                    <img src="@/assets/logo.png" class="w3 fr" />
                </router-link>
            </span>
        </nav>
      
    
      
        <div class="cf">
            <menulist class="top-0 left-0 vh-100 z-9999-l z-max fixed absolute relative-l dn db-l" :class="{'slideInLeft':lShow, 'slideOutLeft':!lShow}"> 
            <template slot="default">
                <li class="pointer z-max"  @click="toggleMenu">    
                    <div class="ph2 w-100 center cf f6 f5-ns inline-flex items-center fw5 h3 bg-white fixed dn-l red">
                        <i class="fal fa-times-circle"></i>
                        <span class="b pl2 f5 f6-m">
                            Ekiti State Football Association
                        </span>
                    </div>
                </li>
                <li class="h3 fl w-100 dn-l"> </li>
            </template>
            </menulist>
            
            <div class="min-vh-100 white w-100 w-80-l fl center bg-white br2 relative ">
                <div class="cf-l h3 w-100"></div>
                <router-view></router-view>
            </div>
        </div>
    </div>
  </section>
</template>

<!-- App specific objects  -->
<script type="text/javascript">
  import loadingscreen from "@/components/loading"
  import menulist from "@/components/dashboard/menulist"

  export default {
    name: "menuBased",
    data() {return{
      lShow:false,
      slideOut:"dn",
    }},
    methods: {
      toggleMenu() {
        this.lShow = !this.lShow
        document.getElementsByTagName("html")[0].classList.toggle('overflow-hidden');
      }
    },
    components: {
      menulist,loadingscreen
    },
  }
</script>