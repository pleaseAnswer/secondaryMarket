<template>
    <div class="classify">
        <van-tree-select height="55vw" :items="items" :main-active-index.sync="active">
            <template #content>
                <!-- <van-image v-if="active === 0" src="https://img.yzcdn.cn/vant/apple-1.jpg"/> -->
                <van-grid :column-num="3" v-if="active === 0" :gutter="10" :border='false'>
                    <van-grid-item v-for="value in 5" :key="value" icon="photo-o" text="文字" style="background:#369" @click="goto(value)"/>
                </van-grid>
                <van-image v-if="active === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg"
    />
  </template>
</van-tree-select>
    </div>
</template>
<script>

export default {
    name: 'classify',
    data() {
        return {
            items: [{ text: '图书', children: [], dot: true },
                    { text: '生活百货', children: [{text: '教科书'},{text: '等级资料'}], badge: 5 }
                ],
            // activeId: 1,
            active: 0,
        }
    },
    methods: {
        goto(id) {
            this.$router.push({ name: 'goodsList', params: {id} })
        }
    },
}
</script>
<style lang="sass" scoped>

</style>