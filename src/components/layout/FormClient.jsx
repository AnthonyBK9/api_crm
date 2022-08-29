import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Spinner from './Spinner'

const FormClient = ({getClient, loading}) => {
  
  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    name: Yup.string().min(3, "El Nombre es muy corto").max(40, "El Nombre es muy largo").required('El Nombre del cliente es obligatorio'),
    company: Yup.string().required("El Nombre de la empresa es obligatorio"),
    email: Yup.string().email("E-mail no válido").required("El E-mail es obligatorio"),
    phone: Yup.number().positive("Número no valido").integer("Número no valido").typeError("El Número no es valido"),
    notes: ''
  })

  const handleSubmit = async (values) => {
    try {
      let response
      if (getClient.id) {
        //Editando el cliente
        const URL = `http://localhost:4000/clients/${getClient.id}`
        response = await fetch(URL,{ 
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
      } else {
        // Nuevo registro
        const URL = 'http://localhost:4000/clients'
        response = await fetch(URL,{ 
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      await response.json()
      navigate('/clientes');
      
    } catch (error) {
      console.log(error);
    }
  }
//eo1189957gmail.com
  return (
    !loading ? <Spinner />  :
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
          <h1 className="text-gray-700 font-bold text-xl uppercase text-center">{ getClient?.name ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
          <Formik
            initialValues={{
              name: getClient?.name ?? '',
              company: getClient?.company ?? '',
              email: getClient?.email ?? '',
              phone: getClient?.phone ?? '',
              notes: getClient?.notes ?? '',
            }}
            enableReinitialize={true}
            onSubmit={ async (values, {resetForm}) => {
              await handleSubmit(values);
              resetForm();
            }}
            validationSchema={newClientSchema}
          >
            {({errors, touched}) => {
                return (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="text-gray-800 text-2xl">Nombre:</label>
                  <Field type="text" id="name" name="name" className="mt-2 block w-full p-3 bg-gray-100 outline-cyan-700" placeholder="Nombre del Cliente"/>
                  { errors.name &&  touched.name ? 
                    <p className="text-red-600 font-bold">{errors.name}</p>
                  : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="company" className="text-gray-800 text-2xl">Empresa:</label>
                  <Field type="text" id="company" name="company" className="mt-2 block w-full p-3 bg-gray-100 outline-cyan-700" placeholder="Nombre de la Empresa"/>
                  { errors.company &&  touched.company ? 
                    <p className="text-red-600 font-bold">{errors.company}</p>
                  : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="text-gray-800 text-2xl">E-mail:</label>
                  <Field type="email" id="email" name="email" className="mt-2 block w-full p-3 bg-gray-100 outline-cyan-700" placeholder="E-mail Ej: example@example.com"/>
                  { errors.email &&  touched.email ? 
                    <p className="text-red-600 font-bold">{errors.email}</p>
                  : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="text-gray-800 text-2xl">Teléfono del Cliente:</label>
                  <Field type="tel" id="phone" name="phone" className="mt-2 block w-full p-3 bg-gray-100 outline-cyan-700" placeholder="Ej: 234123412"/>
                  { errors.phone &&  touched.phone ? 
                    <p className="text-red-600 font-bold">{errors.phone}</p>
                  : null}
                </div>
                <div className="mb-4">
                  <label htmlFor="notes" className="text-gray-800 text-2xl">Notas:</label>
                  <Field as="textarea" type="text" id="notes" name="notes" className="mt-2 block w-full p-3 bg-gray-100 outline-cyan-700 h-40" placeholder="Notas del cliente"/>
                </div>
                <input type="submit" value={ getClient?.name ? 'Actualizar Cliente' : 'Agregar Cliente'} className="mt-5 w-full bg-blue-800 hover:bg-blue-900 p-3 text-white uppercase font-bold"/>
              </Form>
            )}}
          </Formik>
      </div>
  )
}

FormClient.defaultProps = {
  getClient: {},
  loading: true
}
export default FormClient