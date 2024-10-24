
import router from './component/routers/Router'
import { RouterProvider } from 'react-router-dom'
import './App.css'

import DarkModeContext from './component/context/DarkModeContext'
// import Nav from './component/Nav'
// import Sidebar from './component/Sidebar/Sidebar'
// import Home from './component/Home'
// import TeacherProfilePage from './pages/Teacher/TeacherProfilePage'


function App() {


  return (
    <>
      <DarkModeContext.Provider>
        <RouterProvider router={router} />



      </DarkModeContext.Provider>



    </>
  )
}

export default App
