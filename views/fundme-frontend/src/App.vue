<template>
  <div id="wrapper">
    <v-toolbar class="secondary">
      <v-btn icon dark>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon dark router to="/detail/asas">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar-title class="hidden-sm-and-down">Fund Me</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field prepend-icon="search" label="Search..." hide-details single-line dark></v-text-field>
    </v-toolbar>
    <router-view></router-view>
  </div> 
</template>

<script>
  import Home from './components/Home.vue'
  export default {
    name: 'sidebar',
    data () {
      return {
        itemGroup: [
          { header: 'Project' },
          { title: 'Start a project' },
          { title: 'My Favorite' },
          { divider: true },
          { header: 'Account' },
          { title: 'Login' },
          { title: 'Register' },
          { title: 'Setting' }
        ],
        sidebar: 'false'
      }
    },
    components: { 'home': Home }
  }
</script>
