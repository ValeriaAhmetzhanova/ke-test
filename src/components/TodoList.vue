<template>
    <div>
        <b-row>
            <b-col cols="4">
                <h4>To Do</h4>
                <ul>
                    <TodoItem
                            v-for="todo in allProjects[id].todos"
                            v-if="todo.status === 'to do'"
                            v-bind:todo="todo"
                    />
                </ul>
            </b-col>
            <b-col cols="4">
                <h4>In Progress</h4>
                <ul>
                    <TodoItem
                            v-for="todo in allProjects[id].todos"
                            v-if="todo.status === 'in progress'"
                            v-bind:todo="todo"
                    />
                </ul>
            </b-col>
            <b-col cols="4">
                <h4>Done</h4>
                <ul>
                    <TodoItem
                            v-for="todo in allProjects[id].todos"
                            v-if="todo.status === 'done'"
                            v-bind:todo="todo"
                    />
                </ul>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import TodoItem from '@/components/TodoItem'
    export default {
        computed: mapGetters(["allProjects"]),
        props: ['id'],
        components: {
            TodoItem
        }
    }
</script>