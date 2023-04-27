import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteTask, updateTask, getTasks } from '../../store/slices/taskSlice'
import { FaTrash } from 'react-icons/fa'
import styles from './TaskList.module.sass'

export const TaskList = ({ tasks, isFetching, error, get, remove, update }) => {
  const handleTaskChange = (id, checked) => update(id, { isDone: checked })

  useEffect(() => {
    get()
  }, [])

  return (
    <div className={styles.taskList}>
     {tasks.map(t => {
        const expired = new Date(t.deadline) < new Date() && !t.isDone

        return (
          <div className={styles.taskRow} key={t.id}>
            <input
              type='checkbox'
              checked={t.isDone}
              onChange={({ target: { checked } }) =>
                handleTaskChange(t.id, checked)
              }
            />
            <label className={expired ? styles.expired : ''}>
              {t.body} {t.deadline}
            </label>

            <button onClick={() => remove(t.id)}>
              <FaTrash />
            </button>
          </div>
        )
      })}
      {isFetching && <div>Loading...</div>}
      {error && <div>!!!!ERROR!!!!</div>}
    </div>
  )
}

const mapStateToProps = ({ tasksData }) => tasksData

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(getTasks()),
  remove: id => dispatch(deleteTask(id)),
  update: (id, values) => dispatch(updateTask({ id, values }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
