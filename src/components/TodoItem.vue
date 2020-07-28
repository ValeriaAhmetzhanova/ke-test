<template>
    <li>
        <subtask-list
                :title="todo.title"
                :tasks="todo.tasks"
                :id="todo.id"
                v-on:remove-clicked="removeTodo"
        />
    </li>
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
        methods: {
            ...mapMutations(["updateProjects"]),
            removeTodo(taskId){
                let updatedProjects = this.allProjects;
                this.filterTasks(updatedProjects, taskId, this);
                this.updateProjects(
                    updatedProjects
                );
            },

            filterTasks(tasks, filterId, self) {
                tasks.forEach(function(task) {
                        task.tasks = task.tasks.filter(s => s.id !== filterId);
                        self.filterTasks(task.tasks, filterId, self);
                });
            }
        }
    }
</script>