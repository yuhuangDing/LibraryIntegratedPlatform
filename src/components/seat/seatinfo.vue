<template>
    <div>
        kkk
        {{seatid}}
    </div>
</template>

<script>
    export default {
        name: "seatinfo",
        data(){
            return{
                seatid:this.$route.query.id,
                seatinfo: {},
            }
        },
        methods:{
            getseatinfo(){
                let id=this.$route.query.id;
                this.$http.get('api/getseatinfo?id='+id).then(result=>{
                    if(result.status===200){
                        //console.log(result.body.message)
                        this.seatinfo=JSON.stringify(result.body.message);
                      //  console.log(this.seatinfo)
                    }
                })
            }
        },
        created() {
            this.getseatinfo();
        }
    }
</script>

<style scoped>

</style>