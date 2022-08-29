import { useNavigate } from 'react-router-dom';

const Client = ({client, handleDelete}) => {
    const { name, company, email, phone, notes, id } = client;
    const navigate = useNavigate();
        
  return (
    <tr className="border-b hover:bg-gray-200">
        <td className="p-3">{name}</td> 
        <td className="p-3">
                <p><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p><span className="text-gray-800 uppercase font-bold">Tel: </span>{phone}</p>
            </td> 
        <td className="p-3">{company}</td> 
        <td className="p-3">
            <button onClick={() => navigate(`/clientes/${id}`)} type="button" className="bg-orange-700 hover:bg-yellow-900 block w-full text-white p-2 uppercase font-bold text-xs mb-3">Ver <i className="fa-solid fa-eye"></i></button>
            <button type="button" className="bg-sky-600 hover:bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs" onClick={ () => navigate(`/clientes/editar-cliente/${id}`) }>Editar <i className="fa-solid fa-pen-to-square"></i></button>
            <button type="button" className="bg-red-800 hover:bg-red-900 block w-full text-white p-2 uppercase font-bold text-xs mt-3" onClick={ () => handleDelete(id)}>Eliminar <i className="fa-solid fa-trash-can"></i></button> 
        </td> 
    </tr>
  )
}

export default Client