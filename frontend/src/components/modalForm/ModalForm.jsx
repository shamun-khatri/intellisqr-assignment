import React, { useContext } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Box, Group } from "@mantine/core";
import EmployeeContext from "../../context/employeeContext";

const ModalForm = ({ selectedEmployee, handleClose }) => {
  const context = useContext(EmployeeContext);
  const { updateEmployee } = context;
  let id = selectedEmployee?.id;

  const form = useForm({
    initialValues: {
      name: selectedEmployee?.name,
      position: selectedEmployee?.position,
      salary: selectedEmployee?.salary,
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
      position: (value) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
      salary: (value) =>
        /^\d+$/.test(value)
          ? null
          : "Invalid input, must be numbers without spaces",
    },
  });

  const handleSubmit = async () => {
    if (form.isValid) {
      console.log("Form data submitted:", form.values);
      await updateEmployee(
        id,
        form.values.name,
        form.values.position,
        form.values.salary
      );

      handleClose();
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div>
      <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            mt="sm"
            label="Position"
            placeholder="Position"
            {...form.getInputProps("position")}
          />
          <TextInput
            mt="sm"
            label="Salary"
            placeholder="Salary"
            {...form.getInputProps("salary")}
          />
          <Group justify="center" mt="md">
            <Button type="submit" w={340} mt="sm">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default ModalForm;
