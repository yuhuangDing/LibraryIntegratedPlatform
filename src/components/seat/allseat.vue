<template>
    <div>
        <div>
            <h3 class="allseat-h3">座位预约</h3>
        </div>

        <div class="box">
            <div class="mui-content" style="background: white;text-align: center;margin: 0 5%" >
                <div class="mui-row" style="margin-left: 10%">

                    <div class="mui-col-sm-2" v-for="item in allseat" :key="item.id">
                        <div @click="toSeatinfo(item.id)" class="item-seat">
                            <img v-if="item.ishavepeople==='N'" src="../../images/zw.png" width="40px" height="40px">
                            <img v-if="item.ishavepeople==='Y'" src="../../images/zwx.png" width="40px" height="40px">

                            <p>{{item.seatc}}层-{{item.seatw}}号</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="info-note">
            <p style="color: orange">注意：红色座位表示当前已经被其他用户预约，您可以选择其他绿色座位</p>
        </div>
        <div class="bg">
            <br><br><br><br><br>
            &nbsp;测<br><br><br><br><br><br><br><br>
            &nbsp;&nbsp;&nbsp;试<br><br><br><br><br><br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页<br><br><br><br><br><br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;面
        </div>
    </div>
</template>

<script>
    export default {
        name: "allseat",
        data(){
            return {
                allseat:[],
            }
        },
        methods:{
            getallseat(){
                this.$http.get('api/getallseat').then(result=>{
                    if(result.status===200){
                        //console.log(result.body);
                        this.allseat=result.body.message;
                        console.log(this.allseat)
                    }else{
                        console.log('获取座位表失败');
                    }
                })
            },
            toSeatinfo(id){
                this.$router.push({path: '/member/allseat/seatinfo', query: {id:id}})
            }
        },
        created() {
            this.getallseat();
        }

    }
</script>

<style scoped>
    .allseat-h3{
        text-align: center;
        color: #555555;
        margin-bottom: 10px;
    }
    .item-seat{
        margin: 5px 10px;
    }
    .info-note{
        margin-left: 20px;
        margin-right: 20px;

    }
    .bg
    {
        width: 100%;
        height: 100%;
        margin-top: 0px;
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 0px;
        background-color: #998a8a;
        filter: alpha(opacity=10);
        -moz-opacity: 0.05;
        opacity: 0.2;
        font-size: 100px;
        color: White;
    }
    .box{
        z-index: 50;
    }
</style>