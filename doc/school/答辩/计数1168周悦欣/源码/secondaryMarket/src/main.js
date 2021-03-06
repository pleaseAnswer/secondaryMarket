import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)

import store from './store'
Vue.prototype.$store = store;

import base from './assets/css/base.css';
Vue.use(base);

window.EventBus = new Vue()

// 使用vant组件
import '@vant/touch-emulator';
import 'vant/lib/index.css';
import {
  Tabbar, 
  TabbarItem, 
  Icon, 
  Swipe, 
  SwipeItem,
  Grid, 
  GridItem,
  Col, 
  Row,
  TreeSelect,
  NavBar,
  Search,
  Lazyload,
  DropdownMenu, 
  DropdownItem,
  Collapse, 
  CollapseItem,
  Form,
  Picker,
  Popup,
  Field,
  Cell, 
  CellGroup,
  Rate,
  SwipeCell,
  Button,
  Card,
  Uploader,
  Tab,
  Tabs,
  Notify,
  Dialog,
  Toast,
  Image as VanImage,
} from 'vant';
Vue.use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(Col)
  .use(Row)
  .use(TreeSelect)
  .use(Search)
  .use(NavBar)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Form)
  .use(Picker)
  .use(Popup)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Rate)
  .use(SwipeCell)
  .use(Button)
  .use(Card)
  .use(Uploader)
  .use(Tab)
  .use(Tabs)
  .use(Notify)
  .use(VanImage)
  .use(Dialog)
  .use(Toast)
  .use(Lazyload,{
    lazyComponent: true,
  });

//使用axios
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
