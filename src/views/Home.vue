<template>
  <div class="home">
    <h1>Projects</h1>
    <b-button v-b-modal.modal-prevent-closing>New project</b-button>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
    <input type="text" v-model="search" @keyup="filterProjects" placeholder="Search..."/>
    <ProjectList v-bind:projects="projects"/>

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
  computed: mapGetters(["allProjects", "getSearch"]),
  mounted() {
    this.search = this.getSearch;
    this.projects = this.allProjects.filter(project => {
      return project.title.toLowerCase().includes(this.search.toLowerCase())
    })
  },
  components: {
    ProjectList
  },
  data() {
    return {
      title: "",
      search: "",
      uploadedProject: [],
      projects: [],
    }
  },
  methods: {
    ...mapActions(['fetchProjects']),
    ...mapMutations(['createProject', 'updateSearch']),
    resetModal() {
      this.title = ""
    },
    handleSubmit() {
      this.createProject({
        id: Date.now(),
        title: this.title,
        tasks: []
      });
    },
    handleFileUpload(){
      let file = this.$refs.file.files[0];
      if (file.type == "application/json") {
        let fr = new FileReader();
        fr.onload = e => {
          let result = JSON.parse(e.target.result);
          this.uploadedProject = result;
          let idArray = this.projects.map(element => element.id);
          if (idArray.includes(result.id)) {
            alert("This project id already loaded");
          } else if (this.uploadedProject.id && this.uploadedProject.title && this.uploadedProject.tasks) {
            this.createProject({
              id: this.uploadedProject.id,
              title: this.uploadedProject.title,
              tasks: this.uploadedProject.tasks
            });
          } else {
            alert("Wrong file");
          }
        };
        fr.readAsText(file);
      } else {
        alert("Wrong file format");
      }
    },
    filterProjects() {
      this.updateSearch(this.search);
      this.projects = this.allProjects.filter(project => {
        return project.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>
