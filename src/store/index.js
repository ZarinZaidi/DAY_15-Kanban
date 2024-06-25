import { createStore } from 'vuex';

export default createStore({
    state: {
        // The initial state of the application, including columns and tasks.
        // Columns are retrieved from localStorage or set to default if not present.
        columns: JSON.parse(localStorage.getItem('columns')) || [
            { id: 1, title: 'To Do', tasks: [] },
            { id: 2, title: 'In Progress', tasks: [] },
            { id: 3, title: 'Done', tasks: [] },
        ],
    },
    mutations: {
        /**
         * Adds a task to a specified column.
         * @param {Object} state - The current state of the Vuex store.
         * @param {Object} payload - Contains columnId and the task to be added.
         * @param {Number} payload.columnId - The ID of the column where the task will be added.
         * @param {Object} payload.task - The task object to be added.
         */
        addTask(state, { columnId, task }) {
            const column = state.columns.find(col => col.id === columnId);
            column.tasks.push(task);
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },

        /**
         * Updates the state with new columns and saves to localStorage.
         * @param {Object} state - The current state of the Vuex store.
         * @param {Array} columns - The updated array of columns.
         */
        updateColumns(state, columns) {
            state.columns = columns;
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },

        /**
         * Edits an existing task in a specified column.
         * @param {Object} state - The current state of the Vuex store.
         * @param {Object} payload - Contains columnId, taskId, and the updated task details.
         * @param {Number} payload.columnId - The ID of the column where the task is located.
         * @param {Number} payload.taskId - The ID of the task to be edited.
         * @param {Object} payload.updatedTask - The updated task object.
         */
        editTask(state, { columnId, taskId, updatedTask }) {
            const column = state.columns.find(col => col.id === columnId);
            const taskIndex = column.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1, { ...updatedTask });
            }
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },

        /**
         * Deletes a task from a specified column.
         * @param {Object} state - The current state of the Vuex store.
         * @param {Object} payload - Contains columnId and taskId.
         * @param {Number} payload.columnId - The ID of the column where the task is located.
         * @param {Number} payload.taskId - The ID of the task to be deleted.
         */
        deleteTask(state, { columnId, taskId }) {
            const column = state.columns.find(col => col.id === columnId);
            column.tasks = column.tasks.filter(task => task.id !== taskId);
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },
    },
    actions: {},
    modules: {},
});
