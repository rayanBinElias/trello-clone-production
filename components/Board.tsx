'use client'

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import Column from './Column';

function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB,
  ]);

  useEffect(() => {
    getBoard();
  },[getBoard]);

  //handle and Drop logic function
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    //Check if user dragged card outside of board
    if(!destination) return;

    //Handle column drag
    if(type==="column") {
      //convert key value pairs to an array
      const entries = Array.from(board.columns.entries());
      //remove data(index and contents) from source
      const [removed] = entries.splice(source.index, 1);
      //Modify destination index for incoming source data
      entries.splice(destination.index, 0, removed);
      //Stored them to new rearranged columns
      const rearrangedColumns = new Map(entries);
      //set the board state to modified state or update the state
      setBoardState({
        ...board, 
        columns: rearrangedColumns,
      })
      return;
    }

    //Handle card drag
    //This step is needed as the indexes are stored as numbers 0,1,2 etch. instead of id's with DND library
    //Create a copy of the columns
    const columns = Array.from(board.columns);
    //Get the correc index column of source and dest
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,  
    };

    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,  
    };
    
    //if no startCol or finishCol do nothing
    if(!startCol || !finishCol) return;

    //if drop in the same column do nothing
    if(source.index === destination.index && startCol === finishCol) return;

    //create a copy
    const newTodos = startCol.todos;
    //modify 
    const[todoMoved] = newTodos.splice(source.index, 1);

    if(startCol.id === finishCol.id) {
      //Same column task drag
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      //create a copy of board columns
      const newColumns = new Map(board.columns);
      //modify start column id
      newColumns.set(startCol.id, newCol);
      //update state
      setBoardState({...board, columns: newColumns});
      
    }else {
      //dragging to another column
      //modify start and finish column
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      //modify the source column
      newColumns.set(startCol.id, newCol);
      //modify the destination column
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      //Update in DB
      updateTodoInDB(todoMoved, finishCol.id);

      //Update the board state
      setBoardState({...board, columns: newColumns});
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='$board' direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* Rendering all the columns */}
            {
              Array.from(board.columns.entries()).map(([id, column], index) => (
                <Column 
                  key={id}
                  id={id}
                  todos={column.todos}
                  index={index}
                />
              ))
            }
            
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board