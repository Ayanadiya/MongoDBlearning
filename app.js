const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');

const mongoConnect=require('./util/database').mongoConnect;
const User=require('./models/user');

const homerouter=require('./routes/home');
const adminrouter=require('./routes/admin');
const shoprouter=require('./routes/shop');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/domjs', express.static(path.join(__dirname,'domjs')));
//app.use(express.static(path.join(__dirname, 'views')));

app.use((req,res,next) => {
    User.findById('678b71f576b39db375dd37f2')
    .then(user =>{
        req.user=user;
        next();
    })
    .catch(err =>{
        console.log(err)
    })
})

app.use('/shop', shoprouter);
app.use('/admin', adminrouter);
app.use(homerouter);

mongoConnect(client =>{
    console.log(client);
    app.listen(3000);
})