import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Client from "../layout/Client";

const Home = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClientsApi = async () => {
      try {
        const url = 'http://localhost:4000/clients';
        const response = await fetch(url);
        const result = await response.json();
        setClients(result);
      } catch (error) {
        console.log(error);
      }
    }
    getClientsApi()
  }, [])

  const handleDelete = async (id) => {
    const onConfirm = confirm('¿Deseas eliminar a este cliente?');
    if (onConfirm) {
      try {
        const url = `http://localhost:4000/clients/${id}`
        const response = await fetch(url, { 
          method: 'DELETE'
        });
        await response.json()
        const arrClients = clients.filter(client => client.id !== id);
        setClients(arrClients);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  return (
  <>
    <h1 className="font-black text-4xl text-cyan-800">Clientes</h1>
    <p className="text-center text-xl font-black text-gray-700">Administra tus clientes</p>

    <table className="w-full mt-5 table-auto shadow bg-white">
      <thead className="bg-blue-800 text-white font-black">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Contacto</th>
          <th className="p-2">Empresa</th>
          <th className="p-2">Actiones</th>
        </tr>
      </thead>
      <tbody>
        {
          clients.map(client => (
           <Client key={client.id} client={client} handleDelete={handleDelete} /> 
          ))
        }
      </tbody>
    </table>
  </>
  )
}

export default Home