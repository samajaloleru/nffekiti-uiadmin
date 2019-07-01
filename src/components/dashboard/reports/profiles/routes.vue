<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import profilesSearch from "@/components/dashboard/reports/profiles/profiles-search"

  export default {
    children: [
      { path: '', component: profilesSearch, name:"profiles-search"},
    ],
  }
</script>
