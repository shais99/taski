import React, { Component } from 'react'

export default class CardDescription extends Component {

    render() {
        return (
            <div className="card-desc-container">
                <div className="card-mini-title"><label htmlFor="cardDesc">Description:</label></div>
                <form>
                    <textarea name="description" value={this.props.description} onChange={this.props.handleChange} onFocus={this.props.isShownToggle} onBlur={this.props.isShownToggle} className="card-desc" id="cardDesc">
                    </textarea>
                    {this.props.isSubmitShown && <div className="desc-btns-container">
                        <button>Save Changes</button>
                        <a href="#" className="cancel-changes" onClick={this.props.isShownToggle}>X</a>
                    </div>}
                </form>
            </div>
        )
    }
}
