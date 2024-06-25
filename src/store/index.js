import { createStore } from 'vuex';

export default createStore({
    state: {
        columns: JSON.parse(localStorage.getItem('columns')) || [
            { id: 1, title: 'To Do', tasks: [] },
            { id: 2, title: 'In Progress', tasks: [] },
            { id: 3, title: 'Done', tasks: [] },
        ],
    },
    mutations: {
        addTask(state, { columnId, task }) {
            const column = state.columns.find(col => col.id === columnId);
            column.tasks.push(task);
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },
        updateColumns(state, columns) {
            state.columns = columns;
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },
        editTask(state, { columnId, taskId, updatedTask }) {
            const column = state.columns.find(col => col.id === columnId);
            const taskIndex = column.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1, { ...updatedTask });
            }
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },
        deleteTask(state, { columnId, taskId }) {
            const column = state.columns.find(col => col.id === columnId);
            column.tasks = column.tasks.filter(task => task.id !== taskId);
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },
    },
    actions: {},
    modules: {},
});

