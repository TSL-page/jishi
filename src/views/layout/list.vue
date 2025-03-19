<script setup>
import { useLayoutStore } from '@/stores/layout';

const store = useLayoutStore();
</script>

<template>
  <div class="container">
    <ul class="list">
    <li v-for="(todo, index) in store.todoList" :key="index" class="item">
      <el-checkbox
        v-model="store.selectedTodos"
        border
        size="large"
        :label="index"
      ></el-checkbox>
      {{ todo }}
      <el-button class="delete" type="danger" size="mini" @click="store.deleteTodo(index)">删除</el-button>
    </li>
  </ul>
  </div>
  
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  height: 600px;
}

.list {
  list-style: none;
  margin-top: 5px;
  width: 1320px;
  height: 100%;
  border: 1px solid black;
  border-radius: 5px;
  background-image: url('../../assets/bg.png');
  position: relative;
}

.item {
  color: rgb(92, 80, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 8px;
  background-color: #fff;
}

.delete {
  margin-right: 110px;
}
</style>