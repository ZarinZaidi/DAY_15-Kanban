<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>{{ task ? 'Edit Task' : 'Add Task' }}</h2>
            <form @submit.prevent="submitTask">
                <div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" v-model="title" required>
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" v-model="description"></textarea>
                </div>
                <div>
                    <label for="dueDate">Due Date:</label>
                    <input type="date" id="dueDate" v-model="dueDate" required>
                </div>
                <button type="submit">{{ task ? 'Save Changes' : 'Save' }}</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskModal',
    props: {
        task: Object,
    },
    data() {
        return {
            title: this.task ? this.task.title : '',
            description: this.task ? this.task.description : '',
            dueDate: this.task ? this.task.dueDate : '',
        };
    },
    methods: {
        submitTask() {
            const task = {
                id: this.task ? this.task.id : Date.now(),
                title: this.title,
                description: this.description,
                dueDate: this.dueDate,
            };
            this.$emit('save', task);
            this.title = '';
            this.description = '';
            this.dueDate = '';
        },
    },
};
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    text-align: center;
}

.close {
    float: right;
    cursor: pointer;
}
</style>