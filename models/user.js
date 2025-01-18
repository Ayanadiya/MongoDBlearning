const mongoDb=require('mongodb');
const {getdb}=require('../util/database');

class User{
    constructor(username,email){
        this.name=username;
        this.email=email;
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
}

module.exports=User;