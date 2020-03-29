<template>
    <div class="member-container">
        <h3 class="myicon-heartext">欢迎访问图书馆</h3>
        <div class="myicon">
            <img src="../../images/yh.png" class="myicon-img">
        </div>
        <h3 class="myicon-h3">欢迎用户</h3>
        <h4 class="myicon-h3">{{name}}</h4>

        <hr/>
        <div>
            <ul class="mui-table-view">
                <router-link to="/member/su/userinfo" class="mui-table-view-cell" tag="li">个人信息</router-link>
                <router-link class="mui-table-view-cell" to="/book" tag="li">预约图书</router-link>
                <router-link class="mui-table-view-cell" to="/myorder" tag="li">我的预约</router-link>
                <router-link class="mui-table-view-cell" to="/member/su/mycomment" tag="li" >我的评论</router-link>
                <router-link class="mui-table-view-cell" to="/member/su/suggest" tag="li" >投诉建议</router-link>
                <router-link class="mui-table-view-cell" to="/member/su/root" tag="li" v-show="flag">管理员面板</router-link>
            </ul>
        </div>
        <div class="myicon-btn">
            <mt-button type="primary" plain size="normal" class="btn-dl" @click="quit">退出登陆</mt-button>

        </div>

    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
    export default {
        name: "loginsuccess",
        data(){
            return {
                flag:false,//管理员选项展示
                name:''
            }
        },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username');
            this.name = uname;
            let admin=getCookie('Admin');
            if(this.$store.getters.getAdmin===true||admin==='admin'){
                this.flag=true;
            }else{
                this.flag=false;
            }
            /*如果cookie不存在，则跳转到登录页*/
            if(uname === ""){
                this.$router.push('/member/loginuser');
            }

        },
        methods:{
            quit(){
                delCookie('username');
                delCookie('Admin');
                this.$store.commit('openAdmin','quit');

                Toast({
                    message: '退出成功',
                    duration: 1000
                });
                this.$router.push('/home')
            }
        },

    }
</script>

<style scoped>
    .member-container{
        background-color: white;
        margin-top: 20px;

    }
    .myicon-heartext{
        text-align: center;
        font-size: 15px;
        color: #999999;
    }
    .myicon{
        margin-top: 15px;
        display: flex;
        justify-content: center;


    }
    .myicon-img{
        width: 100px;
        height: 100px;
        border: 3px #cccccc solid;
        border-radius: 50%;

    }
    .myicon-h3{
        margin-top: 15px;
        margin-bottom: 15px;
        text-align: center;
        font-size: 25px;
        color: #8f8f94;
    }
    .myicon-btn{
        margin:20px 0px ;
        display: flex;
        justify-content: center;
    }
    .btn-dl{
        margin: 0 10px;
    }
</style>