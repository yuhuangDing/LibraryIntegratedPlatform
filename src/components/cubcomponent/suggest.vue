<template>
    <div >
        <div class="box-suggest">
            <div>
                <div class="mui-content-padded">
                    <div style="text-align: center;margin:10px 0">问题和意见</div>
                </div>
                <div class="row mui-input-row">
                    <p>问题和意见内容</p>
                    <textarea v-model="suggestinfo" class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
                </div>
                <p>QQ/邮箱</p>
                <div class="mui-input-row">
                    <input v-model="qqoremail" type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
                </div>
                    <mt-button type="primary" plain size="large" @click="submitsuggest">提交反馈</mt-button>
            </div>
            <div class="mysuggest">
                <mt-button type="default" plain size="large" @click="getsuggest">查看我的反馈</mt-button>
            </div>
            <div v-show="allmysuggest">
                <div class="mysuggest-box" v-for="item in mysuggest" :key="item.kid">
                    <div  >
                        <p class="mysuggest-text-color">反馈时间：{{item.addtime|dataFormat}}</p>
                        <hr />
                        <div>
                            <p class="mysuggest-text-color">反馈内容：</p>
                            <p class="mysuggest-text-color-1">{{item.suggestinfo}}</p>
                        </div>
                        <hr/>
                        <div>
                            <p class="mysuggest-text-color">当前情况：
                                <img v-show="item.isok==='正在等待处理'" src="../../images/dd.png" width="25px" height="25px" class="myorder-icon">
                                <img v-show="item.isok==='已处理'" src="../../images/ok.png" width="25px" height="25px" class="myorder-icon">
                                {{item.isok}}</p>
                            <div v-show="item.isok==='已处理'">
                                <hr/>
                                <p class="mysuggest-text-color">处理时间：{{item.replytime|dataFormat}}</p>
                                <p class="mysuggest-text-color">处理结果：{{item.replyinfo}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {getCookie} from '../../assets/js/cookie.js'
    import {Toast} from 'mint-ui'
    export default {
        name: "suggest",
        data(){
            return{
                suggestinfo:'',
                qqoremail:'',
                name:'',
                mysuggest:[],
                allmysuggest:false,
            }
        },
        methods:{
            submitsuggest(){
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
                if(this.suggestinfo.length===0){
                    Toast({
                        message:'反馈内容为空！请输入后再提交',
                        duration:1000
                    });
                    return ;
                }
                let data={username:this.name,QQorEmail:this.qqoremail,addtime:formatDate(new Date()),suggestinfo:this.suggestinfo,isok:'N'};
                this.$http.post('api/postsuggest',data).then(result=>{
                    if(result.status===200){
                        Toast({
                            message:'提交成功',
                            duration:1000
                        })
                    }
                })
            },
            getsuggest(){
                this.allmysuggest=!this.allmysuggest;
                this.$http.get('api/getusersuggest?username='+this.name).then(result=>{
                    if(result.status===200){
                        this.mysuggest=result.body.message;
                        console.log(this.mysuggest)
                        this.mysuggest.forEach((item,i)=>{
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
            }
        },
        mounted() {
            let uname = getCookie('username');
            this.name = uname;
        },


    }

</script>

<style scoped>
    .box-suggest{
        padding: 0 10px;
    }
    .mysuggest{
        margin-top: 10px;
    }
    .mysuggest-box{
        margin: 10px 0;
        padding: 10px;
        background-color: #f1f1f1;
        border-radius: 15px;
    }
    .mysuggest-text-color{
        color: #555555;
    }
    .myorder-icon{
        display: inline-block;
        vertical-align: middle;
    }
    .mysuggest-text-color-1{
      color: #242424;
    }

</style>