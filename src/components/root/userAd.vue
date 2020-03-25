<template>
    <div>
        <h3 class="userAd-title">所有用户</h3>
        <div>
            <div class="mui-card" v-for="item in alluserlist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>用户名：{{item.username}}</p>
                        <p>E-mail：{{item.email}}</p>
                        <p>联系电话：{{item.phone}}</p>
                        <p>用户权限：{{item.userps}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <button type="button" class="mui-btn mui-btn-primary" @click="changepwd(item.id)">
                        密码重置
                    </button>
                    <button type="button" class="mui-btn mui-btn-danger" @click="deluser(item.id)">
                        删除用户
                    </button>
                    <button type="button" class="mui-btn mui-btn-royal" @click="addroot(item.id)">
                        添加管理权限
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import {getCookie} from '../../assets/js/cookie.js'
    export default {
        name: "user",
        data(){
            return{
                alluserlist:[],
                newpwd:'',

            }
        },
        methods:{
            getalluser(){
                let uname=getCookie('username');
                this.$http.get('api/Adgetalluser').then(result=>{
                    if(result.status===200){
                        this.alluserlist=result.body.message.results;
                        this.alluserlist.forEach((item,i)=>{
                            if(item.username===uname){
                                this.alluserlist.splice(i,1);
                            }
                            if(item.userps==='1'){
                                item.userps='普通用户';
                            }else if(item.userps==='admin'){
                                item.userps='管理员';
                            }
                        });
                    }
                })
            },
           changepwd(id){
                var cpwduser='';
                this.alluserlist.forEach(item=>{
                    if(item.id===id){
                        cpwduser=item;
                        return ;
                    }
                });
                let data={username:cpwduser.username,phone:cpwduser.phone};
                console.log(cpwduser);
                console.log(data);
                this.$http.post('api/adrebootpwd',data).then(result=>{
                   if(result.status===200){
                       Toast({
                           message:"重置密码成功，初始密码为：1234",
                           duration:4000
                       });
                   }else {
                       Toast({
                           message:"重置密码失败请重试",
                           duration:3000
                       });
                   }
               });

            },
            deluser(id){
                var deluser='';
                this.alluserlist.forEach((item,i)=>{
                    if(item.id===id){
                        deluser=item;
                        this.alluserlist.splice(i,1);
                    }

                });
                let data={username:deluser.username,password:deluser.password,phone:deluser.phone}
              //  console.log(data);
                this.$http.post('api/deluserad',data).then(result=>{
                    if(result.status===200)
                    {
                        Toast({
                            message:"删除用户成功",
                            duration: 3000
                        })
                    }
                });
            },
            addroot(id){
                var cuser='';
                this.alluserlist.forEach(item=>{
                    if(item.id===id){
                        cuser=item;
                        return ;
                    }
                });
                if(cuser.userps==='普通用户'){
                    cuser.userps='admin';
                }else {
                    Toast({
                        message:"用户已经是管理员",
                        duration:3000
                    });
                    return ;
                }
                let data={username:cuser.username,password:cuser.password,phone:cuser.phone};
                this.$http.post('api/adaddroot',data).then(result=>{
                    if(result.status===200)
                    {
                        Toast({
                            message:"添加管理权限成功",
                            duration: 3000
                        })
                    }
                });
                console.log(cuser);
                this.getalluser();
            }

        },
        created() {
            this.getalluser();
        }
    }
</script>

<style scoped>
    .userAd-title{
        font-size: 25px;
        text-align: center;
        color: #555555;
    }

</style>