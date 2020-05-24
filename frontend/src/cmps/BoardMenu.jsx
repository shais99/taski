import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { removeBoard } from '../store/actions/boardActions'
import { connect } from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler';
import BoardStyling from '../cmps/BoardStyling'
import BoardActivities from '../cmps/BoardActivities'
import RemoveBoard from '../cmps/RemoveBoard'


class BoardMenu extends Component {

    state = {
        isStylingShown: false,
        isRemoveBoardShown: false
    }

    onToggleStyling = () => this.setState(prevState => ({ isStylingShown: !prevState.isStylingShown }))
    onToggleRemoveBoard = () => this.setState(prevState => ({ isRemoveBoardShown: !prevState.isRemoveBoardShown }))
    onRemoveBoard = async () => {
        await this.props.removeBoard(this.props.board._id)
        this.props.history.push('/boards')
    }

    render() {
        const { onClose, onSetBg, board } = this.props
        const { isStylingShown, isRemoveBoardShown } = this.state
        return (
            <OutsideClickHandler onOutsideClick={() => onClose()} display={'contents'}>
                <div className="board-menu-container">
                    <div className="board-menu-title flex space-between align-center">
                        Board Managment
                    <img src="/assets/img/close-white.png" className="close-icon" onClick={() => onClose()} alt="" />
                    </div>

                    <div className="board-menu-content">
                        {!isStylingShown && <ul className="board-menu-list clean-list">
                            <Link to="#" onClick={this.onToggleStyling}><li><img src="/assets/img/style.png" className="small-icon" alt="" />Board Styling</li></Link>
                            <li><img src="/assets/img/stats.png" className="small-icon" alt="" />Show Board Statistics</li>
                            <Link to="#" onClick={this.onToggleRemoveBoard}><li className="remove-board"><img src="/assets/img/trash.png" className="small-icon" alt="" />Remove Board</li></Link>
                        </ul>}

                        {isRemoveBoardShown && <RemoveBoard onToggleRemoveBoard={this.onToggleRemoveBoard} onRemoveBoard={this.onRemoveBoard} />}
                        {!isStylingShown && <BoardActivities board={board} />}
                        {isStylingShown && <BoardStyling onSetBg={onSetBg} onToggleStyling={this.onToggleStyling} />}
                    </div>
                </div>
            </OutsideClickHandler>
        )
    }
}

const mapDispatchToProps = {
    removeBoard
}

export default connect(null, mapDispatchToProps)(BoardMenu)