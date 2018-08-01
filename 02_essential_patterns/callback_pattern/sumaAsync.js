function add(a, b, callback) {
    setTimeout(() => callback(a + b), 100);
}

console.log('Inicio del Programa');

add(4, 5, (res) => console.log('Resultado: ' + res));

console.log('Fin del programa')