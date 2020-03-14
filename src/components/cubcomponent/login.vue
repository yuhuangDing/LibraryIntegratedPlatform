<template>
    <div>
        <div class="imgDiv">
            <img src="../../images/books.png" alt="" class="logo" >
        </div>
        <h3 class="logo-h3">用 户 登 陆</h3>
        <hr class="hr-class"/>

        <!---信息区域--->
        <div class="mydiv-info">
                <form class="info-form">
                <label class="infotext">用户名：</label>
                <input type="text" v-model="userinfo.username" class="infoinput"><br/>
                <label class="infotext">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                <input type="password" v-model="userinfo.password"  class="infoinput">
                </form>
        </div>
        <!-- 操作区域 -->
        <mt-button size="large" class="mybutton" @click="testinfo" >登&nbsp;&nbsp;&nbsp;&nbsp;录</mt-button>
        <div class="span-text" >
            <p >暂无账户点击<router-link to="/member/register">注册</router-link></p>
        </div>


    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import {setCookie,getCookie} from '../../assets/js/cookie.js'
    export default {
        name: "login",
        mounted(){
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            if(getCookie('username')){
                this.$router.push('/member/su')
            }
        },
        data(){
            return{
                userinfo: {
                    username: '',//用户名
                    password: ''//密码
                },

            }
        },
        methods:{
            testinfo(){
                if(this.userinfo.username.length!==0&&this.userinfo.password.length!==0)
                {
                    //发送请求
                    //let data = {'username':this.userinfo.username,'password':this.userinfo.password}
                   var tusername=this.userinfo.username;
                    var tpassword=this.userinfo.password;
                    /*接口请求*/
                    this.$http.get('http://127.0.0.1:5000/api/login?username='+tusername+'&password='+tpassword).then((res)=>{
                        console.log(res);
                        console.log(res.body.message);
                        if(res.status===200){
                            /*接口的传值是(0,密码错误)，检测管理员账号的值*/
                            if(parseInt(res.body.ups) === 0){
                                Toast( "用户不存在或信息错误，请重试！");
                                this.userinfo.username=this.userinfo.password='';
                            }else if(res.body.message.userps === 'admin'){
                                /*路由跳转this.$router.push*/
                                ///检测管理员
                                this.$router.push('/member/su');
                                this.$store.commit('openAdmin','admin');
                                this.$store.commit('addUserName',this.userinfo.username);
                                setCookie('username',this.userinfo.username,1000*60);
                            }else if(parseInt(res.body.message.userps) === 1){
                                Toast(  {
                                    message: "登录成功",
                                    duration: 1000
                                });
                                setCookie('username',this.userinfo.username,1000*60);
                                this.$store.commit('addUserName',this.userinfo.username);
                                console.log(this.$store.getters.getUserName)
                                setTimeout(function(){
                                    this.$router.push('/member/su')
                                }.bind(this),300);
                            }
                        }
                    })

                }else{
                    Toast({
                        message: '用户名或密码为空',
                        duration: 2000
                    });
                    this.userinfo.username=this.userinfo.password=''

                }

            }
        }


    }
</script>

<style scoped>
    /* 修改默认 butoon 的样式  */
    .mint-button--default {
        background: -webkit-linear-gradient(left, #58cfff, #5d77ff) no-repeat;
        border-radius: 25px;
        color: #fff;
        height: 48px;
    }
    /* 同上 */
    .mint-button--primary {
        border-radius: 25px;
        height: 48px;
        background-color: transparent;
        border: 1px solid #7bb6ff;
        color: #5d77ff
    }
    .imgDiv{
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
    .logo{
        width: 100px;
        height: 100px;
    }
    .logo-h3{
        font-size: 25px;
        text-align: center;
        color: #555555;
        margin-top: 5px;
    }
    .hr-class{
        width: 80%;
        margin-top: 20px;

    }
    .mydiv-info{
        display: flex;
        justify-content: center;
        margin: 30px 0 ;
        padding-left: 20px;
        padding-right: 20px;

    }
    .infoinput{
        width: 70%;
        border-radius: 25px;
    }
    .info-form{
        display: block;
    }
    .infoinput:focus{
        border-style:solid;
        border-color: #5db5f4;
        box-shadow: 0 0 15px #03a9f4;

    }
    .infotext{
        color: #555555;
        font-size: 20px;
    }
    .span-text{
        font-size: 13px;
        color: #8f8f94;
        float: right;
        margin-top: 10px;
        margin-right: 20px;
    }
/*
 testinfo(){
                if(this.userinfo.username.length!==0&&this.userinfo.password.length!==0)
                {
                    //发送请求
                    //let data = {'username':this.userinfo.username,'password':this.userinfo.password}
                   var tusername=this.userinfo.username
                    var tpassword=this.userinfo.password
                    //接口请求
    this.$http.get('http://127.0.0.1:5000/api/login?username='+tusername).then((res)=>{
    console.log(res)
    console.log(res.body.message)
    if(res.status===200){
    //接口的传值是(-1,该用户不存在),(0,密码错误)，检测管理员账号的值
    if(res.body.message.ups === -1){
    Toast( "该用户不存在")
    this.userinfo.username=this.userinfo.password=''
    }else if(res.body.message.ups === 0){
    Toast(  "密码输入错误")
    this.userinfo.password=''
    }else if(res.body.message.ups === 'admin'){
    //路由跳转this.$router.push
    //检测管理员
    this.$router.push('/main').
    }else if(parseInt(res.body.message.userps) === 1){
    Toast(  "登录成功")*//*
    setCookie('username',this.userinfo.username,1000*60)
    setTimeout(function(){
        this.$router.push('/member/su')
    }.bind(this),1000)
    }
    }
    })*//*

    }else{
    Toast({
        message: '用户名或密码为空',
        position: 'bottom',
        duration: 2000
    });
    this.userinfo.username=this.userinfo.password=''

    }*//*

    }
*/
</style>