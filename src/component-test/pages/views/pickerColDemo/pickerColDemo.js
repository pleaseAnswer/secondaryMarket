//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    title: '请选择出生日期',
    cancelText: '取消',
    birth: ''
  },
  showPicker() {
    var option = this.selectComponent('#pickComponent');
    option.showPicker()
  },
  makeSureOption(e) {
    console.log(e);
    let year = e.detail.year;
    let month = e.detail.month;
    let day = e.detail.day;
    this.setData({
      birth: `${year}-${month}-${day}`
    })
  }
})
