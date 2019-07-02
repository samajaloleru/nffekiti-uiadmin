<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import playersNew from "@/components/dashboard/records/players/players-new"
  import playersView from "@/components/dashboard/records/players/players-view"
  import playersEdit from "@/components/dashboard/records/players/players-edit"
  import playersSearch from "@/components/dashboard/records/players/players-search"

  export default {
    children: [
      { path: '', component: playersSearch, name:"players-search"},
      { path: 'new', component: playersNew, name:"players-new"},
      { path: ':id', component: playersView, name:"players-view"},
      { path: ':id/edit', component: playersEdit, name:"players-edit"},
    ],
  }
</script>
