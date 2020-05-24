import React from 'react';
import { Link } from 'react-router-dom';



export function CardPreview(props) {
    
    function onLabelsPress() {
        // console.log('PRESSED');
        props.onToggleLabels();
    }
    

    const { card, innerRef, provided, style, link, labelsOpen } = props;
    const showInfo = (card.comments.length || card.description !== '');
    return (
        <>
            <div className="card-preview flex column align-center justify-center" ref={innerRef} style={style}
                {...provided.draggableProps} {...provided.dragHandleProps} >
                {(card.labels.length)
                    ?
                    <div className={`card-labels flex wrap align-center `} onClick={onLabelsPress}>
                        {
                            card.labels.map((label) => {
                                return (
                                    <div className={`card-label flex align-center justify-center ${(labelsOpen) ? 'label-expand' : ''}`}
                                        key={label.title + card.id} style={{
                                            background: label.color,

                                        }}>{(labelsOpen) ? label.title : ''}</div>
                                )
                            })
                        }
                    </div>
                    : null

                }
                <Link to={link}>
                    <p className={`card-preview-title ${(card.labels.length) ? 'top-margin' : ''}`}>{props.title}</p>

                    {(showInfo)
                        ?
                        <div className="card-preview-info flex align-center space-start">
                            {(card.description !== '')
                                ?
                                <span className="preview-info-span flex align-center">
                                    <img className="preview-info-img" src="/assets/img/description.png" />
                                </span>
                                :
                                null
                            }
                            {(card.comments.length)
                                ?
                                <span className="preview-info-span flex align-center">
                                    <img className="preview-info-img" src="/assets/img/comment.png" />
                                    <p className="preview-info-count">{card.comments.length}</p>
                                </span>
                                :
                                null
                            }
                            {(card.checklists && card.checklists.length)
                                ?
                                <span className="preview-info-span flex align-center">
                                    <img className="preview-info-img" src="/assets/img/todos.png" />
                                    <p className="preview-info-count">{card.checklists.length}</p>
                                </span>
                                :
                                null
                            }
                        </div>
                        : null}
                </Link>
            </div>

        </>
    )

}