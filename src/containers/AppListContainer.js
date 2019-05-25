import { AppList } from '../components/AppList'
import React from 'react'
import { actions as todoActions } from '../store/domain/todo'
import { actions as appActions } from '../store/app/app'
import connect from 'react-redux/es/connect/connect'
import { filterTypes } from '../store/ui/filter'

export const AppListContainer = ({editFormRef, todos, toggleCompleted, removeTodo, selectId, lock, editingTodo}) => (
  <div className="container todo-list-wrap">
    <AppList list={todos.data}
             toggleCompleted={index => toggleCompleted(index)}
             listItemDelete={id => {removeTodo(id)}}
             listItemEdit={id => {
               selectId(id)
               lock()
               process.nextTick(() => {
                 editFormRef.current.focus()
               })
               editingTodo(id)
             }}
             className="todo-list"
    />
  </div>
)
const mapStateToProps = ({todos, filter}) => {
  return {
    todos: {
      selected: todos.selected,
      data: todos.data.filter(todo => {
        switch (filter) {
          case filterTypes.SHOW_COMPLETE:
            return todo.completed
          case filterTypes.SHOW_ACTIVE:
            return !todo.completed
          default:
            return true
        }
      })
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    editingTodo (id) {
      dispatch(todoActions.editingTodo(id))
    },
    removeTodo (id) {
      dispatch(todoActions.removeTodo(id))
    },
    toggleCompleted (index) {
      dispatch(todoActions.toggleCompleted(index))
    },
    selectId (id) {
      dispatch(todoActions.selectId(id))
    },
    lock () {
      dispatch(appActions.lock())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppListContainer)