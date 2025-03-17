<script setup>
import { ref } from 'vue';
const todoList = ref([]);
const inputValue = ref('');

const addTodo = () => {
  const trimmedValue = inputValue.value.trim();
  if (!trimmedValue) {
    ElMessage({
      showClose: true,
      message: '请输入待办事项',
      type: 'warning'
    })
    return;
  }
  if (todoList.value.includes(trimmedValue)) {
    ElMessage({
      showClose: true,
      message: '不能添加相同的内容',
      type: 'warning'
    })
  }
  todoList.value.push(trimmedValue);
  inputValue.value = ''; // 清空输入框
}

const deleteTodo = (index) => {
  todoList.value.splice(index, 1);
}
</script>

<template>
  <div class="contain">
    <div class="input">
      <el-input
        v-model="inputValue"
        placeholder="请输入待办事项"
        aria-placeholder="请输入待办事项"
      ></el-input>
      <el-button size="large" type="primary" circle @click="addTodo">添加</el-button>
    </div>
    <ul class="list">
      <li v-for="(todo, index) in todoList" :key="index" class="item">
        {{ todo }}
        <el-button type="danger" size="mini" @click="deleteTodo(index)">删除</el-button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.contain {
  width:100%;
  height: 500px;
  background-image: url("./assets/bg.png");
  padding-top:40px;
}

.input {
  width: 800px;
  height: 50px;
  display: flex;
  gap: 10px;
  margin:0 0 0 300px ;
}

.list {
  list-style: none;
  padding: 0;
}

.item {
  color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 5px;
}


</style>