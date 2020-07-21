<template>
    <div>
        <h2>{{ allProjects[id].title }}</h2>
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
        computed: mapGetters(["allProjects"]),
        props: {
            id: {
                required: true
            }
        },
        components: {
            TodoList
        },
        data(){
            return {
                taskTitle: "",
                taskStatus: "",
                statusOptions: ['to do', 'in progress', 'done']
            }
        },
        methods: {
            ...mapMutations(["updateProjects"]),
            resetModal() {
                this.taskTitle = "";
                this.taskStatus= "";
            },
            handleSubmit() {
                let newProjects = this.allProjects;
                let newTask = ({
                    id: newProjects[this.id].todos.length,
                    title: this.taskTitle,
                    status: this.taskStatus
                });
                newProjects[this.id].todos.push(newTask);
                this.updateProjects(
                    newProjects
                );
                console.log(this.allProjects);
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