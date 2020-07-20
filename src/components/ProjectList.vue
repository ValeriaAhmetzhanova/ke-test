<template>
    <div>
        <ul>
            <ProjectItem
                    v-for="projectItem in allProjects"
                    v-bind:id="projectItem.id"
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
        }
    }
</script>

<style>
    li {
        list-style: none;
        text-align: left;
    }
</style>