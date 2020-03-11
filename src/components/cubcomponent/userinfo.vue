<template>
    <div>
        <h1 class="userinfo-h3">{{username}}，你好！</h1>
        <div class="myicon">
            <img src="../../images/yh.png" class="myicon-img">
        </div>

        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <label class="lable-info">用户名：</label>
                <span>{{username}}</span>
            </li>
            <li class="mui-table-view-cell">
                <label class="lable-info">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</label>
                <span>{{email}}</span>
            </li>
            <li class="mui-table-view-cell">
                <label class="lable-info">手机号：</label>
                <span>{{phone}}</span>
            </li>
            <li class="mui-table-view-cell">
                <label class="lable-info">用户权限：</label>
                <span>{{userps}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
    export default {
        name: "userinfo",
        data(){
            return {
                username:'',
                email:'',
                phone:'',
                userps:''
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
        margin-top: 15px;
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
    }
    .userinfo-h3{
        margin-top: 10px;
        margin-bottom: 10px ;
        text-align: center;
        font-size: 35px;
        color: #555555;
    }
    .lable-info{
       margin-right: 20px;
    }
</style>