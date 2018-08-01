const dependency = require('./anotherModule');

function log() {
    console.log(`Well done ${dependency.username}`);
}

module.exports.run = () => {
    log();
};

// Es incorrecto porque las funciones son asincronas
// El archivo principal de un modulo se indentifica en el package.json
// En el atributo main.js
// Cada modulo solo se carga y evalua la primera vez que se requiere
// La segunda vez solo devolvera la version en cache
setTimeout(() => {
    module.exports = function() {
        console.log(`hola mundo`);
    }
}, 100)