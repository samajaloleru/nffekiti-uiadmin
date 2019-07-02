<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import agreementsNew from "@/components/dashboard/records/agreements/agreements-new"
  import agreementsView from "@/components/dashboard/records/agreements/agreements-view"
  import agreementsEdit from "@/components/dashboard/records/agreements/agreements-edit"
  import agreementsSearch from "@/components/dashboard/records/agreements/agreements-search"

  export default {
    children: [
      { path: '', component: agreementsSearch, name:"agreements-search"},
      { path: 'new', component: agreementsNew, name:"agreements-new"},
      { path: ':id', component: agreementsView, name:"agreements-view"},
      { path: ':id/edit', component: agreementsEdit, name:"agreements-edit"},
    ],
  }
</script>
