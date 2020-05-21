import React, { Component } from 'react'
import CardDescription from '../cmps/CardDescription'
import CardComments from '../cmps/CardComments'
import BoardDetails from '../pages/BoardDetails'
import DueDate from '../cmps/DueDate'
import LabelsPicker from '../cmps/LabelsPicker'
import { save } from '../store/actions/boardActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeId } from '../services/utilService'

class CardDetails extends Component {

    state = {
        card: null,
        prevCardDesc: '',
        comment: {
            txt: ''
        },
        dueDate: {
            value: new Date(),
            isShown: false
        },
        labels: {
            value: [],
            isShown: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currBoard !== prevProps.currBoard) this.loadCard()
    }

    loadCard = () => {
        const currCard = this.getCurrCard();
        this.setState({ card: currCard }, () => this.setState({ prevCardDesc: this.state.card.description }))
    }

    getCurrCard = () => {
        const cardId = this.props.match.params.cardId
        let card;
        this.props.currBoard.stacks.some(stack => {
            card = stack.cards.find(card => card.id === cardId)
            return card
        })
        return card
    }

    onDescShown = (isShown, isPrevDesc) => {
        this.setState({ isDescShown: isShown })
        if (!isShown && isPrevDesc) this.setPrevDesc()
    }

    setPrevDesc = () => {
        this.setState(prevState => ({ card: { ...prevState.card, description: this.state.prevCardDesc } }))
    }

    onBackBoard = (ev) => {
        const { boardId } = this.props.match.params
        this.props.history.push(`/boards/${boardId}`)
    }

    // @TODO: due date start from the DB, if got
    onChangeDate = (dueDate) => {
        const currCard = this.getCurrCard()
        currCard.dueDate = this.state.dueDate.value
        this.setState(prevState => ({ dueDate: { ...prevState.dueDate, value: dueDate } }), () => this.props.save(this.props.currBoard))
        this.onToggleShowDate()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ card: { ...prevState.card, [field]: value } }))
    }

    handleCommentChange = ({ target }) => {
        this.setState(prevState => ({ comment: { ...prevState.comment, txt: target.value } }))
    }

    onToggleShowDate = () => {
        this.setState(prevState => ({ dueDate: { ...prevState.dueDate, isShown: !prevState.dueDate.isShown } }))
    }

    //ToDo: check if one of the action is open 

    onToggleShowLabels = () => {
        this.setState(prevState => ({ labels: { ...prevState.labels, isShown: !prevState.labels.isShown } }))
    }

    onAddComment = (ev) => {
        ev.preventDefault();
        const { comment } = this.state
        if (!comment.txt) return;
        comment.id = makeId();
        comment.createdAt = Date.now();
        comment.byMember = {
            _id: '5ec5581139619913d9c4da56',
            fullName: 'Abi Abambi',
            imgUrl: 'http://some-img.jpg'
        };
        const currCard = this.getCurrCard()
        currCard.comments.unshift(comment)
        this.props.save(this.props.currBoard)
        this.setState({ comment: { txt: '' } })
    }

    onEditTitle = ({ target }) => {
        const currCard = this.getCurrCard()
        this.setState(prevState => ({ card: { ...prevState.card, title: target.value } }), () => {
            currCard.title = this.state.card.title;
            this.props.save(this.props.currBoard)
        })
    }

    onSaveDesc = (ev) => {
        ev.preventDefault()

        const currCard = this.getCurrCard()
        currCard.description = this.state.card.description
        this.setState({ prevCardDesc: this.state.card.description })
        this.props.save(this.props.currBoard)
        this.onDescShown(false)
    }

    onAddLabel = (label) => {
        let value = this.state.labels.value;
        value.push(label);
        this.setState(prevState => ({ labels: { ...prevState.labels, value } }), () => {
            console.log('labels',this.state.labels.value);

            const currCard = this.getCurrCard();
            currCard.labels = this.state.labels.value;
            this.props.save(this.props.currBoard);
        })
    }

    render() {

        const { card, isDescShown, comment, dueDate, labels } = this.state
        return ((!card) ? 'Loading...' :
            <>
                <div className="screen" onClick={this.onBackBoard}>
                    <div className="modal-container shadow-drop-2-center" onClick={(ev) => ev.stopPropagation()}>
                        <div className="modal-header flex space-between">
                            <input type="text" name="title" className="card-title" onChange={this.onEditTitle} value={card.title} />
                            <button className="close-modal" onClick={this.onBackBoard}>X</button>
                        </div>

                        <div className="card-container flex">
                            <aside className="card-content">
                                <CardDescription description={card.description} onSaveDesc={this.onSaveDesc} handleChange={this.handleChange} isShown={this.onDescShown} isSubmitShown={isDescShown} />
                                <CardComments comments={card.comments} onAddComment={this.onAddComment} handleChange={this.handleCommentChange} comment={comment.txt} />
                            </aside>

                            <aside className="card-actions">
                                <ul className="clean-list">
                                    <Link title="Add / Remove members" to="#"><li><img src="/assets/img/user-icon.png" alt="" />Members</li></Link>
                                    <Link title="Add / Remove labels" to="#" onClick={this.onToggleShowLabels}><li><img src="/assets/img/label-icon.png" alt="" />Labels</li></Link>
                                    <Link title="Add checklist" to="#"><li><img src="/assets/img/checklist-icon.png" alt="" />Checklist</li></Link>
                                    <Link title="Set due date" to="#" onClick={this.onToggleShowDate}><li><img src="/assets/img/clock-icon.png" alt="" />Due Date</li></Link>
                                    {dueDate.isShown && <DueDate onChange={this.onChangeDate} value={dueDate.value} />}
                                    {labels.isShown && <LabelsPicker addLabel={this.onAddLabel} />}
                                </ul>
                            </aside>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = {
    save
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);