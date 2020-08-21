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
        years: [],
        months: [],
        days: [],
        isShow: false,
        year: '',
        month: '',
        day: ''
        
    },
    methods: {
        makeList() {
            const date = new Date()
            let years = []
            let months = []
            let days = []
            
            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
            }
            
            for (let i = 1; i <= 12; i++) {
                months.push(i)
            }
            
            for (let i = 1; i <= 31; i++) {
                days.push(i)
            }
            this.setData({
                years,
                months,
                days
            })
        },
        bindchange(e) {
            console.log(e);
            const val = e.detail.value
            this.setData({
                year: this.data.years[val[0]],
                month: this.data.months[val[1]],
                day: this.data.days[val[2]]
            })
        },
        cancelShow() {
            this.setData({
              isShow: false
            })
        },
        sureOption(e) {
            let type = e.target.dataset.type;
            if(type == 0) {
                this.setData({
                    isShow: false
                })
            } else {
                let year = this.data.year ? this.data.year : 1990
                let month = this.data.month ? this.data.month : 1
                let day = this.data.day ? this.data.day : 1
                this.triggerEvent('myevent',{ year, month, day})
                this.setData({
                    isShow: false
                })
            }
        },
        showPicker: function() {
            this.setData({
                isShow: true,
                year: 1990,
                month: 1,
                day: 1
            })
        },
    },
    attached() {
        this.makeList()
    }
})