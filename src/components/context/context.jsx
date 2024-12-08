// import { createContext, useState } from "react";
// import runChat from "../../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//   const [input, SetInput] = useState("");
//   const [recentPrompt, SetRecentPrompt] = useState("");
//   const [prevPrompts, SetPrevPrompts] = useState([]);
//   const [ShowResult, SetShowResult] = useState(false);
//   const [loading, SetLoading] = useState(false);
//   const [resultData, SetResultData] = useState("");

// const delayPara =(index,nextWord)=>{
//   setTimeout(function(){
//     SetResultData(prev=>prev+nextWord);
//   },75*index)
// }

//   const onSent = async (prompt) => {
//     // SetRecentPrompt(input)
//     SetResultData("");
//     // SetPrevPrompts(prev=>[...prev,input])
//     SetInput("");
//     SetShowResult(true);
//     SetLoading(true);
//     let response;
//     if (prompt) {
//       SetRecentPrompt(prompt);
//       response = await runChat(prompt);
//     } else {
//       SetRecentPrompt(input);
//       SetPrevPrompts((prev) => [...prev, input]);
//       response = await runChat(input);
//     }
//     // const response = await runChat(input);
// // SetResultData(response);

// let  newResponse= response.split(" ");
// for (let i=0; i<newResponse.length;i++){
//   const nextWord =newResponse[i]
//   delayPara(i,nextWord+" ")
// }
// SetLoading(false);
//   };

//   const contextValue = {
//     prevPrompts,
//     SetPrevPrompts,
//     onSent,
//     recentPrompt,
//     SetRecentPrompt,
//     ShowResult,
//     SetShowResult,
//     loading,
//     resultData,
//     input,
//     SetInput,
//   };
//   return (
//     <Context.Provider value={contextValue}>{props.children}</Context.Provider>
//   );
// };

// export default ContextProvider;
import { createContext, useState } from "react";
import runChat from "../../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, SetInput] = useState("");
  const [recentPrompt, SetRecentPrompt] = useState("");
  const [prevPrompts, SetPrevPrompts] = useState([]);
  const [ShowResult, SetShowResult] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [resultData, SetResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      SetResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const formatResultData = (data) => {
    // Replace occurrences of **text** with <strong>text</strong>
    return data.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*/g, "<br /> <br/>");
  };

  const onSent = async (prompt) => {
    SetResultData("");
    SetInput("");
    SetShowResult(true);
    SetLoading(true);
    let response;
    if (prompt) {
      SetRecentPrompt(prompt);
      response = await runChat(prompt);
    } else {
      SetRecentPrompt(input);
      SetPrevPrompts((prev) => [...prev, input]);
      response = await runChat(input);
    }

    let newResponse = response.split(" ");
    for (let i = 0; i < newResponse.length; i++) {
      const nextWord = newResponse[i];
      delayPara(i, nextWord + " ");
    }

    // Format the result data to make text bold
    const formattedResponse = formatResultData(response);
    SetResultData(formattedResponse);
    SetLoading(false);
  };

  const contextValue = {
    prevPrompts,
    SetPrevPrompts,
    onSent,
    recentPrompt,
    SetRecentPrompt,
    ShowResult,
    SetShowResult,
    loading,
    resultData,
    input,
    SetInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
