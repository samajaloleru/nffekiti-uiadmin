<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import leaguesSearch from "@/components/dashboard/reports/leagues/leagues-search"

  export default {
    children: [
      { path: '', component: leaguesSearch, name:"leagues-search"},
    ],
  }
</script>
