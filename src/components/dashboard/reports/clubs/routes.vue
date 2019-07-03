<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import clubsSearch from "@/components/dashboard/reports/clubs/clubs-search"

  export default {
    children: [
      { path: '', component: clubsSearch, name:"clubs-search"},
    ],
  }
</script>
