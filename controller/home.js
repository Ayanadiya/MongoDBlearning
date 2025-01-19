const path=require('path');

exports.getshoppage=(req,res,next) =>{
    res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
}

exports.getadminpage=(req,res,next) =>{
    res.sendFile(path.join(__dirname, '../','views', 'admin.html'));
}

exports.getcartpage=(req,res,next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'cart.html'));
}