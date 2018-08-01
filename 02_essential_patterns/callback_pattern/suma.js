// Algoritmo asincrono
function add(a, b, callback) {
    callback(a + b);
}

console.log('Inicio del programa');

add(1, 2, (res) => console.log('Resultado: ' + res));

console.log('Fin del programa');



