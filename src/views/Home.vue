<template>
  <div class="home">
    <h1>Projects</h1>
    <b-button v-b-modal.modal-prevent-closing>New project</b-button>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
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
      uploadedProject: {},
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
        id: Date.now(),
        title: this.title,
        todos: []
      });
    },
    handleFileUpload(){
      let file = this.$refs.file.files[0];
      if (file.type == "application/json") {
        const fr = new FileReader();
        fr.onload = e => {
          const result = JSON.parse(e.target.result);
          const formatted = JSON.stringify(result, null, 2);
          this.uploadedProject = result;

          // TODO check if id already exists

          this.createProject({
            id: this.uploadedProject.id,
            title: this.uploadedProject.title,
            todos: this.uploadedProject.todos
          });
        };
        fr.readAsText(file);
      } else {
        console.log("no");
      }
    }
  }
}
</script>
