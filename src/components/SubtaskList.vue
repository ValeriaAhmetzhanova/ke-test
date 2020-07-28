<template>
    <div>
        <div>
            {{ task.title }}
            <button>&plus;</button>
            <button @click="$emit('remove-clicked', task.id)">&times;</button>
        </div>
        <subtask-list
                v-for="task in task.tasks"
                :task="task"
                v-on:remove-clicked="handleRemove"
        >
        </subtask-list>
    </div>
</template>

<script>
    export default {
        props: [ 'task' ],
        name: 'subtask-list',
        methods: {
            handleRemove(todoId) {
                this.$emit('remove-clicked', todoId);
            },
        }
    }
</script>