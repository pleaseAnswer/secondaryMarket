<template>
    <div class="todoContent">
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
                <!-- <tr v-for="(item,idx) in todolist" :key="idx">
                    <td><input type="checkbox" v-model="item.checked" @click="checkItem(item.id)"/></td>
                    <td>{{idx + 1}}</td>
                    <td>{{item.title}}</td>
                    <td>{{item.done ? '是' : '否'}}</td>
                    <td>
                        <button class="completeButton" @click="completeItem(item.id)">完成</button>
                        <button class="deleteButton" @click="deleteItem(idx)">删除</button>
                    </td>
                </tr> -->
                <!-- <todo-item  v-for="(item,idx) in todolist" :key="idx" :item="item" :idx="idx" @completeitem="completeItem" @deleteitem="deleteItem" @checkitem="checkItem"></todo-item> -->
                <todo-item  v-for="(item,idx) in todolist" :key="idx" :item="item" :idx="idx"></todo-item>
            </tbody>
        </table>
    </div>
</template>
<script>
import TodoItem from './todoItem'
export default {
    name: 'TodoContent',
    components: {
        TodoItem
    },
    data() {
        return {
            // todolist: [],
        }
    },
    props: ['todolist','title'],
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
    created() {
        console.log(this.todolist);
    },
    methods: {
        // completeItem(id) {
        //     this.$emit('completeitem',id)
        // },
        // deleteItem(idx) {
        //     this.$emit('deleteitem',idx)
        // },
        // checkItem(idx) {
        //     this.$emit('checkitem',idx)
        // }
    }
}
</script>
<style scoped>
button {
    width: 60px;
    height: 30px;
    margin-left: 2%;
    border: none;
    color: aliceblue;
    outline: none;
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