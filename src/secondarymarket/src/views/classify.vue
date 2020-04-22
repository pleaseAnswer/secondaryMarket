<template>
    <div class="classify">
        <van-tree-select
            :items="items"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
        />
    </div>
</template>
<script>

export default {
    name: 'classify',
    data() {
        return {
            items: [{ text: '图书', children: [{text: '教科书'},{text: '等级资料'}], dot: true },
                    { text: '生活百货', children: [], badge: 5 }
                ],
            activeId: 1,
            activeIndex: 0,
        }
    },
}
</script>
<style lang="sass" scoped>

</style>