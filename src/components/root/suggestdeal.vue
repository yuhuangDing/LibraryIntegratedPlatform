<template>
    <div>
        <div class="index-btn-top">
            <mt-button type="primary" size="normal" plain @click="displaywait" style="margin-right: 10px" v-show="allsuggestlist">仅显示待回复反馈</mt-button>
            <mt-button type="primary" size="normal" plain @click="displayall" v-show="!allsuggestlist">显示全部</mt-button>
        </div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="item in allsuggest" :key="item.kid" >
                    <div class="suggest-box" v-if="allsuggestlist===false&&item.isok==='正在等待处理'">
                        <div class="suggest-box-l">
                            <p class="text-p">用户：{{item.username}}</p>
                            <p class="text-p">QQ或邮箱：{{item.QQorEmail}}</p>
                            <p class="text-p">反馈时间：{{item.addtime|dataFormat}}</p>
                            <p class="text-p">反馈内容：{{item.suggestinfo}}</p>
                            <p class="text-p">
                                处理进程：
                                <img v-show="item.isok==='正在等待处理'" src="../../images/dd.png" width="25px" height="25px" class="myorder-icon">
                                <img v-show="item.isok==='已处理'" src="../../images/ok.png" width="25px" height="25px" class="myorder-icon">
                                {{item.isok}}
                            </p>
                            <div v-show="item.isok==='已处理'">
                                <p class="text-p">回复时间：{{item.replytime|dataFormat}}</p>
                                <p class="text-p">回复内容：{{item.replyinfo}}</p>
                            </div>
                        </div>
                        <div class="suggest-box-r" v-show="item.isok==='正在等待处理'" >
                            <a href="#"  @click.prevent="addreply(item.id)">处理反馈</a>
                        </div>
                    </div>
                    <div class="suggest-box" v-if="allsuggestlist===true">
                        <div class="suggest-box-l">
                            <p class="text-p">用户：{{item.username}}</p>
                            <p class="text-p">QQ或邮箱：{{item.QQorEmail}}</p>
                            <p class="text-p">反馈时间：{{item.addtime|dataFormat}}</p>
                            <p class="text-p">反馈内容：{{item.suggestinfo}}</p>
                            <p class="text-p">
                                处理进程：
                                <img v-show="item.isok==='正在等待处理'" src="../../images/dd.png" width="25px" height="25px" class="myorder-icon">
                                <img v-show="item.isok==='已处理'" src="../../images/ok.png" width="25px" height="25px" class="myorder-icon">
                                {{item.isok}}
                            </p>
                            <div v-show="item.isok==='已处理'">
                                <p class="text-p">回复时间：{{item.replytime|dataFormat}}</p>
                                <p class="text-p">回复内容：{{item.replyinfo}}</p>
                            </div>
                        </div>
                        <div class="suggest-box-r" v-show="item.isok==='正在等待处理'" >
                            <a href="#"  @click.prevent="addreply(item.id)">处理反馈</a>
                        </div>
                    </div>
                </li>


            </ul>

    </div>
</template>

<script>
    import { MessageBox,Toast } from 'mint-ui';
    export default {
        name: "suggestdeal",
        data(){
            return{
                allsuggest:[],
                replyinfo:'',
                allsuggestlist:true,//显示全部列表
            }
        },
        methods:{
            getallsuggest(){
                this.$http.get('api/getallusersuggest').then(result=>{
                    if(result.status===200){
                        this.allsuggest=result.body.message;
                        this.allsuggest.forEach((item,i)=>{
                            item.kid=i;
                            if(item.isok==='Y'){
                                item.isok='已处理';
                            }
                            else if(item.isok==='N'){
                                item.isok='正在等待处理'
                            }
                        })
                    }
                })
            },
            addreply(id){
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
                MessageBox({
                    $type:'prompt',
                    title:'反馈处理',
                    message:'请输入处理内容',
                    closeOnClickModal:true,   //点击背景层关闭MessageBox
                    showCancelButton:true,   //显示取消按钮
                    showInput:true,
                    inputPattern:/[^\s]/,
                    inputErrorMessage:'请输入非空内容！',
                }).then(({value, action }) => {
                    /* value 为填写的值，进行下一步操作*/
                    //console.log(id+value+formatDate(new Date()));
                    let data={id:id,replytime:formatDate(new Date()),replyinfo:value};
                    console.log(data);
                    this.$http.post('api/replyusersuggest',data).then(result=>{
                        if(result.status===200){
                            Toast({
                                message:'回复成功',
                                duration:1000
                            });
                        }else {
                            Toast({
                                message:'回复失败请重试',
                                duration:1000
                            })
                        }
                    });
                    this.getallsuggest();
                }).catch(() => {});



            },
            displaywait(){
                this.allsuggestlist=false;

            },
            displayall(){
                this.allsuggestlist=true;

            },
        },
        created() {
            this.getallsuggest();
        }
    }
</script>

<style scoped>
    .text-p{
        color: #242424;
        font-size: 15px;
    }
    .suggest-box{
        display: flex;
        justify-content: space-between;

    }
    .suggest-box-l{
        width: 70%;
    }
    .suggest-box-r{
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .myorder-icon{
        display: inline-block;
        vertical-align: middle;
    }
    .index-btn-top{
        margin-top: 5px;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
    }
</style>