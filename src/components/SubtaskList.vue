<template>
    <div>
        <div>
            {{ title }}
            <button>&plus;</button>
            <button @click="$emit('remove-clicked', id)">&times;</button>
        </div>
        <subtask-list
                v-for="task in tasks"
                :tasks="task.tasks"
                :title="task.title"
                :id="task.id"
                v-on:remove-clicked="handleRemove"
        >
        </subtask-list>
    </div>
</template>

<script>
    export default {
        props: [ 'title', 'tasks', 'id' ],
        name: 'subtask-list',
        methods: {
            handleRemove(todoId) {
                this.$emit('remove-clicked', todoId);
            }
        }
    }
</script>