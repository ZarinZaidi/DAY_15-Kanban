<template>
    <div class="home">
        <KanbanBoard />
    </div>
</template>

<script>
import KanbanBoard from '../components/KanbanBoard.vue';

export default {
    name: 'HomeView',
    components: {
        KanbanBoard,
    },
};
</script>

<style scoped>
.home {
    padding: 20px;
}
</style>