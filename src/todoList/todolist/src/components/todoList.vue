<template>
    <div class="todoList">
        <!-- <div class="todoForm">
            <input type="text" v-model="title" @keyup.13="addItem(title)"/>
            <button @click="addItem(title)">添加</button>
        </div> -->
        <todo-form @additem="addItem"></todo-form>
        <!-- <div class="todoContent">
            <table>
                <thead>
                    <tr>
                        <td><input type="checkbox" v-model="checkAll"/></td>
                        <td>#</td>
                        <td>待办事项</td>
                        <td>是否完成</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,idx) in todolist" :key="idx">
                        <td><input type="checkbox" v-model="item.checked" @click="checkItem(item.id)"/></td>
                        <td>{{idx + 1}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.done ? '是' : '否'}}</td>
                        <td>
                            <button class="completeButton" @click="completeItem(item.id)">完成</button>
                            <button class="deleteButton" @click="deleteItem(idx)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
        <!-- <todo-content :todolist="todolist" :title="title"
        @completeitem="completeItem" @deleteitem="deleteItem" @checkitem="checkItem"></todo-content> -->
         <todo-content :todolist="todolist" :title="title"></todo-content>
    </div>
</template>
<script>
import TodoForm from './todoForm'
import TodoContent from './todoContent'
import Bus from '../Bus'
    export default {
        components: {
            TodoForm,
            TodoContent
        },
        data() {
            return {
                title: '',
                todolist: [
                    {
                        id: Date.now(),
                        title: "年前实现月薪过万",
                        done: false,
                        checked: false
                    },
                    {
                        id: Date.now() + 10,
                        title: "明年变成高富帅，迎娶白富美",
                        done: false,
                        checked: false
                    }
                ]
            }
        },
        created() {
            Bus.$on('checkitem',this.checkItem)
            Bus.$on('completeitem',this.completeItem)
            Bus.$on('deleteitem',this.deleteItem)
        },
        computed: {
            checkAll: {
                set(val) {
                    this.todolist.map(item=>item.checked=val)
                },
                get() {
                    return this.todolist.every(item => item.checked)
                }
            }
        },
        methods: {
            addItem(title) {
                let item = {
                    id: Date.now(),
                    checked: false,
                    title: title,
                    done: false,
                }
                this.todolist.unshift(item)
            },
            completeItem(id) {
                this.todolist.map(item => {
                    if(item.id == id) {
                        item.done = true
                    }
                })
            },
            deleteItem(idx) {
                this.todolist.splice(idx,1)
            },
            checkItem(id) {
                this.todolist.map(item => {
                    if(item.id == id) {
                        item.checked = !item.checked
                    }
                })
            },
            
        }
    }
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}
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
.todoContent {
    width: 100%;
}
table {
    width: 100%;
    text-align: center;
}
.deleteButton {
    background: #580000;
}
.completeButton {
    background: #58bc58;
}
</style>