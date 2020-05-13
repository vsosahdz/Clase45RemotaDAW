const mongoose=require('mongoose')

const productoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre:{
        type:String,
        required: true
    },
    precio:{
        type:Number,
        required: true
    },
    descripcion:{
        type:String,
        required: false
    }
});

module.exports= mongoose.model('Producto', productoSchema);



// const mongodb=require('mongodb');
// const getDb=require("../util/database").getDb;

// class Producto{
//     constructor(nombre, precio,descripcion,id){
//         this.nombre=nombre;
//         this.precio=precio;
//         this.descripcion=descripcion;
//         this._id=id? new mongodb.ObjectId(id) : null;
//     }
    
//     save(){
//         const db=getDb();
//         let dbOp;
//         if(this._id){
//             //Actualizar
//             dbOp=db.collection('productos').updateOne({_id:this._id},{$set:this});
//         }else{
//             //Agregar
//             dbOp=db.collection('productos').insertOne(this);
//         }
//         return dbOp
//         .then(resultado=>{
//             console.log('Operación exitosa');
            
//         })
//         .catch(err=>console.log(err))
//     }
//     static fetchAll(){
//         const db= getDb();
//         return db.collection('productos').find().toArray()
//             .then(productos=>{
//                 console.log(productos);
//                 return productos;
//             })
//             .catch(err=>console.log(err))
//     }
    
//     static findById(prodId){
//         const db=getDb();
//         return db.collection('productos').find({_id: new mongodb.ObjectId(prodId)}).next()
//         .then(producto=>{
//                 console.log(producto);
//                 return producto;
//             })
//             .catch(err=>console.log(err))
//     }
    
//     static deleteById(prodId){
//         const db=getDb();
//         return db.collection('productos').deleteOne({_id: new mongodb.ObjectId(prodId)})
//         .then(resultado=>{
//                 console.log('Eliminado');
//             })
//             .catch(err=>console.log(err))
//     }
// }

// module.exports=Producto;