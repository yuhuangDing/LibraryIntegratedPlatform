<template>
    <div class="newsinfo-container">
        <!--    大标题-->
        <h3 class="titile">{{newsinfo.title}}</h3>
        <p class="subtitile">
            <span>发表时间：{{newsinfo.add_time|dataFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr/>
        <!-- 新闻内容-->
        <div class="content" v-html="newsinfo.content">
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
                this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.newsinfo=result.body.message[0]
                        console.log(result.body)
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
</style>