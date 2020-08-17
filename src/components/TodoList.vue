<template>
    <div>
        <b-row>
            <b-col cols="4">
                <h4>To Do</h4>
                <ul>
                    <TodoItem
                            v-for="todo in getProjectById(id).tasks"
                            v-if="todo.status === 'to do'"
                            v-bind:todo="todo"
                            v-bind:projectId="id"
                    />
                </ul>
            </b-col>
            <b-col cols="4">
                <h4>In Progress</h4>
                <ul>
                    <TodoItem
                            v-for="todo in getProjectById(id).tasks"
                            v-if="todo.status === 'in progress'"
                            v-bind:todo="todo"
                            v-bind:projectId="id"
                    />
                </ul>
            </b-col>
            <b-col cols="4">
                <h4>Done</h4>
                <ul>
                    <TodoItem
                            v-for="todo in getProjectById(id).tasks"
                            v-if="todo.status === 'done'"
                            v-bind:todo="todo"
                            v-bind:projectId="id"
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
        computed: mapGetters(["getProjectById"]),
        props: ['id'],
        components: {
            TodoItem
        }
    }
</script>

<style>

</style>