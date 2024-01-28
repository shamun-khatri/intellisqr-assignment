import React, { useState } from 'react';
import { TextInput, Button, Group } from '@mantine/core';

const Filters = ({ handleFilter }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');

  const manageFilter = () => {
    handleFilter({ name: nameFilter, salary: salaryFilter });
  };

  return (
    <div>
      <Group>
        <TextInput
          label="Filter by Name"
          placeholder="Enter name..."
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
        />
        <TextInput
          label="Filter by Salary"
          placeholder="Enter salary..."
          value={salaryFilter}
          onChange={(event) => setSalaryFilter(event.target.value)}
        />
        <Button onClick={manageFilter} mt={24}>Apply Filters</Button>
      </Group>
    </div>
  );
};

export default Filters;
