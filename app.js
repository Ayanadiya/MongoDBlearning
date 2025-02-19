const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const mongoose=require('mongoose');

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
    User.findById('678e5aba2a0ce7afbd25bee7')
    .then(user =>{
        req.user= user
        next();
    })
    .catch(err =>{
        console.log(err)
    })
})

app.use('/shop', shoprouter);
app.use('/admin', adminrouter);
app.use(homerouter);

mongoose.connect('mongodb+srv://ayanadiya17:XURFfh5v9TP68fWt@cluster0.so6u9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
    console.log('connected');
    User.findOne()
    .then(user =>{
        if(!user)
        {
            const user= new User({
                name:'diya',
                email:'diya11@gmail.com',
                cart:{
                    items:[]
                }
            });
            user.save(); 
        }
    }
    )
    app.listen(3000);
}).catch(err =>{
    console.log(err);
})

