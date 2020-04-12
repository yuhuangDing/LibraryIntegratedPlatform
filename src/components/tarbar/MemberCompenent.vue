<template>
    <div class="member-container">
        <h3 class="myicon-heartext">欢迎访问xx图书馆</h3>
        <div class="myicon">
            <img src="../../images/icon-man.png" class="myicon-img">
        </div>
        <h3 class="myicon-h3">欢迎登陆</h3>
        <div class="myicon-btn">
            <mt-button type="primary" plain size="normal" class="btn-dl" @click="login">登陆</mt-button>
            <mt-button type="danger" plain size="normal" class="btn-dl" @click="register">注册</mt-button>
        </div>
        <hr/>
        <div>

            <ul class="mui-table-view">
                <li class="mui-table-view-cell" @click="userinfo">个人信息</li>
                <li class="mui-table-view-cell" @click="yuyuebook">预约图书</li>
                <li class="mui-table-view-cell" @click="myyuyue">我的预约</li>
                <li class="mui-table-view-cell" @click="mypl">参与评论</li>
                <li class="mui-table-view-cell" @click="mypl">投诉建议</li>
                <router-link class="mui-table-view-cell" tag="li" to="/member/version">查看版本&开发日志</router-link>
                <hr/>
                <h3 style="text-align: center">功能内测区</h3>
                <router-link class="mui-table-view-cell" tag="li" to="/member/allseat">座位预约</router-link>
            </ul>
        </div>

    </div>
</template>

<script>
    import router from "../../router";
    import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
    export default {
        name: "MemberCompenent",
        data(){
            return{
                name:'',
            }
        },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname
            console.log(this.name)
            /*如果cookie存在，则跳转到登录成功*/
            if(uname !== ""){
                this.$router.push('/member/su')
            }
        },
        methods:{
            login(){
                this.$router.push({path:"/member/loginuser"})
            },
            register(){
                this.$router.push({path:"/member/register"})
            },
            userinfo(){
                this.$router.push({path:"/error"})
            },
            yuyuebook(){
                this.$router.push({path:"/error"})
            },
            myyuyue(){
                this.$router.push({path:"/error"})
            },
            mypl(){
                this.$router.push({path:"/error"})
            }

        }

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