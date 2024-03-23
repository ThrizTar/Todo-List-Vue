<script setup>
import { onMounted, ref } from 'vue';
import { useTodoStore } from '../stores/todo'
import { useRoute } from 'vue-router'

import Loading from '../components/Loading.vue';

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
    <div class="w-1/2 mx-auto">
        <div class="flex items-center">
            <RouterLink :to="{ name: 'todo-list' }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15">
                <path d="M7.4 273.4C2.7 268.8 0 262.6 0 256s2.7-12.8 7.4-17.4l176-168c9.6-9.2 24.8-8.8 33.9 .8s8.8 24.8-.8 33.9L83.9 232 424 232c13.3 0 24 10.7 24 24s-10.7 24-24 24L83.9 280 216.6 406.6c9.6 9.2 9.9 24.3 .8 33.9s-24.3 9.9-33.9 .8l-176-168z"/></svg>
            </RouterLink>
            <div class="ml-2">Edit Page</div> 
        </div>
        <div v-if="isLoaded">
            id <div class="badge badge-neutral">{{ todoId }}</div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Name</span>
                </label>
                <input type="text" 
                placeholder="Type name todo" 
                class="input input-bordered w-full" 
                v-model="todoStore.selectedTodo.name"/>
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Status</span>
                </label>
                <select class="select select-bordered" v-model="todoStore.selectedTodo.status">
                    <option v-for="status in todoStore.statuses" :value="status">{{ status }}</option>
                </select>
            </div>
            <div class="flex">
                <button class="btn btn-primary w-full mt-4" @click="editTodo(todoStore.selectedTodo)">Edit</button>
            </div>
        </div> 
        <div v-else>
            <Loading></Loading>
        </div>
    </div>
</template>

<style scoped>
    svg{
        fill: white;
    }
</style>