<template>
    <div class="task-card">
        <p>{{ task.title }}</p>
        <p>{{ task.description }}</p>
        <p>Due: {{ task.dueDate }}</p>
        <button @click="editTask">Edit</button>
        <button @click="deleteTask">Delete</button>
    </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: {
        task: Object, // Task object passed as a prop to the component
    },
    methods: {
        editTask() {
            this.$emit('edit', this.task);
        },
        deleteTask() {
            this.$emit('delete', this.task.id);
        },
    },
};
</script>

<style scoped>
.task-card {
    padding: 10px;
    margin: 5px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    margin-right: 5px;
}
</style>