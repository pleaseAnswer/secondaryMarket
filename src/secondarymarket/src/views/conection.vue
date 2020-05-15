<template>
<!-- 
	* WebSocket 长连接（与服务器连接之后不会断开）
	* 应用场景：多人聊天室
    1. 先实现服务器：消息转发

    引进模块 
    -> 创建一个WebSocket服务器
    -> 监听客户端连接(客户端连接，触发connection事件)
    -> 客户端发送消息，触发message事件
    -> 服务器给客户端推送消息send	

    2. 客户端
     * 客户端怎么连接到服务器？
        1：创建客户端对象并连接到服务器
        let wsServer=new WebSocket('ws://localhost:1910');

		* 监听sock的连接（连接成功会触发open事件）
		* 发消息给服务器[客户端发送消息，触发服务器的message事件，服务器给客户端推送消息]
		* 客户端接收到服务器推送到消息，会触发message事件
		* 消息内容保存在(参数为event)event.data中

 -->
    <div class="conection">
        <van-nav-bar :title="titleName" left-text="返回" left-arrow @click-left="onClickLeft"  @click-right="onClickRight">
            <template #right>
                <van-icon name="more-o" size="18" />
            </template>
        </van-nav-bar>
        <div class="saying-content">你好呀，你什么时候有空，我想买你的“杀死一只知更鸟”</div>
        <div class="saying-wrap">
            <div class="saying"></div>
        </div>
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
        onClickRight() {
            this.$router.push({name: 'sellers'})
        }
    }
}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 375) * 100vw;
}
.conection {
    width: 100%;
    height: 100%;
    background: #eee;
}
.saying-wrap{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: vw(60);
    background: #ddd;
    box-sizing: border-box;
}
.saying {
    margin: vw(10) ;
    width: vw(355);
    height: vw(40);
    background: #fff;
    border-radius: vw(5);
    box-sizing: border-box;
}
.saying-content {
    width: vw(250);
    background: green;
    border-radius: vw(5);
    padding: vw(5);
    color: #fff;
    position: absolute;
    top: vw(60);
    right: vw(5);
}
</style>