<template>
    <li>
        {{ title }}
        <router-link :to="{name: 'board', params: {id: id}}">
            View
        </router-link>
    </li>
</template>

<script>
    export default {
        props: ['id', 'title']
    }
</script>