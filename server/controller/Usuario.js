
class Usuario{


        constructor(){
            this.personas=[];

        }

        agregarPersona(id, nombre, sala){
            let persona = {id, nombre, sala};
            this.personas.push(persona);
            return this.getAllPersonas(sala);
        }

        getPersona(id){
            if(this.personas){
                let personas = this.personas.filter( p =>{   return p.id ===  id }) //retorna un arreglo filtrado
                if(personas)
                    return personas[0];
            }
            
            return;

        }

        getAllPersonas(sala){
            return this.personas.filter(p =>{ return p.sala === sala})
        }

        getAllSalasByPersona(id){
            console.log(i);
            let salas =[]
            for(let i =0; i< this.personas.length; i++){
                let p =this.personas[i];
                if(p.id === id){
                    salas.push(p.sala);
                }
            }
            return salas;
        }

        borrarPersona(id){
            let personaBorrada = this.getPersona(id);
            if(this.personas){
                let personas = this.personas.filter(p => { return p.id !== id} )
                this.personas = personas;
            }            
            return personaBorrada;
        }



}

module.exports= {
    Usuario
}