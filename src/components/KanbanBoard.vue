<template>
    <div class="kanban-board">
        <draggable v-model="columns" group="columns" @end="updateColumns" class="columns">
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
            showModal: false,
            showEditModalFlag: false,
            editingTask: null,
            editingColumnId: null,
        };
    },
    computed: {
        ...mapState(['columns']),
    },
    methods: {
        addTask(task) {
            this.$store.commit('addTask', { columnId: 1, task });
            this.showModal = false;
        },
        updateColumns() {
            this.$store.commit('updateColumns', this.columns);
        },
        showEditModal(task, columnId) {
            this.editingTask = { ...task };
            this.editingColumnId = columnId;
            this.showEditModalFlag = true;
        },
        editTask(updatedTask) {
            this.$store.commit('editTask', {
                columnId: this.editingColumnId,
                taskId: this.editingTask.id,
                updatedTask,
            });
            this.showEditModalFlag = false;
        },
        deleteTask(taskId, columnId) {
            this.$store.commit('deleteTask', { columnId, taskId });
        },
    },
};
</script>

<style scoped>
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