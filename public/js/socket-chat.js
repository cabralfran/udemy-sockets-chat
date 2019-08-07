var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala') ){
    window.location = 'index.html';
    throw new Error('El nombre de usuario y la sala son datos necesarios');
}
var usuario ={
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', function() {

    socket.emit('entrarChat', usuario, function (resp) {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

//se eejcuta para enviar mensaje  desde la consola
// socket.emit('crearMensaje', {
//     mensaje: 'Hola a todos'});



// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log(mensaje);

});

// Escuchar información
socket.on('listaPersona', function(resp) {

    console.log(resp);

});

// Escuchar información
socket.on('mensajePrivado', function(resp) {

    console.log(resp);

});

//se eejcuta para enviar mensaje privado desde la consola
// socket.emit('mensajePrivado', {
//     mensaje: 'Hola Pedro!!!', para:'U2OPwgSswS5qv_CPAAAK'});