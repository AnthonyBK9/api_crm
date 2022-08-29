import React from 'react'
import FormClient from '../layout/FormClient'

const NewClient = () => {
  return (
    <>
      <h1 className="font-black text-4xl text-cyan-800">Nuevo Cliente</h1>
      <p className="text-center text-xl font-black text-gray-700">Llena los siguientes campos para resgitrar un cliente</p>
      <FormClient />
    </>
  )
}

export default NewClient