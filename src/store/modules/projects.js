export default {
    state: {
        projects: [
              {id: 0, title: "One", todos: [
                  {id: 0, title: "Todo 1"},
                  {id: 1, title: "Todo 2"},
                  {id: 2, title: "Todo 3"},
                ]},
              {id: 1, title: "Two", todos: [
                  {id: 0, title: "Todo 4"},
                  {id: 1, title: "Todo 5"},
                  {id: 2, title: "Todo 6"},
                ]},
              {id: 2, title: "Three", todos: [
                  {id: 0, title: "Todo 7"},
                  {id: 1, title: "Todo 8"},
                  {id: 2, title: "Todo 9"},
                ]},
            ]
    },
    mutations: {
        updateProjects(state, projects) {
            state.projects = projects
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
        project(state, id){
            return state.projects[id]
        }
    },
}