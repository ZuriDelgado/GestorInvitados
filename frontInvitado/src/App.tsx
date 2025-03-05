import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrincipalUser from './views/user/PrincipalUser/PrincipalUser';
import GuestDetails from './views/user/DetailsUser/GuestDetails';
import Confirm from './views/user/ConfirmUser/ConfirmUser';
import Dashboard from './views/admin/Dashboard';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrincipalUser />} />
        <Route path="/details" element={<GuestDetails/>} />
        <Route path="/confirm" element={<Confirm/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
