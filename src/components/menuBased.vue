<template >
  <section>
    <loadingscreen/>

    <div class="w-100 relative white">
      <nav @click="toggleMenu" class="w-100 center cf f6 f5-ns inline-flex items-center fw5 h3 bg-black fixed  z-max">
          <span  class="oi ml2 db dn-l" data-glyph="menu"></span>
          <span class=" white pl2 f4 f5-ns">
            NFF - EKITTI
          </span>
          <router-link :to="{name: 'dashboard'}">
            <img src="@/assets/logo.png" class="h2  absolute right-0  top-0" />
          </router-link>
      </nav>
      
    
      
      <div class="cf">
        <div class="fl h3 w-100"></div>
        <menulist class="top-0 left-0 vh-100 z-max fixed absolute relative-l dn db-l" :class="{'slideInLeft':lShow, 'slideOutLeft':!lShow}">
          <template slot="default">
            <li class="ph2 bg-black-80 dim pointer"  @click="toggleMenu">    

                <div class="w-100 center cf f6 f5-ns inline-flex items-center fw5 h3 bg-black fixed dn-l">
                    <span  class="oi" data-glyph="account-logout"></span>
                    <span class=" white pl2 f4 f5-ns">
                        NFF - EKITTI
                    </span>
                </div>

            </li>
          </template>
        </menulist>
        
        <div class="min-vh-100 white w-100 w-80-l fl center bg-white br2 relative ">
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