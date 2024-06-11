import { eliminarSocio, registrarSocios, obtenerSocios, actualizarSocio } from "./promesas.js"

console.log("Test")

// Se agregar un LISTENER el cual espera a que CARGUE la pagina para posteriormente ejecutar lo que encuentre dentro de las llaves de la funcion flecha ( ()=> )
    //se SELECIONA el BOTON de CONTRASTE a traves de su ID y se le asigna un listener el cual al hacer click se ejecuta la funcion "contraste"
window.addEventListener("load", ()=>{
    document.getElementById("btnContraste").addEventListener("click", contraste);
    document.getElementById("btnFuente").addEventListener("click", fuente);
    document.getElementById("btnRegistrar").addEventListener("click", validar);
    document.getElementById("btnRegistrar").addEventListener("click", registrar);
    cargarDatos()
    document.getElementById("btnActualizar").addEventListener("click", actualizar);
})


// A continuacion se aplica la inclusividad:

// se crea la FUNCION "contraste"
// se declara la variable "CUERPO" en la cual se obtiene el body a traves de su ID.
//va alterando la clase del BODY entre "modo-claro" y "modo-oscuro".
function contraste(){
    var cuerpo = document.getElementById("idBody");
    cuerpo.classList.toggle("modo-claro")
    cuerpo.classList.toggle("modo-oscuro")
}

//simplemente se le agrega "fontsize" a la clase del BODY.
function fuente(){
    document.body.classList.toggle("fontsize");
}


//validacion de errores y alerta de errores

//esta funcion sirve para juntar las distintas funciones de validacion que se creen
function validar(){
    validarVacio('nombre')
    validarVacio('correo')
    validarVacio('contraseña')
    validarLongitud('telefono', 9)
    validarTerminos('terminos')
    validarVacio('fecha')
    validarVacio('genero')
    validarVacio('areatexto')
}

//se guarda el elemento/campo en la variable eNombre
//se guarda el valor (lo que haya escrito) de ese campo, en la variable vNombre
// se comprueba si el campo esta vacio, comparandolo con un string vacio. 
//  ".trim()" elimina los espacios en blanco.
// en caso de que este vacio:
// se le cambia la propiedad del display a la clase 'NoDsiplay" y pasa a ser block,
// por lo tanto nos muestra un parrafo especificandonos el error.
function validarVacio(Campo){
    let eNombre = document.getElementById(Campo);
    let vNombre = eNombre.value;

    if(vNombre.trim()==""){
        eNombre.style.borderColor = "red";
        let pNombre = document.getElementById("p"+Campo);
        pNombre.style.display = "block";
    }else{
        eNombre.style.borderColor = "green";
        let pNombre = document.getElementById("p"+Campo);
        pNombre.style.display = "none";
    }
}


//esta funcion guarda el valor(input) del campo seleccionado
// luego con length obtenemos la longitud o el numero de caracteres que tiene ese valor
// ese ese valor se compara, si es distinto al largo que le especificamos, se ejecutara lo que esta dentro del if
// el if lo que hace es poner los bordes de color y mostrar/quitar el parrafo que indica el error. 
function validarLongitud(Campo, largo){
    let elemento = document.getElementById(Campo);
    let valor = elemento.value

    if (valor.length != largo){
        elemento.style.borderColor="red";
        let pNombre = document.getElementById("p"+Campo);
        pNombre.style.display = "block";
    }else{
        elemento.style.borderColor = "green";
        let pNombre = document.getElementById("p"+Campo);
        pNombre.style.display = "none";
    }
}

//se verifica que el checkbox de los terminos y condicionesse encuentre marcado
// de no ser asi, muestra una alerta por pantalla diciendo que debe aceptarlos.
function validarTerminos(Campo){
    let eNombre = document.getElementById(Campo);

    if(!eNombre.checked){
        alert('Debe aceptar los terminos y condiciones.')
    }
}


//A continuacion se crearan funciones para realizar el CRUD en firebase.

//primero se importo desde firebase (ver linea 1)

