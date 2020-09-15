const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, './dist')));
// 创建数据库连接
const mysql = require('mysql');
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1111',
    database:'library1'
});
//原始数据库为library，内测数据库为library1
// 注册 解析表单的body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

app.listen(5000, () => {
    console.log('http://192.168.31.142:5000')
})



/*************************************链接图书馆项目api接口**********************************************************************/
// 根据username 查询    http://127.0.0.1:5000/api/login?username=***
app.get('/api/login',(req,res) => {
    const username = req.query.username;
    const password=req.query.password;
    const sqlStr = 'select username,userps from member where username = ? and password = ?';
    conn.query(sqlStr, [username,password], (err, results) => {
        if (err) return res.json({status: 100, message: '获取数据失败',ups:0, affectedRows: 0});
        if (results.length !== 1) return res.json({status: 200, message: '数据不存在或存在错误', ups:0,affectedRows: 0});
        res.json({
            status: 200,
            message: results[0],
            affectedRows: 0
        })
    })
});
//个人信息获取
app.get('/api/userinfo',(req,res) => {
    const username = req.query.username;
    const sqlStr = 'select username,name,email,phone,userps from member where username = ? ';
    conn.query(sqlStr, username, (err, results) => {
        if (err) return res.json({status: 100, message: '获取数据失败',ups:0, affectedRows: 0});
        if (results.length !== 1) return res.json({status: 200, message: '数据不存在或存在错误', ups:0,affectedRows: 0});
        res.json({
            status: 200,
            message: results[0],
            affectedRows: 0
        })
    })
});

//注册接口
app.post('/api/adduser',(req,res) => {
    const user = req.body;
    console.log(user);
    const sqlStr = 'insert into member set ?';
    conn.query(sqlStr,user,(err,results) => {
        if(err) return res.json({status:101,message:'添加失败',affectedRows:0});
        if(results.affectedRows !== 1) return res.json({status:100,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});

///获取所有图书
app.get('/api/getallbook',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from librarybook';
    conn.query(sqlStr,(err,results) => {
        // console.log(results);
        // console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据

            status:200,message:{results},affectedRows:0
        })
    })
});


//修改用户信息接口
//http://127.0.0.1:5000/api/updateuserinfo用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/updateuserinfo',(req,res) => {
    const sqlStr = 'update member set ? where username = ?';
    conn.query(sqlStr,[req.body,req.body.username],(err,results) => {
        if(err) return res.json({status:0,message:'更新失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'更新项目不存在',affectedRows:0});
        res.json({status:200,message:'更新成功',affectedRows:results.affectedRows})
    })
});

//修改用户密码接口
//http://127.0.0.1:5000/api/updateuserinfopwd用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/updateuserinfopwd',(req,res) => {
    const sqlStr = 'update member set ? where username = ?';
    conn.query(sqlStr,[req.body,req.body.username],(err,results) => {
        if(err) return res.json({status:0,message:'密码修改失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'用户不存在',affectedRows:0});
        res.json({status:200,message:'密码修改成功',affectedRows:results.affectedRows})
    })
});

//查询指定id的图书
//接口地址http://127.0.0.1:5000/api/bookinfo?id=1
app.get('/api/bookinfo',(req,res) => {
    const id = req.query.id;
    const sqlStr = 'select * from librarybook where id = ?';
    conn.query(sqlStr, id, (err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results[0],
            affectedRows: 0
        })
    })
});

// 根据图书isbn获取相关评论数据数据
//http://127.0.0.1:5000/api/getcomment?bookisbn=
app.get('/api/getcomment',(req,res) => {
    // 定义SQL语句
    const isbn=req.query.bookisbn;
    const sqlStr = 'select * from bookcomment where bookisbn = ?';
    conn.query(sqlStr,isbn,(err,results) => {
        console.log(results);
        console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据

            status:200,message:JSON.stringify(results),affectedRows:0
        })
    })
});

