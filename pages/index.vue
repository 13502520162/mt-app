<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu/>
      </el-col>
      <el-col :span="19">
        <elife/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <artistic/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Emenu from '../components/index/memu'
  import Elife from '../components/index/life'
  import Artistic from '../components/index/artistic'
  export default {
    components: {
      Emenu,
      Elife,
      Artistic
    }
  }
</script>

<style lang="sass">
  @import "../assets/css/index/index"
</style>
