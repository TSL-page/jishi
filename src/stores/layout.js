import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { watch } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const todoList = ref([]);
  const inputValue = ref('');
  const selectedTodos = ref([]);
  const isAllSelected = ref(false);

  const addTodo = () => {
    const trimmedValue = inputValue.value.trim();
    if (!trimmedValue) {
      ElMessage({
        type: 'warning',
        message: '请输入待办事项',
        duration: 1000,
      });
      return;
    }
    if (todoList.value.includes(trimmedValue)) {
      ElMessage({
        type: 'warning',
        message: '不能添加相同的内容',
        duration: 1000,
      });
      return;
    }
    todoList.value.push(trimmedValue);
    inputValue.value = '';
    ElMessage({
      type: 'success',
      message: '添加成功',
      duration: 1000,
    });
  };

  const deleteTodo = (index) => {
    ElMessageBox.confirm('确定删除该待办事项吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    roundButton: true,
    draggable: true
  })
  .then(() => {
    todoList.value.splice(index, 1)
    ElMessage({
      type: 'success',
      message: '删除成功!',
      duration: 1000,
    })
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除',
      duration: 1000,
    })
  })
  }

  const deleteSelectedTodos = () => {
    if (selectedTodos.value.length === 0) {
      ElMessage({
        type: 'warning',
        message: '请选择待办事项',
        duration: 1000,
      });
      return;
    }
    ElMessageBox.confirm('确定删除选中的待办事项吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      todoList.value = todoList.value.filter((_, index) => !selectedTodos.value.includes(index));
      selectedTodos.value = [];
      isAllSelected.value = false;
      ElMessageBox.alert('删除成功', '成功', {
        confirmButtonText: '确定',
        type: 'success',
        duration: 1000,
      });
    })
    .catch(() => {
      ElMessageBox.alert('已取消删除', '提示', {
        confirmButtonText: '确定',
        type: 'info',
        duration: 1000,
      });
    });
  };

  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedTodos.value = todoList.value.map((_, index) => index);
    } else {
      selectedTodos.value = [];
    }
  }
  watch(selectedTodos, (newSelected) => {
  isAllSelected.value = newSelected.length === todoList.value.length && todoList.value.length > 0;
})

  return {
    todoList,
    inputValue,
    selectedTodos,
    isAllSelected,
    addTodo,
    deleteTodo,
    deleteSelectedTodos,
    toggleSelectAll,
  };
});
