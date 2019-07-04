<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import playersSearch from "@/components/dashboard/reports/players/players-search"

  export default {
    children: [
      { path: '', component: playersSearch, name:"players-search"},
    ],
  }
</script>
