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
            <template #right v-if="isShow1">
                <van-icon name="more-o" size="18" />
            </template>
        </van-nav-bar>
        <div class="sureChange" v-if="isShow">
            <van-button class="sureButton" type="primary" size="small" @click="changselled">有交易意向</van-button>
            <!-- <p v-for="(item,index) in chatList" :key="index">{{item}}</p> -->
            <!-- <p class="chatItem">周悦欣</p> -->
        </div>
        <div  v-for="(item,index) in iAmSayList" :key="index">
            <div :class="item.code == 'id' ? 'saying-content' : 'response-content'">{{item.text}}</div>
        </div>
        <div class="saying-wrap">
            <input class="saying"  v-model="iAmSay" @keyup.enter="sendMsg" />
            <van-button type="primary" size="small" @click="sendMsg">发送</van-button>
        </div>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'conection',
    data() {
        return {
            titleName: '',
            sellPeapleId: '',
            iAmSay: '',
            iAmSayList: [],
            isShow: false,
            isShow1: false,
            signId: '',
            token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
            id: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : '',
            chatList: [],
        }
    },
    created() {
        this.getMsg()
        if(this.$route.query.signId && this.token) {
            this.isShow1 = true
            this.signId = this.$route.query.signId
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.isShow = !this.isShow;
        },
        async changselled() {
            // 将商品的selled改为1，isShow改为false
            // 向卖家的正在转手添加signId，向买家的正在交易添加signId
            let { data } = await my.get(`/goodsList/changselled`,{ signId:this.signId, sellPeapleId: this.sellPeapleId, id: this.id});
            if(data.status == 200) {
                this.$toast('设置成功')
                this.isShow = false;

            } else {
                this.$toast('设置失败')
            }
        },
        async getMsg() {
            let id = this.$route.query.id;
            let res = await my.get("/user/getMsg", { id: Number(id) });
            console.log(123,res);
            if(res.data.status == 200) {
                this.titleName = res.data.data[0].sellPeaple
                this.sellPeapleId = res.data.data[0].sellPeapleId
                console.log(111,this.sellPeapleId,this.id);
                this.getSay();
            } else {
                this.$toast({ message: '网络请求失败' });
            }
            
        },
        async sendMsg() {
            if(this.iAmSay == '') {
                this.$toast('不能发送空消息')
                return
            }
            console.log('iAmSay',this.iAmSay);
            let { data } = await my.get("/user/sendMsg", { iAmSay: this.iAmSay, sellPeapleId: this.sellPeapleId, id: this.id });
            console.log(data);
            if(data.status == 200) {
                // this.$toast('发送成功')
                this.getSay();
                this.iAmSay = ''
            }
            
            // this.iAmSayList.push(this.iAmSay)
            // // sessionStorage.setItem('iAmSayList',this.iAmSayList)
        },
        async getSay() {
            let { data } = await my.get("/user/getSay", { sellPeapleId: this.sellPeapleId, id: this.id });
            if(data.status == 200) {
                console.log(data.data);
                let list = data.data.list;
                console.log('list',data.data.id,this.id);
                this.iAmSayList = list
                
                // if(data.data.id == this.id) {
                //     this.iAmSayList = list
                // } else if(data.data.sellPeapleId == this.id) {
                //     list.map(item => {
                //         if(item.code == 'id') {
                //             let o = {
                //                 code: 'sellPeapleId',
                //                 text: item.text
                //             }
                //             this.iAmSayList.push(o)
                //         }
                //     })
                // }
                // console.log(this.iAmSayList);
                
            }
        },
        async getchatList() {

        },
    },
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
    position: relative;
}
.saying-wrap{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: vw(48);
    background: #ddd;
    box-sizing: border-box;
}
.saying {
    margin: vw(10);
    padding-left: vw(10);
    width: vw(286);
    height: vw(32);
    background: #fff;
    border-radius: vw(5);
    box-sizing: border-box;
}
.saying-content {
    float: right;
    clear: both;
    margin-top: vw(10);
    margin-right: vw(10);
    margin-left: vw(80);
    // width: vw(250);
    background: #07c160;
    border-radius: vw(5);
    padding: vw(5) vw(10);
    color: #fff;
}
.response-content {
    float: left;
    clear: both;
    margin-top: vw(10);
    margin-right: vw(80);
    margin-left: vw(10);
    // width: vw(250);
    background: #fff;
    border-radius: vw(5);
    padding: vw(5) vw(10);
    color: #666;
}
.sureChange {
    width: vw(100);
    // height: vw(100);
    position: absolute;
    top: vw(48);
    right: 0;
    background: #fff;
    transition: height 1s linear;
    border-radius: vw(5);
    display: flex;
    flex-direction: column;
    .sureButton {
        margin: vw(10) auto;
        color: #fff;
    }
    .chatItem {
        color: #666;
        text-align: center;
        margin: vw(10);
    }
}
</style>