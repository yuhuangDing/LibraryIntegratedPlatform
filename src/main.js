//入口文件
console.log('ok');
//vue引入以及首页初始化
import Vue from 'vue';
import app from '../src/app.vue';
//Mint—UI模块
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

//引入Vue-router
import VueRouter from "vue-router";
Vue.use(VueRouter);
import router from './router.js';
//引入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
//引入Mui
import '../lib/mui/css/mui.css';
import '../lib/mui/css/icon.css';
//定于全局表单数据提交格式
Vue.http.options.emulateJSON=true;
//mock拦截器
//import mock from './mock.js';

//引入动画库
import '../lib/animate.css'

//定于全局过滤器
import moment from 'moment'
Vue.filter('dataFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);

});
//引入vuex共享存储
import Vuex from 'vuex';
Vue.use(Vuex);
var store=new Vuex.Store({
    state:{
        //共享数据区
        username:'',//保存登陆后的用户名，便于获取个人信息页面的数据载入,
        admin:false,
        isbn:'',//保存isbn信息
        bookname:'',//保存图书名
    },
    mutations:{
        //共享数据读写方法
        addUserName(state,userName){
            console.log("添加用户数据到store成功");
            state.username=userName;
        },
        openAdmin(state,userps){
            if(userps==='admin'){
                state.admin=true;
            }else if(userps==='quit'){
                state.admin=false;
            }
        },
        addisbn(state,Isbn){
            state.isbn=Isbn;
        },
        addbookname(state,name){
            console.log('vuex获得的书名'+name);
            state.bookname=name;
        },
        delteAllAndExit(state){
            state.isbn='';
            state.username='';
            state.bookname='';
            state.admin=false;

        }
    },
    getters:{
        //共享数据访问方法
        getUserName:function (state) {
            console.log("调用方法")
            return state.username;
            //获取用户名
        },
        getAdmin:function (state) {
            return state.admin;
        },
        getisbn:function (state) {
            return state.isbn;
        },
        getbookname:function (state) {
            return state.bookname;//获取书名
        }
    }
});
//全局请求地址
Vue.http.options.root='http://134.175.245.202:5000';
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store

});