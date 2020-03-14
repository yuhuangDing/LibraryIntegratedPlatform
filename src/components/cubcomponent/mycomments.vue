<template>
    <div>

        <h3 class="mycomment-h3"><span class="mui-icon mui-icon-chatboxes mycomment-title-icon"></span>我的评论</h3>
        <hr/>
        <div class="mui-card" v-show="flag">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="mycomment-w-p">当前暂无评论数据哦，快去评论吧！</p>

                </div>
            </div>
        </div>
        <div class="mui-card" v-for="item in Mycomments" :key="item.id">
            <div class="mui-card-header">
                <div>
                    <p class="mycomment-pl-p">评论图书：{{item.bookname}}</p>
                    <p class="mycomment-pl-p">评论时间：{{item.time|dataFormat}}<a href="#" class="mycomment-a-delete"><span class="mui-icon mui-icon-close"></span>删除此评论</a></p>

                </div>
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <div>
                       <p class="mycomment-pl-p">评论内容：</p>
                       <p class="mycomment-text">{{item.comment}}</p>
                   </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import {setCookie,getCookie} from '../../assets/js/cookie.js'
    export default {
        name: "mycomments",
        data(){
            return {
                Mycomments:[],//保存所有评论
                flag:false,
                username:this.$store.getters.getUserName,
            };
        },
        methods:{
            getMyComments(){
                var name = getCookie('username');
              //  console.log("http://127.0.0.1:5000/api/getusercomment?username="+name);
                this.$http.get("http://127.0.0.1:5000/api/getusercomment?username="+name).then(result=>{
                    if(result.status===200){
                        console.log(result.body);
                        if(result.body.message.length===0)
                            this.flag=true;
                        else this.Mycomments=result.body.message;
                       // console.log('/***********'+this.Mycomments)
                    }
                });
            },

        },
        created() {
            this.getMyComments();
        }
    }
</script>

<style scoped>
    .mycomment-title-icon{
        color: #555555;
        margin-right: 5px;
        margin-left: -20px;
        font-size: 30px;
    }
    .mycomment-h3{
        text-align: center;
        font-size: 30px;
        color: #555555;
        margin: 10px 0;
    }
    .mycomment-w-p{
        font-size: 18px;
        text-align: center;
        color: #555555;
        margin-top: 2px;

    }
    .mycomment-a-delete{
        margin-left: 20px;
        color: red;
    }
    .mycomment-pl-p{
        font-size: 14px;
        font-weight: bold;
        color: #242424;
    }
    .mycomment-text{
        color: #6d6d72;
        font-size: 15px;
    }
</style>