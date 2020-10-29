import React, { useState, useEffect  } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function App() {

  const baseUrl="https://localhost:44341/api/gestores";
  const [data, setData]=useState([]);


  const peticionGet=async()=>{
    await axios.get(baseUrl)
     .then(response=>{
        setData(response.data);
     }).catch(error=>{
        console.log(error);
    })
  }

  useEffect(() => {
    peticionGet();   
  }, [])

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
