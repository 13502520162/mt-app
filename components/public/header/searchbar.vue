<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <nuxt-link to="/">
          <img
            src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
            alt="美团">
        </nuxt-link>
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl
            v-if="isHotPlace"
            class="hotPlace">
            <dt>热门搜索</dt>
            <dd
              v-for="(item,idx) in $store.state.home.hotPlace.slice(0,4)"
              :key="idx">{{ item.name }}
            </dd>
          </dl>
          <dl
            v-if="isSearchList"
            class="searchList">
            <dd
              v-for="(item,idx) in searchList"
              :key="idx">{{ item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggset">
          <a
            v-for="(item,idx) in $store.state.home.hotPlace.slice(5,10)"
            :key="idx"
            href="#"
            style="padding-right: 9px;">{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout">美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie">猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel">美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment">民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business">商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li><i class="refund"/>
            <p class="txt">随时退</p>
          </li>
          <li><i class="single"/>
            <p class="txt">不满意免单</p>
          </li>
          <li><i class="overdue"/>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Config from '../../../server/dbs/config'

  export default {
    data() {
      return {
        isFocus: false,
        search: '',
        searchList: []
      }
    },
    computed: {
      isHotPlace: function() {
        return this.isFocus && !this.search
      },
      isSearchList: function() {
        return this.isFocus && this.search
      }
    },
    methods: {
      focus: function() {
        this.isFocus = true
      },
      blur: function() {
        let self = this
        setTimeout(function() {
          self.isFocus = false
        }, 200)
      },
      input: _.debounce(async function() {
        let self = this
        let city = self.$store.state.geo.position.city.replace('市', '')
        self.searchList = []
        let { status, data: { top } } = await self.$axios.get(Config.httpIp + '/search/top', {
          params: {
            input: self.search,
            city
          }
        })
        self.searchList = top.slice(0, 10)
      }, 300)
    }
  }
</script>

<style lang="css">
</style>
