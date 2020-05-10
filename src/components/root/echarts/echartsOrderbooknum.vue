<template>
    <div>
        <div class="echartsiconbox">
            <img src="../../../images/orderqx.png" width="40" height="40" >
            <h1 class="orderbooknumcharts-h1">7日预约数据</h1>
        </div>

        <div class="echartsbox">
            <div id="myChart" class="orderbooknumcharts"></div>
        </div>

        <div class="charts-text-box">
            <div class="mui-card">
                <!--页眉，放置标题-->
                <div class="mui-card-header">7日预约数据分析</div>
                <!--内容区-->
                <div class="mui-card-footer">
                   <div class="charts-text-box-text">
                       <p>7日最大预约量：{{ordermax}}</p>
                       <p>7日总预约量：{{sum}}</p>

                   </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {option} from '../../../echarts/async-orderbooknumChart-option'
    export default {
        name: "echartsdemo",
        data () {
            return{
                orderdata:[],
                sum:0,
                ordermax:0,
            }
        },
        methods: {
            drawChart() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('myChart'), 'infographic');
                // 绘制基本图表
                myChart.setOption(option);
                //显示加载动画
                myChart.showLoading();
                //获取数据
                this.$http.get('api/analyseorderbooknum').then(result => {
                    // console.log("111")
                    var orderdata=[];
                    if(result.body.status===200){
                        if(result.body.message.length>7){
                            orderdata=result.body.message.reverse().splice(0,7);
                            //console.log(this.orderdata)
                            orderdata.reverse();
                        }
                        else{
                            orderdata=result.body.message;


                        }
                        var orderdatatime=[];
                        var orderdatacount=[];
                        for(var i=0;i<7;i++){
                            orderdatatime.push(orderdata[i].date);
                            orderdatacount.push(orderdata[i].count);

                        }

                        setTimeout(()=>{  //未来让加载动画效果明显,这里加入了setTimeout,实现2s延时
                            myChart.hideLoading(); //隐藏加载动画
                            myChart.setOption({
                                xAxis:{
                                    data: orderdatatime,
                                },
                                series: [{
                                    data: orderdatacount  //将异步请求获取到的数据进行装载
                                }]
                            })
                        }, 800 )
                        //console.log(this.orderdata)
                    }

                })
            },
            getorderdata(){
                this.$http.get('api/analyseorderbooknum').then(result => {
                    // console.log("111")
                    if(result.body.status===200){
                        if(result.body.message.length>7){
                            this.orderdata=result.body.message.reverse().splice(0,7);
                            //console.log(this.orderdata)
                            this.orderdata.reverse();
                        }
                        else{
                           this.orderdata=result.body.message;
                        }
                        var max=0;
                        for(var i=0;i<7;i++){
                            if(this.orderdata[i].count>max){
                                max=this.orderdata[i].count
                            }
                            this.sum+=this.orderdata[i].count
                        }
                        this.ordermax=max;
                        // console.log(this.orderdata)
                        // console.log("和"+this.sum+"最大值"+this.ordermax)
                    }

                })
            }
        },
        mounted(){
            this.drawChart();

        },
        created() {
            this.getorderdata();
        },
        updated() {
            this.drawChart();
       }
    }
</script>

<style scoped>
    .echartsiconbox{
        position: relative;
        display: flex;
        top:10px;
        left: calc(50% - 90px);
        height: 40px;
        text-align: center;
        margin: 0 auto 20px;
    }
    .echartsiconbox img{
        float: left;
        vertical-align:middle;

    }
    .orderbooknumcharts-h1{
        float: left;
        font-size: 25px;
        color: #555555;
    }
    .echartsbox{
        width: 400px;
        height: 310px;
    }
    .orderbooknumcharts{
        display: block;
        margin: 0 auto;
        width: 80%;
        height: 300px;
    }
    .charts-text-box{
        width: 320px;
        height: 100px;
        margin: 0 auto;

    }
    .charts-text-box-text{
        line-height: 30px;
    }
    .charts-text-box-text p{
        font-size: 15px;
        color: #323232;
    }
</style>