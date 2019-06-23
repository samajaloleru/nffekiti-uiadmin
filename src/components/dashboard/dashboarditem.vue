<template>
  <router-link class="link no-underline pa3" :to="to">
    <div class="tc bg-white br3 pa2">
      <img :src="icon" :class="size">
      <p class="f6 i pt0 mv0 link no-underline black">{{title}}</p>
    </div>
  </router-link>
</template>
<script type="text/javascript">
export default {
  props: ["to", "icon", "title", "size"]
};
</script>