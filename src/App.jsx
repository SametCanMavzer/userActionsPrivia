
import UserTable from "./pages/UserTable"
import UserForm from './pages/UserForm';
import { Routes, Route } from "react-router-dom";

function App() {


  return (

    <>

      <Routes>

        <Route path='/' element={<UserForm />} />
        <Route path='/usertable' element={<UserTable />} />

      </Routes>
    </>
  )
}

export default App
