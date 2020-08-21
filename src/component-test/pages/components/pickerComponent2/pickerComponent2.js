Component({
  properties: {
    pickList: {
      type: Array,
      value: ''
    },
    title: {
      type: String,
      value: '请选择'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
  },
  data: {
    value: '',
    oIndex: 0,
    isShow: false
  },
  methods: {
    sureOption(e) {
      let type = e.target.dataset.type;
      if(type == 0) {
        this.setData({
          isShow: false
        })
      } else {
        this.triggerEvent('myevent',{ oIndex: this.data.oIndex ? this.data.oIndex : 0})
        this.setData({
          isShow: false
        })
      }
    },
    bindchange(e) {
      console.log(e.detail.value[0]);
      let oIndex = e.detail.value[0]
      this.setData({
        oIndex 
      })
    },
    cancelShow() {
      this.setData({
        isShow: false
      })
    },
    showPicker: function() {
      this.setData({
        isShow: true,
        oIndex: 0
      })
    }
    
  }
})