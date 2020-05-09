<template>
    <div>
        <div>
            <h3 class="allseat-h3">座位预约</h3>
        </div>
        <div class="seat-bigbox">
            <div class="seat-box" v-for="item in allseat" :key="item.id">
                <div @click="toSeatinfo(item.id)">
                    <img class="seat-img" v-if="item.IsOkToOrder==='Y'" src="../../images/zw.png" width="40px" height="40px">
                    <img class="seat-img" v-if="item.IsOkToOrder==='D'||item.IsOkToOrder==='N'" src="../../images/zwx.png" width="40px" height="40px">
                    <p>{{item.seatc}}层-{{item.seatw}}号</p>
                </div>
            </div>

        </div>



        <div class="info-note">
            <p style="color: orange">注意：红色座位表示当前已经被其他用户预约，您可以选择其他绿色座位</p>
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
                this.$router.push({path: '/allseat/seatinfo', query: {id:id}})
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
    .seat-bigbox{
        overflow: hidden;
        margin: 0 20px;
    }
    .seat-box{
        float: left;
        width: 60px;
        height: 80px;
        margin-right: 2px;

    }
    .seat-img{
        display: block;
        margin: 5px auto;
    }
    .seat-box p{

        margin: 0 auto;
        color: #555555;
        text-align: center;
    }
</style>