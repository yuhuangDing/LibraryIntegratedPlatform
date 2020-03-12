<template>
    <div>

        <div class="myicon">
            <img src="../../images/yh.png" class="myicon-img">
        </div>
        <h1 class="userinfo-h3">{{username}}&nbsp;你好！</h1>
        <!--默认进入展示模式--->
        <ul class="mui-table-view" v-show="flag">
            <mt-cell title="用户名：">
                <span class="info-span">{{username}}</span>
                <img class="info-icon" slot="icon" src="../../images/info-username.png" width="25" height="25">
            </mt-cell>
            <mt-cell title="邮 箱：">
                <span class="info-span">{{email}}</span>
                <img class="info-icon" slot="icon" src="../../images/info-email.png" width="25" height="25">
            </mt-cell>
            <mt-cell title="手机号：">
                <span class="info-span">{{phone}}</span>
                <img class="info-icon" slot="icon" src="../../images/info-phone.png" width="25" height="25">
            </mt-cell>
            <mt-cell title="权限：">
                <span class="info-span">{{userps}}</span>
                <img class="info-icon" slot="icon" src="../../images/info-userps.png" width="25" height="25">
            </mt-cell>
        </ul>

        <!---个人信息编辑模式-->
        <div v-show="flag1">
            <ul class="mui-table-view" >
                <mt-cell title="用户名：">
                    <span class="info-span">{{username}}</span>
                    <img class="info-icon" slot="icon" src="../../images/info-username.png" width="25" height="25">
                </mt-cell>
                <mt-cell title="邮 箱：">
                    <img class="info-icon" slot="icon" src="../../images/info-email.png" width="25" height="25">
                    <input class="infoinput" type="text"  v-model="email">
                </mt-cell>
                <mt-cell title="手机号：">
                    <input class="infoinput" type="text"  v-model="phone">
                    <img class="info-icon" slot="icon" src="../../images/info-phone.png" width="25" height="25">
                </mt-cell>
                <mt-cell title="权限：">
                    <span class="info-span">{{userps}}</span>
                    <img class="info-icon" slot="icon" src="../../images/info-userps.png" width="25" height="25">
                </mt-cell>
            </ul>
            <mt-button size="large"  class="mybutton1" @click="reflashUser" >提交修改</mt-button>
            <mt-button size="large"  class="mybutton1" @click="back" >返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</mt-button>

        </div>


        <div class="info-button" v-show="flag">
            <mt-button size="normal" class="mybutton" @click="redoUserInfo" >修改个人信息</mt-button>
            <mt-button size="normal" class="mybutton" @click="redoUserPassword" >修改登陆密码</mt-button>
        </div>

        <!--密码修改区域--->
        <div v-show="flag2">
            <hr class="pwd-hr" />
            <h3 class="upadtepwd-h3">修改用户密码</h3>
            <mt-cell title="新密码">
                <input class="infoinput" type="password"  v-model="password">
                <img class="info-icon" slot="icon" src="../../images/pwd.png" width="25" height="25">
            </mt-cell>
            <mt-cell title="确认密码">
                <input class="infoinput" type="password"  v-model="password1">
                <img class="info-icon" slot="icon" src="../../images/pwd.png" width="25" height="25">
            </mt-cell>
            <mt-button size="large"  class="mybutton1" @click="updatepwd" >提交修改</mt-button>
            <mt-button size="large"  class="mybutton1" @click="back" >返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</mt-button>
        </div>

    </div>
</template>

<script>
    import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
    import {Toast} from 'mint-ui';
    export default {
        name: "userinfo",
        data(){
            return {
                username:'',
                email:'',
                phone:'',
                userps:'',
                password:'',
                password1:'',
                flag:true,//指定展示默认页面或者是切换到修改模式
                flag1:false,//指定个人编辑模式
                flag2:false,
            }
        },
        methods:{
            getuserinfo(){
                this.$http.get('http://127.0.0.1:5000/api/userinfo?username='+this.username).then((res)=>{
                    console.log(res);
                    console.log(res.body.message);
                    this.email=res.body.message.email;
                    this.phone=res.body.message.phone;
                    if(parseInt(res.body.message.userps)===1){
                        this.userps='普通用户';
                    }else if(res.body.message.userps==='admin'){
                        this.userps='超级管理员';
                    }

                })
            },
            redoUserInfo(){
                this.flag=!this.flag;
                this.flag1=!this.flag1;

            },
            redoUserPassword(){
                this.flag=false;
                this.flag1=false;
                this.flag2=!this.flag2
            },
            reflashUser(){
                this.flag1=!this.flag1;
                this.flag=!this.flag;

                let data = {'username':this.username,'email':this.email,'phone':this.phone};
                this.$http.post('http://127.0.0.1:5000/api/updateuserinfo',data).then((res)=>{
                        console.log(res);
                        console.log(res.body);
                        if(res.status === 200){
                            this.getuserinfo();
                            Toast("更新信息成功！");
                        }
                })
            },
            updatepwd(){
                if(this.password===this.password1){
                    let data = {'username':this.username,'password':this.password};
                    this.$http.post('http://127.0.0.1:5000/api/updateuserinfopwd',data).then((res)=>{
                        console.log(res);
                        console.log(res.body);
                        if(res.status === 200){
                            Toast("更新密码成功！");
                            this.$router.go(-1)
                        }
                    })
                }else {
                    Toast("两次输入的密码不一致！请重试！")
                    this.password=this.password1='';
                }
            },
            back(){
                this.flag=true;
                this.flag1=false;
                this.flag2=false;
            }
        },
        created() {
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username');
            this.username = uname;
            /*如果cookie不存在，则跳转到登录页*/
            if(uname === ""){
                this.$router.push('/error')
            }
            console.log(this.$store.getters.getUserName);
            this.getuserinfo();

        },

    }
</script>

<style scoped>
    .myicon-img{
        width: 100px;
        height: 100px;
        border: 3px #cccccc solid;
        border-radius: 50%;

    }
    .myicon{
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
    }
    .userinfo-h3{
        margin-top: 10px;
        margin-bottom: 20px ;
        text-align: center;
        font-size: 35px;
        color: #555555;
    }
    .lable-info{
       margin-right: 20px;
    }
    .info-icon{
        margin-right: 10px;
    }
    .info-span{
        font-weight: bold;
        font-size: 18px;
    }
    .mui-table-view{
        margin-bottom: 0;
    }
    /* 修改默认 butoon 的样式  */
    .mint-button--default {
        background: -webkit-linear-gradient(left, #ffc2f3, #b889ff) no-repeat;
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
    .mybutton{
         margin: 30px 0;
         width: 40%;

     }
    .mybutton1{
        margin-top: 5%;
    }
    .info-button{
        display: flex;
        padding: 0 6%;
        justify-content: space-between;
    }
    .infoinput{
        margin-top: 5%;
        margin-left: 10%;
        width: 90%;
        border-radius: 25px;

    }
    .infoinput:focus{
        border-style:solid;
        border-color: #5db5f4;
        box-shadow: 0 0 15px #03a9f4;

    }
    .upadtepwd-h3{
        text-align: center;
        color: #555555;
        margin: 15px 0;
    }
    .pwd-hr{
        width: 70%;
    }

</style>