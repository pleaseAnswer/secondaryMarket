<template>
    <div class="todoForm">
        <input type="text" v-model="title" @keyup.13="addItem(title)"/>
        <button @click="addItem(title)">添加</button>
    </div>
</template>
<script>
export default {
    name: 'TodoForm',
    data() {
        return {
            title: ''
        }
    },
    // props: [title],
    methods: {
        addItem() {
            this.$emit("additem", this.title);

            // 清空并获得焦点
            // this.title = "";
            // this.$refs.title.focus();
        }
    }
}
</script>
<style scoped>
.todoForm {
    width: 100%;
}
.todoForm input {
    width: 80%;
    height: 20px;
    padding: 0 10px;
}
button {
    width: 60px;
    height: 30px;
    margin-left: 2%;
    border: none;
    color: aliceblue;
    outline: none;
}
.todoForm button {
    background: #58bc;
}
</style>