const mongoDb=require('mongodb');
const {getdb}=require('../util/database');

class User{
    constructor(username,email,cart,id){
        this.name=username;
        this.email=email;
        this.cart=cart; // {items:[]}
        this._id=id;
    }

    save(){
        const db=getdb();
        db.collection('users').insertOne(this)
        .then(result =>{
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
    }

    static async findById(userId){
        const db=getdb();
        try {
            const user = await db.collection('users').find({_id:mongoDb.ObjectId.createFromHexString(userId)}).next();
            console.log(user);
            return user; 
        } catch (err) {
            console.log('Error fetching product:', err); 
            throw err;
        }
    }

    getcart(){
        const db=getdb();
        const productIds=this.cart.items.map(i =>{
            return i.productId;
        })
        return db.collection('products')
        .find({_id:{$in: productIds} })
        .toArray()
        .then(products => {
            return products.map(p => {
                return{...p,
                    quantity:this.cart.items.find(i=>{
                        return i.productId.toString()===p._id.toString();
                    }).quantity
                };
            });
        });
    }

    deletefromcart(prodId){
        const updatedcartItems=this.cart.items.filter(item => {
            return item.productId.toString()!== prodId.toString();
        })
        const updatedcart={items:updatedcartItems};
        const db=getdb();
        db.collection('users').updateOne({_id:this._id},
    {$set:{cart:updatedcart}})
    .then(result => {
        return result;
    })
    .catch(err =>{
        console.log(result);
    })
    }

    addtocart(product){
        const cartProductIndex=this.cart.items.findIndex(cp =>{
            return cp.productId.toString()===product._id.toString();
        });
        let newquantity=1;
        const updatedcartItems=[...this.cart.items];

        if(cartProductIndex>=0){
            newquantity=this.cart.items[cartProductIndex].quantity + 1;
            updatedcartItems[cartProductIndex].quantity=newquantity;

        }else{
            updatedcartItems.push({
                productId:product._id,
                quantity:newquantity
            })
        }
         const updatedcart={items:updatedcartItems};
        const db=getdb();
        db.collection('users').updateOne({_id:this._id},
    {$set:{cart:updatedcart}})
    .then(result => {
        return result;
    })
    .catch(err =>{
        console.log(result);
    })
    }

}

module.exports=User;