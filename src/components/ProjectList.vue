<template>
    <div>
        <ul>
            <ProjectItem
                    v-for="projectItem in projects"
                    v-bind:id="projectItem.id"
                    v-bind:title="projectItem.title"
            />
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import ProjectItem from '@/components/ProjectItem'
    export default {
        computed: mapGetters(["allProjects"]),
        components: {
            ProjectItem
        },
        props: ['projects'],
    }
</script>

<style>
    li {
        list-style: none;
        text-align: left;
    }
</style>