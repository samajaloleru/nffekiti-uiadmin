<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import postingsNew from "@/components/dashboard/records/postings/postings-new"
  import postingsView from "@/components/dashboard/records/postings/postings-view"
  import postingsEdit from "@/components/dashboard/records/postings/postings-edit"
  import postingsSearch from "@/components/dashboard/records/postings/postings-search"

  export default {
    children: [
      { path: '', component: postingsSearch, name:"postings-search"},
      { path: 'new', component: postingsNew, name:"postings-new"},
      { path: ':id', component: postingsView, name:"postings-view"},
      { path: ':id/edit', component: postingsEdit, name:"postings-edit"},
    ],
  }
</script>
