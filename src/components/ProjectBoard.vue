<template>
    <div>
        <h2>{{ allProjects[id].title }}</h2>
        <TodoList v-bind:id="id"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
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
        }
    }
</script>