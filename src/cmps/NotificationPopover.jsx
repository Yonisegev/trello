import React, { Component } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { boardService } from '../services/boardService'
export class NotificationPopover extends Component {
    state = {
        notifications: []
    }

    componentDidMount() {
        const notifications = boardService.getNotifications()
        this.setState({ notifications })
    }


    render() {
        const { notifications } = this.state
        const { board,setCurrPopover } = this.props
        
        if (!notifications) return <h1>Loading...</h1>
        return (
            <div className="notification-popover flex column" onClick={ev => ev.stopPropagation()}>
                <div className="popover-header flex align-center justify-center">
                    <span className="popover-header-title">Notifications</span>
                    <CloseIcon className="close-icon" onClick={setCurrPopover} />
                </div>
                <div className="notification-actions flex space-between">
                    <span className="view-all">View All</span>
                    <span className="mark-all-as-read">Mark All as Read</span>
                </div>
                <section className="popover-section flex column">
                    <ul className="popover-section-list clear-list">
                        <h3 className="popover-section-header">Your Notifications</h3>
                        {notifications.map(notification => {
                            return <li key={notification.id} className="popover-section-list-item flex">
                                <div className="checkbox-container " title="mark-read">
                                <input type="checkbox" className={`read-notification-checkbox`} />
                                </div>
                                <div className="notification-details">
                                    <div className="notification-details-header flex column justify-center align-start">
                                        <span className="notification-details-header-task-title">{notification.txt}</span>
                                        <div className="notification-details-header-board-title">
                                            <span>{board.title}</span>
                                        </div>
                                    </div>
                                    <div className="notification-details-body">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt odit voluptas, similique eius corporis reprehenderit officiis cupiditate eos beatae molestias.
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}
