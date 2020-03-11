<template>
    <div>

        <ul class="mui-table-view myli">
            <transition-group enter-active-class="animated bounceInUp"
                              leave-active-class="animated bounceOutLeft" appear>
                <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">

                    <router-link :to="'/home/newsinfo/'+item.id">
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            <h3 class="myli" >{{item.title}}</h3>
                            <p class="mui-ellipsis">
                                <span>发表时间：{{item.add_time|dataFormat}}</span>
                                <span>点击：{{item.click}}次</span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </transition-group>



        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {

        data(){return{
            newslist:[]
        }},
        methods:{
            getnewslist(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(result=>{
                    if(result.body.status===0){
                        //获取成功
                        console.log(result.body.message)
                        this.newslist=result.body.message
                    }else{
                        Toast('获取失败')
                    }
                })
            }
        },
        created() {
            this.getnewslist()
        }
    }
</script>

<style scoped>
    .myli{
        font-size: 14px;
    }
    .mui-ellipsis{
        font-size: 12px;
        color: #226aff;
        display:flex;
        justify-content:space-between ;
    }
</style>