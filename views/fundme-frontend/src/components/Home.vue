<template>
  <div>
    <v-container fluid="fluid">
      <v-row>
        <v-col xs8 offset-xs2>
          <p>Now You See Me</p>
          <v-carousel>
            <v-carousel-item v-for="(item,i) in items" v-bind:src="item.content" :key="i" />
          </v-carousel>	
          <div class="mt-3">
            <cardview></cardview>
          </div>
          <div class="mt-3">
            <timeline></timeline>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import Vue from 'vue'
  import CardView from './CardView.vue'
  import Timeline from './Timeline.vue'

  Vue.component('fade', {
    function: true, 
    render (createElement, context) {
      let data = context.data || {}
      data.props = { name: 'fade' }
      return createElement('transition', data, context.children)
	}
  })
  export default {
    name: 'home',
    data () {
      return {
        projectUrl: 'http://localhost:3000/projects/updates/?type=picture&num=5',
        items: [
          {
            "pname": "New Shield",
            "time": "2016-01-03T17:05:24.000Z",
            "type": "picture",
            "content": "https://vignette1.wikia.nocookie.net/ironman/images/8/81/Captain-America.png/revision/latest?cb=20170125200938"
          },
          {
            "pname": "A Wall",
            "time": "1970-01-01T05:00:02.000Z",
            "type": "picture",
            "content": "http://www.history.com/s3static/video-thumbnails/AETN-History_VMS/39/696/History_AH_Great_Wall_From_Space_rev_SF_HD_1104x622-16x9.jpg"
          }
        ]
      }
    },
    components: {
    	'cardview': CardView,
    	'timeline': Timeline
    },
    created () {
      this.getLatestProject()
    },
    methods: {
      getLatestProject: function () {
        this.$http.get(this.projectUrl)
          .then((response) => {
            console.log('success')
            this.items = JSON.parse(response.bodyText)
          })
          .catch(function (response) {
            console.log(response)
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.fade
  &-enter-active, &-leave-active, &-leave-to
    transition: .3s ease-out
    position: absolute
    top: 0
    left: 0
 
  &-enter, &-leave, &-leave-to
    opacity: 0
</style>