//添加评论数据，http://127.0.0.1:5000/api/postcomment?isbn=
//调用传一个body对象数据，用x-www-form格式
app.post('/api/postcomment',(req,res) => {

    const data = req.body;
    console.log(data);
    const sqlStr = 'insert into bookcomment set ?';
    conn.query(sqlStr,[data],(err,results) => {
        if(err) return res.json({status:0,message:'添加失败',affectedRows:0});
        if(results.affectedRows !== 1) return res.json({status:200,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});

//查询指定user的所有评论
//接口地址http://127.0.0.1:5000/api/getusercomment?username=1
app.get('/api/getusercomment',(req,res) => {
    const username = req.query.username;
    console.log(username);
    const sqlStr = 'select * from bookcomment where username = ?';
    conn.query(sqlStr, username, (err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});

//添加图书预约
//接口地址http://127.0.0.1:5000/api/orderbook
app.post('/api/orderbook',(req,res) => {

    const data = req.body;
    console.log(data);
    const sqlStr = 'insert into orderbook set ?';
    conn.query(sqlStr,[data],(err,results) => {
        if(err) return res.json({status:0,message:'添加失败',affectedRows:0});
        if(results.affectedRows !== 1) return res.json({status:100,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});

//检测是否存在了已经预约的图书
//接口地址http://127.0.0.1:5000/api/orderbook
app.post('/api/ishavebook',(req,res) => {

    const data = req.body;
    console.log(data);
    var username=data.username;
    var isbn=data.isbn;
    const sqlStr = 'select COUNT(*) AS count,isok,sum(orderbooknum) As sum from orderbook where username= ? AND isbn= ? ';
    conn.query(sqlStr,[username,isbn],(err,results) => {
        if(err) return res.json({status:0,message:'数据库错误',affectedRows:0});
        res.json({
            status:200,
            message:JSON.stringify(results[0]),
            affectedRows:results.affectedRows
        })
    })
});

//查询指定user的所有预约
//接口地址http://127.0.0.1:5000/api/getuserorder?username=
app.get('/api/getuserorder',(req,res) => {
    const username = req.query.username;
    console.log(username);
    const sqlStr = 'select * from orderbook where username = ?';
    conn.query(sqlStr, username, (err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});

//取消预约
//http://127.0.0.1:5000/api/delorder用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/delorder',(req,res) => {
    const data=req.body;
    const username=data.username;
    const isbn=data.isbn;
    const sqlStr = "update orderbook set orderbooknum=orderbooknum-1,isok='K' where username = ? AND isbn= ? AND isok ='N'";
    conn.query(sqlStr,[username,isbn],(err,results) => {
        if(err) return res.json({status:0,message:'取消失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'取消项目不存在',affectedRows:0});
        res.json({status:200,message:'取消预约成功',affectedRows:results.affectedRows})
    })
});

//预约后修改馆藏
//http://127.0.0.1:5000/api/updatebooknum
app.get('/api/updatebooknum',(req,res) => {

    const isbn=req.query.isbn;
    const sqlStr = "update librarybook set booknum=booknum-1 where isbn = ?";
    conn.query(sqlStr,isbn,(err,results) => {
        if(err) return res.json({status:0,message:'修改失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'修改项目不存在',affectedRows:0});
        res.json({status:200,message:'修改馆藏成功',affectedRows:results.affectedRows})
    })
});



//删除评论
//http://127.0.0.1:5000/api/delcomment用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/delcomment',(req,res) => {
    const data=req.body;
    const username=data.username;
    const bookisbn=data.bookisbn;
    const comment=data.comment;
    const sqlStr = "update bookcomment set displaycomment='N' where username = ? AND bookisbn= ? AND comment = ? ";
    conn.query(sqlStr,[username,bookisbn,comment],(err,results) => {
        if(err) return res.json({status:0,message:'删除失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:100,message:'删除不存在',affectedRows:0});
        res.json({status:200,message:'删除成功',affectedRows:results.affectedRows})
    })
});

//添加反馈数据，http://127.0.0.1:5000/api/postsuggest
//调用传一个body对象数据，用x-www-form格式
app.post('/api/postsuggest',(req,res) => {

    const data = req.body;
    console.log(data);
    const sqlStr = 'insert into suggest set ?';
    conn.query(sqlStr,[data],(err,results) => {
        if(err) return res.json({status:0,message:'添加失败',affectedRows:0});
        if(results.affectedRows !== 1) return res.json({status:200,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});

//查询用户反馈
//接口地址http://127.0.0.1:5000/api/getusersuggest?username=
app.get('/api/getusersuggest',(req,res) => {
    const username = req.query.username;
    console.log(username)
    const sqlStr = 'select * from suggest where username = ?';
    conn.query(sqlStr, username, (err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});

/**************************************************管理员接口*******************************************************/
///获取所有用户
app.get('/api/Adgetalluser',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from member';
    conn.query(sqlStr,(err,results) => {
        // console.log(results);
        console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据
            status:200,message:{results},affectedRows:0
        })
    })
});

//删除用户
//http://127.0.0.1:5000/api/deluserad用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/deluserad',(req,res) => {
    const data=req.body;
    console.log(data)
    const username=data.username;
    const password=data.password;
    const phone=data.phone;
    const sqlStr = "delete from member where username=? and password=? and phone=?";
    conn.query(sqlStr,[username,password,phone],(err,results) => {
        if(err) return res.json({status:0,message:'删除失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'删除项目不存在',affectedRows:0});
        res.json({status:200,message:'删除成功',affectedRows:results.affectedRows})
    })
});

//添加管理员权限
//http://127.0.0.1:5000/api/adaddroot添加管理员权限用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/adaddroot',(req,res) => {
    const data=req.body;
    const username=data.username;
    const password=data.password;
    const phone=data.phone;
    console.log(data);
    const sqlStr = "update member set userps='admin' where username = ?  AND password= ? AND phone= ?";
    conn.query(sqlStr,[username,password,phone],(err,results) => {
        if(err) return res.json({status:0,message:'添加权限失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'添加权限项目不存在',affectedRows:0});
        res.json({status:200,message:'添加权限成功',affectedRows:results.affectedRows})
    })
});

//重置密码为1111
//http://127.0.0.1:5000/api/adrebootpwd添加管理员权限用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/adrebootpwd',(req,res) => {
    const data=req.body;
    const username=data.username;
    const phone=data.phone;
    console.log(data);
    const sqlStr = "update member set password='1234' where username = ?  AND phone= ?";
    conn.query(sqlStr,[username,phone],(err,results) => {
        if(err) return res.json({status:0,message:'重置密码失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'重置密码项目不存在',affectedRows:0});
        res.json({status:200,message:'重置密码成功',affectedRows:results.affectedRows})
    })
});

//获取所有预约
app.get('/api/Adgetallorder',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from orderbook';
    conn.query(sqlStr,(err,results) => {
        // console.log(results);
        //  console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据
            status:200,message:results,affectedRows:0
        })
    })
});

//同意借书申请和取消借书申请
app.get('/api/ordermanage',(req,res) => {
    const id=req.query.id;
    const opt=req.query.opt;
    if(opt==='y'){
        var sqlStr = "UPDATE orderbook set isok='W' WHERE id=?";
    }
    else if(opt==='n'){
        var sqlStr = "UPDATE orderbook set isok='K' WHERE id=?";
    }
    conn.query(sqlStr,id,(err,results) => {
        if(err) return res.json({status:0,message:'操作失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'操作不存在',affectedRows:0});
        res.json({status:200,message:'操作成功',affectedRows:results.affectedRows})
    })
});

///获取所有反馈意见
app.get('/api/getallusersuggest',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from suggest';
    conn.query(sqlStr,(err,results) => {
        // console.log(results);
        //console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据
            status:200,message:results,affectedRows:0
        })
    })
});

//管理员回复用户反馈
//http://127.0.0.1:5000/api/adaddroot添加管理员权限用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/replyusersuggest',(req,res) => {
    const data=req.body;
    const id=data.id;
    const replytime=data.replytime;
    const replyinfo=data.replyinfo;
    const isok='Y';
    //console.log(data);
    const sqlStr = "update suggest set replytime=?,replyinfo=?,isok='Y' where id=?";
    conn.query(sqlStr,[replytime,replyinfo,id],(err,results) => {
        if(err) return res.json({status:0,message:'回复失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'回复不存在',affectedRows:0});
        res.json({status:200,message:'回复成功',affectedRows:results.affectedRows})
    })
});

///获取所有图书
app.get('/api/getallbooknopho',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select id,bookname,isbn,bookwriter,booknum from librarybook';
    conn.query(sqlStr,(err,results) => {
        // console.log(results);
        // console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据

            status:200,message:results,affectedRows:0
        })
    })
});
//修改馆藏数量
//http://127.0.0.1:5000/api/updatebooknum添加管理员权限用传一个body对象数据修改指定id，用x-www-form格式
app.post('/api/updatebooknum',(req,res) => {
    const data=req.body;
    const id=data.id;
    const booknum=data.num;
    const opt=data.opt;
    if(opt==='-'){
        var sqlStr = " update librarybook set booknum=booknum - ? where id = ?";
    }else {
        var sqlStr = " update librarybook set booknum=booknum + ? where id = ?";

    }
    conn.query(sqlStr,[booknum,id],(err,results) => {
        if(err) return res.json({status:0,message:'更新馆藏失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'更新馆藏不存在',affectedRows:0});
        res.json({status:200,message:'更新馆藏成功',affectedRows:results.affectedRows})
    })
});
///获取所有新闻
app.get('/api/getallnews',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from newslist';
    conn.query(sqlStr,(err,results) => {
        // console.log(results);
        // console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据
            status:200,message:results,affectedRows:0
        })
    })
});
///获取所有新闻
app.get('/api/getidnews',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from newslist where id = ?';
    const id=req.query.id
    conn.query(sqlStr,id,(err,results) => {
        // console.log(results);
        // console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据
            status:200,message:results,affectedRows:0
        })
    })
});


//添加新图书数据，http://127.0.0.1:5000/api/addnewbook
//调用传一个body对象数据，用x-www-form格式
app.post('/api/addnewbook',(req,res) => {

    const data = req.body;
    console.log(data);
    const sqlStr = 'insert into librarybook set ?';
    conn.query(sqlStr,[data],(err,results) => {
        if(err) return res.json({status:0,message:'添加失败',affectedRows:0});
        //if(results.affectedRows !== 1) return res.json({status:200,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});
/****************************内测功能区     座位预定**************************************************************/
///获取所有座位
app.get('/api/getallseat',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from allseat';
    conn.query(sqlStr,(err,results) => {
        // console.log(results);
        // console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据
            status:200,message:results,affectedRows:0
        })
    })
});
//获取座位信息
app.get('/api/getseatinfo',(req,res) => {
    // 定义SQL语句
    const id=req.query.id;
    const sqlStr = 'select * from allseat where id=?';
    conn.query(sqlStr,id,(err,results) => {
        // console.log(results);
        // console.log(results[0]);//每一行查询结果保存到数字中，这个数组元素是一个对象，对象包括sql获得的属性
        if(err) return res.json({status:0,message:'获取失败',affectedRows:0});
        res.json({
            //在这里返回json对象给服务器，status是状态码，mssage是sql获得的内容属性，
            //results是sql获取的数据

            status:200,message:results[0],affectedRows:0
        })
    })
});
///获取用户所有座位预约
app.get('/api/getuserseat',(req,res) => {
    const username = req.query.username;
    //console.log(username);
    const sqlStr = 'select * from userseat where username = ?';
    conn.query(sqlStr, username, (err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});
/*座位预约状态修改*/
app.post('/api/seatupdate',(req,res) => {
    const data = req.body;
    console.log(req.body)
    const id=data.id;
    const username=data.username;
    const seatw=data.seatw;
    const seatc=data.seatc;
    const opt=data.opt;
    if(opt==='Y'){//确认入座
        var sqlStr = "update userseat set isok='Y' where username =?  AND seatc=? AND seatw=? AND id=?";
    }
    else if(opt==='N'){//取消入座
        var sqlStr = "update userseat set isok='N' where username =?  AND seatc=? AND seatw=? AND id=?";
    }
    conn.query(sqlStr,[username,seatc,seatw,id],(err,results) => {
        if(err) return res.json({status:0,message:'操作失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'操作不存在',affectedRows:0});
        res.json({status:200,message:'操作成功',affectedRows:results.affectedRows})
    })
});
/*离座*/
app.get('/api/leaveseat',(req,res) => {
    const id = req.query.id;
    var sqlStr = "update userseat set isok='S' where id=?";
    conn.query(sqlStr,id,(err,results) => {
        if(err) return res.json({status:0,message:'操作失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'操作不存在',affectedRows:0});
        res.json({status:200,message:'操作成功',affectedRows:results.affectedRows})
    })
});
/*离座接口2 更新所有座位表   api/leaveseatandupdate*/
app.post('/api/leaveseatandupdate',(req,res) => {
    const data = req.body;
    const seatw=data.seatw;
    const seatc=data.seatc;
    var sqlStr = "update allseat set IsOkToOrder='Y',ishavepeople='N' where seatc=? AND seatw=?";
    conn.query(sqlStr,[seatc,seatw],(err,results) => {
        if(err) return res.json({status:0,message:'操作失败',affevtedRows:0});
        //影响行数不等于1
        if(results.affectedRows !== 1) return res.json({status:0,message:'操作不存在',affectedRows:0});
        res.json({status:200,message:'操作成功',affectedRows:results.affectedRows})
    })
});


/*加入预约座位到座位表*/
app.post('/api/orderseat',(req,res) => {
    const data = req.body;
    //console.log(req.body)
    const id=data.id;
    const IsOkToOrder=data.IsOkToOrder;
    const ishavepeople=data.ishavepeople;
    const begintime=data.begintime;
    const  endtime=data.endtime;
    const sqlStr='update allseat set IsOkToOrder=? , ishavepeople=? , begintime=? ,endtime=? WHERE id=?';
    conn.query(sqlStr,[IsOkToOrder,ishavepeople,begintime,endtime,id],(err,results) => {
        if(err) return res.json({status:0,message:'操作失败',affevtedRows:0});
        res.json({status:200,message:'操作成功',affectedRows:results.affectedRows})
    })
});
/*加入预约座位到用户座位表*/
app.post('/api/adduserseat',(req,res) => {
    const data = req.body;
    console.log(data);
    const sqlStr = 'insert into userseat set ?';
    conn.query(sqlStr,[data],(err,results) => {
        if(err) return res.json({status:0,message:'添加失败',affectedRows:0});
        if(results.affectedRows !== 1) return res.json({status:200,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});





/********************************************************************图书推荐与分类*/
//**api/getimgcategory  获取图书分类
app.get('/api/getimgcategory',(req,res) => {
    const sqlStr = 'select bookclass,bookclassname from bookclass';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});
//**  获取图书分类对应的图书
app.get('/api/getbooks',(req,res) => {
    const bookclass=req.query.bookclass;
    const sqlStr = 'select * from librarybook where bookclass=?';
    conn.query(sqlStr, bookclass,(err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});

/*获取推荐图书分类*/
app.get('/api/getsuggestbook',(req,res) => {
    const username=req.query.username;
    const sqlStr ='SELECT * from (select username,bookclass,count(bookclass) as tj FROM orderbook GROUP BY bookclass,username) temp WHERE temp.username=? ORDER BY tj';
    conn.query(sqlStr, username,(err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        console.log(results[0]);
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});
/*根据推荐分类获得图书*/
app.get('/api/getsuggestbooks',(req,res) => {
    const bookclass=req.query.bookclass;
    const sqlStr ='SELECT * from librarybook WHERE bookclass=?';
    conn.query(sqlStr, bookclass,(err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});



/********************图标数据分析接口******************************/
/*按月日获取预约数量统计*/
app.get('/api/analyseorderbooknum',(req,res) => {
    const sqlStr ='SELECT DATE_FORMAT(ordertime,"%m-%d") date,SUM(orderbooknum) count FROM orderbook GROUP BY date order by date ASC';
    conn.query(sqlStr,(err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results.sort(),
            affectedRows: 0
        })
    })
});
/*按图书类别获取预约热度统计*/
app.get('/api/analyseorderbookclass',(req,res) => {
    const sqlStr ='SELECT bookclass.bookclass,bookclass.bookclassname,count FROM (SELECT bookclass,count(bookclass) count from orderbook GROUP BY bookclass) a,bookclass where bookclass.bookclass=a.bookclass';
    conn.query(sqlStr,(err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});

/****************************************************首页设置***************************/
/*公告获取*/
app.get('/api/getannounce',(req,res) => {
    const sqlStr ='SELECT * FROM announcement';
    conn.query(sqlStr,(err, results) => {
        if (err) return res.json({status: 0, message: '获取数据失败', affectedRows: 0});
        //if (results.length !== 1) return res.json({status: 0, message: '数据不存在', affectedRows: 0});
        res.json({
            status: 200,
            message: results,
            affectedRows: 0
        })
    })
});
/*加入新公告*/
app.post('/api/addannounce',(req,res) => {
    const data = req.body;
    console.log(data);
    const sqlStr = 'insert into announcement set ?';
    conn.query(sqlStr,[data],(err,results) => {
        if(err) return res.json({status:0,message:'添加失败',affectedRows:0});
        if(results.affectedRows !== 1) return res.json({status:200,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});
/*加入新闻*/
app.post('/api/addnews',(req,res) => {
    const data = req.body;
    console.log(data);
    const sqlStr = 'insert into newslist set ?';
    conn.query(sqlStr,[data],(err,results) => {
        if(err) return res.json({status:0,message:'添加失败',affectedRows:0});
        //if(results.affectedRows !== 1) return res.json({status:200,message:'添加失败',affectedRows:0});
        res.json({
            status:200,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
});