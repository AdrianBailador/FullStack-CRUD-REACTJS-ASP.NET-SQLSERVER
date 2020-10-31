import React, { useState, useEffect  } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {

  const baseUrl="https://localhost:44341/api/gestores";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [gestorSeleccionado, setGestorSeleccionado]=useState({
    id: '',
    nombre: '',
    lanzamiento: '',
    desarrollador: ''
  })

  //Metodo para capturar lo que el user escribe en los inputs
  const handleChange=e=>{
    const {name,value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
     .then(response=>{
        setData(response.data);
     }).catch(error=>{
        console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete gestorSeleccionado.id; //Eliminamos el atributo id
    gestorSeleccionado.lanzamiento=parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(baseUrl,gestorSeleccionado)
     .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar()
     }).catch(error=>{
        console.log(error);
    })
  }

  const seleccionarGestor=(gestor,caso)=>{
    (caso==="Editar")&&
    abrirCerrarModalEditar();
  }

  useEffect(() => {
    peticionGet();   
  }, [])

  return (
    <div className="App">
      <br/><br/>
      <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Nuevo Gestor</button>
      <br/><br/>
     <table className="table table-bordered">
       <thead>
         <tr>
           <th>ID</th>
           <th>Nombre</th>
           <th>Lanzamiento</th>
           <th>Desarrollador</th>
           <th>Opciones</th>
         </tr>
       </thead>
       <tbody>
        {data.map(gestor=>(
         <tr key={gestor.id}>
           <td>{gestor.id}</td>
           <td>{gestor.nombre}</td>
           <td>{gestor.lanzamiento}</td>
           <td>{gestor.desarrollador}</td>
           <td>
             <button className="btn btn-primary">Editar</button> {"  "}
             <button className="btn btn-danger">Eliminar</button> {"  "}
           </td>
         </tr> 
        ))}
       </tbody>
     </table>



  


     <Modal isOpen={modalInsertar}>
       <ModalHeader>
         Insertar Gestor de Base de Datos</ModalHeader>
         <ModalBody>
           <div className="form-group">
             <label>Nombre: </label>
             <br />
             <input type="text" className="form-group" name="nombre" onChange={handleChange}/>
             <br />
             <label>Lanzamiento: </label>
             <br />
             <input type="text" className="form-group" name="lanzamiento" onChange={handleChange}/>
             <br />
             <label>Desarrollador: </label>
             <br />
             <input type="text" className="form-group" name="desarrollador" onChange={handleChange}/>
             <br />
           </div>
         </ModalBody>
         <ModalFooter>
           <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
           <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button> {"  "}
         </ModalFooter>
     </Modal>

     <Modal isOpen={modalEditar}>
       <ModalHeader>
         Editar Gestor de Base de Datos</ModalHeader>
         <ModalBody>
           <div className="form-group">
           <label>ID: </label>
             <br />
             <input type="text" className="form-group" readOnly/>
             <br />
             <label>Nombre: </label>
             <br />
             <input type="text" className="form-group" />
             <br />
             <label>Lanzamiento: </label>
             <br />
             <input type="text" className="form-group" />
             <br />
             <label>Desarrollador: </label>
             <br />
             <input type="text" className="form-group" />
             <br />
           </div>
         </ModalBody>
         <ModalFooter>
           <button className="btn btn-primary">Editar</button>{"   "}
           <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button> {"  "}
         </ModalFooter>
     </Modal>
    </div>
  );
}




export default App;
