//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pickList: [],
    optionList: '',
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
      code: 0,
      value: 11
    },{
      code: 0,
      value: 12
    },{
      code: 0,
      value: 13
    },{
      code: 0,
      value: 14
    },{
      code: 0,
      value: 15
    },{
      code: 0,
      value: 16
    },{
      code: 0,
      value: 17
    },{
      code: 0,
      value: 18
    },{
      code: 0,
      value: 19
    },{
      code: 0,
      value: 20
    },{
      code: 0,
      value: 21
    }],
    title: '',
    gender: '',
    gender_code: '',
  },
  showPicker(e) {
    let optionList = e.target.dataset.name;
    this.setData({
      optionList
    })
    switch (optionList) {
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
    let code = e.detail.code;
    let value = e.detail.value;
    let type = this.data.optionList;
    switch (type) {
      case 'genderList':
        this.setData({
          gender_code: code,
          gender: value
        })
        break
      case 'zjTypeList':
        this.setData({
          zjType_code: code,
          zjType: value
        })
        break
      case 'ageList':
        this.setData({
          age_code: code,
          age: value
        })
        break
    }
  }
})
