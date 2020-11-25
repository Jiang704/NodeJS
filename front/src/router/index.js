import Vue from 'vue'

import Router from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import Register from "../views/Register";
import HomeService from "../views/HomeService";
import HomePro from "../views/HomePro";
import HelloWorld from "../components/HelloWorld";
import Data from "../components/Data";
import History from "../components/History";
import DataService from "../components/DataService";
import HistoryService from "../components/HistoryService";
import HistoryPro from "../components/HistoryPro";
import DataPro from "../components/DataPro";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes:[
    {
      path:'/',
      name:'Login',
      component:Login
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path:'/home',
      name:'Home',
      redirect: '/home/History',
      component:Home,
      children : [
        {
          name : "HelloWorld",
          path : "HelloWorld",
          component : HelloWorld
        },
        {
          name : "Data",
          path : "Data",
          component : Data
        },{
          name : "History",
          path : "History",
          component : History
        }
        ]
    },
    {
      path:'/homeservice',
      name:'HomeService',
      redirect: '/homeservice/HistoryService',
      component:HomeService,
      children : [
        {
          name : "DataService",
          path : "DataService",
          component : DataService
        },{
          name : "HistoryService",
          path : "HistoryService",
          component : HistoryService
        }
      ]
    },
    {
      path:'/homepro',
      name:'HomePro',
      redirect: '/homepro/HistoryPro',
      component:HomePro,
      children : [
        {
          name : "DataPro",
          path : "DataPro",
          component : DataPro
        },{
          name : "HistoryPro",
          path : "HistoryPro",
          component : HistoryPro
        }
      ]
    }
  ]
})
