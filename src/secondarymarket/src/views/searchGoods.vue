<template>
    <div style="overflow: hidden;">
        <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="onClickLeft">
            <!-- <template v-if="isShowSearch" #right>
                <van-search v-model="keyValue" placeholder="请输入搜索关键词" />
            </template>
            <template v-else #right>
                <van-icon name="search" size="18" @click="showSearch"/>
            </template> -->
        </van-nav-bar>
        <header>
            <div class="suosuo">
                <div class="icon" @click="goindex('/index')">
                        <i class="el-icon-arrow-left "></i>
                </div>
                <van-search v-model="input1" placeholder="请输入搜索关键词" @input="oninput" > </van-search>
                <div class="sousuo"  @click="onClick">搜索</div> 
            </div>
        </header>
        <div class="mine" >
            <van-row v-show="islist">
                <van-col v-for="(item,index) in booksList" :key="index+1" span="12">
                    <div class="list-img-wrap" @click="goto(item.signId)">
                        <figure class="list-img">
                            <img :src="item.img" alt="" />
                            <!-- <img v-for="img in imageList" v-lazy="img" /> -->
                            <figcaption>
                                <p>
                                    <i class="list-text">{{item.title}}</i>
                                    <i class="list-text-new">{{item.new}}</i>
                                </p>
                                <p>
                                    <i class="list-text-where">{{item.address}}</i>
                                    <i class="list-text-price">￥{{item.price}}</i>
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                </van-col>
            </van-row>
            <div class="tishi" v-show="isShowSearch">
                <i class="el-icon-warning-outline iconpic"></i>
                <span class="spText">抱歉，找不到您想要的结果</span>
            </div>
            <div class="ssmine" v-show="show">
                <div class="hot"> 
                    <h2>热门搜索</h2>
                </div>
                <ul class="hottext">
                    <li v-for="(item,index) in hotText" :key="index" @click="hotgoinput(index)">{{item}}</li>
                </ul>
                <div class="lishi"> 
                    <h2 class="biaoti">历史搜索</h2>
                    <div class="qingkong" @click="remover">
                        <i class="el-icon-delete"></i>
                        <h3>清空历史搜索</h3>
                    </div>
                    <ul class="lishitext">
                        <li v-for="(item,index) in text" :key="index" @click="goinput(index)">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>  
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    data(){
        return{
            searchData: [],
            input1: "",
            list: [],
            show: true,
            islist: false,
            isShowSearch: false,
            searchvalue:"",
            text:[],
            hotText:["杀死一只知更鸟","思修"],
            arr:[],
            booksList: []
        }
    },
    watch:{
        //可以监听实例下任何属性
        $route:function(newVal,oldVal){
            console.log(newVal,oldVal);
            if(newVal.params.id !== oldVal.params.id){
                this.getData();
            }
        }
    },
    created() {
        // 获取的接口数据
        // this.getList();
        // this.getData()
    },
    methods:{
        onClickLeft() {
            this.$router.go(-1);
        },
        goto(id) {
            this.$router.push({ name: 'goodDetail', query: {id} })
        },
        async getList(){
            console.log(this.input1);
            
            let { data } = await my.get(`/goodsList/search?title=${this.input1}`);
            console.log(data);
            if(data.length != 0) {
                this.islist = true;
                this.show = false;
            } else {
                this.isShowSearch = true;
                this.islist = false;
                this.show = false;
            }
            this.booksList = data
        },
        oninput(){
            if(this.input1==''){
                this.show=true
                this.searchData=[]
                this.islist = false;
                this.isShowSearch=false
            }
        },
        goindex(path){
            this.$router.push(path)
        },
        goDetail(id){
            this.$router.push({ name: "detail", params: { id } });
        },
        // getData(){
        //     let searchvalue=this.input1  
        //     this.searchvalue=this.input1
        //     if (searchvalue) { 
        //         this.searchData = this.list.filter((product)=> {
        //         // 每一项数据
        //             return Object.keys(product).some((key)=> {
        //                 return ( String(product[key]).toLowerCase().indexOf(searchvalue) > -1 );
        //             });
        //         });
        //     }else{
        //         this.searchData=[] 
        //         console.log("this.searchData",this.searchData);
        //     }
        // },
        goinput(index){
            this.input1=this.text[index]
        },
        hotgoinput(index){
            this.input1=this.hotText[index]
        },
        remover(){
            this.text=[]
        },
        onClick(){
            if(this.input1!=''){
                this.arr.push(this.input1)
                console.log( this.arr);
                this.text=  this.arr.filter(function(item, index, arr) {
                    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
                    return arr.indexOf(item, 0) === index;
                });  
                this.getList()
            }   
            // this.getData()
            // if(this.input1!=''&this.searchData.length>0){
            //     this.islist=true
            //     this.show=false
            //     this.isShowSearch=false
            // }else if(this.input1!=''&this.searchData.length<=0){
            //     this.isShowSearch=true
            //     this.islist=false
            //     this.show=false
            // }else if(this.input1==''&this.searchData.length<=0){
            //     this.show=true
            //     this.isShowSearch=false
            //     this.islist=false
            // }
        }
    },


}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 375) * 100vw;
}
.suosuo{
    width: 100%;
    height: vw(57);
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #ccc;
    
    .box{
        width:vw(300) ; 
    }
    .input-with-select{
        margin-left: vw(20);
    }
    .buttonsousuo{
        width: vw(30);
    }
    .van-search{
        width: vw(300);
        margin-left: vw(3);
        float: left;
    }
    .sousuo{
        float: right;
        width: vw(45);
        height: vw(30);
        font-size: vw(14);
        color: #fff;
        background: #409EFF;
        border-radius: vw(20);
        line-height: vw(30);
        text-align: center;
        margin-top: vw(12);
        margin-right: vw(12);
    }
    .van-cell--borderless{
        border-radius: vw(20);
    }
    .van-search__content--square{
        border: solid 1px #409EFF;
        border-radius: vw(20);
    }
}
.mine{
    padding: 0 vw(10); 
}
.icon{
    color: #000;
    float: left;
    margin-top: vw(15);  
}
.tishi{
    // margin-top: 200px;
    margin: vw(195) 0 0 vw(100);
}
.iconpic{
    width: vw(70);
    height: vw(70);
    margin-left: vw(35);
    font-size: vw(35);
    color: #aaa;
}
.spText{
    display: block;
    width: vw(200);
    height: vw(200);
    font-size: vw(14);
    margin-top: vw(10);
    line-height: vw(51);
    color: #aaa;
}
.biaoti{
    float: left;
}
.qingkong{
    
    float: right;

}
.lishi{
    width: 100%;
    margin-top: vw(20);
    height: 100%;
    float: left;
}
.hottext{
    margin-top: vw(10);
    height: 100%;
    li{
        float: left;
        font-size: vw(14);
        margin-left: vw(10);
    }
}

