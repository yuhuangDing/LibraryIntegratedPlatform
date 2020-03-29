<template>
    <div>
        <h1 class="h1-titile-index">图书列表</h1>
        <div class="mui-input-row mui-search search-box" >
            <input type="search" class="mui-input-clear mui-input-clear" placeholder="搜索图书" v-model="keyword">
        </div>

        <div class="book-list">
            <router-link tag="div"  :to=" '/book/bookinfo/'+item.id" class="book-list-item" v-for="item in search(keyword)" :key="item.id">
                <img class="booksimg" :src="item.bookimg">
                <h1 class="h1-titile">{{item.bookname}}</h1>
                <div class="book-info">
                    <p>{{item.bookwriter}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
   import {Toast} from 'mint-ui'

    export default {
        name: "bookComponent",
        data(){
            return{
                bookList:[],
                keyword:'',//搜索关键字
            }
        },
        methods:{
            getBookList(){
                this.$http.get('api/getallbook').then(result=>{
                    if(result.status===200){
                        //console.log(result.body.message.results[0]);
                        this.bookList=result.body.message.results;

                    }
                })
            },
            search(keyword){
                var newlist=[];
                var flag=false;
                this.bookList.forEach(item=>{
                    if(item.bookname.indexOf(keyword)!==-1){
                        newlist.push(item);
                    }
                });
                if(newlist.length===0&&keyword.length!==0){
                    Toast({
                        message:"馆藏暂无此书",
                        duration:1000
                    });
                    return newlist=this.bookList;
                }
                else if(newlist.length===0&&keyword.length===0){
                    return newlist=this.bookList;
                }
                else return newlist;
            }
        },
        created() {
            this.getBookList();

        },
        mounted() {
           this.mui('.mui-input-row input').input();
        }

    }
</script>

<style scoped>
    .book-list{
        display: flex;
        flex-wrap: wrap;
        /*水平排列，如上*/

        /*两边留边，中间空白，左右对齐*/
        padding: 7px;
        justify-content: space-between;


    }
    .book-list-item{
        width: 48%;
        /*每行排两个*/
        border: 1px solid #cccccc;
        box-shadow: 0 0 8px #6641e2;
        margin: 4px 0;
        padding: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 260px;

    }
    .booksimg{
        width: 100%;
    }
    .h1-titile{

        font-size: 20px;
    }
    .h1-titile-index{
        font-size: 30px;
        text-align: center;
        color: #8f8f94;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .search-box{
        width: 80%;
         margin: 0 10%;

    }
</style>