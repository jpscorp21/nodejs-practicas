const fs = require('fs');
const cache = {};

// Modelo sincronos
// Utilizar sincronos si no afecta el desempeño de la aplicacion
function consistentReadSync(filename) {
    if (cache[filename]) {
        return cache[filename];
    } else {
        cache[filename] = fs.readFileSync(filename, 'utf-8');
        return cache[filename];
    }
}


function consistentReadAsync(filename, callback) {
    if (cache[filename]) {
        //Para que el callback funcione de manera asincrona
        //Ademas se ejecuta primero ante cualquier otro evento
        //Otra alternativa seria tambien setInmediate
        process.nextTick(() => callback(cache[filename]));
    } else {
        fs.readFile(filename, 'utf-8', (err, data) => {
            cache[filename] = data;            
            callback(data);
        })
    }
}


function inconsistentRead(filename, callback) {
    if (cache[filename]) {
        //llamada sincrona
        callback(cache[filename]); //Solo envia el dato si existe en el cache
    } else {
        fs.readFile(filename, 'utf-8', (err, data) => {
            cache[filename] = data;            
            callback(data);
        })
    }
}
//Definir claramente una funciona sincrona o asincrona
// Ejemplo de Closure
function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, value => {     
        //Realiza un for de un array de escuchas           
        console.log('hazlo 1');
        listeners.forEach(listener => listener(value));
        //La segunda vez recien recibe un escucha               
    });

    //En una operacion asincrona primero se llamara el return antes del callback
    //Del resultado de la inconsistencia de la funcion
    
    return {        
        onDataReady: listener => listeners.push(listener)
    };
}

const reader1 = createFileReader('data.txt'); // La primera es asincrona
reader1.onDataReady(data => {
    console.log('First call data: ' + data);

    const reader2 = createFileReader('data.txt'); // La segunda es sincrona
    reader2.onDataReady(data => {
        console.log('Second call data: ' + data);
    });
});

















