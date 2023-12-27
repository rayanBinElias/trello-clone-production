// import openai from "@/open.ai";
// import { NextResponse } from "next/server";


// export async function POST(request: Request) {

//   //pass the the todos data in the body of the POST req
//   const { todos } = await request.json();
//   console.log(todos);

//   //communicate with openAI GPT
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     temperature: 0.8,
//     n: 1,
//     stream: false,
//     message:[
//       {
//         role: "system",
//         content: `When responding, welcome to the user as Gentleman and say welcome to the Trello AI Clone To Do App!
//         Limit the response to 200 characters`,
//       }, 
//       {
//         role: "user",
//         content: `Hi there, provide a summary of the following todos. Count how many todos are in each category 
//         such as To Do, Doing and Done, then tell the user to have a productive day! Here's the data: 
//         ${JSON.stringify(
//           todos)}`,
//       }, 
//     ],
//   });

//   const {data} = response;
  
//   // const suggestion = data.choices[0]?.message?.content || "";

//   // //Test or verfiy code
//   // console.log("DATA IS: ", data);
//   // console.log(data.choices[0].message);

//   return NextResponse.json(data.choices[0].message);
  
//   // return new Response(JSON.stringify({ suggestion }), {
//   //   headers: { "Content-Type": "application/json" },
//   // });

// }