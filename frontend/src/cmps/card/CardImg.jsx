import React from 'react'

export default function CardImg(props) {
    const { isUploadImg, onRemoveImg, imgUrl } = props
    return (
        <div className="card-img-container">
            <div className="card-mini-title flex align-center space-between">
                <div>
                    <img src="/assets/img/style.png"></img>
                    <label className="card-txt-title">Image</label>
                </div>
                <button className="btn btn-delete" onClick={() => onRemoveImg()}>Delete</button>
            </div>
            <div className="card-img">
                {isUploadImg ? <div className="loading">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div> : <img src={`${imgUrl}`} />}

            </div>

        </div>
    )
}
