<template>
    <div>
        <b-row>
            <b-col cols="4">
                <h4>To Do</h4>
                <ul>
                    <TodoItem
                            v-on:remove-clicked="removeTodo"
                            v-for="todo in getProjectById(id).todos"
                            v-if="todo.status === 'to do'"
                            v-bind:todo="todo"
                    />
                </ul>
            </b-col>
            <b-col cols="4">
                <h4>In Progress</h4>
                <ul>
                    <TodoItem
                            v-on:remove-clicked="removeTodo"
                            v-for="todo in getProjectById(id).todos"
                            v-if="todo.status === 'in progress'"
                            v-bind:todo="todo"
                    />
                </ul>
            </b-col>
            <b-col cols="4">
                <h4>Done</h4>
                <ul>
                    <TodoItem
                            v-on:remove-clicked="removeTodo"
                            v-for="todo in getProjectById(id).todos"
                            v-if="todo.status === 'done'"
                            v-bind:todo="todo"
                    />
                </ul>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import TodoItem from '@/components/TodoItem'
    export default {
        computed: mapGetters(["allProjects", "getProjectById"]),
        props: ['id'],
        components: {
            TodoItem
        },
        methods: {
            ...mapMutations(["updateProjects"]),
            removeTodo(todoId){
                let updatedProjects = this.allProjects;
                let projectIndex = updatedProjects.findIndex(project => project.id == this.id);
                let todoIndex = updatedProjects[projectIndex].todos.findIndex(todo => todo.id == todoId);
                updatedProjects[projectIndex].todos.splice(todoIndex, 1);
                this.updateProjects(
                    updatedProjects
                );
            }
        }
    }
</script>