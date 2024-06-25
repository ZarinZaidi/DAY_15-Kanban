<template>
    <div class="kanban-board">
        <!-- Draggable component to handle drag-and-drop functionality for columns -->
        <draggable v-model="columns" group="columns" @end="updateColumns" class="columns">
            <!-- TaskColumn component for each column -->
            <template #item="{ element }">
                <TaskColumn :column="element" @edit-task="showEditModal" @delete-task="deleteTask" />
            </template>
        </draggable>
        <button @click="showModal = true">Add Task</button>
        <TaskModal v-if="showModal" @close="showModal = false" @save="addTask" />
        <TaskModal v-if="showEditModalFlag" :task="editingTask" @close="showEditModalFlag = false" @save="editTask" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import TaskColumn from './TaskColumn.vue';
import TaskModal from './TaskModal.vue';
import draggable from 'vuedraggable';

export default {
    name: 'KanbanBoard',
    components: {
        TaskColumn,
        TaskModal,
        draggable,
    },
    data() {
        return {
            showModal: false, // Flag to show/hide the modal for adding a task
            showEditModalFlag: false, // Flag to show/hide the modal for editing a task
            editingTask: null, // Holds the task being edited
            editingColumnId: null, // Holds the column ID of the task being edited
        };
    },
    computed: {
        ...mapState(['columns']), // Maps the columns state from the Vuex store
    },
    methods: {
        addTask(task) { //Adds a new task to the first column.
            this.$store.commit('addTask', { columnId: 1, task });
            this.showModal = false;
        },
        updateColumns() { //Updates the columns in the Vuex store after drag-and-drop.
            this.$store.commit('updateColumns', this.columns);
        },
        showEditModal(task, columnId) { //Shows the edit modal with the selected task details.
            this.editingTask = { ...task };
            this.editingColumnId = columnId;
            this.showEditModalFlag = true;
        },
        editTask(updatedTask) { //Edits the task in the Vuex store.
            this.$store.commit('editTask', {
                columnId: this.editingColumnId,
                taskId: this.editingTask.id,
                updatedTask,
            });
            this.showEditModalFlag = false;
        },
        deleteTask(taskId, columnId) { //Deletes the task from the specified column.
            this.$store.commit('deleteTask', { columnId, taskId });
        },
    },
};
</script>

<style scoped>
/* Scoped styles for the KanbanBoard component */
.kanban-board {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.columns {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

button {
    margin-top: 20px;
}
</style>