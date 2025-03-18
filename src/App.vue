<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, watch } from 'vue';

const todoList = ref([]);
const inputValue = ref('');
const selectedTodos = ref([]); // 用于存储选中的待办事项索引
const isAllSelected = ref(false);

const addTodo = () => {
  const trimmedValue = inputValue.value.trim();
  if (!trimmedValue) {
    ElMessage({
      showClose: true,
      message: '请输入待办事项',
      type: 'warning'
    });
    return;
  }
  if (todoList.value.includes(trimmedValue)) {
    ElMessageBox({
      showClose: true,
      message: '不能添加相同的内容',
      type: 'warning'
    });
    return;
  }
  todoList.value.push(trimmedValue);
  inputValue.value = '';
};

const deleteTodo = (index) => {
  ElMessageBox.confirm('确定删除该待办事项吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    roundButton: true,
    draggable: true
  }).then(() => {
    todoList.value.splice(index, 1)
    ElMessage({
      type: 'success',
      message: '删除成功!'
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    });
  });
}


const deleteSelectedTodos = () => {
  if (selectedTodos.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择待办事项'
    });
    return;
  }
  ElMessageBox.confirm (
    '确定删除选中的待办事项吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      roundButton: true,
    draggable: true
    }
  )
  .then( () => {
    todoList.value = todoList.value.filter((_, index) => !selectedTodos.value.includes(index));
    selectedTodos.value = []; 
    isAllSelected.value = false; 
    ElMessage({
      type: 'success',
      message: '删除成功!'
    });
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    });
  });
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedTodos.value = todoList.value.map((_, index) => index);
  } else {
    selectedTodos.value = [];
  }
};

watch(selectedTodos, (newSelected) => {
  isAllSelected.value = newSelected.length === todoList.value.length && todoList.value.length > 0;
});
</script>

<template>
  <div class="contain">
    <div class="top">
      <div class="input">
        <el-input
          v-model="inputValue"
          placeholder="请输入待办事项"
          aria-placeholder="请输入待办事项"
          @keyup.enter="addTodo"
        ></el-input>
        <el-button class="addbutton" size="large" type="primary"  @click="addTodo">添加事项</el-button>
      </div>
    <div class="select-all">
      <el-checkbox  size="large" v-model="isAllSelected" border @change="toggleSelectAll">全选</el-checkbox>
      <el-button class="deleteselected" size="large" type="danger"  @click="deleteSelectedTodos">删除选中</el-button>
    </div>
    </div>
    <ul class="list">
      <li v-for="(todo, index) in todoList" :key="index" class="item">
        <el-checkbox
          v-model="selectedTodos"
          border
          size="large"
          :label="index"
        ></el-checkbox>
        {{ todo }}
        <el-button class="delete" type="danger" size="mini" @click="deleteTodo(index)">删除</el-button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.contain {
  width:1362px;
  height: 600px;
}

 .top {
  background-color: aquamarine;
  width: 100%;
  padding: 20px 0 10px 0;
 }

.input {
  width: 800px;
  height: 50px;
  display: flex;
  gap: 10px;
  margin: 0 0 0 300px;
}

.select-all {
  width: 77px;
  margin: 10px 0 10px 50px;

}

.list {
  list-style: none;
  margin-top:10px;
  width: 1320px;
  height: 100%;
  border: 1px solid black;
  background-image: url("./assets/bg.png");
  position: relative;
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

.addbutton {
  margin: 5px 0 0 15px;
}

.deleteselected {
  position: absolute;
  left: 85%;
  top: 14%;
}

.delete {
  margin-right: 110px;
}


</style>