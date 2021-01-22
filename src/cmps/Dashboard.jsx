import React, { Component } from 'react'
import TasksPerPerson from './Charts/TasksPerPerson'
import ActivityPerDay from './Charts/ActivityPerDay'
import TasksPerDay from './Charts/TasksPerDay'

export class Dashboard extends Component {

    state = {

    }

    handleClickOutside = ev => {
        this.props.toggleDashboard(false)
    }

    render() {
        const { board } = this.props
        return (
            <div className="dashboard flex space-between board-layout">
                <TasksPerPerson {...this.props} />
                <ActivityPerDay {...this.props} />
                <TasksPerDay {...this.props} />
            </div>
        )
    }
}

