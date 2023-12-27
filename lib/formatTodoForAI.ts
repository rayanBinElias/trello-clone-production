// const formatTodoForAI = (board: Board) => {
//   //create a copy from board column
//   const todos =  Array.from(board.columns.entries());

//   //flat the array
//   const flatArray = todos.reduce((map, [key, value]) => {
//     map[key] = value.todos;
//     return map;
//   }, {} as { [key in TypedColumn]: Todo[] });

//   //reduce to key: value length
//   const flatArrayCounted = Object.entries(flatArray).reduce(
//     (map, [key, value]) => {
//       map[key as TypedColumn] = value.length;
//       return map;
//     },
//     {} as { [key in TypedColumn]: number }
//   );

//   return flatArrayCounted;
// };

// export default formatTodoForAI;