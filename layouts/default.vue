<template>
  <el-container>
    <el-header class="layout-default">
      <my-header/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
  import MyHeader from '../components/public/header/topbar'

  export default {
    name: '',
    components: {
      MyHeader
    }
  }
</script>

<style>
</style>
