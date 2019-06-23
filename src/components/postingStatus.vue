<template>
  <div class="w-100">
    <div v-for="(wing, index) in wings" :key="index">
      <div class="mw8 center pa2 bg-light-gray mt3-ns mt2">
        <article class="dt w-100 pb2 mt2 pointer" href="#0" @click="showChildren(index)">
          <div class="dtc w2 w3-ns v-mid">
            <img src="@/assets/attendance.png" class="db br-100 w2 w2-ns h2 h2-ns"/>
          </div>
          <div class="dtc v-mid pl3">
            <h1 class="f6 f5-ns fw6 lh-title black mv0">{{wing.Name}}</h1>
            <h2 class="f6 fw4 mt0 mb0 black-60"></h2>
          </div>
          <div class="dtc v-mid">
            <form class="w-100 tr">
              <button class="f6 button-reset bg-black ba b--black-10 dim pointer pv1 white br3" type="submit">{{wing.AttendanceCount}} in Attendance</button>
              <button class="f6 button-reset bg-black ba b--black-10 dim pointer pv1 white br3" type="submit">{{wing.PostingsCount}} Postings</button>
            </form>
          </div>
        </article>
      </div>

      <div class="dt dt--fixed cf" v-if="revealChildren.includes(index)" v-for="(division, indexDivision) in wing.Divisions" :key="indexDivision">
        <div class="mw8 bg-light-gray mt3-ns mt2 cf">
          <article class="dt w-100 pb2 mt2 pointer bg-white" href="#0" >
            <div class="dtc v-mid pl3"  @click="showChildren(indexDivision+'child')" >
              <h1 class="f6 f5-ns fw6 lh-title black mv0">{{division.Name}}</h1>
              <h2 class="f6 fw4 mt0 mb0 black-60"></h2>
            </div>
            <div class="dtc v-mid">
              <form class="w-100 tr">
                <button class="f6 button-reset bg-black ba b--black-10 dim pointer pv1 white br3" type="submit">{{division.AttendanceCount}} in Attendance</button>
                <button class="f6 button-reset bg-black ba b--black-10 dim pointer pv1 white br3" type="submit">{{division.PostingsCount}} Postings</button>
              </form>
            </div>
          </article>
        </div>
        <div class="dt dt--fixed cf" v-if="revealChildren.includes(indexDivision+'child')">
          <span class="dtc fl tc pv2 white w-20 mw3" v-for="(post, indexPost) in division.Postings" :key="indexPost" :class="{ 'bg-green' : post.isManned, 'bg-red' : !post.isManned}">
            {{post.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        revealChildren: []
      }
    },
    props: ['wings'],
    methods: {
      showChildren (index) {
        if (this.revealChildren.includes(index)) {
          this.revealChildren = this.revealChildren.filter( (child) => {
            return child != index
          })
          return
        }
        this.revealChildren.push(index)
      }
    }
  }
</script>
