<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import newsletterNew from "@/components/dashboard/marketing/newsletter/newsletter-new"
  import newsletterView from "@/components/dashboard/marketing/newsletter/newsletter-view"
  import newsletterEdit from "@/components/dashboard/marketing/newsletter/newsletter-edit"
  import newsletterSearch from "@/components/dashboard/marketing/newsletter/newsletter-search"

  export default {
    children: [
      { path: '', component: newsletterSearch, name:"newsletter-search"},
      { path: 'new', component: newsletterNew, name:"newsletter-new"},
      { path: ':id', component: newsletterView, name:"newsletter-view"},
      { path: ':id/edit', component: newsletterEdit, name:"newsletter-edit"},
    ],
  }
</script>