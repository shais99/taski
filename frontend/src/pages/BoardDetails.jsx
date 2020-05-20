import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

const boardData = {
    _id: "b101",
    title: "wetask project",
    members: [{ _id: 'u101', fullName: 'Tal Tarablus', imgUrl: 'https://www.google.com' }],
    "stacks": [
        {
            id: 's101',
            title: 'Stack 1',
            cards: [
                {
                    id: 'c101',
                    title: 'Remove the images from the website',
                },
                {
                    id: 'c102',
                    title: 'Add the images from the website',
                }
            ],
            bgColor: '#fefefe'
        },
        {
            id: 's102',
            title: 'Stack 2',
            cards: [
                {
                    id: 'c103',
                    title: 'WHATTT the images from the website',
                },
                {
                    id: 'c104',
                    title: 'NO WAYYYY the images from the website',
                }
            ],
            bgColor: '#fefefe'
        }
    ]
}

export default class BoardDetails extends React.Component {

    state = {
        items: getItems(10),
        selected: getItems(5, 10)
    };

    onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(this.state[sInd], source.index, destination.index);
            const newState = [...this.state];
            newState[sInd] = items;
            this.setState(newState);
        } else {
            const result = move(this.state[sInd], this.state[dInd], source, destination);
            const newState = [...this.state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            this.setState(newState.filter(group => group.length));
        }
    }

    stack = (data, num) => {

        return (
            <React.Fragment>
                <span>
                    <button
                        type="button"
                        onClick={() => {
                            this.setState([...this.state, []]);
                        }}
                    >
                        Add new group
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            this.setState([...this.state, getItems(1)]);
                        }}
                    >
                        Add new item
                    </button>
                </span>
                <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {el.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-around"
                                                }}
                                            >
                                                {item.content}
                                                {/* <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button> */}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </React.Fragment>
        )
    }

    render() {

        return (
            <section className="board-content container">

                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <section className="stacks-section flex">

                        {this.stack(boardData.stacks[0], 1)}
                        {this.stack(boardData.stacks[1], 2)}

                    </section>
                </DragDropContext>

            </section>
        )
    }
}
