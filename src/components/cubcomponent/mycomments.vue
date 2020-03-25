<template>
    <div>

        <h3 class="mycomment-h3"><span class="mui-icon mui-icon-chatboxes mycomment-title-icon"></span>我的评论</h3>
        <hr style="width: 75%"/>
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
                    <p class="mycomment-pl-p">评论时间：{{item.time|dataFormat}}
                        <a v-show="item.displaycomment==='Y'" href="#" class="mycomment-a-delete" @click.prevent="delcomment(item.id)">
                            <span class="mui-icon mui-icon-close"></span>删除评论
                        </a>
                        <a v-show="item.displaycomment==='N'" class="mycomment-a-delete1">此评论已删除</a>
                    </p>

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
    import {Toast} from "mint-ui";
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
                this.$http.get("api/getusercomment?username="+name).then(result=>{
                    if(result.status===200){
                        console.log(result.body);
                        if(result.body.message.length===0)
                            this.flag=true;
                        else {
                            this.Mycomments=result.body.message;
                        }
                       // console.log('/***********'+this.Mycomments)
                    }
                });
            },
            delcomment(id){
                var mycommentdel='';
                this.Mycomments.some((item,i)=>{
                    if(item.id===id){
                        mycommentdel=item;
                        return;
                    }
                });
                console.log(mycommentdel);
                let data={username:mycommentdel.username,bookisbn:mycommentdel.bookisbn,comment:mycommentdel.comment};
                console.log(data);
                this.$http.post('api/delcomment',data).then(result=>{
                    if(result.status===200){
                        Toast({
                            message:"删除成功",
                            duration: 1000,
                        });
                    }else {
                        Toast({
                            message:"删除失败",
                            duration: 1000,
                        });
                    }
                });
                this.getMyComments();
            }
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
   .mycomment-a-delete1{
       margin-left: 20px;
       color: #ff8c0e;
    }
</style>