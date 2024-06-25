<template>
    <div class="task-column">
        <h2>{{ column.title }}</h2>
        <!-- Draggable component to handle drag-and-drop functionality for tasks -->
        <draggable v-model="localTasks" group="tasks" @end="updateTasks" class="tasks" item-key="id">
            <!-- TaskCard component for each task in the column -->
            <template #item="{ element }">
                <TaskCard :task="element" @edit="editTask" @delete="deleteTask" />
            </template>
        </draggable>
    </div>
</template>

<script>
import TaskCard from './TaskCard.vue'; // Import the TaskCard component
import draggable from 'vuedraggable'; // Import the draggable component for Vue.js

export default {
    name: 'TaskColumn',
    components: {
        TaskCard,
        draggable,
    },
    props: {
        column: Object, // Define the column object as a prop
    },
    data() {
        return {
            localTasks: this.column.tasks, // Set localTasks to the tasks in the column
        };
    },
    watch: { // Watch for changes in the column prop and update localTasks accordingly
        column: {
            handler(newColumn) {
                this.localTasks = newColumn.tasks;
            },
            deep: true, // Deep watch to detect nested changes
        },
    },
    methods: {
        updateTasks() {
            const columns = this.$store.state.columns.map(col => {
                if (col.id === this.column.id) {
                    return { ...col, tasks: this.localTasks };
                }
                return col;
            });
            this.$store.commit('updateColumns', columns);
        },
        editTask(task) {
            this.$emit('edit-task', task, this.column.id);
        },
        deleteTask(taskId) {
            this.$emit('delete-task', taskId, this.column.id);
        },
    },
};
</script>

<style scoped>
.task-column {
    width: 30%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.tasks {
    min-height: 200px;
}

h2 {
    text-align: center;
}
</style>