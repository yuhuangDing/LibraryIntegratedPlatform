<template>
    <div class="member-container">
<!--        <h3 class="myicon-heartext">欢迎访问图书馆</h3>-->
        <div class="myicon">
            <img src="../../images/yh.png" class="myicon-img">
        </div>
        <h3 class="myicon-h3">欢迎用户</h3>
        <h4 class="myicon-h3">{{name}}</h4>

        <div class="suggest-box">
            <div class="suggest-title">&nbsp;今&nbsp;日&nbsp;推&nbsp;荐</div>
            <div class="suggest-item-emptry" v-if="classflag">
                <div>
                    <p class="suggestbookname" style="font-size: 16px;line-height: 80px;">暂无推荐，快去借书吧！</p>
                </div>
            </div>
            <router-link v-show="!classflag" tag="div" class="suggest-item" :to=" '/book/bookinfo/'+item.id" v-for="item in bookinfolist1" :key="item.id">
                <div class="suggestbook-img">
                    <img :src="item.bookimg" width="70" height="60">
                </div>
                <div>
                    <p class="suggestbookname">{{item.bookname}}</p>
                </div>
            </router-link>

        </div>
        <div>

            <ul class="mui-table-view">
                <router-link to="/member/su/userinfo" class="mui-table-view-cell" tag="li">个人信息</router-link>
                <router-link class="mui-table-view-cell" to="/book" tag="li">预约图书</router-link>
                <router-link class="mui-table-view-cell" to="/myorder" tag="li">我的图书预约单</router-link>
                <router-link class="mui-table-view-cell" to="/member/su/mycomment" tag="li" >我的评论</router-link>
                <router-link class="mui-table-view-cell" to="/member/su/myseat" tag="li" >我的座位预约</router-link>
                <router-link class="mui-table-view-cell" to="/member/su/suggest" tag="li" >投诉建议</router-link>
                <router-link class="mui-table-view-cell" to="/member/su/root" tag="li" v-if="flag">管理员面板</router-link>
            </ul>
        </div>
        <div class="myicon-btn">
            <mt-button type="danger" plain size="normal" class="btn-dl" @click="quit">退出登陆</mt-button>

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
                name:'',
                bookinfolist:[],
                bookinfolist1:[],
                classflag:false,
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
                delCookie('bookclassname');
                this.$store.commit('openAdmin','quit');
                Toast({
                    message: '退出成功',
                    duration: 1000
                });
                this.$router.push('/home')
            },

            getsuggestbookinfo(){
                console.log('hi'+getCookie('bookclassname'))
                var bookclass=getCookie('bookclassname')
                this.$http.get('api/getsuggestbooks?bookclass='+bookclass).then(result=>{
                    if(result.body.status===200){
                        this.bookinfolist=result.body.message;
                        this.bookinfolist=this.bookinfolist.reverse();
                        if(this.bookinfolist.length===0){
                            this.classflag=true;
                        }
                        if(this.bookinfolist.length>3){
                          this.bookinfolist.forEach((item,i)=>{
                              if(i>=3) return;
                              else{
                                  this.bookinfolist1.push(item);
                              }
                          })
                        }
                        console.log(this.bookinfolist1)
                    }
                })

            }
        },
        created() {
           //
            this.getsuggestbookinfo();
        }

    }
</script>

<style scoped>
    .suggest-box{
        position: relative;
        height: 100px;
        margin: 10px 10px ;
    }
    .suggest-title{
        margin: 8px 20px 5px 5px;
        float: left;
        writing-mode: vertical-rl;

    }
    .suggest-item{
        float: left;
        width: 90px;
        height: 100px;
        margin-left: 10px;
        margin-top: 5px;
        border:1px solid #cccccc;
        border-radius: 5px;
    }

    .suggest-item-emptry{
        float: left;
        width: 200px;
        height: 100px;
        margin-left: 10px;
        margin-top: 5px;
        border:1px solid #cccccc;
        border-radius: 5px;
    }
    .suggestbook-img{
        height: 60px;
        width: 70px;
        margin: 5px auto 0;

    }
    .suggestbookname{
        margin: 3px 0 0 0;
        font-size: 12px;
        color: #555555;
        text-align: center;
    }
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
        margin-top: 10px;
        display: flex;
        justify-content: center;

    }
    .myicon-img{
        width: 80px;
        height: 80px;
        border: 3px #cccccc solid;
        border-radius: 50%;

    }
    .myicon-h3{
        margin-top: 10px;
        margin-bottom: 10px;
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