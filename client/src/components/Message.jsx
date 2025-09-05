
// import React, { useEffect } from 'react'
// import { assets } from '../assets/assets'
// import moment from 'moment'
// import Markdown from 'react-markdown'
// import Prism from 'prismjs'

// const Message = ({ message }) => {

//   useEffect(() => {
//     Prism.highlightAll()
//   }, [message.content])

//   return (
//     <div>
//       {message.role === "user" ? (
//         <div className='flex items-start justify-end my-4 gap-2'>
//           <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#8069FF]/30 rounded-md max-w-2xl'>
//             <p className='text-sm dark:text-primary'>{message.content}</p>
//             <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>
//               {moment(message.timestamp).fromNow()}
//             </span>
//           </div>
//           <img src={assets.user_icon} alt="" className='w-8 rounded-full' />
//         </div>
//       ) : (
//         <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#8069FF]/30 rounded-md my-4'>
//           {message.isImage ? (
//             <img src={message.content} alt="" className='w-full max-w-md mt-2 rounded-md' />
//           ) : (
//             <div className='text-sm dark:text-primary reset-tw'>
//               <Markdown>{message.content}</Markdown>
//             </div>
//           )}
//           <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>
//             {moment(message.timestamp).fromNow()}
//           </span>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Message



import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Beautiful dark theme for code

const Message = React.memo(({ message }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      const codeBlocks = messageRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => Prism.highlightElement(block));
    }
  }, [message.content]);

  return (
    <div className="px-2">
      {message.role === "user" ? (
        // USER MESSAGE (Right side)
        <div className="flex items-end justify-end gap-2 my-4">
          {/* Chat bubble */}
          <div className="flex flex-col gap-1 p-3 px-4 max-w-[80%] sm:max-w-2xl 
            bg-slate-100 dark:bg-[#57317C]/30 border border-[#8069FF]/30 
            rounded-2xl shadow-lg overflow-hidden break-words">
            <p className="text-sm dark:text-gray-100">{message.content}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-right opacity-70">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          {/* User Avatar */}
          <img
            src={assets.user_icon}
            alt="User"
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
          />
        </div>
      ) : (
        // ASSISTANT MESSAGE (Left side)
        <div className="flex items-start gap-2 my-4">
          {/* AI Avatar */}
          <img
            src={assets.logo_full_dark}
            alt="AI"
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-600 shadow-md hidden sm:block"
          />

          {/* Message Content */}
          <div
            ref={messageRef}
            className="flex flex-col gap-2 p-3 px-4 max-w-[80%] sm:max-w-2xl 
              bg-gradient-to-r from-purple-50 to-purple-100 dark:from-[#57317C]/20 dark:to-[#2D0B4F]/20 
              border border-[#8069FF]/30 rounded-2xl shadow-lg overflow-hidden break-words"
          >
            {message.isImage ? (
              // Image message
              <img
                src={message.content}
                alt="Generated"
                className="w-full max-w-md rounded-md border border-gray-300 dark:border-gray-600 shadow-sm"
              />
            ) : (
              // Markdown with code highlighting
              <div className="text-sm dark:text-gray-100 prose prose-sm dark:prose-invert max-w-none
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-3
                prose-code:text-purple-500">
                <Markdown>{message.content}</Markdown>
              </div>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 text-right opacity-70">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Message;
