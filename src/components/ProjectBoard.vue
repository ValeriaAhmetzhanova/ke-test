<template>
    <div>
        <h2 contenteditable
             v-text="projectTitle"
             @blur="onEdit"></h2>
        <b-button v-b-modal.modal-prevent-closing>New task</b-button>
        <TodoList v-bind:id="id"/>

        <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="New task"
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
                            v-model="taskTitle"
                            required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                        label="Status"
                        label-for="status-select">
                    <b-form-select
                            id="status-select"
                            v-model="taskStatus"
                            :options="statusOptions"
                            required
                    ></b-form-select>
                </b-form-group>

            </form>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import TodoList from "@/components/TodoList";
    export default {
        computed: mapGetters(["allProjects", "getProjectById"]),
        props: {
            id: {
                required: true
            }
        },
        components: {
            TodoList
        },
        mounted() {
            this.init();
        },
        data(){
            return {
                taskTitle: "",
                taskStatus: "",
                statusOptions: ['to do', 'in progress', 'done'],
                projectTitle: ""
            }
        },
        methods: {
            ...mapMutations(["updateProjects"]),
            init(){
                this.projectTitle = this.getProjectById(this.id).title;
            },
            resetModal() {
                this.taskTitle = "";
                this.taskStatus= "";
            },
            handleSubmit() {
                let newProjects = this.allProjects;
                let newTask = ({
                    id: Date.now(),
                    title: this.taskTitle,
                    status: this.taskStatus,
                    subtasks: []
                });
                let index = newProjects.findIndex(project => project.id == this.id);
                newProjects[index].todos.push(newTask);
                this.updateProjects(
                    newProjects
                );
            },
            updateTitle(title) {
                let updatedProjects = this.allProjects;
                updatedProjects.find(project => project.id == this.id).title = title;
                this.updateProjects(
                    updatedProjects
                );
            },
            onEdit(evt){
                let src = evt.target.innerText;
                this.projectTitle = src;
                this.updateTitle(src);
            }

        }

    }
</script>

<style>
    h2 {
        text-align: left;
        margin: 30px;
    }
</style>