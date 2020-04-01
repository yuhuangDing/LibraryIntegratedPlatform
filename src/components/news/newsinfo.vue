<template>
    <div class="newsinfo-container">
        <!--    大标题-->
        <h3 class="titile">{{newsinfo.newstitle}}</h3>
        <p class="subtitile">
            <span>发表时间：{{newsinfo.newsdate|dataFormat}}</span>
            <span>点击：{{newsinfo.times}}次</span>
        </p>
        <hr/>
        <!-- 新闻内容-->
        <div  >
            <div class="content">
                <img class="newspho" :src="newsinfo.newsimg" width="260px" height="180px">
            </div>
            <p class="newsinfo-p"> {{newsinfo.newsinfo}}</p>
        </div>



    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    //引入子组件
    export default {
        name: "newsinfo",
        data(){
            return {
                id:this.$route.params.id,//将url地址中传递的id值挂载到data上
                newsinfo:[]//新闻对象
            }
        },
        methods:{
            getnewsinfo(){
                this.$http.get('api/getidnews?id='+this.id).then(result=>{
                    if(result.status===200){
                        this.newsinfo=result.body.message[0];
                        console.log(result.body.message)
                    }else{
                        Toast('获取失败')
                    }

                })
            }
        },
        created() {
            this.getnewsinfo()
        }
    }
</script>

<style scoped>
    .newsinfo-container{
        padding:0px 8px 0px 8px;
    }
    .titile{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: #6d6d72;
    }
    .subtitile{
        font-size: 13px;
        color: #f0ad4e;
        display: flex;
        justify-content: space-between;

    }
    .newsinfo-p{
        font-size: 15px;
        line-height: 22px;
        text-indent: 2rem;
    }
    .content{
        text-align: center;
    }
    .newspho{
        margin: 0 auto;
    }
</style>