.lishitext{
    width: 100%;
    float: left;
    height: 100%;
    font-size: vw(14);

    li{
        margin-left: vw(10);
        height: vw(40);
        text-align: centepxr;
        line-height: vw(40);
        float: left;
    }
}
h2{
    font-size: vw(18);
}
.list{
    width: 100%;
    height: vw(80);
    border-bottom:1px solid #ccc;
    padding: vw(10);
}
.pic{
    width: vw(60);
    height: vw(60);
    float: left;
    img{
        width: 100%;
        height: 100%;
        margin-top: vw(10);
    }
} 
.text{
    font-size: vw(14);
    width: vw(270);
    height: vw(80);
    float: left;
    margin-left: vw(10);
}
.price{

}
.name{
    
}
.list-img-wrap {
    width: 100%;
    .list-img {
        height: vw(190);
        margin: vw(5);
        border: 1px solid #369;
        background: #fff;
    }
    img {
        width: 80%;
        height: 70%;
        padding: 5% 10%;
        // border-bottom: 1px solid #369;
        background: #eee;
    }
    figcaption {
        height: vw(18);
        font-size: vw(12);
        line-height: vw(18);
        color: #666;
        padding-left: vw(5);
        padding-right: vw(5);
        p{
            .list-text {
                display: inline-block;
                width: 70%;
                height: vw(18);
                font-size: vw(14);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #333;
                font-weight: bold;
            }
            .list-text-new {
                padding: 0 vw(5);
            }
            .list-text-where {
                float: left;
            }
            .list-text-price {
                float: right;
                color: #c55;
            }
        }
    }
}
</style>