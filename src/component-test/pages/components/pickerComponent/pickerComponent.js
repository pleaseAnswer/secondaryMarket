Component({
  properties: {
    pickList: {
      type: Array,
      value: ''
    },
    title: {
      type: String,
      value: '请选择'
    }
  },
  data: {
    isShow: false
  },
  methods: {
    sureOption(e) {
      console.log(e);
      let code = e.target.dataset.code;
      let value = e.target.dataset.value;
      this.triggerEvent('myevent', { code, value })
      this.setData({
        isShow: false
      })
    },
    cancelShow() {
      this.setData({
        isShow: false
      })
    },
    showPicker: function() {
      this.setData({
        isShow: true
      })
    },
    
  }
})