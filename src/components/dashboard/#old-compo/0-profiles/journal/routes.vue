<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import journalNew from "@/components/dashboard/records/journal/journal-new"
  import journalView from "@/components/dashboard/records/journal/journal-view"
  import journalEdit from "@/components/dashboard/records/journal/journal-edit"
  import journalSearch from "@/components/dashboard/records/journal/journal-search"

  export default {
    children: [
      { path: '', component: journalSearch, name:"journal-search"},
      { path: 'new', component: journalNew, name:"journal-new"},
      { path: ':id', component: journalView, name:"journal-view"},
      { path: ':id/edit', component: journalEdit, name:"journal-edit"},
    ],
  }
</script>
