<template>
  <div id="app">
    <todo-list></todo-list>
  </div>
</template>

<script>
import todoList from './components/todoList.vue'

export default {
  name: 'App',
  components: {
    todoList
  }
}
</script>

<style>

</style>
