<template>
  <el-row
    :gutter="0"
    class="m-header">
    <el-col :span="5">
      <geo/>
    </el-col>
    <el-col :span="5">
      <user/>
    </el-col>
    <el-col :span="14">
      <nav-bar/>
    </el-col>
  </el-row>
</template>

<script>
  import Geo from './geo'
  import User from './user'
  import NavBar from './nav'

  export default {
    name: '',
    components: {
      Geo,
      User,
      NavBar
    }
  }
</script>

<style  lang="sass">
  @import "../../../assets/css/public/layout.scss";
  @import "../../../assets/css/public/header/topbar.scss";
</style>
