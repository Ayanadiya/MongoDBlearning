const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback) => {
    MongoClient.connect('mongodb+srv://ayanadiya17:XURFfh5v9TP68fWt@cluster0.so6u9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
        console.log('connected');
        _db=client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err
    });
}

const getdb=() =>{
    if(_db)
        {
            return _db
        }
        throw 'No database found'
}

module.exports={mongoConnect, getdb};

