<template>
  <div class="container">
    <my-menu :rotas="routes"/>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from './routes'
import Menu from './components/shared/menu/Menu.vue'

export default {
  components: {
    'my-menu': Menu
  },

  data() {
    return {
      routes: routes.filter(route => route.menu)
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Varela+Round');

  .container {
    font-family: 'Varela Round', Helvetica, Arial, sans-serif;
    margin: auto;
    max-width: 1200px;
  }

  .page-enter,
  .page-leave-active {
    opacity: 0;
  }

  .page-enter-active,
  .page-leave-active {
    transition: opacity 300ms;
  }
</style>
