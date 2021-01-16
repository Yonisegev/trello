import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../store/actions/boardActions'
import { cloneDeep } from 'lodash'
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined'
import CloseIcon from '@material-ui/icons/Close'

export class _TaskDetailsDesc extends Component {
    state = {
        currTask: '',
        isTxtAreaOpen: false,

    }

    componentDidMount() {
        const { task } = this.props
        this.setState({ currTask: task })
    }


    handleInput = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => {
            return {
                currTask: {
                    ...prevState.currTask,
                    [field]: value
                }
            }
        })
    }

    toggleControls = (boolean) => {
        this.setState({ isTxtAreaOpen: boolean })
    }

    closeInput = () => {
        this.setState({ currTask: this.props.task })
    }

    saveDescription = (ev) => {
        const { board, currListIdx, currTaskIdx } = this.props
        const { currTask } = this.state
        const boardCopy = cloneDeep(board)
        boardCopy.lists[currListIdx].tasks[currTaskIdx] = currTask
        this.props.updateBoard(boardCopy)
    }

    render() {
        const { board, list, task } = this.props
        const { currTask, isTxtAreaOpen } = this.state
        return (
            <div className="task-middle-details">
                <div className="details-description">
                    <NotesOutlinedIcon style={{ position: 'absolute', left: '-30px', top: '3px' }} />
                    <h3>Description</h3>
                    {(task.description)
                        ? <textarea className="task-textarea" style={{ fontSize: '16px', fontWeight: '400px', height: 'auto' }}
                            value={currTask.description}
                            name="description"
                            spellCheck="false"
                            onChange={this.handleInput}
                            rows="3"
                            onFocus={() => this.toggleControls(true)}
                            onBlur={() => this.saveDescription()}
                        />
                        : <textarea className="task-textarea" style={{ fontSize: '16px', fontWeight: '400px', height: 'auto', backgroundColor: 'rgba(9,30,66,.04)' }}
                            value={currTask.description}
                            placeholder="Add a more detailed description..."
                            name="description"
                            spellCheck="false"
                            onChange={this.handleInput}
                            rows="3"
                            onFocus={() => this.toggleControls(true)}
                            onBlur={() => this.saveDescription()}
                        />
                    }
                    <div className={`task-desc-buttons flex align-center ${!isTxtAreaOpen && "hidden"}`}>
                        <button onClick={this.saveDescription} className="primary-btn">Save</button>
                        <CloseIcon onClick={() => this.closeInput()} />
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        board: state.boardReducer.currBoard,
        currListIdx: state.boardReducer.currListIdx,
        currTaskIdx: state.boardReducer.currTaskIdx,

    }
}

const mapDispatchToProps = {
    updateBoard
}

export const TaskDetailsDesc = connect(mapStateToProps, mapDispatchToProps)(_TaskDetailsDesc)