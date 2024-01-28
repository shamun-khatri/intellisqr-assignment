import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { UsersTable } from "./components/UserTable/UserTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeState from "./context/employeeState";
import AddEmployee from "./components/addEmployee/AddEmployee";

function App() {
  return (
    <>
      <EmployeeState>
        <BrowserRouter>
          <div className="container">
            <Navbar />
            <div className="userTable">
              <Routes>
                <Route path="/" Component={UsersTable} />
                <Route path="/add-employee" Component={AddEmployee} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </EmployeeState>
    </>
  );
}

export default App;
