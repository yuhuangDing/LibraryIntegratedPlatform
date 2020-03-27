<template>
    <div>
        <h3 class="mycomment-h3"><span class="mui-icon mui-icon-extra mui-icon-extra-topic mycomment-title-icon"></span>我的预约</h3>
        <hr style="width: 75%"/>
        <div class="mui-card" v-show="flag">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="mycomment-w-p">当前暂无预约数据哦，快去预约图书吧！</p>
                </div>
            </div>
        </div>
        <div class="mui-card" v-for="item in Myorder" :key="item.id">
            <div class="mui-card-header">
                <div>
                    <p class="mycomment-pl-p">预约图书：{{item.bookname}}</p>
                    <p class="mycomment-pl-p">预约图书ISBN：{{item.isbn}}</p>
                    <p class="mycomment-pl-p">预约数量：{{item.orderbooknum}}</p>
                    <p class="mycomment-pl-p">预约提交时间：{{item.ordertime|dataFormat}}</p>
                    <p class="mycomment-pl-p">预约取书时间：{{item.recivertime|dataFormat}}</p>
                    <p class="mycomment-pl-p" >
                        预约情况：{{item.isok}}
                        <img v-show="item.isok==='完成'" src="../../images/ok.png" width="25px" height="25px" class="myorder-icon">
                        <img v-show="item.isok==='待审核'" src="../../images/dd.png" width="25px" height="25px" class="myorder-icon">
                        <img v-show="item.isok==='已取消'" src="../../images/qx.png" width="25px" height="25px" class="myorder-icon">
                        <img v-show="item.isok==='等待取书'" src="../../images/kyjs.png" width="25px" height="25px" class="myorder-icon">
                    </p>
                </div>
            </div>
            <div class="mui-card-content" v-show="item.isok!=='完成'&&item.isok!=='已取消'">
                <div class="mui-card-content-inner">
                    <div class="cancel-order">
                        <span style="line-height: 24.8px">图书馆帮助热线：400-111-1111</span>
                        <a href="#" class="mycomment-a-delete" @click.prevent="cancleorder(item.id)">
                            <span class="mui-icon mui-icon-close "></span>取消预约</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {getCookie} from "../../assets/js/cookie";
    import {Toast} from "mint-ui";

    export default {
        name: "myorder",
        data(){
            return{
                Myorder:[],//保存预约图书数据
                flag:false,
                icon:false,
              //  username:this.$store.getters.getUserName,
            }
        },
        methods:{
            getMyOrder(){
                var name = getCookie('username');
                //  console.log("http://127.0.0.1:5000/api/getuserorder?username="+name);
                this.$http.get("api/getuserorder?username="+name).then(result=>{
                    if(result.status===200){
                        console.log(result.body);
                        if(result.body.message.length===0)
                            this.flag=true;
                        else {
                            // console.log('/***********'+this.Mycomments)
                            this.Myorder=result.body.message
                            this.Myorder.forEach(item=>{
                                if(item.isok==='Y'){
                                    item.isok='完成';

                                }
                                else if(item.isok==='N')
                                {
                                    item.isok='待审核';
                                }
                                else if(item.isok==='K')
                                {
                                    item.isok='已取消';
                                }
                                else if(item.isok==='W')
                                {
                                    item.isok='等待取书';
                                }
                            })

                        }

                    }
                });
            },
            cancleorder(id){
                var delorder='';
                this.Myorder.some((item,i)=>{
                    if(item.id===id){
                        item.isok='已取消';
                        delorder=item;
                        return;
                    }
                });
                let data={username:delorder.username,isbn:delorder.isbn};
                this.$http.post('api/delorder',data).then(result=>{
                    if(result.status===200){
                        Toast({
                            message:"取消成功",
                            duration: 1000,
                        });
                    }else {
                        Toast({
                            message:"取消失败",
                            duration: 1000,
                        });
                    }
                })
            }
        },
        created() {
            this.getMyOrder();
        }
    }
</script>

<style scoped>
    .mycomment-title-icon{
        color: #ff8c0e;
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
    .mycomment-pl-p{
        font-size: 14px;
        font-weight: bold;
        color: #242424;
    }

    .myorder-icon{
        display: inline-block;
        vertical-align: middle;
    }
    .mycomment-a-delete{
        color: red;

    }
    .cancel-order{
        display: flex;
        justify-content: space-between;
    }
</style>