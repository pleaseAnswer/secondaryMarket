//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pickList: [],
    optionType: '',
    genderList: [{
      code: 0,
      value: '男'
    },{
      code: 1,
      value: '女'
    }],
    zjTypeList:[{
      code: 0,
      value: '居民身份证'
    },{
      code: 1,
      value: '户口簿'
    }],
    ageList: [{
      code: 0,
      value: 10
    },{
      code: 1,
      value: 11
    },{
      code: 2,
      value: 12
    },{
      code: 3,
      value: 13
    },{
      code: 4,
      value: 14
    },{
      code: 5,
      value: 15
    },{
      code: 6,
      value: 16
    },{
      code: 7,
      value: 17
    },{
      code: 8,
      value: 18
    },{
      code: 9,
      value: 19
    },{
      code: 10,
      value: 20
    },{
      code: 11,
      value: 21
    }],
    title: '',
    cancelText: '取消',
    gender: '',
    gender_code: '',
  },
  showPicker(e) {
    let optionType = e.target.dataset.name;
    this.setData({
      optionType
    })
    switch (optionType) {
      case 'genderList':
        this.setData({
          title: '请选择性别',
          pickList: this.data.genderList,
        })
        break
      case 'zjTypeList':
        this.setData({
          title: '请选择证件类型',
          pickList: this.data.zjTypeList,
        })
        break
      case 'ageList':
        this.setData({
          title: '请选择年龄',
          pickList: this.data.ageList,
        })
        break
    }
    var option = this.selectComponent('#pickComponent');
    option.showPicker()
  },
  makeSureOption(e) {
    let oIndex = e.detail.oIndex;
    let type = this.data.optionType;
    let pickList = this.data.pickList;
    console.log(oIndex, type, pickList);
    switch (type) {
      case 'genderList':
        this.setData({
          gender_code: pickList[oIndex].code,
          gender: pickList[oIndex].value
        })
        break
      case 'zjTypeList':
        this.setData({
          zjType_code: pickList[oIndex].code,
          zjType: pickList[oIndex].value
        })
        break
      case 'ageList':
        this.setData({
          age_code: pickList[oIndex].code,
          age: pickList[oIndex].value
        })
        break
    }
  }
})
