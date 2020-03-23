<template>
    <div class="bookinfo-box">

        <!--图书信息卡片-->
        <div class="mui-card">
            <div class="mui-card-header">书名：{{bookInfoList.bookname}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="bookinfo-img">
                        <img class="imgclass" :src="bookInfoList.bookimg" >
                    </div>

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
                <mt-button type="primary" size="normal" v-show="flag" @click="orderbook">预约图书</mt-button>
                <mt-button type="primary" size="normal" v-show="flag" @click="openComment">参与书评</mt-button>
                <mt-button type="primary" size="normal" v-show="flag" @click="openbookinfo">查看简介</mt-button>
            </div>
            <div class="bookinfo-button-group">
                <mt-button type="danger" size="normal" v-show="flag1" disabled>预约图书</mt-button>
                <mt-button type="primary" size="normal" v-show="flag1"  @click="openComment">参与书评</mt-button>
                <mt-button type="primary" size="normal" v-show="flag1" @click="openbookinfo">查看简介</mt-button>
            </div>
        </div>
        <comment v-show="commentflag" ref="child"></comment>
        <div class="mui-card" v-show="bookinfoflag">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="bookinfo-text"> {{bookInfoList.bookinfo}}</p>

                </div>
            </div>
        </div>
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
                bookinfoflag:false,//保存图书简介标志
                jjj:'data:image/png;base64,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'
            }
        },
        methods:{
            getBookInfo(id){
                this.$http.get("http://127.0.0.1:5000/api/bookinfo?id="+id).then(result=>{
                    if(result.status===200){
                        this.bookInfoList=result.body.message;
                        console.log('888'+JSON.stringify(result.body.message.bookimg))
                        this.$store.commit('addisbn',result.body.message.isbn);
                        localStorage.setItem('isbn',result.body.message.isbn);
                        this.$store.commit('addbookname',result.body.message.bookname);
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
                this.bookinfoflag=false;
            },
            openbookinfo(){
                this.bookinfoflag=!this.bookinfoflag;
                this.commentflag=false;
            },
            orderbook(){
                this.$router.push({
                    path: "/book/orderbook/" +this.id,
                    // name: 'mallList',
                    // query: {
                    //     id: this.id
                    // }
                })
            },
        },
        created() {
            this.getBookInfo(this.id);

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
    .bookinfo-text{
        margin: 5px;
        font-size: 18px;
        color: black;
    }
    .bookinfo-img{
        display: flex;
        justify-content: center;
    }
    .imgclass{
        height: 240px;
        width: 210px;
    }

</style>