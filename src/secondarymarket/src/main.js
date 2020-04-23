import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
Vue.prototype.$store = store;

import base from './assets/css/base.css';
Vue.use(base);

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
  Field,
  Cell, 
  CellGroup,
  Rate
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
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Rate)
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
