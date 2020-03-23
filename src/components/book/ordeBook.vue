<template>
    <div>

        <div class="imgdiv">
            <img class="ordericon-img" src="../../images/yy.png" alt="">
        </div>
        <h3 class="ordertitle-h3">预约图书</h3>
        <hr class="orderbook-hr"/>

        <div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">预约图书名称：{{bookInfoList.bookname}}</li>
                <li class="mui-table-view-cell">预约图书ISBN：{{bookInfoList.isbn}}</li>
                <li class="mui-table-view-cell">预约图书馆：A710图书馆</li>
                <li class="mui-table-view-cell">预约数量：1</li>
                <li class="mui-table-view-cell ">
                    <span class="li-text">预约取书时间：</span>
                    <p style="display: flex; justify-content: space-between;">
                        <span class="time-span-text">{{pickerValueStartTime|dataFormat}}</span>
                        <mt-button type="primary" plain size="normal" @click="startTime" >选择时间</mt-button>
                    </p>
                </li>

            </ul>
            <mt-datetime-picker ref="pickerStartTime"
                                type="datetime"
                                v-model="pickerValueStartTime"
                                :slots="new Date()"
                                @confirm="this.handleConfirmStartTime">
            </mt-datetime-picker>
            <span class="node-text-span">
                    试运行期间为预防恶意预约，每用户仅可预约一本书
                </span>
            <div class="orderbook-btn-box">
                <mt-button type="primary" size="large" class="order-btn-1" @click="addOrderbook">提交预约</mt-button>
                <mt-button type="danger" plain size="large" @click="gobackbookinfo">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</mt-button>
            </div>
        </div>
    </div>
</template>

<script>

    import {Toast} from "mint-ui";
    import { DatetimePicker } from 'mint-ui';

    import {getCookie} from '../../assets/js/cookie.js'
    export default {
        name: "ordeBook",
        data(){
            return {
                pickerValueStartTime: new Date(),
                id:this.$route.params.id,
                bookInfoList:'',
                name:'',
                ishavebookinfo:'0',
            }
        },
        mounted() {
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username');
            this.name = uname;
            /*如果cookie不存在，则跳转到登录页*/
            if(uname === ""){
                this.$router.push('/error');
            }
            this.ishavebook();
        },
        methods:{
            startTime () {
                this.$refs.pickerStartTime.open();
            },
            handleConfirmStartTime () {
                console.log(this.pickerValueStartTime);
            },
            gobackbookinfo(){
                this.$router.go(-1);
            },
            getBookInfo(id){
                this.$http.get("http://127.0.0.1:5000/api/bookinfo?id="+id).then(result=>{
                    if(result.status===200){
                        this.bookInfoList=result.body.message;
                        console.log(result.body.message);
                    }
                });

            },
            ishavebook(){
                let data={
                    username:this.name,
                    isbn:localStorage.getItem('isbn')
                };
                this.$http.post('http://127.0.0.1:5000/api/ishavebook',data).then(result=>{
                    if(result.status===200){
                        this.ishavebookinfo=JSON.parse(result.body.message);
                        console.log('+++'+result.body.message);
                    }else{
                        Toast({
                            message:"获取数据失败，检查连接",
                            duration: 3000
                        });
                    }
                });
            },
            addOrderbook(){
                //this.ishavebookinfo.count>=1&&
                if(parseInt(this.ishavebookinfo.sum)>=1){
                    Toast({
                        message:"当前存在预约图书，不可再预约",
                        duration: 3000});
                }
                else {
                    var formatDate = function (date) {
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        m = m < 10 ? ('0' + m) : m;
                        var d = date.getDate();
                        d = d < 10 ? ('0' + d) : d;
                        var h = date.getHours();
                        var minute = date.getMinutes();
                        minute = minute < 10 ? ('0' + minute) : minute;
                        var second = date.getSeconds();
                        second = minute < 10 ? ('0' + second) : second;
                        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
                    };
                    let data = {
                        username: this.name,
                        bookname: this.bookInfoList.bookname,
                        isbn: this.bookInfoList.isbn,
                        orderbooknum: 1,
                        ordertime: formatDate(new Date()),
                        recivertime: formatDate(this.pickerValueStartTime),
                        isok: 'N',

                    };
                    if (this.bookInfoList.booknum - 1 < 0) {
                        Toast({
                            message: '预约失败，馆藏不足',
                            duration: 3000
                        });
                    } else {
                        this.$http.post('http://127.0.0.1:5000/api/orderbook', data).then(result => {
                            if (result.status === 200) {
                                Toast({
                                    message: '预约成功，请在约定时间到馆取书',
                                    duration: 3000
                                });
                            }
                        });
                    }
                }
                this.ishavebook();
            }

        },
        created() {
          //  console.log("子组件获得的id"+this.id)
            this.getBookInfo(this.id);
            this.ishavebook();

        },

    }
</script>

<style scoped>
    .imgdiv{
        margin: 5px 0;
        display: flex;
        justify-content: center;
    }
    .orderbook-hr{
        width: 70%;
    }
    .ordertitle-h3{
        text-align: center;
        font-size: 25px;
        color: #555555;
    }
    .ordericon-img{
        width: 50px;
        height: 50px;

    }
    .li-text{
        line-height: 42px;
    }
    .time-span-text{
        font-size: 18px;
        color: #555555;
        line-height: 41px;

    }
    .orderbook-btn-box{
        margin: 5px 0;
    }
    .order-btn-1{
        margin-bottom: 5px;
    }
    .node-text-span{
        margin: 2px 0;
        padding: 0 3%;
        font-size: 15px;
        color: red;
        text-align: center;
    }
</style>