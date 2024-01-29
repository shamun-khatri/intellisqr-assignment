import { useState } from "react";
import EmployeeContext from "./employeeContext";
import axios from "axios";

const EmployeeState = (props) => {
  const host = "https://intellisqr-assignment-backend.vercel.app/api/v1";
  const initialEmployees = [];
  const [employees, setEmployees] = useState(initialEmployees);

  // Get all employees
  const getEmployees = async () => {
    try {
      const response = await axios.get(`${host}/getallemployee`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };


  // Add an employee
  const addEmployee = async (name, position, salary) => {
    try {
      const response = await axios.post(
        `${host}/addemployee`,
        {
          name,
          position,
          salary,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newEmployee = response.data;

      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);

      console.log("Employee added successfully:", newEmployee);
    } catch (error) {
      console.error("Error adding employee:", error.message);
    }
  };

  // Delete An Employee
  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`${host}/deleteemployee/${employeeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );

      console.log("Employee deleted successfully:", employeeId);
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  // Update An Employee
  const updateEmployee = async (employeeId, name, position, salary) => {
    try {
      const response = await axios.put(
        `${host}/updateemployee/${employeeId}`,
        { name, position, salary },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let updatedEmployee = JSON.parse(JSON.stringify(employees));
      // logic for update in client
      for (let index = 0; index < updatedEmployee.length; index++) {
        const element = updatedEmployee[index];
        if (element.id === employeeId) {
          updatedEmployee[index].name = name;
          updatedEmployee[index].position = position;
          updatedEmployee[index].salary = salary;
          break;
        }
      }
      setEmployees(updatedEmployee);

      console.log("Employee updated successfully:", updatedEmployee);
    } catch (error) {
      console.error("Error updating employee:", error.message);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        getEmployees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
