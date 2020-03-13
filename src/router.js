//抽出路由组件


import VueRouter from "vue-router";

//导入组件
import HomeComponent from "./components/tarbar/HomeComponent.vue";
import MemberCompenent from "./components/tarbar/MemberCompenent.vue";
import versionInfo from "./components/cubcomponent/versionInfo.vue";
import login from "./components/cubcomponent/login.vue";
import register from "./components/cubcomponent/register.vue";
import loginsuccess from "./components/cubcomponent/loginsuccess.vue";
import newsinfo from "./components/news/newsinfo.vue";
import bookComponent from "./components/tarbar/bookComponent.vue";
import error from "./components/cubcomponent/error.vue";
import userinfo from "./components/cubcomponent/userinfo.vue";
import root from "./components/cubcomponent/root.vue";
import bookinfo from "./components/book/bookinfo.vue";
var router=new VueRouter({
    routes:
        [
            {path:'/',redirect:'/home'},
            {path:'/home',component:HomeComponent},
            {path:'/member',component:MemberCompenent},
            {path:'/member/version',component:versionInfo},
            {path:'/member/loginuser',component:login},
            {path:'/member/register',component:register},
            {path:'/member/su',component:loginsuccess},
            {path:'/home/newsinfo/:id',component:newsinfo},
            {path:'/book',component:bookComponent},
            {path:'/error',component:error},
            {path:'/member/su/userinfo',component:userinfo},
            {path:'/member/su/root',component:root},
            {path:'/book/bookinfo/:id',component:bookinfo}

        ],
    linkActiveClass:'mui-active'//覆盖选择高亮类，
});

export default router//暴露路由对象