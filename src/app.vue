<template>
    <div class="app-container">
        <!--顶部导航条-->

        <mt-header fixed title="图书馆项目 *Building">
            <div slot="left" @click="goback()"  v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>
        <!--中部内容区域-->
        <transition>
            <router-view></router-view>
        </transition>

        <!--底部导航-->
        <!--底部  tarbar区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item1 " to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
           <router-link class="mui-tab-item1" to="/book">
                <span class="mui-icon mui-icon-extra mui-icon-extra-xiaoshuo"></span>
                <span class="mui-tab-label">图书</span>
            </router-link>

            <!---<router-link class="mui-tab-item1" to="/shopcar">
               <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                   <span class="mui-badge">0</span></span>
               <span class="mui-tab-label">购物车</span>
           </router-link>-->
           <router-link class="mui-tab-item1" to="/member">
               <span class="mui-icon mui-icon-contact"></span>
               <span class="mui-tab-label">我的</span>
           </router-link>
       </nav>

   </div>
</template>

<script>
   export default {
       name: "app",
       data(){
           return{
               flag:false
           }
       },
       created() {
           /*  if(this.$route.path==="/home"){
                 this.flag=false;
             }else {
                 this.flag=true
             }*/
           this.flag=this.$route.path==="/home"?false:true;
       },
       watch:{
           '$route.path':function (newVal) {
               if(newVal==="/home"){
                   this.flag=false
               }else {
                   this.flag=true
               }
           }
       },
       methods:{
           goback(){//返回上一页
               this.$router.go(-1)
           }
       }
   }
</script>

<style scoped>
   .v-enter{
       opacity: 0;
       transform: translateX(100%);
       position:absolute ;
   }
   .v-leave-to{
       opacity: 0;
       transform: translateX(-100%);
       position: absolute;
   }
   .v-enter-active,.v-leave-active{
       transition: all 0.5s ease;

   }

   .mint-header.is-fixed{
       z-index: 99;
   }
   .app-container{
       padding-top: 41px;
       padding-bottom:50px;
       overflow-x: hidden;
       background-color: white;

   }
   .mui-bar-tab .mui-tab-item1.mui-active {
       color: #007aff;
   }

   .mui-bar-tab .mui-tab-item1 {
       display: table-cell;
       overflow: hidden;
       width: 1%;
       height: 50px;
       text-align: center;
       vertical-align: middle;
       white-space: nowrap;
       text-overflow: ellipsis;
       color: #929292;
   }

   .mui-bar-tab .mui-tab-item1 .mui-icon {
       top: 3px;
       width: 24px;
       height: 24px;
       padding-top: 0;
       padding-bottom: 0;
   }

   .mui-bar-tab .mui-tab-item1 .mui-icon~ .mui-tab-label {
       font-size: 11px;
       display: block;
       overflow: hidden;
       text-overflow: ellipsis;
   }
</style>