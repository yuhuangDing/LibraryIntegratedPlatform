<template>
    <div class="comment-box">
        <h3 class="h3text">发表评论</h3>
        <hr/>
        <textarea placeholder="请输入评论内容（最多120字）" maxlength="120" class="textare1" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>
        <div class="cmt-list" >
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.id" >
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp; 用户:{{item.username}}&nbsp;&nbsp;发布时间：{{item.time|dataFormat('YYYY-MM-DD')}}
                </div>
                <div class="cmt-body">
                    {{item.comment}}
               </div>
            </div>
        </div>
        <!----
        <div class="kbpl-box"  v-show="kbpl">
            <h3 >
               评论为空！
            </h3>
        </div>--->


        <!--<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>-->
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import {setCookie,getCookie} from '../../assets/js/cookie.js'
    export default {
        name: "comment",
        data(){
            return{
                comments:[],//所有评论数据
                pageIndex:1,//默认展示第一页数据
                msg:"",//评论内容
                name:'',//保存用户名
                kbpl:false,//控制是否显示空白评论提示
        }},
        methods:{
            mounted() {
                this.$nextTick(function() {
                    this.$on('childmethods1', function() {
                        console.log("调用子组件");
                        var isbn=this.$store.getters.getisbn;
                        this.$http.get("api/getcomment?bookisbn="+isbn).then(result=>{
                            if(result.status===200)
                            {
                                // this.comments=result.body.message
                                this.comments=result.body.message;//每当获取新评论时候不要老数据清空，应该是
                                console.log('调用子组件加载评论:'+this.comments )
                            }else{
                                Toast('获取失败')
                            }
                        })
                    });
                });
                let uname = getCookie('username');
                this.name = uname;
                /*如果cookie不存在，则跳转到登录页*/
                if(uname === ""){
                    Toast('评论失败，请先登陆！');
                    this.$router.push('/error');
                }

            },
            getComments(){
                var isbn=this.$store.getters.getisbn;
                this.$http.get("api/getcomment?bookisbn="+isbn).then(result=>{
                    if(result.status===200)
                    {
                      // this.comments=result.body.message
                        this.comments=JSON.parse(result.body.message);//每当获取新评论时候不要老数据清空，应该是

                        //console.log('加载评论:'+this.comments )
                    }else{
                        Toast('获取失败')

                    }
                })
            },
            postcomment(){
                //发表评论
                let uname = getCookie('username');
                /*如果cookie不存在，则跳转到错误页*/
                if(uname === ""){
                    this.$router.push('/error');
                }else{
                    //校验评论是否为空
                    if(this.msg.trim().length===0){
                        return  Toast("评论数据空！")
                    }
                    //url地址，数据对象   ,定于提交表单数据格式
                    var nowisbn=this.$store.getters.getisbn;
                    var nowbookname=localStorage.getItem('bookname');
                    console.log("获取书名"+nowbookname);
                    var nowusername=uname;console.log(nowusername+'*****这个是用户名')
                    var formatDate = function (date) {
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        m = m < 10 ? ('0' + m) : m;
                        var d = date.getDate();
                        d = d < 10 ? ('0' + d) : d;
                        var h = date.getHours();
                        var minute = date.getMinutes();
                        minute = minute < 10 ? ('0' + minute) : minute;
                        var second= date.getSeconds();
                        second = minute < 10 ? ('0' + second) : second;
                        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;
                    };


                    var nowtime=formatDate(new Date());
                    console.log(this.$store.getters.getUserName);
                    var data={
                        username:nowusername,
                        bookisbn:nowisbn,
                        bookname:nowbookname,
                        comment:this.msg.trim(),
                        time:nowtime,
                        displaycomment:'Y',
                    };
                    console.log('评论数据：'+data);
                    this.$http.post("api/postcomment",data).then(function (result) {
                        if(result.body.status===200){
                            //拼接评论对象
                            var cmt={username:nowusername,time:nowtime, comment:this.msg.trim(),displaycomment:'Y'};
                            Toast('评论成功');
                            this.comments.unshift(cmt);
                            this.msg="";

                        }else {
                            Toast('评论失败');
                        }
                    });
                }

            }
        },
        props:["id"],
        created() {
            //console.log('created'+this.mycomments);
            this.getComments();
            this.$emit('getcomment');
        },
        updated() {
            this.comments.forEach((item,index)=>{
                if(item.displaycomment==='N') {
                    //   console.log("切去"+JSON.stringify(item));
                    //console.log(index);
                    this.comments.splice(index, 1);
                }
            });
        }
    }
</script>

<style scoped>
    .h3text{
        font-size: 18px;
    }
    .textare1{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-body{
        line-height: 35px;
        text-indent: 2em;
    }
    .cmt-list{
        margin: 5px 0;
    }
    .cmt-title{
        background-color: #b9b4c0;
        font-size: 13px;
        border-radius: 3px;
        text-indent: 0.5em;

    }
    .cmt-item{

    }
    .comment-box{

        padding: 10px 15px;
    }

</style>