<template>
    
  <router-link class="link dim" :to="to">
      <li class="bt b--black-10 bg-washed-yellow">
        <p class="ph2 h3 inline-flex items-center mv0 black ">
          <span class="oi mr1" :data-glyph="icon"></span>
          {{title}}
        </p>
      </li>
  </router-link>

</template>
<script type="text/javascript">
  export default {
    props: [ 'to', 'icon', 'title' ],
  }
</script>