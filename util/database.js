const mongodb=require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect=callback=>{
    MongoClient.connect('mongodb://localhost:27017/tienda',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(cliente=>{
        console.log('Conectado')
        _db=cliente.db();
        callback();
        //Consultas
    })
    .catch(err=>{
        console.log(err)
        throw err;
    });
};

const getDb=()=>{
    if(_db){
        return _db
    }
    throw 'Base de datos sin configurar'
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;