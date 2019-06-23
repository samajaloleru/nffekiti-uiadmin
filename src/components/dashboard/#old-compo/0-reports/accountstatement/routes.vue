<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import accountstatementNew from "@/components/dashboard/reports/accountstatement/accountstatement-new"
  import accountstatementView from "@/components/dashboard/reports/accountstatement/accountstatement-view"
  import accountstatementEdit from "@/components/dashboard/reports/accountstatement/accountstatement-edit"
  import accountstatementSearch from "@/components/dashboard/reports/accountstatement/accountstatement-search"

  export default {
    children: [
      { path: '', component: accountstatementSearch, name:"accountstatement-search"},
      { path: 'new', component: accountstatementNew, name:"accountstatement-new"},
      { path: ':id', component: accountstatementView, name:"accountstatement-view"},
      { path: ':id/edit', component: accountstatementEdit, name:"accountstatement-edit"},
    ],
  }
</script>
