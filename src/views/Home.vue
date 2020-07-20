<template>
  <div class="home">
    <h1>Projects</h1>
    <ProjectList v-bind:projects="allProjects"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import ProjectList from '@/components/ProjectList'

export default {
  name: 'Home',
  computed: mapGetters(["allProjects"]),
  methods: mapActions(['fetchProjects']),
  async mounted() {

  },
  components: {
    ProjectList
  }
}
</script>
