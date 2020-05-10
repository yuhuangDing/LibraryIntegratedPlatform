<template>
    <div>
        <div class="echartsiconbox">
            <img src="../../../images/rd.png" width="40" height="40" >
            <h1 class="orderbooknumcharts-h1">图书分类热度</h1>
        </div>
        <div>
            <div id="hotChart" class="echartsclass"></div>
        </div>
        <div class="charts-text-box">
            <div class="mui-card">
                <!--页眉，放置标题-->
                <div class="mui-card-header">图书分类热度数据分析</div>
                <!--内容区-->
                <div class="mui-card-footer">
                    <div class="charts-text-box-text">
                        <p>最受欢迎的分类：{{classname}}</p>
                        <p>最受欢迎的分类占比：{{bfb}}</p>

                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
    import {option1} from "../../../echarts/async-orderbooknumChart-option";

    export default {
        name: "echartsOrderbookclass",
        data(){
            return{
                hotclass:[],
                classname:'',
                bfb:'',
            }
        },
        methods:{
            drawChart() {
                //基于准备好的dom，初始化echarts实例
                var hotChart = this.$echarts.init(document.getElementById('hotChart'), 'infographic');
                // 绘制基本图表
                hotChart.setOption(option1);
                //显示加载动画
                hotChart.showLoading();
                //获取数据

                var hotclass=[];
                var hotclassnum=[];
                var classdata=[];
                var sum=0;
                this.$http.get('api/analyseorderbookclass').then(result => {
                        if(result.body.status===200){
                            hotclass=result.body.message;
                            // console.log(hotclass);
                            var max=0;
                            for(var i=0;i<hotclass.length;i++){
                                if(hotclass[i].count>max){
                                    max=hotclass[i].count;
                                }
                                classdata.push({value:hotclass[i].count,name:hotclass[i].bookclassname})
                                // classname.push(hotclass[i].bookclassname);
                                // hotclassnum.push(hotclass[i].count);
                                sum+=hotclass[i].count
                                console.log(max)
                            }
                            for(var i=0;i<hotclass.length;i++){
                                if(hotclass[i].count===max){
                                    this.classname=hotclass[i].bookclassname;
                                }
                            }
                            this.bfb=max/sum;
                            this.bfb=this.bfb.toFixed(2)
                            // console.log(classname+"*****"+hotclassnum+"sss"+sum)
                            // console.log(classdata);

                            setTimeout(()=>{  //未来让加载动画效果明显,这里加入了setTimeout,实现2s延时
                                hotChart.hideLoading(); //隐藏加载动画
                                hotChart.setOption({
                                    series: [{
                                        data: classdata  //将异步请求获取到的数据进行装载
                                    }]
                                })
                            }, 800 );

                        }
                    });

                }
        },
        mounted() {
            this.drawChart();
        },
        // updated() {
        //     this.drawChart();
        // }
    }
</script>

<style scoped>
    .echartsiconbox{
        position: relative;
        top:10px;
        left: calc(50% - 90px);
        height: 40px;
        text-align: center;
        margin: 0 auto 20px;
    }
    .echartsiconbox img{
        float: left;
        /*vertical-align:middle;*/

    }
    .orderbooknumcharts-h1{
        float: left;
        font-size: 25px;
        color: #555555;
    }
    .echartsclass{
        width: 400px;
        height: 310px;
        margin: -50px auto 5px;

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