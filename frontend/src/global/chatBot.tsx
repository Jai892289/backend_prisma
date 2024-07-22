// "use client"

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { URLS } from '@/utils/baseUrl';
// import Image from 'next/image';
// import chat from "@/assets/intelligent-assistant_12775374.png"
// import { FloatingWhatsApp } from 'react-floating-whatsapp'


// const Chat = () => {
//   const [socket, setSocket] = useState<any>(null);
//   const [inputValue, setInputValue] = useState<any>('');
//   const [messages, setMessages] = useState<any>([]);
//   const [room, setRoom] = useState<any>('');
//   const [joined, setJoined] = useState<any>(false);
//   const [userId, setUserId] = useState<any>('');

//   useEffect(() => {
//     const newSocket = io(`${URLS}`);
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       setUserId(newSocket.id);
//     });

//     newSocket.on('USER_JOINED', (id) => {
//       setMessages((prevMessages:any) => [...prevMessages, { id, text: `${id} joined the room` }]);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('NEW_MESSAGE', (message:any) => {
//         setMessages((prevMessages:any) => [...prevMessages, message]);
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off('NEW_MESSAGE');
//       }
//     };
//   }, [socket]);

//   const joinRoom = () => {
//     if (socket && room.trim() !== '') {
//       socket.emit('JOIN_ROOM', room);
//       setJoined(true);
//     }
//   };

//   const sendMessage = () => {
//     if (socket && inputValue.trim() !== '') {
//       const message = { room, id: userId, text: inputValue };
//       socket.emit('NEW_MESSAGE', message);
//       setInputValue('');
//     }
//   };

//   return (
//     <div className="fixed bottom-4 left-4 w-80 max-w-full z-50 font-sans">
      
//       {!joined  ? (
//         <div className="w-full max-w-md p-4 shadow-md rounded-lg">
//           <div
//           className="cursor-pointer animate-bounce ml-20"
//             style={{ fontSize: '48px', textAlign: 'center' }}
//           >
//             <Image src= {chat} alt="chat" width={100}  height={100} />
//           </div>
//           <div className="w-full max-w-md p-4">
//           <input
//             type="text"
//             className="w-full p-2 mb-4"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//             placeholder="Enter room ID"
//           />
//           <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={joinRoom}>
//             Join Room
//           </button>
//         </div>
//         </div>
//       ) : (
//         null
//       )}

//       {joined && (
//         <div className="w-full max-w-md p-4 h-[30rem] bg-white shadow-md rounded-lg flex flex-col">
//           <div className="flex-1 overflow-y-auto mb-4 space-y-2">
//             {messages.map((message :any, index :any) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-lg ${message.id === userId ? 'bg-blue-100 self-end' : 'bg-green-100 self-start'}`}
//               >
//                 <span className="text-xs text-gray-500">{message.id}</span>
//                 <div dangerouslySetInnerHTML={{ __html: message.text }} />
//               </div>
//             ))}
//           </div>
//           <div className="flex">
//             <input
//               type="text"
//               className="flex-1 p-2 border rounded-l"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button className="p-2 bg-blue-500 text-white rounded-r" onClick={sendMessage}>
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;


"use client"

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { URLS } from '@/utils/baseUrl';
import Image from 'next/image';
import chat from "@/assets/intelligent-assistant_12775374.png";
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const generateRoomNumber = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const Chat = () => {
  const [socket, setSocket] = useState<any>(null);
  const [inputValue, setInputValue] = useState<any>('');
  const [messages, setMessages] = useState<any>([]);
  const [room, setRoom] = useState<any>(generateRoomNumber());
  const [joined, setJoined] = useState<any>(false);
  const [userId, setUserId] = useState<any>('');
  const { user } = useSelector((state: any) => state.auth);

  const name = user?.name

  console.log("user1", name)

  useEffect(() => {
    const newSocket = io(`${URLS}`);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setUserId(newSocket.id);
    });

    newSocket.on('USER_JOINED', (id) => {
      setMessages((prevMessages: any) => [...prevMessages, { id, text: `${id} joined the room` }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('NEW_MESSAGE', (message: any) => {
        setMessages((prevMessages: any) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('NEW_MESSAGE');
      }
    };
  }, [socket]);

  const joinRoom = () => {
    if (socket && room.trim() !== '') {
      socket.emit('JOIN_ROOM', room);
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (socket && inputValue.trim() !== '') {
      const message = { room, id: userId, text: inputValue, name: name, messages: messages || 'Unknown' };
      console.log("username", message)
      console.log("messages", messages)
      socket.emit('NEW_MESSAGE', message);
      setInputValue('');
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-4 w-80 max-w-full z-50 font-sans">
        {!joined ? (
          <div className="w-full max-w-md p-4 shadow-md rounded-lg">
            <div className="cursor-pointer animate-bounce ml-20" style={{ fontSize: '48px', textAlign: 'center' }}>
              <Image src={chat} alt="chat" width={100} height={100} />
            </div>
            <div className="w-full max-w-md p-4">
              <input
                type="text"
                className="w-full p-2 mb-4"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Enter room ID"
              />
              <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={joinRoom}>
                Start Chat
              </button>
            </div>
          </div>
        ) : null}

        {joined && (
          <div className="w-full max-w-md p-4 h-[30rem] bg-white shadow-md rounded-lg flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {messages.map((message: any, index: any) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${message.id === userId ? 'bg-blue-100 self-end' : 'bg-green-100 self-start'}`}
                >
                  <span className="text-xs text-gray-500">{message.name || message.id}</span>
                  {/* <span className="text-xs text-gray-500">{message.id}</span> */}
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 border rounded-l"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="p-2 bg-blue-500 text-white rounded-r" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
  
    </>
  );
};

export default Chat;