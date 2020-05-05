<template>
    <div>
       <div>
           <img  class="seatinfo-img" src="../../images/zw.png" width="50" height="50">
           <h2 class="seatinfo-title">座位预约服务</h2>
           <hr style="width: 80%"/>
       </div>
        <div class="info">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">预约图书馆：图书馆</li>
                <li class="mui-table-view-cell">座位楼层：{{seatinfo.seatc}}层</li>
                <li class="mui-table-view-cell">座位号：{{seatinfo.seatw}}号</li>
                <li class="mui-table-view-cell ">
                    <span class="li-text">预约座位时间：</span>
                    <p style="display: flex; justify-content: space-between;">
                        <span class="time-span-text">{{pickerValueStartTime|dataFormat}}</span>
                        <mt-button type="primary" plain size="normal" @click="startTime" >选择时间</mt-button>
                    </p>
                </li>
                <li class="mui-table-view-cell" style="color: red;" v-if="display">当前座位已被预约，请选择其他座位！</li>
            </ul>
            <mt-datetime-picker ref="pickerStartTime"
                                type="datetime"
                                v-model="pickerValueStartTime"
                                :slots="new Date()"
                                @confirm="this.handleConfirmStartTime">
            </mt-datetime-picker>
            <div class="btn-box">
                <mt-button type="primary" size="large" class="order-btn-1" @click="orderseat" v-if="!display">提交预约</mt-button>
                <mt-button type="danger" plain size="large" @click="gobackbookinfo">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import {getCookie} from "../../assets/js/cookie";
    export default {
        name: "seatinfo",
        data(){
            return{
                seatid:this.$route.query.id,
                seatinfo: [],
                pickerValueStartTime: new Date(),
                display:false,
                name:'',
            }
        },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username');
            this.name = uname;
            /*如果cookie不存在，则跳转到登录页*/
            if(uname === ""){
                this.$router.push('/error');
            }

        },
        methods:{
            startTime () {
                this.$refs.pickerStartTime.open();
            },
            handleConfirmStartTime () {
                console.log(this.pickerValueStartTime);
            },
            getseatinfo(){
                let id=this.$route.query.id;
                this.$http.get('api/getseatinfo?id='+id).then(result=>{
                    if(result.status===200){
                        //console.log(result.body.message)
                        if(result.body.message.ishavepeople==='Y')
                            this.display=true;
                        this.seatinfo=result.body.message;

                       // console.log(this.seatinfo)
                    }
                })
            },
            gobackbookinfo(){
                this.$router.go(-1);
            },
            orderseat(){

            }
        },
        created() {
            this.getseatinfo();
        }
    }
</script>

<style scoped>
    .seatinfo-img{
        display: block;
        margin: 8px auto;

    }
    .seatinfo-title{
        margin: 8px 0;
        text-align: center;
        color: #555555;
        font-weight: 400;
    }
    .info{
        margin: 0 10%;
    }
    .time-span-text{
        font-size: 18px;
        color: #555555;
        line-height: 41px;

    }
    .btn-box{
        margin: 5px 0;
    }
    .order-btn-1{
        margin-bottom: 5px;
    }

</style>