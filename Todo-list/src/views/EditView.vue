<script setup>
import { onMounted, ref } from 'vue';
import { useTodoStore } from '../stores/todo'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const route = useRoute()

const todoId = ref(-1)
const isLoaded = ref(false)

onMounted( async() => {
    await todoStore.loadTodo(route.params.id)
    isLoaded.value = true
    todoId.value = parseInt(route.params.id)
    console.log(todoStore.selectedTodo);
})

const editTodo = async(selectedTodo) => {
    const bodyData = {
        name: selectedTodo.name,
        status: selectedTodo.status
    }
    try {
        await todoStore.editTodo(bodyData, todoId.value)
        alert("Edit Complete!!")
    } catch (error) {
        console.log('error', error);        
    }
}
</script>

<template>
    <div>
        Edit
        <RouterLink :to="{ name: 'todo-list' }">
            Back
        </RouterLink>
        <div v-if="isLoaded">
            id {{ todoId }}
            <div>
                Name: <input type="text" v-model="todoStore.selectedTodo.name">
            </div>
            <div>
                Status: 
                <select v-model="todoStore.selectedTodo.status">
                    <option v-for="status in todoStore.statuses" :value="status">{{ status }}</option>
                </select>
            </div>
            <div>
                <button @click="editTodo(todoStore.selectedTodo)">Edit</button>
            </div>
        </div> 
        <div v-else>
            <h2>Loading...</h2>
        </div>
    </div>
</template>