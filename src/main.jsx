import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayOut from './Component/MainLayOut/MainLayOut';
import Home from './Component/Home/Home';
import Login from './Component/Auth/Login';
import AuthProvider from './Component/Context/AuthProvider/AuthProvider';
import SignUp from './Component/Auth/SignUp';
import AddTask from './Component/Home/AddTask';
import TaskUpdate from './Component/Home/TaskUpdate';



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/addTask",
        element: <AddTask></AddTask>,
      },
      {
        path: "/taskUpdate/:id",
        element: <TaskUpdate></TaskUpdate>,
        loader:({params})=>fetch(`https://task-management-system-server-flame.vercel.app/tasks/${params.id}`)
        ,
      },
    ]
    ,
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
