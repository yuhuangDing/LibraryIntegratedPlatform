<template>
    <div>
        <div class="index-btn-top">
            <mt-button type="primary" size="normal" plain @click="displaywait" style="margin-right: 10px" v-show="allorderlist">仅显示待审核</mt-button>
            <mt-button type="primary" size="normal" plain @click="displayall" v-show="!allorderlist">显示全部</mt-button>
        </div>

        <div class="mui-card" v-for="item in allorderbook " :key="item.id">
            <div v-show="allorderlist===false&&item.isok==='待审核'">
                <div class="mui-card-content">
                    <div class="ob-text">
                        <p class="p-text">用户：{{item.username}}</p>
                        <P class="p-text">预约图书：{{item.bookname}}</P>
                        <p class="p-text">预约数量：{{item.orderbooknum}}</p>
                        <p class="p-text">预约提交时间：{{item.ordertime|dataFormat}}</p>
                        <p class="p-text">预约取书时间：{{item.recivertime|dataFormat}}</p>
                        <p class="p-text">当前状态：{{item.isok}}
                            <img v-show="item.isok==='完成'" src="../../images/ok.png" width="25px" height="25px" class="myorder-icon">
                            <img v-show="item.isok==='待审核'" src="../../images/dd.png" width="25px" height="25px" class="myorder-icon">
                            <img v-show="item.isok==='已取消'" src="../../images/qx.png" width="25px" height="25px" class="myorder-icon">
                            <img v-show="item.isok==='等待取书'" src="../../images/kyjs.png" width="25px" height="25px" class="myorder-icon">
                        </p>
                    </div>
                </div>
                <div class="mui-card-footer" v-show="item.isok==='待审核'">
                    <mt-button size="small" type="primary" plain @click="aggreorder(item.id)"><img src="../../images/ok.png" width="20px" height="20px" class="myorder-icon">同意预约申请</mt-button>
                    <mt-button size="small" type="danger" plain @click="delorder(item.id)"><img src="../../images/qx.png" width="20px" height="20px" class="myorder-icon">拒绝预约申请</mt-button>
                </div>
            </div>
            <div v-show="allorderlist===true">
                <div class="mui-card-content">
                    <div class="ob-text">
                        <p class="p-text">用户：{{item.username}}</p>
                        <P class="p-text">预约图书：{{item.bookname}}</P>
                        <p class="p-text">预约数量：{{item.orderbooknum}}</p>
                        <p class="p-text">预约提交时间：{{item.ordertime|dataFormat}}</p>
                        <p class="p-text">预约取书时间：{{item.recivertime|dataFormat}}</p>
                        <p class="p-text">当前状态：{{item.isok}}
                            <img v-show="item.isok==='完成'" src="../../images/ok.png" width="25px" height="25px" class="myorder-icon">
                            <img v-show="item.isok==='待审核'" src="../../images/dd.png" width="25px" height="25px" class="myorder-icon">
                            <img v-show="item.isok==='已取消'" src="../../images/qx.png" width="25px" height="25px" class="myorder-icon">
                            <img v-show="item.isok==='等待取书'" src="../../images/kyjs.png" width="25px" height="25px" class="myorder-icon">
                        </p>
                    </div>
                </div>
                <div class="mui-card-footer" v-show="item.isok==='待审核'">
                    <mt-button size="small" type="primary" plain @click="aggreorder(item.id)"><img src="../../images/ok.png" width="20px" height="20px" class="myorder-icon">同意预约申请</mt-button>
                    <mt-button size="small" type="danger" plain @click="delorder(item.id)"><img src="../../images/qx.png" width="20px" height="20px" class="myorder-icon">拒绝预约申请</mt-button>
                </div>
            </div>
    </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {

        name: "orderAd",
        data(){
            return {
                allorderbook:[],//保存所有预约申请
                allorderbookwait:[],//保存待审核的图书
                allorderlist:true,//显示全部列表
            }
        },
        methods:{
            getallorder(){
                    this.$http.get('api/Adgetallorder').then(result=>{
                        if(result.status===200){
                            this.allorderbook=result.body.message;
                            //console.log(this.allorderbook)
                            this.allorderbook.forEach(item=>{
                                if(item.isok==='Y'){
                                    item.isok='完成';
                                }
                                else if(item.isok==='N')
                                {
                                    item.isok='待审核';
                                    this.allorderbookwait.push(item);
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
                    })
            },
            aggreorder(id){
                    this.$http.get('api/ordermanage?id='+id+'&opt=y').then(result=>{
                        if(result.status===200){
                            Toast({
                                message:"同意申请成功",
                                duration:1000
                            })
                        }
                    });
                    this.getallorder();
            },
            delorder(id){
                this.$http.get('api/ordermanage?id='+id+'&opt=n').then(result=>{
                    if(result.status===200){
                        Toast({
                            message:"取消申请成功",
                            duration:1000
                        })
                    }
                });
                this.getallorder();
            },
            displaywait(){
                this.allorderlist=false;
            },
            displayall(){
                this.allorderlist=true;
            },

        },

        created() {
            this.getallorder()
        }
    }
</script>

<style scoped>

    .ob-text{
        margin: 5px 10px;

    }
    .p-text{
        color: #555555;
    }
    .myorder-icon{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }
    .index-btn-top{
        margin-top: 5px;
        display: flex;
        justify-content: center;
    }
</style>