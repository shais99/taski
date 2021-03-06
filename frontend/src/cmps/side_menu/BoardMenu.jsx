import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { removeBoard } from '../../store/actions/boardActions';
import { connect } from 'react-redux';
import BoardStyling from './BoardStyling';
import BoardActivities from './BoardActivities';
import RemoveBoard from './RemoveBoard';

class BoardMenu extends Component {

    state = {
        isStylingShown: false,
        isRemoveBoardShown: false
    }

    onToggleStyling = () => this.setState(prevState => ({ isStylingShown: !prevState.isStylingShown }))
    onToggleRemoveBoard = () => this.setState(prevState => ({ isRemoveBoardShown: !prevState.isRemoveBoardShown }))
    onRemoveBoard = async () => {
        if (this.props.board.isPublic) return
        await this.props.removeBoard(this.props.board._id)
        this.props.history.push('/boards')
    }

    onCloseMenu = () => {
        this.props.onClose()
        this.setState({ isStylingShown: false, isRemoveBoardShown: false })
    }

    render() {
        const { onSetBg, board, isOpen } = this.props
        const { isStylingShown, isRemoveBoardShown } = this.state

        return (
            <div className={`board-menu-container ${isOpen ? 'board-menu-open' : ''}`}>

                <div className="board-menu-title flex space-between align-center">
                    Board Managment
                    <img src="/assets/img/close-white.png" className="close-icon" onClick={this.onCloseMenu} alt="" />
                </div>

                <div className="board-menu-content">
                    {!isStylingShown && <ul className="board-menu-list clean-list">
                        <Link to="#" onClick={this.onToggleStyling}><li><img src="/assets/img/style.png" className="small-icon" alt="" />Board Styling</li></Link>
                        <Link to="#" onClick={this.onToggleRemoveBoard}><li className="remove-board"><img src="/assets/img/trash.png" className="small-icon" alt="" />Remove Board</li></Link>
                    </ul>}

                    {isRemoveBoardShown && <RemoveBoard onToggleRemoveBoard={this.onToggleRemoveBoard} onRemoveBoard={this.onRemoveBoard} />}
                    {!isStylingShown && <BoardActivities board={board} />}
                    {isStylingShown && <BoardStyling onSetBg={onSetBg} onToggleStyling={this.onToggleStyling} />}
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = {
    removeBoard
}

export default connect(null, mapDispatchToProps)(BoardMenu)