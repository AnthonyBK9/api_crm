import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from '../layout/Spinner';

const ViewClient = () => {
  
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

      !loading ? <Spinner /> : 
        Object.keys(getClient).length === 0 ? 
          <p className="text-4xl text-gray-400">No hay resultados</p> : 
          (
            <div>
              { 
                <>
                  <h1 className="font-black text-4xl text-blue-800">Ver Cliente: {getClient.name}</h1>
                  <p className="mb-4 mt-3">Información del cliente</p>
                  <p className="text-2xl text-gray-600 mt-4">
                    <span className="text-gray-800 uppercase font-bold">Cliente: </span>
                    {getClient.name}
                  </p>
                  <p className="text-2xl text-gray-600 mt-4">
                    <span className="text-gray-800 uppercase font-bold">E-mail: </span>
                    {getClient.email}
                  </p>
                  <p className="text-2xl text-gray-600 mt-4">
                    <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                    {getClient.company}
                  </p>
                  {
                    getClient.notes && 
                    <p className="text-2xl text-gray-600 mt-4 flex gap-2">
                      <span className="text-gray-800 uppercase font-bold">Notas: </span>
                      {getClient.notes}
                    </p>
                  }
                </>
                
              }
            </div>
          )
    
      )
}

export default ViewClient