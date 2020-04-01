<template>
    <div>

        <ul class="mui-table-view myli">
            <transition-group enter-active-class="animated bounceInUp"
                              leave-active-class="animated bounceOutLeft" appear>
                <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">

                    <router-link :to="'/home/newsinfo/'+item.id">
                        <img class="mui-media-object mui-pull-left" :src="item.newsimg">
                        <div class="mui-media-body">
                            <h3 class="myli" >{{item.newstitle}}</h3>
                            <p class="mui-ellipsis">
                                <span>发表时间：{{item.newsdate|dataFormat}}</span>
                                <span>点击：{{item.times}}次</span>
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
                this.$http.get('api/getallnews').then(result=>{
                    if(result.status===200){
                        //获取成功
                      //  console.log(result.body.message);
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