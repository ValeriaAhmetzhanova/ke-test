<template>
    <div>
        <b-container :style="indent">
            <b-row>
                <b-col cols="6" class="task-item-title">
                    <span contenteditable
                          v-text="taskTitle"
                          @blur="onTitleEdit">
                    </span>
                </b-col>
                <b-col cols="6">
                    <b-button
                            variant="link"
                        v-if="task.tasks.length > 0"
                        @click="toggleChildren">
                        &or;
                    </b-button>
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
                showChildren: false,
                taskTitle: ""
            }
        },
        mounted() {
            this.init();
        },
        name: 'subtask-list',
        computed: {
            indent() {
                return { transform: `translate(${this.depth * 50}px)` }
            }
        },
        methods: {
            init() {
                this.taskTitle = this.task.title;
            },
            handleRemove(todoId) {
                this.$emit('remove-clicked', todoId);
            },
            handleAdd(todoId) {
                this.$emit('add-clicked', todoId);
            },
            toggleChildren() {
                this.showChildren = !this.showChildren;
            },
            onTitleEdit(evt) {
                let src = evt.target.innerText;
                this.taskTitle = src;
                this.$emit('task-title-edit', this.task.id, this.taskTitle);
            }
        }
    }
</script>

<style>
    .task-item-title {
        padding: 6px;
    }
</style>