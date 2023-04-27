import { Formik, Form } from 'formik'
import React from 'react'
import { TASK_VALIDATION_SCHEMA } from '../../../utils/validate/validationSchemas'
import Input from '../Input'
import styles from './TaskForm.module.sass'
import { connect } from 'react-redux'
import { createTask } from '../../../store/slices/taskSlice'

function TaskForm ({ createNewTask }) {
  const initialValues = { body: '', isDone: false, deadline: '' }

  const handleSubmit = (values, formikBag) => {
    createNewTask(values)
    formikBag.resetForm()
  }

  const classes = {
    error: styles.error,
    input: styles.input,
    valid: styles.valid,
    invalid: styles.invalid
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={TASK_VALIDATION_SCHEMA}
    >
      <Form className={styles.form}>
        <Input
          label='Body:'
          type='text'
          name='body'
          placeholder='Body'
          autoFocus
          classes={classes}
        />
        <Input
          label='Is done:'
          type='checkbox'
          name='isDone'
          value='isDone'
          classes={classes}
        />
        <Input
          label='Deadline:'
          type='date'
          name='deadline'
          classes={classes}
        />
        <button type='submit'>Add task</button>
      </Form>
    </Formik>
  )
}

const mapDispatchToProps = dispatch => ({
  createNewTask: v => dispatch(createTask(v)) // => {payload: v}
})

export default connect(null, mapDispatchToProps)(TaskForm)
