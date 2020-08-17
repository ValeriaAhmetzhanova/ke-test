<template>
  <div class="home">
    <b-container>
      <b-row class="mr-auto ml-auto">
        <b-col cols="4" class="mr-auto p-3 text-left">
          <input class="input-search" type="text" v-model="search" @keyup="searchChange" placeholder="Search..."/>
        </b-col>
        <b-col cols="8" class="p-3 text-right">
          <b-button variant="link" v-b-modal.modal-prevent-closing>Create</b-button>
          <label for="file">Import</label>
          <input class="input-file" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <ProjectList />
    </b-container>

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
  computed: mapGetters(["allProjects", "getSearch", "filteredProjects"]),
  mounted() {
    this.search = this.getSearch;
  },
  components: {
    ProjectList
  },
  data() {
    return {
      title: "",
      search: "",
      uploadedProject: [],
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
          let idArray = this.filteredProjects.map(element => element.id);
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
    searchChange() {
      this.updateSearch(this.search);
    }
  }
}
</script>

<style>
  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>
