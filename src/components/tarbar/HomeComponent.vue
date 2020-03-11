<template>
    <div>
        <!--轮播区域-->
        <mt-swipe :auto="4000" class="swipe-box">
            <mt-swipe-item><img  class="swippho" src="../../images/p1.png"></mt-swipe-item>
            <mt-swipe-item><img  class="swippho" src="../../images/p2.png"></mt-swipe-item>
            <mt-swipe-item><img  class="swippho" src="../../images/p3.png"></mt-swipe-item>
        </mt-swipe>
        <!--图书馆公告-->
        <div class="gonggao">
            <div class="gonggao-icon">
                <span class="mui-icon-extra mui-icon-extra-new myicon"></span>
            </div>
            <h3 class="gonggao-h3">图书馆最新通知</h3>
            <div class="div-text-gonggao">
                <p>图书馆图书预约管理系统,目前正在测试中，欢迎各位用户注册使用本系统！本系统将提供一站式借书预约读者交流服务！
                节省你的宝贵时间！</p>
                <p class="div-text-gonggao-p">2020.3.1</p>
            </div>
        </div>
        <div>
            <h3 class="text-h3">图书馆要闻</h3>
        </div>
        <!--图书馆新闻-->
        <newslist></newslist>


    </div>
</template>

<script>
    import newslist from "../news/newslist.vue";
    export default {
        name: "HomeComponent",
        data(){
            return{
            }
        },
        components:{
            newslist
        }


    }
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
    }
    .swippho{
        width: 100%;
        height: 100%;
    }
    .swipe-box{

    }
    .gonggao{
        margin: 10px 20px 10px 20px;
        border-style: solid;
        border-color: #8f8f94;
        border-radius: 20px;
        height: 170px;
    }
    .myicon{
        color: #f0ad4e;
        font-size: 60px;
    }
    .gonggao-icon{
        display: block;
        margin-left:-24px ;
        margin-top: -10px;
        z-index: 20;
    }
    .gonggao-h3{
        color: #555555;
        font-size: 20px;
        display: flex;
        justify-content: center;
        margin-top: -40px;
    }
    .div-text-gonggao{
        margin:10px 22px;

    }
    .div-text-gonggao-p{
        text-align: right;
    }
    .text-h3{
        color: #555555;
        font-size: 25px;
        display: flex;
        justify-content: left;
        margin-left: 15px;
        margin-top: 15px;
        margin-bottom: 10px;
    }
</style>