//CREATE
const registrar = ()=>{
    let eNombre = document.getElementById("nombre");
    let eCorreo = document.getElementById("correo");
    let eContraseña = document.getElementById("contraseña");
    let eTelefono = document.getElementById("telefono");
    let eFecha = document.getElementById("fecha");
    let eGenero = document.getElementById("genero");
    let eAreatexto = document.getElementById("areatexto");
    let eTerminos = document.getElementById("terminos");

    let vNombre = eNombre.value;
    let vCorreo = eCorreo.value;
    let vContraseña = eContraseña.value;
    let vTelefono = eTelefono.value;
    let vFecha = eFecha.value;
    let vGenero = eGenero.value;
    let vAreatexto = eAreatexto.value;
    let vTerminos = eTerminos.checked;


    let objeto = {nombre:vNombre, correo:vCorreo, contraseña:vContraseña, telefono:vTelefono,
        fecha:vFecha, genero:vGenero, areatexto:vAreatexto, terminos:vTerminos};
    
    // console.log(objeto)

    //Se usa la función de promesas.
    registrarSocios(objeto).then(()=>{
        alert("Registrado con éxito")
        cargarDatos()
    }).catch((r)=>{
        alert("Ocurrió un error")
        alert(r);
    })
}

//READ
const cargarDatos = ()=>{
    obtenerSocios().then((socios)=>{
        let estructura = "";
        socios.forEach((socio)=>{
            estructura += "<tr>"
            estructura += "<td>" + socio.nombre + "</td>"
            estructura += "<td>" + socio.correo + "</td>"
            estructura += "<td>" + socio.contraseña + "</td>"
            estructura += "<td>" + socio.telefono + "</td>"
            estructura += "<td>" + socio.fecha + "</td>"
            estructura += "<td>" + socio.genero + "</td>"
            estructura += "<td>" + socio.areatexto + "</td>"
            estructura += "<td>" + socio.terminos + "</td>"
            estructura += "<td><button id='UPD"+socio.id+"'>Modificar</button></td>";
            estructura += "<td><button id='DEL"+socio.id+"'>Eliminar</button></td>";
            estructura += "</tr>"
        });
        document.getElementById("tbDatos").innerHTML = estructura;
        socios.forEach((socio)=>{

            let botonUPD = document.getElementById("UPD"+socio.id);
            botonUPD.addEventListener("click", ()=>{
                let eNombre = document.getElementById("UPDnombre");
                let eCorreo = document.getElementById("UPDcorreo");
                let eContraseña = document.getElementById("UPDcontraseña");
                let eTelefono = document.getElementById("UPDtelefono");
                let eFecha = document.getElementById("UPDfecha");
                let eGenero = document.getElementById("UPDgenero");
                let eAreatexto = document.getElementById("UPDareatexto");
                let eTerminos = document.getElementById("UPDterminos");
                
                // faltaba ponerle el .value
                eNombre.value = socio.nombre;
                eCorreo.value = socio.correo;
                eContraseña.value = socio.contraseña;
                eTelefono.value = socio.telefono;
                eFecha.value = socio.fecha;
                eGenero.value = socio.genero;
                eAreatexto.value = socio.areatexto;
                eTerminos.value = socio.terminos;

                document.getElementById("btnActualizar").value = socio.id;
            })

            let botonDEL = document.getElementById("DEL"+socio.id);
            botonDEL.addEventListener("click",()=>{
                if(confirm("Seguro que quiere eliminar a \nNombre: "+socio.nombre+"")){
                    eliminarSocio(socio.id).then(()=>{
                        alert("Eliminado con exito")
                        cargarDatos();
                    })
                }
            })
        })
    })
}

const actualizar = ()=>{
    // Recuperar elemento
   let eNombre = document.getElementById("UPDnombre")
   let eCorreo = document.getElementById("UPDcorreo");
   let eContraseña = document.getElementById("UPDcontraseña");
   let eTelefono = document.getElementById("UPDtelefono");
   let eFecha = document.getElementById("UPDfecha");
   let eGenero = document.getElementById("UPDgenero");
   let eAreatexto = document.getElementById("UPDareatexto");
   let eTerminos = document.getElementById("UPDterminos");
   // Recuperar el valor
   let vNombre = eNombre.value;
   let vCorreo = eCorreo.value;
   let vContraseña = eContraseña.value;
   let vTelefono = eTelefono.value;
   let vFecha = eFecha.value;
   let vGenero = eGenero.value;
   let vAreatexto = eAreatexto.value;
   let vTerminos = eTerminos.checked;



   let objeto = {nombre:vNombre, correo:vCorreo, contraseña:vContraseña, telefono:vTelefono,
       fecha:vFecha, genero:vGenero, descripcion:vAreatexto, terminos:vTerminos};
   let id = document.getElementById("btnActualizar").value;
   
   actualizarSocio(objeto,id).then(()=>{
       alert("Se ha actualizado con éxito");
       cargarDatos();
   });
}

