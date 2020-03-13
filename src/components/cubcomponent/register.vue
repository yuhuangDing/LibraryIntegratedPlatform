<template>
    <div>
        <div class="imgDiv">
            <img src="../../images/p.png"  class="logo" >
        </div>
        <h3 class="logo-h3">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</h3>
        <hr class="hr-class"/>
        <!---信息区域--->
        <div class="mydiv-info">
            <form class="info-form">
                <label class="infotext">用户名：</label>
                <input type="text" v-model="username" class="infoinput"><br/>
                <label class="infotext">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                <input type="password" v-model="password"  class="infoinput"><br/>
                <label class="infotext">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</label>
                <input type="text" v-model="email"  class="infoinput"><br/>
                <label class="infotext">手机号：</label>
                <input type="text" v-model="phone"  class="infoinput">
            </form>
        </div>

        <!-- 操作区域 -->
        <mt-button size="large" class="mybutton" @click="registeruser" >注&nbsp;&nbsp;&nbsp;&nbsp;册</mt-button>
        <div class="span-text" >
            <p >已有账户点击<router-link to="/member/loginuser">登陆</router-link></p>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "register",
        data(){
            return{
                username:'',
                password:'',
                email:'',
                phone:'',
                userps:'1'
            }
        },
        methods:{
            registeruser(){
                if(this.username.length===0||this.password.length===0||this.email.length===0||this.phone.length===0){
                    Toast({
                        message: '个人信息可能为空，请重新输入！',
                        duration: 5000
                    });
                    this.username=this.password=this.email=this.phone=''
                }else {
                    let data = {'username':this.username,'password':this.password,'email':this.email,'phone':this.phone,userps:this.userps};
                    this.$http.post('http://127.0.0.1:5000/api/adduser',data).then((res)=>{
                        console.log(res);
                        console.log(res.body.list);
                        if(res.status === 200){
                           Toast("注册成功");
                            this.username=this.password=this.email=this.phone='';
                            /*注册成功之后再跳回登录页*/
                            setTimeout(function(){
                              this.$router.push('/member/loginuser')
                            }.bind(this),1000);
                        }else if(res.status === 100||res.status === 101){
                            Toast("注册失败");
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    /* 修改默认 butoon 的样式  */
    .mint-button--default {
        background: -webkit-linear-gradient(left, #ffca1b, #ff8c0e) no-repeat;
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
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .logo{
        width: 80px;
        height: 80px;
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
        border-color: #f4bd4d;
        box-shadow: 0 0 15px #f4a031;

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
</style>