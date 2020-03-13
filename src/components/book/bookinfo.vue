<template>
    <div class="bookinfo-box">
        <!--图书信息卡片-->
        <div class="mui-card">
            <div class="mui-card-header">书名：{{bookInfoList.bookname}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <img src="../../images/icon-man.png" >
                </div>
            </div>
            <div class="mui-card-footer">
                <!--图书相关数据信息，和提示--->
                <div>
                    <h2 class="bookinfo-title">图书信息</h2>
                    <p class="bookinfo-p">图书ISBN：<span>{{bookInfoList.isbn}}</span><p/>
                    <p class="bookinfo-p">作者：<span>{{bookInfoList.bookwriter}}</span></p>
                    <p class="bookinfo-p" v-show="flag">馆藏余量：<span class="bookinfo-span">{{bookInfoList.booknum}}</span></p>
                    <p class="bookinfo-p" v-show="flag1">馆藏余量：<span class="bookinfo-span" style="color: red">{{bookInfoList.booknum}}</span></p>
                    <div class="bookinfo-p-1" v-show="flag">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-order bookinfo-spanIcon"></span><span class="bookinfo-text-span">可预约</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="mui-icon mui-icon-extra mui-icon-extra-dictionary bookinfo-spanIcon"></span><span class="bookinfo-text-span"   >可到馆借阅</span>
                    </div>
                    <div class="bookinfo-p-2" v-show="flag1">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-order bookinfo-spanIcon"></span><span class="bookinfo-text-span">不可预约</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="mui-icon mui-icon-extra mui-icon-extra-dictionary bookinfo-spanIcon"></span><span class="bookinfo-text-span">不可到馆借阅</span>

                    </div>

                </div>

            </div>
        </div>
        <div class="bookinfo-button">
            <div class="bookinfo-button-group">
                <mt-button type="primary" size="normal" v-show="flag">预约图书</mt-button>
                <mt-button type="primary" size="normal" v-show="flag" @click="openComment">参与书评</mt-button>
                <mt-button type="primary" size="normal" v-show="flag">查看简介</mt-button>
            </div>
            <div class="bookinfo-button-group">
                <mt-button type="danger" size="normal" v-show="flag1" disabled>预约图书</mt-button>
                <mt-button type="primary" size="normal" v-show="flag1"  @click="openComment">参与书评</mt-button>
                <mt-button type="primary" size="normal" v-show="flag1">查看简介</mt-button>
            </div>
        </div>
        <comment v-show="commentflag" ref="child"></comment>
    </div>
</template>

<script>
    import comment from "../cubcomponent/comment.vue";
    import {Toast} from "mint-ui";
    export default {
        name: "bookinfo",
        components: {comment},
        data(){
            return {
                id:this.$route.params.id,//保存图书id
                bookInfoList:[],//保存图书数据
                flag:true,//设定是否可借阅，预约
                flag1:false,//设定是否可借阅，预约，不可借阅提示
                commentflag:false,//评论控制
                comments:[],//保存评论数据
            }
        },
        methods:{
            getBookInfo(id){
                this.$http.get("http://127.0.0.1:5000/api/bookinfo?id="+id).then(result=>{
                    if(result.status===200){
                        this.bookInfoList=result.body.message;
                        this.$store.commit('addisbn',result.body.message.isbn)
                        if(parseInt(result.body.message.booknum)===0){
                            this.flag=false;
                            this.flag1=!this.flag1;
                        }
                    }
                });


            },
            openComment(){
                /*
                this.commentflag=!this.commentflag;
            }*/
                //this.getcomments(this.isbn)
                this.commentflag=!this.commentflag;
                this.$refs.child.getComments();
            }
        },
        created() {
            this.getBookInfo(this.id)
        },

    }
</script>

<style scoped>
    .bookinfo-box{

    }
    .bookinfo-title{
        font-size: 18px;
        margin-bottom: 10px;
    }
    .bookinfo-p{
        font-size: 16px;
        color: #555555;
    }
    .bookinfo-span{
        font-size: 16px;
        font-weight: bold;
        color: #5092f0;
    }
    .bookinfo-p-1{
        font-size: 13px ;
        color:#5092f0;
        display: flex;
        justify-content: space-between;
    }
    .bookinfo-p-2{
        font-size: 13px ;
        color: #ff2d3c;
        display: flex;
        justify-content: space-between;
    }
    .bookinfo-spanIcon{
        font-size: 25px ;
    }
    .bookinfo-text-span{
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 15px;
    }
    .bookinfo-button{

        display: flex;
        justify-content: center;

    }
    .bookinfo-button-group{
        ;
    }
</style>