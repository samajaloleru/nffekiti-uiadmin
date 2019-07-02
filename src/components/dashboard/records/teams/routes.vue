<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import teamsNew from "@/components/dashboard/records/teams/teams-new"
  import teamsView from "@/components/dashboard/records/teams/teams-view"
  import teamsEdit from "@/components/dashboard/records/teams/teams-edit"
  import teamsSearch from "@/components/dashboard/records/teams/teams-search"

  export default {
    children: [
      { path: '', component: teamsSearch, name:"teams-search"},
      { path: 'new', component: teamsNew, name:"teams-new"},
      { path: ':id', component: teamsView, name:"teams-view"},
      { path: ':id/edit', component: teamsEdit, name:"teams-edit"},
    ],
  }
</script>
