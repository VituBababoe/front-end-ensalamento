import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// import Login from './Login';
import Home from './Home';
import UserManagement from './UserManagement';
import UserForm from './UserForm';
import ProtectedRoute from '../ProtectedRoute';
import NotFound from './NotFound';
import RestrictedLayout from '../layout/RestrictedLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserManagement />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<RestrictedLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users/edit/:id" element={<UserForm isEditing />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
