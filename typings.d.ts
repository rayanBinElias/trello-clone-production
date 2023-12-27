//Typescript definition
//Map objects
interface Board {
  //key and value
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "Todo" | "Doing" | "Done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}