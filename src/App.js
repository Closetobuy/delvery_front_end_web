import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings, Layout, RequireAuth, DashboardPath } from './components';
import { Ecommerce, Orders, Calendar, Admins, Stacked, Pyramid, Riders, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Login, AddAdmin, AddRider } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Dashboard from './pages/Dashboard/Dashboard';
import { replace } from '@syncfusion/ej2/spreadsheet';
import { gc } from './api/GoolgeCloudStorage';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} > 
          {/* Public Route */}
          <Route path="login" element={<Login />} /> 
          {/* Protected Route */}
          <Route element={<RequireAuth />} >
            {/* <Route path="/" element */}  
            {/* <Route path="/" element={(<Ecommerce />)} /> */}
            <Route path="/" element={(<Navigate replace to="/ecommerce" />)} />
            <Route path="/ecommerce" element={(<Ecommerce />)} />

            {/* pages  */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/riders" element={<Riders />} />

            {/* add  */}
            <Route path="/admin" element={<AddAdmin />} />
            <Route path="/rider" element={<AddRider />} />

            {/* apps  */}
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/color-picker" element={<ColorPicker />} />

            {/* charts  */}
            <Route path="/line" element={<Line />} />
            <Route path="/area" element={<Area />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/color-mapping" element={<ColorMapping />} />
            <Route path="/pyramid" element={<Pyramid />} />
            <Route path="/stacked" element={<Stacked />} />
            {/* </Route> */}
          </Route>  
          {/* </Route> */}
      </Route>
    </Routes>
   
  );
};

export default App;
