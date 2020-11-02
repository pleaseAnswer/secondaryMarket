<template>
    <div>
        <chooseAreaList v-if="list.length!=0" :list="list" :backMethods="getItem" :listItem="listItem" :listCode="listCode" @getAreaList="getAreaList"></chooseAreaList>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                list: [],
                listItem: [],
                listCode: [],
            }
        },
        methods: {
            getItem(item) {
                let arr = this.list
                let choosed;
                for (let a of this.listSet) {
                    if (a.arr == arr) {
                        choosed = a
                    }
                }
                if (item != null) {
                    if (item == 0) {
                        this.showToast('请选择信息！')
                    } else {
                        if (choosed.name == 'saveaddress') {
                            if(this.parentid == 0) {
                                this.userInfo.saveaddress1 = ''
                            }
                            if(this.userInfo.saveaddress1) {
                                this.userInfo.saveaddress1 += item.name
                            } else {
                                this.userInfo.saveaddress1 = item.name
                            }
                            if(this.parentid >= 3) {
                                this.parentid = 0
                                this.list = []
                                this.listCode.push(item.code)
                                this.listItem.push(item.name)
                                this.getAreaList(this.parentid)
                                return
                            } else {
                                this.listCode = this.listCode.splice(0,this.parentid)
                                this.listCode.push(item.code)
                                this.listItem = this.listItem.splice(0,this.parentid)
                                this.listItem.push(item.name)
                                this.parentid += 1
                                this.getAreaList(this.parentid, item.code)
                            }
                        }
                    }
                } else {
                    this.list = []
                }
            },
            // 获取区域列表
            getAreaList(parentid,areaCode,type) {
                this.parentid = parentid
                this.$http.post(this.requestUrl+'/common/getArea', {
                    channelcode: this.channelcode,
                    parentid,
                    areaCode,
                })
                .then(res => {
                    if (res.data.statusCode == '200') {
                        if(res.data.data.length) {
                            let saveaddressList = [];
                            res.data.data.map(item => {
                                let o = {
                                    name: item.areaName,
                                    code: item.areaCode
                                }
                                saveaddressList.push(o)
                            })
                            let oo = {
                                name: 'saveaddress', 
                                arr: saveaddressList
                            }
                            this.listSet.push(oo)
                            if(this.parentid <= 3 && this.parentid != 0) {
                                this.openList('saveaddress')
                            }
                            if(type) {
                                this.openList('saveaddress')
                            }
                        } else {
                            this.showToast('暂无相关数据')
                        }
                    } else {
                        this.showToast(res.data.message)
                    }
                })
                .catch(res => {
                    this.showToast(res)
                })
            },
        }
    }
</script>