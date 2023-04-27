import React from 'react';
import TasksList from '../../components/TaskList';
import UserForm from '../../components/forms/UserForm';
import TaskForm from '../../components/forms/TaskForm';

function UserPage () {
  return (
    <section>
      <h2>Task Form</h2>
      <TaskForm />
      <TasksList />
    </section>
  );
}

export default UserPage;
