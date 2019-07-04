<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import profilesNew from "@/components/dashboard/records/profiles/profiles-new"
  import profilesView from "@/components/dashboard/records/profiles/profiles-view"
  import profilesEdit from "@/components/dashboard/records/profiles/profiles-edit"
  import profilesSearch from "@/components/dashboard/records/profiles/profiles-search"

  export default {
    children: [
      { path: '', component: profilesSearch, name:"profiles-search"},
      { path: 'new', component: profilesNew, name:"profiles-new"},
      { path: ':id', component: profilesView, name:"profiles-view"},
      { path: ':id/edit', component: profilesEdit, name:"profiles-edit"},
    ],
  }
</script>
