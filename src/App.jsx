import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './components/pages/Home';
import NewClient from './components/pages/NewClient';
import EditClient from './components/pages/EditClient';
import ViewClient from './components/pages/ViewClient';

function App() {  

  return (
    <div className="App">
        <Routes>
          <Route path="/clientes" element={ <Layout />} >
            <Route index element={ <Home /> } />
            <Route path="nuevo-cliente" element={ <NewClient /> } />
            <Route path="editar-cliente/:id" element={ <EditClient /> } />
            <Route path=":id" element={ <ViewClient /> } />
          </Route>
        </Routes>
    </div>
  )
}

export default App
