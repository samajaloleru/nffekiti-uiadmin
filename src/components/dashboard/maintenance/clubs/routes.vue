<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import clubsNew from "@/components/dashboard/maintenance/clubs/clubs-new"
  import clubsView from "@/components/dashboard/maintenance/clubs/clubs-view"
  import clubsEdit from "@/components/dashboard/maintenance/clubs/clubs-edit"
  import clubsSearch from "@/components/dashboard/maintenance/clubs/clubs-search"

  export default {
    children: [
      { path: '', component: clubsSearch, name:"clubs-search"},
      { path: 'new', component: clubsNew, name:"clubs-new"},
      { path: ':id', component: clubsView, name:"clubs-view"},
      { path: ':id/edit', component: clubsEdit, name:"clubs-edit"},
    ],
  }
</script>
