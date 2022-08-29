import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormClient from '../layout/FormClient'

const EditClient = () => {
  
  const { id } = useParams();

  const [getClient, setGetClient] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorAxios, setErrorAxios] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/clients/${id}`)
      .then(res => setGetClient(res.data))
      .catch(err => setErrorAxios(err))
      .finally( () => setLoading(true))
  }, [])

  return (
    <>
      <h1 className="font-black text-4xl text-cyan-800">Editar Cliente</h1>
      <p className="text-sm font-black text-gray-700">Utiliza este formulario para editar los datos del cliente</p>
      {
        getClient.name ? 
        <FormClient 
          getClient={getClient} 
          loading={loading}
        /> :  <p className="text-lg  text-gray-400">No hay resultados</p>
      }
    </> 
  )
}

export default EditClient