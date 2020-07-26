export default {
    state: {
        projects: [
              {id: 0, title: "One", todos: [
                  {id: 0, title: "Todo 1", status: "to do"},
                  {id: 1, title: "Todo 2", status: "in progress"},
                  {id: 2, title: "Todo 3", status: "done"},
                ]},
              {id: 1, title: "Two", todos: [
                  {id: 0, title: "Todo 4", status: "to do"},
                  {id: 1, title: "Todo 5", status: "in progress"},
                  {id: 2, title: "Todo 6", status: "done"},
                ]},
              {id: 2, title: "Three", todos: [
                  {id: 0, title: "Todo 7", status: "to do"},
                  {id: 1, title: "Todo 8", status: "in progress"},
                  {id: 2, title: "Todo 9", status: "done"},
                ]},
            ]
    },
    mutations: {
        updateProjects(state, projects) {
            state.projects = projects
        },
        createProject(state, newProject) {
            state.projects.push(newProject);
        }
    },
    actions: {
        async fetchProjects(ctx) {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=5"
            );
            const projects = await res.json();
            ctx.commit('updateProjects', projects);
        }
    },
    getters:{
        allProjects(state){
            return state.projects
        },
        getProjectById: (state) => (projectId) => {
            return state.projects.find(project => project.id == projectId)
        }
    },
}