<template>
  <div>
    <v-container fluid="fluid">
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
    	project: ""
    },
    created () {
      this.showInfo()
    },
    methods: {
      showInfo: function () {
        console.log(this.$route.params)
        this.project = this.$route.params.project
      }
    }
  }
</script>