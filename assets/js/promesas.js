import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"; 
import { db } from "./firebase.js";

//CREATE
export const registrarSocios = async (socio) =>{
    const docRef = await addDoc(collection(db, "socios"), socio);
}

//READ
export const obtenerSocios = async() =>{
    const ref = collection(db,"socios");
    const quearySnap = await getDocs(ref);

    console.log(quearySnap);
    let listado = []

    quearySnap.forEach(doc =>{
        listado.push({...doc.data(), id:doc.id});
    });
    return listado;
}

export const actualizarSocio = async(objeto,id)=>{
    const ref = doc(db,"socio",id)
    await updateDoc(ref, objeto);
}

export const eliminarSocio = async(id)=>{
    const ref = doc(db,"socio",id);
    await deleteDoc(ref);
}
