<template>
    <div class="questsContainer">
      <quest></quest>
    </div>
</template>

<script>
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

import Quest from './quest'
    export default {
        name: 'quest-list',
        components: {
          'quest': Quest,
        }
    }
</script>

<style scoped>
  .questsContainer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
</style>
