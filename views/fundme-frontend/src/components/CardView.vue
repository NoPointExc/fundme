<template>
  <div>
    <v-container fluid="fluid">
      <v-row>
        <v-col xs3 v-for="project in projects" :key="project.pname">
          <v-card class="mt-3 mb-4" hover v-on:click="goToProjectDetail(project)">
            <v-card-row class="blue-grey darken-1">
              <v-card-title>
                <span class="white--text title" width="200">{{ project.pname }}</span>
                <v-spacer></v-spacer>
              </v-card-title>
            </v-card-row>
            <v-card-row :img="project.picture" width="200px" height="150px"></v-card-row>
            <v-card-row height="75px">
              <v-card-text class="blue-grey darken-3 white--text">
                <div v-text="project.description"></div>
              </v-card-text>
            </v-card-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'CardView',
    data () {
      return {
        projectUrl: 'http://localhost:3000/projects?num=12',
        projects: [
          {
            pname: 'aaa',
            description: 'asdsf dsfsdf dsf sdf sa'
          }
        ]
      }
    },
    created () {
      this.getProjectList()
    },
    methods: {
      // get lastest 20 projects
      getProjectList: function () {
        this.$http.get(this.projectUrl)
          .then((response) => {
            console.log('Get project list successed.')
            this.projects = JSON.parse(response.bodyText)
            this.trimDescription()
          })
          .catch((response) => {
            console.log(response)
          })
      },
      goToProjectDetail: function(project) {
          console.log(project)
          this.$router.replace({name: 'project-detail', params: {project: project}})
      },
      // cut description in case of too long
      trimDescription: function () {
        for (var i=0; i<this.projects.length; i++) {
          let project = (this.projects)[i]
          if (project.description.length > 45) {
            project.description = project.description.substring(0, 45) + "..."
          }
        }
      }
    }
  }
</script>
