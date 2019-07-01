<template>
  <router-view></router-view>
</template>

<script type="text/javascript">

  import birthdaysSearch from "@/components/dashboard/reports/birthdays/birthdays-search"

  export default {
    children: [
      { path: '', component: birthdaysSearch, name:"birthdays-search"},
    ],
  }
</script>
