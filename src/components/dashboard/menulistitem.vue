<template>
    
    <router-link class="link dim" :to="to" >
        <li class="bt b--white-10 bg-near-white mid-gray hover-bg-white hover-green" @click="toggleMenu">
            <p class="h3 inline-flex items-center mv0 pl3-l pl2">
            <span class="oi mr1" :data-glyph="icon"></span>
            {{title}}
            </p>
        </li>
    </router-link>

</template>
<script type="text/javascript">
    export default {
        props: [ 'to', 'icon', 'title' ],
        methods: {
            toggleMenu() {
                this.$parent.$parent.$parent.toggleMenu();
            }
        },
    }
</script>