<template>
    <div class="conection">
        <van-nav-bar :title="titleName" left-text="返回" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
    </div>
</template>
<script>

export default {
    name: 'conection',
    data() {
        return {
            titleName: '张**',
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="sass" scoped>

</style>