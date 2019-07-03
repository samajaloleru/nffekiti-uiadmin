<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import leaguesNew from "@/components/dashboard/maintenance/leagues/leagues-new"
  import leaguesView from "@/components/dashboard/maintenance/leagues/leagues-view"
  import leaguesEdit from "@/components/dashboard/maintenance/leagues/leagues-edit"
  import leaguesSearch from "@/components/dashboard/maintenance/leagues/leagues-search"

  export default {
    children: [
      { path: '', component: leaguesSearch, name:"leagues-search"},
      { path: 'new', component: leaguesNew, name:"leagues-new"},
      { path: ':id', component: leaguesView, name:"leagues-view"},
      { path: ':id/edit', component: leaguesEdit, name:"leagues-edit"},
    ],
  }
</script>