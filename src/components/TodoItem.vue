<template>
    <div>
        <li>
            <subtask-list
                    :task="todo"
                    :depth="0"
                    v-on:remove-clicked="removeTodo"
                    v-on:add-clicked="toggleModal"
            />
        </li>
        <b-modal
                v-model="modalShow"
                ref="modal"
                title="New subtask"
                @show="resetModal"
                @hidden="resetModal"
                @ok="addTodo"
        >
            <form ref="form" @submit.prevent="addTodo">
                <b-form-group
                        label="Title"
                        label-for="title-input"
                        invalid-feedback="Title is required"
                >
                    <b-form-input
                            id="title-input"
                            v-model="newTitle"
                            required
                    ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import SubtaskList from "@/components/SubtaskList";
    import {mapGetters, mapMutations} from "vuex";
    export default {
        props: ["todo", "projectId"],
        computed: mapGetters(["allProjects"]),
        components: {
            'subtask-list': SubtaskList
        },
        data() {
            return {
                newTitle: "",
                modalShow: false,
                taskId: ""
            }
        },
        methods: {
            ...mapMutations(["updateProjects"]),
            removeTodo(taskId){
                let updatedProjects = this.allProjects;
                this.filterRemove(updatedProjects, taskId, this);
                this.updateProjects(
                    updatedProjects
                );
            },
            toggleModal(taskId){
                this.modalShow = !this.modalShow;
                this.taskId = taskId;
            },
            addTodo(){
                let updatedProjects = this.allProjects;
                let newTask = ({
                    id: Date.now(),
                    title: this.newTitle,
                    tasks: []
                });
                this.filterAdd(updatedProjects, this.taskId, newTask, this);
                this.updateProjects(
                    updatedProjects
                );
            },
            filterAdd(tasks, filterId, newTask, self) {
                tasks.forEach(function(task) {
                    if (task.id == filterId) {
                        task.tasks.push(newTask);
                    }
                    else {
                        self.filterAdd(task.tasks, filterId, newTask, self);
                    }
                });
            },
            filterRemove(tasks, filterId, self) {
                tasks.forEach(function(task) {
                    task.tasks = task.tasks.filter(s => s.id !== filterId);
                    self.filterRemove(task.tasks, filterId, self);
                });
            },
            resetModal() {
                this.newTitle = "";
            },
        }
    }
</script>