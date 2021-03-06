import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import logo from '../images/logo_1.png'

const URI = 'https://backend-sitio-react.herokuapp.com/autos/'

export const configAxios = () => {
  axios.defaults.baseURL = URI;

  axios.interceptors.response.use(
    function (response) {
      if (response.data) {
        // return success
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        // reject errors & warnings
        return Promise.reject(response);
      }

      // default fallback
      return Promise.reject(response);
    },
    function (error) {
      // if the server throws an error (404, 500 etc.)
      return Promise.reject(error);
    }
  );
};

const Venta = () => {
  const [autos, setAutos] = useState([])
  useEffect(() =>{
    getAutos()
  }, [])

  //Procedimiento para mostrar todos los autos
  const getAutos = async () =>{
    const res = await axios.get(URI)
    setAutos(res.data)
  }
  
  //Procedimiento para eliminar todos los autos
  const deleteAuto = async (id) => {
    await axios.delete(URI+id)
    getAutos()
  }

  //Confirmación de eliminación
  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Deseas eliminar?",
      text: "Se eliminará el registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, deseo eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAuto(id);
        Swal.fire("Eliminado!", "Has eliminado el registro", "Exitosamente");
      }
    });
  };

  return (
    <>
      <div className="container mt-2">
        <div className="title">
          <h3>VEHICULOS TESJI</h3>
        </div>
        <img  src={logo} aria-hidden className='img-fluid' alt='Responsive image' />
        <div className="row">
          <div className="col mt-2">
            <table className="table table-borderless mt-4">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {autos.map((auto) => (
                  <tr key={auto.id}>
                    <td>{auto.nombre}</td>
                    <td>{auto.marca}</td>
                    <td>{auto.modelo}</td>
                    <td>{auto.precio}</td>
                    <td>
                      <Link 
                      to={`/EditarVehiculo/${auto.id}`} className="btn btn-info"  >
                        <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button onClick={()=>confirmDelete(auto.id)} className='btn btn-danger mx-2'>
                        <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venta