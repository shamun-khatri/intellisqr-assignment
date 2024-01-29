import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  rem,
  Pagination,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState, useContext } from "react";
import EmployeeContext from "../../context/employeeContext";
import ModalForm from "../modalForm/ModalForm";
import Filters from "../filters/Filters";

export function UsersTable() {
  const context = useContext(EmployeeContext);
  const { employees, getEmployees, deleteEmployee } = context;
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;
  const lastIndex = currentPage * employeesPerPage;
  const firstIndex = lastIndex - employeesPerPage;
  const currentEmployees = employees.slice(firstIndex, lastIndex);
  const npages = Math.ceil(employees.length / employeesPerPage);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getEmployees();
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    open();
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setSelectedEmployee(async (prevEmployee) => {
      console.log(prevEmployee?.id);
      await deleteEmployee(prevEmployee?.id);
      setSelectedEmployee(null);
    });
  };

  const handleClose = () => {
    setSelectedEmployee(null);
    close();
  };

  const handleFilter = ({ name, salary }) => {
    // Use your existing employees state to filter the data
    const filteredData = employees.filter((employee) => {
      const nameMatch = name ? employee.name.toLowerCase().includes(name.toLowerCase()) : true;
      const salaryMatch = salary ? employee.salary.toString().includes(salary) : true;
      return nameMatch && salaryMatch;
    });
  
    // Update the filteredEmployees state
    setFilteredEmployees(filteredData);
    console.log(filteredEmployees);
  };

  let mainData = filteredEmployees !== null ? filteredEmployees : currentEmployees;

  const rows = mainData.map((employee) => (
    <Table.Tr key={employee ? employee.id : undefined}>
      <Table.Td>
        <Text fz="sm">{employee?.id}</Text>
      </Table.Td>

      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} radius={30} />
          <Text fz="sm" fw={500}>
            {employee?.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={"blue"} variant="light">
          {employee.position}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{employee.salary}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="cyan"
            onClick={() => handleEditClick(employee)}
          >
            <IconPencil
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => handleDeleteClick(employee)}
          >
            <IconTrash
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Filters handleFilter={handleFilter} />
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <ModalForm
          selectedEmployee={selectedEmployee}
          handleClose={handleClose}
        />
      </Modal>
      <Table.ScrollContainer minWidth={800} ml={20} mr={25}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Employee Name</Table.Th>
              <Table.Th>Position</Table.Th>
              <Table.Th>Salary</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginRight: "20px",
        }}
      >
        <Pagination
          total={npages}
          value={currentPage}
          onChange={setCurrentPage}
          mb={50}
          mt={25}
        />
      </div>
    </>
  );
}
