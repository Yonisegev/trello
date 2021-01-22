import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Board } from '../cmps/Board'
import { setBoard, toggleOverlay, updateBoard } from '../store/actions/boardActions'
import { setCurrPopover } from '../store/actions/popoverActions'
import { BoardHeader } from '../cmps/BoardHeader'
import { TaskDetails } from '../cmps/TaskDetails'
import { socketService } from '../services/socketService'
import { Dashboard } from '../cmps/Dashboard'


class _TrelloApp extends Component {

    state = {
        isDashboardOpen: false
    }


    componentDidMount = async () => {
        const { boardId } = this.props.match.params
        const { user } = this.props
        socketService.setup()
        socketService.emit('member connected', { userId: '123', boardId })
        socketService.on('board updated fs', this.onBoardUpdated)
        await this.props.setBoard(boardId)
    }

    onTaskUpdated = ({ taskId }) => {

    }

    toggleDashboard = (boolean = !this.state.isDashboardOpen) => {
        console.log('boolean: ', boolean);
        this.setState({ isDashboardOpen: boolean })
    }

    componentWillUnmount() {
        socketService.off('board updated fs', this.onBoardUpdated)
        // socketService.off('task updated fs')
        // socketService.off('do notification fs')
        socketService.terminate()
    }

    componentDidUpdate(prevProps) {
        const { boardId } = this.props.match.params
        if (prevProps.match.params.boardId !== boardId) {
            this.props.setBoard(boardId)
        }
    }

    onBoardUpdated = async ({ updatedBoard, activity }) => {
        console.log('updated!');
        const board = { ...updatedBoard }
        await this.props.updateBoard(board, null, false)
    }

    render() {
        const { board, setCurrPopover } = this.props
        const { isDashboardOpen } = this.state
        if (!board) return <h1>loading...</h1>
        return (
            <div onClick={() => {
                setCurrPopover()
                // if (isOverlayOpen) toggleOverlay()
            }} style={{ paddingTop: '5vh' }}>
                <div className="main-bg" style={{ backgroundImage: board.style.bg }} onClick={ev => { ev.stopPropagation() }}></div>
                <div className="bg-overlay">
                    <BoardHeader {...this.props} onToggleDashboard={this.toggleDashboard} />
                    {isDashboardOpen ? <Dashboard board={board} /> : <Board {...this.props} />}
                    {this.props.match.params.listId && <TaskDetails />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard,
        isOverlayOpen: state.boardReducer.isOverlayOpen,
        currPopover: state.popoverReducer.currPopover,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {
    setBoard,
    updateBoard,
    setCurrPopover,
    toggleOverlay
}

export const TrelloApp = connect(mapStateToProps, mapDispatchToProps)(_TrelloApp)