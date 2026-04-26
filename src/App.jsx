import React  from 'react';

import Home from './components/Home/Home.jsx';

 import {createBrowserRouter, RouterProvider} from 'react-router-dom'

 import Layout from './components/Layout/Layout.jsx';
 import Notfound from './components/Notfound/Notfound.jsx';
import './index.css';

import Login from './components/Login/Login';
import Register from './components/Register/Register';

let router = createBrowserRouter([
  {
    path:"",
    element:<Layout/>,
    children:[
     
        {index:true,element:<Home/>},
        {path:"home",element:<Home/> },
        {path:"login",element:<Login/> },
        {path:"register",element:<Register/> },
        {path:"*",element:<Notfound/> }

      
    ]
  }
])

//     ],
//   },
// ]);

function App() {
  return (
    <>
     
      <RouterProvider router={router} ></RouterProvider>
    </>
  );
}

export default App;
