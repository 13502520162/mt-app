<template>
  <div class="m-geo">
    <i class="el-icon-location"/> {{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">
      切换城市
    </nuxt-link>
    [天津 上海 深圳]
  </div>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style>
</style>
