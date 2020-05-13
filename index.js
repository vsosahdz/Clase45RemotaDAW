const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect=require('./util/database').mongoConnect;

const app = express();
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', 'views');//se puede omitir

const productoRoutes = require('./routes/producto');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/producto', productoRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://localhost/tienda',{useNewUrlParser: true,useUnifiedTopology: true})
.then(result=>{
    app.listen(8080,()=>{console.log('Servidor en línea')});
})
.catch(err=>console.log(err));

// mongoConnect(()=>{
//     app.listen(8080,()=>{console.log('Servidor en línea')});    
// });

