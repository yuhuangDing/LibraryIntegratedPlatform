<template>
    <div>
        <h3 class="h3text">发表评论</h3>
        <hr/>
        <textarea placeholder="请输入评论内容（最多120字）" maxlength="120" class="textare1" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>
        <div class="cmt-list" >
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp; 用户:{{item.user_name}}&nbsp;&nbsp;发布时间：{{item.add_time|dataFormat('YYYY-MM-DD')}}
                </div>
                <div class="cmt-body">
                    {{item.content==='undefined'?'暂无评论':item.content}}
                </div>
            </div>
        </div>


        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "comment",
        data(){
            return{
                comments:[],//所有评论数据
            pageIndex:1,//默认展示第一页数据
                msg:"",//评论内容
        }},
        methods:{
            getComments(){
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                    if(result.body.status===0)
                    {
                      // this.comments=result.body.message
                        this.comments=this.comments.concat(result.body.message)//每当获取新评论时候不要老数据清空，应该是
                    }else{
                        Toast('获取失败')
                    }
                })
            },
            getMore(){//获取更多评论
                this.pageIndex++
                this.getComments()
            },
            postcomment(){
                //发表评论

                //校验是否为空
                if(this.msg.trim().length===0){
                    return  Toast("评论数据空！")
                }
                //url地址，数据对象   ,定于提交表单数据格式
                this.$http.post("api/postcomment/"+this.$route.params.id,{
                    content:this.msg.trim()
                }).then(function (result) {
                    if(result.body.status===0){
                        //拼接评论对象
                        var cmt={user_name:'My',add_time:Date.now(),content:this.msg.trim()}
                        this.comments.unshift(cmt)
                        this.msg=""
                    }
                })

            }
        },
        props:["id"],
        created() {
            this.getComments()
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
        margin: 5px 0px;
    }
    .cmt-title{
        background-color: #b9b4c0;
        font-size: 13px;
        border-radius: 3px;
        text-indent: 0.5em;

    }
    .cmt-item{

    }

</style>