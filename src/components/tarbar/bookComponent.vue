<template>
    <div>
        <h1 class="h1-titile-index">图书列表</h1>
        <div class="book-list">
            <router-link to="/book/info" tag="div" class="book-list-item" v-for="item in bookList" :key="item.id">
                <img class="booksimg" src="../../images/icon-man.png">
                <h1 class="h1-titile">{{item.bookname}}</h1>
                <div class="book-info">
                    <p>{{item.isbn}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bookComponent",
        data(){
            return{
                bookList:[],
            }
        },
        methods:{
            getBookList(){
                this.$http.get('http://127.0.0.1:5000/api/getallbook').then(result=>{
                    if(result.status===200){
                        console.log(result.body.message.results[0])
                        this.bookList=result.body.message.results;

                        /********************************************/

                        /*************************************************/
                    }
                })
            }
        },
        created() {
            this.getBookList();
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

</style>