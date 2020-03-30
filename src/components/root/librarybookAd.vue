<template>
    <div>
        <h3 class="lb-title-h3">馆藏管理</h3>
        <div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="item in booklist" :key="item.id">
                    <div class="lb-li-box">
                        <div class="lb-li-div-l">
                            <p class="lb-li-div-l-p">书名：{{item.bookname}}</p>
                            <p class="lb-li-div-l-p">ISBN：{{item.isbn}}</p>
                            <p class="lb-li-div-l-p">作者：{{item.bookwriter}}</p>
                        </div>
                        <div class="lb-li-div-r">
                            <p><button type="button" class="mui-btn mui-btn-primary mui-btn-outlined btn-lb" @click="updatebook(item.id,'+')">新增馆藏</button></p>
                            <p><button type="button" class="mui-btn mui-btn-royal mui-btn-outlined" @click="updatebook(item.id,'-')">减少馆藏</button></p>
                        </div>
                    </div>

                    <span class="mui-badge mui-badge-primary" v-show="item.how==='n'"><span>馆藏量</span>{{item.booknum}}</span>
                    <span class="mui-badge mui-badge-danger" v-show="item.how==='l'"><span>馆藏量</span>{{item.booknum}}</span>
                    <span class="mui-badge mui-badge-success" v-show="item.how==='m'"><span>馆藏量</span>{{item.booknum}}</span>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
    import {MessageBox, Toast} from "mint-ui";

    export default {
        name: "librarybookAd",
        data(){
            return {
                booklist:[],
            }
        },
        methods:{
            getallbook(){
                this.$http.get('api/getallbooknopho').then(result=>{
                    if(result.status===200){
                        this.booklist=result.body.message;
                        this.booklist.forEach(item=>{
                            if(parseInt(item.booknum)<10)
                            {
                                item.how='l';
                            }
                            else if(parseInt(item.booknum)>=10&&parseInt(item.booknum)<20)
                            {
                                item.how='n';
                            }
                            else {
                                item.how='m';
                            }
                        });

                    }
                });


            },
            updatebook(id,opt){
                MessageBox({
                    $type:'prompt',
                    title:'馆藏管理',
                    message:'请输入修改馆藏数量',
                    closeOnClickModal:true,   //点击背景层关闭MessageBox
                    showCancelButton:true,   //显示取消按钮
                    showInput:true,
                    inputPattern:/^[1-9]\d*$/,
                    inputErrorMessage:'请输入数字！',
                }).then(({value, action }) => {
                    /* value 为填写的值，进行下一步操作*/
                    //console.log(id+value+formatDate(new Date()));
                    let data={id:id,num:value,opt:opt};
                    console.log(data);
                    this.$http.post('api/updatebooknum',data).then(result=>{
                        if(result.status===200){
                            Toast({
                                message:'修改馆藏成功',
                                duration:1000
                            });
                        }else {
                            Toast({
                                message:'修改馆藏失败，请重试',
                                duration:1000
                            })
                        }
                    });
                    this.getallbook();
                }).catch(() => {});
            }
        },
        created() {
            this.getallbook()
        }
    }
</script>

<style scoped>
    .lb-title-h3{
        text-align: center;
        color: #555555;
        margin: 10px 0;
    }
    .lb-li-box{
        width: 90%;
        display: flex;
        justify-content: space-between;
    }
    .lb-li-div-l{
        width:50%;
    }
    .lb-li-div-r{
        width: 35%;
        margin-right: 5px;
    }

    .btn-lb{
        margin-bottom: 5px;
    }
    .lb-li-div-l-p{
        color: #242424;
    }
</style>