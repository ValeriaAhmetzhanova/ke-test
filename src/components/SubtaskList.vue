<template>
    <div>
        <div :style="indent">
            {{ task.title }}
            <button
                    v-if="task.tasks.length > 0"
                    @click="toggleChildren">
                &or;
            </button>
            <button @click="$emit('add-clicked', task.id)">&plus;</button>
            <button @click="$emit('remove-clicked', task.id)">&times;</button>
        </div>
        <subtask-list
                v-if="showChildren"
                v-for="task in task.tasks"
                :task="task"
                :depth="depth + 1"
                v-on:remove-clicked="handleRemove"
                v-on:add-clicked="handleAdd"
        >
        </subtask-list>
    </div>
</template>

<script>
    export default {
        props: [ 'task', 'depth' ],
        data() {
            return {
                showChildren: false
            }
        },
        name: 'subtask-list',
        computed: {
            indent() {
                return { transform: `translate(${this.depth * 50}px)` }
            }
        },
        methods: {
            handleRemove(todoId) {
                this.$emit('remove-clicked', todoId);
            },
            handleAdd(todoId) {
                this.$emit('add-clicked', todoId);
            },
            toggleChildren() {
                this.showChildren = !this.showChildren;
            }
        }
    }
</script>