<script setup>
import { useLayoutStore } from '@/stores/layout';
import { ref } from 'vue';


const store = useLayoutStore()
const inputValue = ref('')

const handleAddTodo = () => {
   store.addTodo()
};

const toggleSelectAll = () => {
  store.toggleSelectAll()
};

const deleteSelectedTodos = () => {
  store.deleteSelectedTodos()
};
</script>

<template>
  <div>
    <div class="top">
      <div class="input">
        <el-input
          v-model="store.inputValue"
          placeholder="请输入待办事项"
          aria-placeholder="请输入待办事项"
          @keyup.enter="handleAddTodo"
        ></el-input>
        <el-button class="addbutton" size="large" type="primary" @click="handleAddTodo">
          添加事项
        </el-button>
      </div>
      <div class="select-all">
        <el-checkbox
          size="large"
          v-model="store.isAllSelected"
          border
          @change="toggleSelectAll"
        >
          全选
        </el-checkbox>
        <el-button class="deleteselected" size="large" type="danger" @click="deleteSelectedTodos">
          删除选中
        </el-button>
      </div>
    </div>

  </div>
</template>


<style>
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

.addbutton {
  margin: 5px 0 0 15px;
}

.deleteselected {
  position: absolute;
  left: 85%;
  top: 14%;
}

</style>