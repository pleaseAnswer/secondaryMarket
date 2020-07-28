<template>
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
</template>
<script>
export default {
    name: 'todoItem',
    data() {
        return {

        }
    },
    props: ['todolist'],
    methods: {
        completeItem(id) {
            this.$emit('completeitem',id)
        },
        deleteItem(idx) {
            this.$emit('deleteitem',idx)
        },
        checkItem(idx) {
            this.$emit('checkitem',idx)
        }
    }
}
</script>
<style scoped>

</style>