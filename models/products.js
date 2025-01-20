const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports=mongoose.model('Product', productSchema);
// const mongoDb=require('mongodb');
// const {getdb}=require('../util/database');

// class Product{
//     constructor(title,price,description,imageUrl,id,userId){
//         this.title=title;
//         this.price=price;
//         this.description=description;
//         this.imageUrl=imageUrl;
//         this._id=id;
//         this.userId=userId;
//     }

//     save(){
//         const db=getdb();
//         db.collection('products').insertOne(this)
//         .then(result =>{
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }

//     edit(prodId){
//         const db=getdb();
//         const updateData = { 
//             title: this.title,
//             price: this.price,
//             description: this.description,
//             imageUrl: this.imageUrl
//         };
//         db.collection('products').updateOne({_id: mongoDb.ObjectId.createFromHexString(prodId)},{$set:updateData})
//         .then(result =>{
//             console.log(result)})
//         .catch(err =>{
//             console.log(err);
//         })
//     }

//     static async fetchAll(){
//         const db=getdb();
//         try {
//             const products = await db.collection('products').find().toArray();
//             return products
//         } catch (err) {
//             console.log('Error fetching products:', err); 
//             throw err;
//         }
//     }

//     static async findById(prodId){
//         const db=getdb();
//         try {
//             const product = await db.collection('products').find({_id: mongoDb.ObjectId.createFromHexString(prodId)}).next();
//             console.log(product);
//             return product; 
//         } catch (err) {
//             console.log('Error fetching product:', err); 
//             throw err;
//         }
//     }

//     static delete(prodId){
//         const db=getdb();
//         db.collection('products').deleteOne({_id: mongoDb.ObjectId.createFromHexString(prodId)})
//         .then(result =>{
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// }

// module.exports=Product;