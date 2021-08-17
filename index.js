const { error } = require('console');
const fs = require('fs');

class Archivo {

    constructor(nombreArchivo){
        this.file = nombreArchivo;
    }
    
    guardarProducto(producto){
        fs.promises.readFile(this.file, 'utf-8')
        .then(data => {
            const jsonProductos = JSON.parse(data.toString('utf-8'));
            //console.log(jsonProductos);
            jsonProductos.push({...producto, id:jsonProductos.length});
            fs.promises.writeFile(this.file, JSON.stringify(jsonProductos, null, '\t'))
            .then(()=>{
                console.log('Prducto guardado');
            })
            .catch(err => {
                console.error('Error al resguardar el archivo: ', err);
            })
        })
        .catch(err => {
            fs.promises.writeFile(this.file, JSON.stringify([{...producto, id:0}]))
            .then(()=>{
                console.log('Primer producto guardado');
            })
            .catch(err=>{
                console.error('Error al resguardar el primer producto: ', err);
            })
        })
    }

    listarProductos(){
        fs.promises.readFile(this.file, 'utf-8')
        .then(data =>{
            console.log(JSON.parse(data.toString('utf-8')));
        })
        .catch(err => {
            throw new Error(err);
            console.error('Error de Lectura: ', err);
        })
    }

    eliminarArchivo(){
        fs.promises.unlink(this.file)
        .then(()=>{
            console.log('Archivo eliminado');
        })
        .catch(err => {
            console.error('Error al eliminar: ', err);
        })
    }
}

let myFile = new Archivo('./file/productos.json');

console.log('Cargamos un nuevo producto al archivo')
myFile.guardarProducto({title:"Peas Snow",price:"$68.23",thumbnail:"http://dummyimage.com/203x119.png/5fa2dd/ffffff"});

console.log('Listamos los productos')
myFile.listarProductos();

console.log('Eliminamos el archivo de productos')
myFile.eliminarArchivo();

