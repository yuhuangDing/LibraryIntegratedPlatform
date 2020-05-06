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
<!--                <li class="mui-table-view-cell">-->
<!--                    <div class="mui-input-row">-->
<!--                        <label>图书类别</label>-->
<!--                        <mt-picker :slots="slots" @change="onValuesChange" class="pickclass" :visible-item-count="1"></mt-picker>-->

<!--                    </div>-->
<!--                </li>-->
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
                    <div class="phobox">
                        <br/>
                        <label>图书封面</label>
                        <div  class="mui-btn  mui-btn-green input-file">上传封面
                        <input
                                class="file-input"
                                type="file"
                                ref="test"
                                @change="toBase64"
                                accept="image/jpeg, image/png, image/jpg"/></div>
                        <img :src="imageUrl" width="50px" height="50px" class="upbook-icon1">

                    </div>

                </li>
            </ul>
            <span class="span-note">注意：所有信息均为必填 , 图片大小必须小于250Kb！</span>
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
                bookclass:'',
                bookwriter:'',
                booknum:'',
                bookinfo:'',
                classname:[],
                imageUrl: "../../images/fm1.png",
                slots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'left',

                    },
                ]

            }
        },
        methods:{
            onValuesChange(picker, values) {

                this.classname.some(item=>{
                    if(item.bookclassname===values){
                        console.log(item.bookclass);
                        return
                    }
                })
            },

            getallCategory(){
                //获取图书分类

                this.$http.get('api/getimgcategory').then(result=>{
                    if(result.body.status===200){

                        this.classname=result.body.message
                        this.classname.forEach(item=>{
                            this.slots[0].values.push(item.bookclassname);
                        })
                        //console.log(this.cates)
                    }else{
                        Toast("获取失败")
                    }
                })
            },

            addbook(){
                if(this.bookname.length===0||this.bookisbn.length===0||this.bookwriter.length===0
                    ||this.booknum.length===0||this.bookinfo.length===0){
                    Toast({
                        message:'存在空信息！',
                        duration:2000
                    });
                    return;
                }else{
                    let data={bookname:this.bookname,isbn:this.bookisbn,bookclass:this.bookclass,bookinfo:this.bookinfo,bookwriter:this.bookwriter,booknum:this.booknum,bookimg:this.imageUrl};
                    this.$http.post('api/addnewbook',data).then(result=>{
                        if(result.status===200){
                            Toast({
                                message:"上架图书成功！",
                                duration: 1000
                            });
                            setTimeout(function(){
                                this.$router.go(-1)
                            }.bind(this),300);
                        }else{
                            Toast({
                                message:"上架图书失败！",
                                duration: 1000
                            });
                        }
                    })
                    console.log(data)
                }

               console.log(this.imageUrl)

            },
            toBase64(){
                /****先将this赋给一个变量****/
                var _this = this;
             //   var file = this.$refs.test.files[0];
                var file = document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    var str = reader.result;
                    /****对变量进行赋值****/
                    _this.imageUrl = decodeURIComponent(str);
                };

            },


        },
        created() {
            this.getallCategory();
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
    .upbook-icon1{
        display: inline-block;
        vertical-align: middle;
        margin-top: -18px;
        margin-left: 20px;
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
    .file-input{
        margin-top: 20px;
        position: absolute;
        width: 100%;
        left: 0;
        opacity: 0;
        cursor: pointer;

    }
    .phobox{
        flex-direction: column;
        justify-items: center;
    }
    .input-file{
        margin-top: -6px;
        margin-left: 12%;
    }

</style>