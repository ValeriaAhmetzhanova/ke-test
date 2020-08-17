<template>
    <div>
        <b-container :style="indent">
            <b-row>
                <b-col cols="6" class="task-item-title" @click="toggleChildren">
                    {{ task.title }}
                </b-col>
                <b-col cols="6">
                    <b-button variant="link" @click="$emit('add-clicked', task.id)">&plus;</b-button>
                    <b-button variant="link" @click="$emit('remove-clicked', task.id)">&times;</b-button>
                </b-col>
            </b-row>
        </b-container>
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

<style>
    .task-item-title {
        padding: 6px;
    }
</style>