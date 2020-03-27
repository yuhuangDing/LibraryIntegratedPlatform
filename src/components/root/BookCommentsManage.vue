<template>
    <div>
            <div class="title-index">
                <p class="title-index-p">
                    <img src="../../images/ts.png" width="25px" height="25px" style="  display: inline-block;vertical-align: middle;">
                    <span>图书名称：{{bookname}}</span>
                </p>
                <p class="title-index-p"    >
                    <img src="../../images/no.png" width="25px" height="25px" style="  display: inline-block;vertical-align: middle;">
                    <span>ISBN：{{bookisbn}}</span>
                </p>

            </div>
            <h3 style="text-align: center;font-size: 20px;color: #555555;margin: 20px 0;" v-show="ishavecomment===false">
                暂无评论数据！
            </h3>
        <div class="mui-card" v-for="item in bookCommentInfo" :key="item.kid">
            <!--页眉，放置标题-->
            <div class="mui-card-header">
                <div class="bcm-c-title">

                    <div class="bcm-c-r">
                        <p>用户：{{item.username}}</p>
                        <p>评论时间:{{item.time|dataFormat}}</p>
                    </div>
                </div>
            </div>
            <!--内容区-->
            <div class="mui-card-content">
                <div class="bcm-c-info">
                    <h4 class="bcm-c-info-h4">评论内容</h4>
                    <p>{{item.comment}}</p>
                </div>
            </div>
            <!--页脚，放置补充信息或支持的操作-->
            <div class="mui-card-footer">
                <div v-show="item.displaycomment==='N'">
                    <img src="../../images/qx.png" width="25px" heigt="25px"  style="  display: inline-block;vertical-align: middle;">
                    <span style="color: red;line-height:30px ">评论已删除</span>
                </div>
                <mt-button @click="delcomment(item.kid)" v-show="item.displaycomment==='Y'" class="bcm-btn" size="small" type="danger" plain>删除评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        name: "orderBookManage",
        data(){
            return{
                bookisbn:this.$route.params.isbn,
                bookname:this.$route.params.bookname,
                bookCommentInfo:[],//保存图书数据
                ishavecomment:true,//默认有评论
            }
        },
        methods:{
            getBookcommentsInfo(isbn){
                this.$http.get('api/getcomment?bookisbn='+this.bookisbn).then(result=>{
                    if(result.status===200){
                        this.bookCommentInfo=JSON.parse(result.body.message);

                        this.bookCommentInfo.forEach((item,i)=>{
                           item.kid=i;
                        });
                    //   console.log(this.bookCommentInfo)
                    }
                    if(this.bookCommentInfo.length===0){
                        this.ishavecomment=false;
                    }
                })

            },
            delcomment(id){
                var commentdel='';
                this.bookCommentInfo.some((item,index)=>{
                    if(item.kid===id){
                        commentdel=item;
                      //  this.bookCommentInfo.splice(index,1);
                        return;
                    }
                });
                let data={username:commentdel.username,bookisbn:commentdel.bookisbn,comment:commentdel.comment};
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
                this.getBookcommentsInfo(this.bookisbn);
            }
        },
        created() {
            this.getBookcommentsInfo(this.bookisbn);
        }
    }
</script>

<style scoped>
    .title-index{
        padding: 5px 0;


        height: 70px;
        width: 100%;
        background-color: #f2f2f2;
        border-radius: 10px;
        top: 38px;
        text-align: center;
    }
    .title-index-p{
        font-size: 16px;
        color: #555555;
    }
    .bcm-c-title{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .bcm-c-r{
        margin-right:25%;
    }
    .bcm-c-info{
        margin-left: 10px;
    }
    .bcm-c-info-h4{
        font-size: 15px;
        color: #555555;
    }
    .bcm-btn{
        display: flex;
        justify-items: right;
    }
</style>