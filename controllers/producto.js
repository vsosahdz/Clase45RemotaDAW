const Producto = require('../models/producto');
const mongoose = require('mongoose');

exports.getAgregarProducto = (req, res) => {
  res.render('producto/editar-producto.html', {
    pageTitle: 'Agregar Producto',
    path: '/producto/agregar-producto',
    editing: false
  });
};

exports.postAgregarProducto = (req, res) => {
  const nombre=req.body.nombre;
  const precio=req.body.precio;
  const descripcion=req.body.descripcion;
  const producto=new Producto({
    nombre:nombre,
    precio:precio,
    descripcion:descripcion,
    _id:new mongoose.Types.ObjectId()
  });
  producto
    .save()
    .then(resultado=>{
      console.log(producto);
      console.log('Producto creado');
      res.redirect('/producto/productos')
    })
    .catch(err=>console.log(err));
  
  //const producto=new Producto(nombre,precio,descripcion); mongodb  
  // producto
  //   .save()
  //   .then(resultado=>{
  //     console.log(producto);
  //     console.log('Producto creado');
  //     res.redirect('/producto/productos')
  //   })
  //   .catch(err=>console.log(err));
};

exports.getEditarProducto = (req, res) => {
  const editMode= req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId =req.params.productoId;
  Producto.findById(prodId) // funciona para mongodb y mongoose de forma indistinta
    .then(producto=>{
      if(!producto){
        return res.redirect('/');
      }
      res.render('producto/editar-producto.html', {
      pageTitle: 'Editar Producto',
      path: '/producto/editar-producto',
      editing: editMode,
      producto:producto
  }); 
    })
    .catch(err=>console.log(err));
};

exports.postEditarProducto = (req, res) => {
  const prodId=req.body.productoId;
  const nNombre=req.body.nombre;
  const nPrecio=req.body.precio;
  const nDescripcion=req.body.descripcion;
  
  Producto.findById(prodId)
    .then(producto=>{
      producto.nombre=nNombre,
      producto.precio=nPrecio,
      producto.descripcio=nDescripcion
      return producto.save();
    })
    .then(resultado=>{
     console.log('Producto editado')
     res.redirect('/producto/productos')
    })
    .catch(err=>console.log(err))
  // const producto=new Producto(nNombre,nPrecio,nDescripcion,prodId);
  // producto.save()
  // .then(resultado=>{
  //   console.log('Producto editado')
  //   res.redirect('/producto/productos')
  // })
  // .catch(err=>console.log(err));
  
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
  // Producto.deleteById(prodId)
  // .then(()=>{
  //   console.log('Producto eliminado');
  //   res.redirect('/producto/productos')
  // })
  // .catch(err=>console.log(err))
};
