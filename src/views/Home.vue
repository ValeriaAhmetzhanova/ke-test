<template>
  <div class="home">
    <h1>Projects</h1>
    <b-button v-b-modal.modal-prevent-closing>New project</b-button>
    <ProjectList v-bind:projects="allProjects"/>

    <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="New project"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleSubmit"
    >
      <form ref="form" @submit.prevent="handleSubmit">
        <b-form-group
                label="Title"
                label-for="title-input"
                invalid-feedback="Title is required"
        >
          <b-form-input
                  id="title-input"
                  v-model="title"
                  required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ProjectList from '@/components/ProjectList'

export default {
  name: 'Home',
  computed: mapGetters(["allProjects"]),
  async mounted() {

  },
  components: {
    ProjectList
  },
  data() {
    return {
      title: "",
    }
  },
  methods: {
    ...mapActions(['fetchProjects']),
    ...mapMutations(['createProject']),
    resetModal() {
      this.title = ""
    },
    handleSubmit() {
      this.createProject({
        id: this.allProjects.length,
        title: this.title,
      });
    }
  }
}
</script>
