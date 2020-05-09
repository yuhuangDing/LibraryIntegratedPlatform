<template>
    <div>
        <h3 class="myseat-h3">
            <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
            我的座位预约
        </h3>
        <hr style="width: 75%"/>
        <div class="mui-card" v-show="flag">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="mycomment-w-p">当前暂无预约数据哦，快去预约座位吧！</p>
                </div>
            </div>
        </div>

    <div class="mui-card" v-for="item in Myseat" :key="item.id">
        <div class="mui-card-header">
            <div>
                <p class="mycomment-pl-p">预约座位：&nbsp;&nbsp;&nbsp;&nbsp;{{item.seatc}}层&nbsp;&nbsp;-&nbsp;&nbsp;{{item.seatw}}号</p>
                <p class="mycomment-pl-p">预约提交时间：{{item.ordertimebegin|dataFormat}}</p>
                <p class="mycomment-pl-p">预约到座时间：{{item.ordertimeend|dataFormat}}

                </p>
                <p class="mycomment-pl-p">预约状态：{{item.isok}}
                    <img v-show="item.isok==='已完成'" src="../../images/ok.png" width="25px" height="25px" class="myorder-icon">
                    <img v-show="item.isok==='待离座'" src="../../images/ddlk.png" width="25px" height="25px" class="myorder-icon">
                    <img v-show="item.isok==='待入座'" src="../../images/dd.png" width="25px" height="25px" class="myorder-icon">
                    <img v-show="item.isok==='已取消'" src="../../images/qx.png" width="25px" height="25px" class="myorder-icon">
                </p>
                <p v-show="item.isok==='待入座'"  class="buttongroup">
                    <mt-button type="primary" size="normal" plain @click="intoseat(item.id,'Y')">确认入座</mt-button>
                    <mt-button type="danger" size="normal" plain  @click="intoseat(item.id,'N')">取消预约</mt-button>
                </p>
                <mt-button  v-show="item.isok==='待离座'" type="default" size="normal" plain  @click="leaveseat(item.id)">离座</mt-button>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
    import {getCookie} from "../../assets/js/cookie";
    import {Toast,MessageBox} from "mint-ui";

    export default {
        name: "myseatinfo",
        data(){
            return{
                Myseat:[],
                flag:false,
            }
        },
        methods:{
            getmyseat(){
                var name = getCookie('username');
                this.$http.get('api/getuserseat?username='+name).then(result=>{
                    if(result.status===200){
                        if(result.body.message.length===0)
                            this.flag=true;
                        else {
                            // console.log('/***********'+this.Mycomments)
                            this.Myseat=result.body.message
                            this.Myseat.forEach(item=>{
                                if(item.isok==='Y'){
                                    item.isok='待离座';
                                }
                                else if(item.isok==='N')
                                {
                                    item.isok='已取消';
                                }
                                else if(item.isok==='D')
                                {
                                    item.isok='待入座';
                                }
                                else if(item.isok==='S')
                                {
                                    item.isok='已完成';
                                }


                            })

                        }
                        console.log(result.body.message);
                    }
                })
            },
            intoseat(id,opt){
                let seatinfo='';
                this.Myseat.some((item,i)=>{
                    if(item.id===id){
                        seatinfo=item;
                    }
                });
                if(opt==='Y'){
                    var data={username:seatinfo.username,seatc:seatinfo.seatc,seatw:seatinfo.seatw,opt:'Y',id:seatinfo.id};
                }
                else {
                    var data={username:seatinfo.username,seatc:seatinfo.seatc,seatw:seatinfo.seatw,opt:'N',id:seatinfo.id};
                    let seatdata={seatc:seatinfo.seatc,seatw:seatinfo.seatw};
                    this.$http.post('api/leaveseatandupdate',seatdata).then(result=>{
                        if(result.status===200){
                            console.log("OK")
                        }
                    });
                }
                this.$http.post('api/seatupdate',data).then(result=>{
                    if(result.status===200){
                        Toast({
                            message:"操作成功",
                            duration: 1000,
                        });
                    }
                });
                this.getmyseat();


            },
            leaveseat(id){
                let seatinfo='';
                this.Myseat.some((item,i)=>{
                    if(item.id===id){
                        seatinfo=item;
                    }
                });
                console.log(seatinfo)
                this.$http.get('api/leaveseat?id='+seatinfo.id).then(result=>{
                    if(result.status===200){
                        Toast({
                            message:"离座成功",
                            duration: 1000,
                        });
                    }
                });
                let seatdata={seatc:seatinfo.seatc,seatw:seatinfo.seatw};
                this.$http.post('api/leaveseatandupdate',seatdata).then(result=>{
                    if(result.status===200){
                        console.log("OK")
                    }
                });


                this.getmyseat()
            }

        },
        created() {
            MessageBox({
                title: '温馨提示',
                message: '确认到座后，务必点击”确认入座“按钮，否则您的座位超时将被系统取消！谢谢合作！',
                showCancelButton: false
            });
            this.getmyseat();
        }
    }
</script>

<style scoped>
    .myseat-h3{
        text-align: center;
        font-size: 30px;
        color: #555555;
        margin: 10px 0;
    }
    .mycomment-w-p{
        font-size: 18px;
        text-align: center;
        color: #555555;
        margin-top: 2px;

    }
    .mycomment-a-delete{
        margin-left: 20px;
        color: red;
    }
    .mycomment-pl-p{
        font-size: 14px;
        font-weight: bold;
        color: #242424;
    }
    .mycomment-text{
        color: #6d6d72;
        font-size: 15px;
    }
    .mycomment-a-delete1{
        margin-left: 20px;
        color: #ff8c0e;
    }
    .myorder-icon{
        display: inline-block;
        vertical-align: middle;
    }
    .buttongroup{
        display: flex;
        justify-content: space-between;
    }
</style>