const { io } = require('../server');
const {Usuario} = require('../controller/Usuario');
const {crearMensaje}  = require('../utils/utils');

const usuario =  new  Usuario();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) =>{

        if(!data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje: 'El nombre del usuario y la sala son datos requeridos!'
            });
        }

        let personas = usuario.agregarPersona(client.id, data.nombre, data.sala);

        client.join(data.sala);
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', data.nombre + ' entró al chat de la sala '+data.sala));
        client.broadcast.to(data.sala).emit('listaPersona', usuario.getAllPersonas(data.sala));
        callback({
            ok:true,
            personas
        })
    });

    client.on('disconnect', ()=>{
        let salas = usuario.getAllSalasByPersona(client.id);
        console.log(salas);
        let personaBorrada = usuario.borrarPersona(client.id);
        for(var i =0; i < salas.length; i++){
            var sala =salas[i];
            console.log(sala);
            client.broadcast.to(sala).emit('crearMensaje', crearMensaje('Admin', personaBorrada.nombre + ' abandonó el chat'));
            client.broadcast.to(sala).emit('listaPersona', usuario.getAllPersonas(sala));
        }
    });

    client.on('crearMensaje', (data)=>{
        let persona = usuario.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);

    });


    client.on('mensajePrivado', (data)=>{
        let persona = usuario.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);

    });


}); 