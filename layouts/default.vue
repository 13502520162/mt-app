<template>
  <el-container class="layout-default">
    <el-header
      height="197px"
      style="box-shadow: 0 2px 27px 0 rgba(0,0,0,.1);">
      <my-header/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer height="100%">
      <my-footer/>
    </el-footer>
  </el-container>
</template>

<script>
  import MyHeader from '@/components/public/header/index.vue'
  import MyFooter from '@/components/public/footer/index.vue'

  export default {
    name: '',
    components: {
      MyHeader,
      MyFooter
    }
  }
</script>

<style>
</style>
