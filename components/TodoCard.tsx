'use client'

import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) {
  //pull state data from board store 
  const deleteTask = useBoardStore((state) => state.deleteTask);
  //image state
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if(todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      }

      fetchImage();
    }
  }, [todo])

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)} className="text-red-500 hover:text-red-600">
          <XCircleIcon
            className="ml-5 h-8 w-8"
          />
        </button>
      </div>
      
      {/* Add Image here */}
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
            priority={true}
          />
        </div>
      )}
    </div>
  )
}

export default TodoCard