<template>
  <div class=""/>
</template>

<script>
  import Config from '../server/dbs/config'
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    let {status,data}=await ctx.$axios.get(Config.httpIp+'/users/exit')
    if(status===200&&data&&data.code===0){
      window.location.href='/'
    }
  }
}
</script>
