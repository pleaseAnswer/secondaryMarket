<template>
  <div class="MyList">
    <div class="area-bg" @click="returnItem('cancel')"></div>

    <div class="choose-area-list">
        <div class="list-title">请选择</div>
        <div class="list-item">
            <span @click="getAreaList(0)">{{province ? province : ''}}</span>
            <span @click="getAreaList(1)">{{city ? city : ''}}</span>
            <span @click="getAreaList(2)">{{country ? country : ''}}</span>
            <span @click="getAreaList(3)">{{town ? town : ''}}</span>
        </div>
      <ul class="uler1">
        <li v-for="item in mylist" @click="setItem(item)" >{{typeof(item)=='string'?item:item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<style>
  .list-title {
      font-size: 1.7rem;
      text-align: center;
      padding: 10px;
      color: #666;
  }
  .list-item {
      font-size: 1.7rem;
      /* text-align: center; */
      padding: 10px;
      color: #666;
  }
  .choose-area-list{
    position: fixed;
    top: 35%;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100vw;
    border-radius: 5px;
    z-index:100;
  }
  .area-bg{
    height: 100vh;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #000;
    opacity:0.6;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=60);
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=60);
    z-index:99;
  }



  .uler1{
    max-height:300px;
    overflow-y: scroll;
    /*padding:1.4rem;*/
  }
  .uler1 li{
    display: block;
    font-size: 1.7rem;
    text-align: center;
    list-style: none;
    line-height:2em;
    border-bottom:1px solid #f3f3f3;
    vertical-align: middle;
    padding:8px 0px;
  }
  .uler1 li:last-child{
    border-bottom:0 none;
  }
  .nocheck-icon{
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background: url("../assets/img/card/nocheck.png")no-repeat;
    -webkit-background-size:100%;
    background-size:100%;
    margin:0 0.5rem;
    vertical-align: text-bottom;
  }
  .check-icon{
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background: url("../assets/img/card/check.png")no-repeat;
    -webkit-background-size:100%;
    background-size:100%;
    margin:0 0.5rem;
    vertical-align: text-bottom;
  }

  .button-bar{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    padding: 1rem;
    border-top:1px solid #f3f3f3;
  }
  #cancelbtn,#confirmbtn,#upperbtn{
    font-size: 1.6rem;
    background-color: #fff;
    margin:0 2rem;
    border: none;
    line-height: 1.5em;
    outline:none;
  }
  #cancelbtn{
    color: #000;
  }
  #confirmbtn,#upperbtn{
    color: #23ade5;
    align-self: flex-end;
  }
</style>
<script>
  export default{
    data(){
      return{
        nowName: '省份',
        province: '',
        city: '',
        country: '',
        town: '',
        getItem:null,
        mylist:this.list,
        myListItem: this.listItem
      }
    },
    components:{
    },
    props:{
      list:{type:Array},
      backMethods:{type:Function},
      listItem:{type:Array},
      listCode: {type:Array}
    },
    methods:{
      returnItem(status){
        if(status=='cancel'){
          this.backMethods(null);
        }
        else if(status=='confirm'){
          if(this.getItem==null){
            this.backMethods(0);
          }else{
            this.backMethods(this.getItem);
          }
        }
      },
      setItem(item){
        if(item.childnode&&item.childnode.length!=0){
          this.mylist=item.childnode
        }
        else if(!item.childnode){
          this.getItem=item;
          this.returnItem('confirm')
        }
      },

      upper(){
        this.mylist=this.list
      },
      getAreaList(val) {
          if(val) {
              this.$emit('getAreaList',val,this.listCode[val-1],1)
          } else {
              this.$emit('getAreaList',val,'',1)
          }
          console.log('this.$emit',val,this.listCode[val]);
      }
    },
    watch: {
        list: {
            immediate: true,
            handler(val) {
                this.mylist = val
            }
        },
        listItem: {
            immediate: true,
            handler(val) {
                this.province = val[0]
                this.city = val[1]
                this.country = val[2]
                this.town = val[3]
            }
        }
    }
  }
</script>






