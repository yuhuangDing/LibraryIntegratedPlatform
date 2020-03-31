<template>

    <div>
        <div>

            <h3 class="upbook-title"><img src="../../images/sjts.png" class="upbook-icon" width="40px" height="40px">上架图书</h3>
        </div>
        <div class="form-box">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>图书名</label>
                        <input type="text" class="mui-input-clear" placeholder="请输入图书名" v-model="bookname">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>ISBN</label>
                        <input type="text" class="mui-input-clear" placeholder="请输入图书ISBN" v-model="bookisbn">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>作者</label>
                        <input type="text" class="mui-input-clear" placeholder="请输入图书作者" v-model="bookwriter">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>数量</label>
                        <input type="text" class="mui-input-clear" placeholder="请输入图书数量" v-model="booknum">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>图书简介</label>
                        <textarea  placeholder="请输入图书简介" class="bookinfotext" rows="3" cols="20" v-model="bookinfo"></textarea>
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>图书封面</label>
                        <input type="text" class="mui-input-clear" placeholder="请输入图书数量" v-model="bookpho">
                    </div>
                </li>
            </ul>
            <span class="span-note">注意：所有信息均为必填！</span>
            <mt-button type="primary" size="large" @click="addbook">提交</mt-button>
        </div>


    </div>

</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "upbookAd",
        data(){
            return{
                bookname:'',
                bookisbn:'',
                bookwriter:'',
                booknum:'',
                bookinfo:'',
                bookpho:'',

            }
        },
        methods:{
            addbook(){
                if(this.bookname.length===0||this.bookisbn.length===0||this.bookwriter.length===0
                    ||this.booknum.length===0||this.bookinfo.length===0||this.bookpho.length===0){
                    Toast({
                        message:'存在空信息！',
                        duration:2000
                    });
                    return
                }
            }

        }
    }
</script>

<style scoped>
    .upbook-title{
        color: #555555;
        text-align: center;
        margin: 5px 0;
    }
    .upbook-icon{
        display: inline-block;
        vertical-align: middle;
    }
    .form-box{
        padding: 0 2%;
    }
    .bookinfotext{
        background-color: #f9f9f9;
        border-radius: 5px;
    }
    .span-note{
        color: orange;
        font-size: 12px;
        margin-left: 8%;
    }
</style>