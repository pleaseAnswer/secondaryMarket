import { my } from '@/api';
let cart = ({
    state: {
        cartlength: 0,
        active: 0,
    },
    getters: {
        cartlength(state) {
            console.log(123, state.cartlength);
            
            return state.cartlength;
        }
    },
    actions: {
        // 获取收藏数
        async getNumber() {
            console.log(123);
            
            if(sessionStorage.getItem('id')) {
                let res = await my.get("/user/collectList", { signId: sessionStorage.getItem('id') });
                if(res.data.status == 200) {
                    this.state.cartlength = res.data.data.length;
                }
                console.log('this.cartlength',this.state,this.state.cartlength);   
            }
        } 
    }
})
export default cart;