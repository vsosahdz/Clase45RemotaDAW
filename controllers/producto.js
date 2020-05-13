const Producto = require('../models/producto');
const mongoose = require('mongoose');

exports.getAgregarProducto = (req, res) => {
  res.render('producto/editar-producto.html', {
    pageTitle: 'Agregar Producto',
    path: '/producto/agregar-producto',
    editing: false
  });
};

exports.postAgregarProducto = async (req, res) => {
  const nombre=req.body.nombre;
  const precio=req.body.precio;
  const descripcion=req.body.descripcion;
  const producto=new Producto({
    nombre:nombre,
    precio:precio,
    descripcion:descripcion,
    _id:new mongoose.Types.ObjectId()
  });
  try{
    await producto.save();
    console.log(producto);
    console.log('Producto creado');
    res.redirect('/producto/productos')
  }catch(err){
    console.log(err);
  }
};

exports.getEditarProducto = async (req, res) => {
  const editMode= req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId =req.params.productoId;
  try{
    const producto=await Producto.findById(prodId); 
    if(!producto){
         res.redirect('/');
    }
    res.render('producto/editar-producto.html', {
        pageTitle: 'Editar Producto',
        path: '/producto/editar-producto',
        editing: editMode,
        producto:producto
    }); 
  }catch(err){
    console.log(err);
  }
};

exports.postEditarProducto = async (req, res) => {
  const prodId=req.body.productoId;
  const nNombre=req.body.nombre;
  const nPrecio=req.body.precio;
  const nDescripcion=req.body.descripcion;
  try{
    let producto= await Producto.findById(prodId);
    producto.nombre=nNombre,
    producto.precio=nPrecio,
    producto.descripcion=nDescripcion
    await producto.save();
    console.log('Producto editado')
    res.redirect('/producto/productos')
  }catch(err){
    console.log(err);
  }
  
};

exports.getProductos = (req, res) => {
  //Producto.fetchAll()
  Producto.find()
  .then(productos=>{
    console.log(productos);//opc
    res.render('producto/productos.html', {
        prods: productos,
        pageTitle: 'Adminstrar Productos',
        path: '/producto/productos'
      });  
  })
  .catch(err=>console.log(err))
};

exports.postEliminarProducto = (req, res) => {
  const prodId=req.body.productoId;
  
  Producto.findByIdAndRemove(prodId)
  .then(()=>{
     console.log('Producto eliminado');
     res.redirect('/producto/productos')
   })
  .catch(err=>console.log(err))
};
