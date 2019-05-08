import React, {Component} from 'react'
import Todo from './Todo'
import PropTypes from 'prop-types'

export default class TodoList extends Component{
  render () {
    return (
      <ul>
        {this.props.todos.map((todo, index) =>
          <Todo {...todo}
            key={index}
            onClick={() => this.props.onTodoClick(index)}
          />
        )}
      </ul>
    )
  }
}

TodoList.propsType = {
  onTodoClick: PropTypes.func.isRequired,
  todos:PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed:PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
}