<template>
    <div>
        <ul>
            <TodoItem
                v-for="todo in allProjects[id].todos"
                v-bind:todo="todo"
            />
        </ul>
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