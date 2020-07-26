<template>
    <li>
        {{ todo.title }}
        <button @click="$emit('remove-clicked', todo.id)">&times;</button>
    </li>
</template>

<script>
    export default {
        props: {
            todo: {
                type: Object,
                required: true
            }
        }
    }
</script>