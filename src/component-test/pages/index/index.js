//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  goto(e) {
    let type = e.target.dataset.name;
    console.log(type);
    switch(type) {
      case 'pickerDemo':
        wx.navigateTo({
          url: '../views/pickerDemo/pickerDemo'
        })
        break
      case 'pickerDemo2':
        wx.navigateTo({
          url: '../views/pickerDemo2/pickerDemo2'
        })
        break
      case 'pickerColDemo':
        wx.navigateTo({
          url: '../views/pickerColDemo/pickerColDemo'
        })
        break
      default:
        wx.showToast({
          title: '该功能未开发完善...',
          icon: 'none',
          duration: 2000
        })

    }
  }
})
