// // import Board from "@/typings";
// import formatTodoForAI from "./formatTodoForAI";

// const fetchSuggestion = async (board: Board) => {
//   try{
//     const todos = formatTodoForAI(board);
//     console.log('Formatted todos to send: ', todos)
    
//     const res = await fetch("/api/generateSummary", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // "Authoriation": "Bearer sk-DK4OjdeSlSBRgU6XAAvT3BlbkFJDxBB5nkTeEUPFifI1GNI",
//       },
//       body: JSON.stringify({ todos }),
//     });

//     const GPTdata = await res.json();
//     //access correct content/suggestion data
//     const { content } = GPTdata;

//     return content;
//   }catch(e) {
//     console.log("Error is ", e);
//   }
  
// }

// export default fetchSuggestion