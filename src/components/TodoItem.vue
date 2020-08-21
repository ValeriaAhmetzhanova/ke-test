<template>
    <div>
        <li>
            <subtask-list
                    :task="todo"
                    :depth="0"
                    v-on:remove-clicked="removeTodo"
                    v-on:add-clicked="toggleModal"
                    v-on:task-title-edit="editTaskTitle"
            />
            <b-container class="text-right">
                <b-button
                        v-if="!editShow"
                        variant="link"
                        @click="toggleEditShow"
                >
                    edit
                </b-button>
                <b-container v-if="editShow">
                    <b-row>
                        <b-col cols="4">
                            <span>Move to</span>
                        </b-col>
                        <b-col cols="5">
                            <b-form-select v-model="moveToSelected" :options="projectNames" size="sm"></b-form-select>
                        </b-col>
                        <b-col cols="3">
                            <b-button variant="link" @click="handleTaskMove(todo.id)">Save</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-container>
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
        computed: {
            ...mapGetters(["allProjects"]),
            projectNames() {
                let projects = [];
                for (let project of this.allProjects) {
                    if (project.id != this.projectId){
                        projects.push({value: project.id, text: project.title})
                    }
                }
                return projects;
            }
        },
        components: {
            'subtask-list': SubtaskList
        },
        data() {
            return {
                newTitle: "",
                modalShow: false,
                taskId: "",
                moveToSelected: null,
                editShow: false
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
            editTaskTitle(taskId, taskTitle){
                let updatedProjects = this.allProjects;
                this.filterEdit(updatedProjects, taskId, taskTitle, this);
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
            filterEdit(tasks, filterId, newTitle, self) {
                tasks.forEach(function(task) {
                    if (task.id == filterId) {
                        task.title = newTitle;
                    }
                    else {
                        self.filterEdit(task.tasks, filterId, newTitle, self);
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
            toggleEditShow () {
                this.editShow = !this.editShow;
            },
            handleTaskMove (todoId) {
                if (this.moveToSelected != null) {
                    let updatedProjects = this.allProjects;
                    let task = updatedProjects.find(project => project.id == this.projectId).tasks.find(task => task.id == todoId);
                    let updatedTasks = updatedProjects.find(project => project.id == this.projectId).tasks.filter(task => task.id != todoId);
                    updatedProjects.find(project => project.id == this.projectId).tasks = updatedTasks;
                    updatedProjects.find(project => project.id == this.moveToSelected).tasks.push(task);
                    this.updateProjects(
                        updatedProjects
                    );
                }
                this.toggleEditShow();
            }
        }
    }
</script>