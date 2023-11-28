// // 기존 코드
// "use strict";

// let localVideo = document.getElementById("localVideo");
// let remoteVideo1 = document.getElementById("remoteVideo1");
// let remoteVideo2 = document.getElementById("remoteVideo2");
// let remoteVideo3 = document.getElementById("remoteVideo3");

// // WebRTC 변수
// let isInitiator = false;
// let isChannelReady = false;
// let isStarted = false;
// let localStream;
// let remoteStream;
// let pc;

// let remoteStream1;
// let remoteStream2;
// let remoteStream3;

// // STUN 서버 설정
// let pcConfig = {
//     'iceServers': [{
//         'urls': 'stun:stun.l.google.com:19302'
//       }]
// }

// let room = 'foo';

// // socket.io 서버에 연결
// let socket = io();

// // 방 생성 또는 참여 요청
// if(room !==''){
// socket.emit('create or join',room);
// console.log('Attempted to create or join Room',room);
// }

// socket.on('created', (room,id)=>{
//   console.log('Created room' + room+'socket ID : '+id);
//   isInitiator= true;
//   console.log("isInitiator",isInitiator);
// })

// socket.on('full', room=>{
//   console.log('Room '+room+'is full');
// });

// socket.on('join',room=>{
//   console.log('Another peer made a request to join room' + room);
//   isChannelReady = true;
//   console.log("isChannelRead",isChannelReady);
// })

// socket.on('joined',room=>{
//   console.log('joined : '+ room );
//   isChannelReady= true;
// })
// socket.on('log', array=>{
//   console.log.apply(console,array);
// });

// socket.on('message', (message)=>{
//   console.log('Client received message :',message);
//   if(message === 'got user media'){
//     maybeStart();
//   }else if(message.type === 'offer'){
//     if(!isInitiator && !isStarted){
//       maybeStart();
//     }
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//     doAnswer();
//   }else if(message.type ==='answer' && isStarted){
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//   }else if(message.type ==='candidate' &&isStarted){
//     const candidate = new RTCIceCandidate({
//       sdpMLineIndex : message.label,
//       candidate:message.candidate
//     });

//     pc.addIceCandidate(candidate);
//   }
// })
// function sendMessage(message){
//   console.log('Client sending message: ',message);
//   socket.emit('message',message);
// }

// //media stream 설정
// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//     audio: true,
//   })
//   .then(gotStream)
//   .catch((error) => console.error(error));

// function gotStream(stream) {
//   console.log("Adding local stream");
//   localStream = stream;
//   localVideo.srcObject = stream;
//   sendMessage("got user media");
//   if (isInitiator) {
//     maybeStart();
//   }
// }

// function createPeerConnection() {
//   try {
//     pc = new RTCPeerConnection(pcConfig);
//     pc.onicecandidate = handleIceCandidate;
//     pc.onaddstream = handleRemoteStreamAdded;
//     console.log("Created RTCPeerConnection");
//   } catch (e) {
//     alert("connot create RTCPeerConnection object");
//     return;
//   }
// }

// function handleIceCandidate(event) {
//   console.log("iceCandidateEvent", event);
//   if (event.candidate) {
//     sendMessage({
//       type: "candidate",
//       label: event.candidate.sdpMLineIndex,
//       id: event.candidate.sdpMid,
//       candidate: event.candidate.candidate,
//     });
//   } else {
//     console.log("end of candidates");
//   }
// }

// function handleCreateOfferError(event) {
//   console.log("createOffer() error: ", event);
// }

// function handleRemoteStreamAdded(event) {
//   console.log("remote stream added");
//   if (!remoteStream1) {
//     remoteStream1 = event.stream;
//     remoteVideo1.srcObject = remoteStream1;
//   } else if (!remoteStream2) {
//     remoteStream2 = event.stream;
//     remoteVideo2.srcObject = remoteStream2;
//   } else if (!remoteStream3) {
//     remoteStream3 = event.stream;
//     remoteVideo3.srcObject = remoteStream3;
//   }
// }

// function maybeStart() {
//   console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
//   if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
//     console.log(">>>>> creating peer connection");
//     createPeerConnection();
//     pc.addStream(localStream);
//     isStarted = true;
//     console.log("isInitiator : ", isInitiator);
//     if (isInitiator) {
//       doCall();
//     }
//   }else{
//     console.error('maybeStart not Started!');
//   }
// }

// function doCall() {
//   console.log("Sending offer to peer");
//   pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
// }

// function doAnswer() {
//   console.log("Sending answer to peer");
//   pc.createAnswer().then(
//     setLocalAndSendMessage,
//     onCreateSessionDescriptionError
//   );
// }

// function setLocalAndSendMessage(sessionDescription) {
//   pc.setLocalDescription(sessionDescription);
//   sendMessage(sessionDescription);
// }

// function onCreateSessionDescriptionError(error) {
//   console.error("Falied to create session Description", error);
// }

// ******************************************************************
// ******************************************************************
// ******************************************************************
// ******************************************************************

// 2차 코드
// "use strict";

// let localVideo = document.getElementById("localVideo");
// let remoteVideo1 = document.getElementById("remoteVideo1");
// let remoteVideo2 = document.getElementById("remoteVideo2");
// let remoteVideo3 = document.getElementById("remoteVideo3");

// // WebRTC 변수
// let isInitiator = false;
// let isChannelReady = false;
// let isStarted = false;
// let localStream;
// let remoteStream;
// let pc;

// let remoteStream1;
// let remoteStream2;
// let remoteStream3;

// // STUN 서버 설정
// let pcConfig = {
//     'iceServers': [{
//         'urls': 'stun:stun.l.google.com:19302'
//       }]
// }

// let room = 'foo';

// // socket.io 서버에 연결
// let socket = io();

// // 방 생성 또는 참여 요청
// if(room !==''){
// socket.emit('create or join',room);
// console.log('Attempted to create or join Room',room);
// }

// socket.on('created', (room,id)=>{
//   console.log('Created room' + room+'socket ID : '+id);
//   isInitiator= true;
//   console.log("isInitiator",isInitiator);
// })

// socket.on('full', room=>{
//   console.log('Room '+room+'is full');
// });

// socket.on('join',room=>{
//   console.log('Another peer made a request to join room' + room);
//   isChannelReady = true;
//   isStarted=false;
//   console.log("isChannelRead",isChannelReady);
// })

// socket.on('joined',room=>{
//   console.log('joined : '+ room );
//   isChannelReady= true;
// })
// socket.on('log', array=>{
//   console.log.apply(console,array);
// });

// socket.on('message', (message)=>{
//   console.log('Client received message :',message);
//   if(message === 'got user media'){
//     maybeStart();
//   }else if(message.type === 'offer'){
//     if(!isInitiator && !isStarted){
//       maybeStart();
//     }
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//     doAnswer();
//   }else if(message.type ==='answer' && isStarted){
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//   }else if(message.type ==='candidate' &&isStarted){
//     const candidate = new RTCIceCandidate({
//       sdpMLineIndex : message.label,
//       candidate:message.candidate
//     });

//     pc.addIceCandidate(candidate);
//   }
// })
// function sendMessage(message){
//   console.log('Client sending message: ',message);
//   socket.emit('message',message);
// }

// //media stream 설정
// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//     audio: true,
//   })
//   .then(gotStream)
//   .catch((error) => console.error(error));

// function gotStream(stream) {
//   console.log("Adding local stream");
//   localStream = stream;
//   localVideo.srcObject = stream;
//   sendMessage("got user media");
//   if (isInitiator) {
//     maybeStart();
//   }
// }

// function createPeerConnection() {
//   try {
//     pc = new RTCPeerConnection(pcConfig);
//     pc.onicecandidate = handleIceCandidate;
//     pc.onaddstream = handleRemoteStreamAdded;
//     console.log("Created RTCPeerConnection");
//   } catch (e) {
//     alert("connot create RTCPeerConnection object");
//     return;
//   }
// }

// function handleIceCandidate(event) {
//   console.log("iceCandidateEvent", event);
//   if (event.candidate) {
//     sendMessage({
//       type: "candidate",
//       label: event.candidate.sdpMLineIndex,
//       id: event.candidate.sdpMid,
//       candidate: event.candidate.candidate,
//     });
//   } else {
//     console.log("end of candidates");
//   }
// }

// function handleCreateOfferError(event) {
//   console.log("createOffer() error: ", event);
// }

// function handleRemoteStreamAdded(event) {
//   console.log("remote stream added");
//   if (!remoteStream1) {
//     remoteStream1 = event.stream;
//     remoteVideo1.srcObject = remoteStream1;
//   } else if (!remoteStream2) {
//     remoteStream2 = event.stream;
//     remoteVideo2.srcObject = remoteStream2;
//   } else if (!remoteStream3) {
//     remoteStream3 = event.stream;
//     remoteVideo3.srcObject = remoteStream3;
//   }
// }

// function maybeStart() {
//   console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
//   if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
//     console.log(">>>>> creating peer connection");
//     createPeerConnection();
//     pc.addStream(localStream);
//     isStarted = true;
//     console.log("isInitiator : ", isInitiator);
//     if (isInitiator) {
//       doCall();
//     }
//   }else{
//     console.error('maybeStart not Started!');
//   }
// }

// function doCall() {
//   console.log("Sending offer to peer");
//   pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
// }

// function doAnswer() {
//   console.log("Sending answer to peer");
//   pc.createAnswer().then(
//     setLocalAndSendMessage,
//     onCreateSessionDescriptionError
//   );
// }

// function setLocalAndSendMessage(sessionDescription) {
//   pc.setLocalDescription(sessionDescription);
//   sendMessage(sessionDescription);
// }

// function onCreateSessionDescriptionError(error) {
//   console.error("Falied to create session Description", error);
// }

// ******************************************************************
// ******************************************************************
// ******************************************************************
// ******************************************************************

// 3차 코드
// "use strict";

// let localVideo = document.getElementById("localVideo");
// let remoteVideo1 = document.getElementById("remoteVideo1");
// let remoteVideo2 = document.getElementById("remoteVideo2");
// let remoteVideo3 = document.getElementById("remoteVideo3");

// // WebRTC 변수
// let isInitiator = false;
// let isChannelReady = false;
// let isStarted = false;
// let localStream;
// let remoteStreams = [null, null, null]; // 배열로 변경
// let pc;

// let remoteStream1;
// let remoteStream2;
// let remoteStream3;

// // STUN 서버 설정
// let pcConfig = {
//     'iceServers': [{
//         'urls': 'stun:stun.l.google.com:19302'
//       }]
// }

// let room = 'foo';

// // socket.io 서버에 연결
// let socket = io();

// // 방 생성 또는 참여 요청
// if(room !==''){
// socket.emit('create or join',room);
// console.log('Attempted to create or join Room',room);
// }

// socket.on('created', (room,id)=>{
//   console.log('Created room' + room+'socket ID : '+id);
//   isInitiator= true;
//   console.log("isInitiator",isInitiator);
// })

// socket.on('full', room=>{
//   console.log('Room '+room+'is full');
// });

// socket.on('join',room=>{
//   console.log('Another peer made a request to join room' + room);
//   isChannelReady = true;
//   isStarted=false;
//   console.log("isChannelRead",isChannelReady);
// })

// socket.on('joined',room=>{
//   console.log('joined : '+ room );
//   isChannelReady= true;
// })
// socket.on('log', array=>{
//   console.log.apply(console,array);
// });

// socket.on('message', (message)=>{
//   console.log('Client received message :',message);
//   if(message === 'got user media'){
//     maybeStart();
//   }else if(message.type === 'offer'){
//     if(!isInitiator && !isStarted){
//       maybeStart();
//     }
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//     doAnswer();
//   }else if(message.type ==='answer' && isStarted){
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//   }else if(message.type ==='candidate' &&isStarted){
//     const candidate = new RTCIceCandidate({
//       sdpMLineIndex : message.label,
//       candidate:message.candidate
//     });

//     pc.addIceCandidate(candidate);
//   }
// })
// function sendMessage(message){
//   console.log('Client sending message: ',message);
//   socket.emit('message',message);
// }

// //media stream 설정
// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//     audio: true,
//   })
//   .then(gotStream)
//   .catch((error) => console.error(error));

// function gotStream(stream) {
//   console.log("Adding local stream");
//   localStream = stream;
//   localVideo.srcObject = stream;
//   sendMessage("got user media");
//   if (isInitiator) {
//     maybeStart();
//   }
// }

// function createPeerConnection() {
//   try {
//     pc = new RTCPeerConnection(pcConfig);
//     pc.onicecandidate = handleIceCandidate;
//     pc.onaddstream = handleRemoteStreamAdded;
//     console.log("Created RTCPeerConnection");
//   } catch (e) {
//     alert("connot create RTCPeerConnection object");
//     return;
//   }
// }

// function handleIceCandidate(event) {
//   console.log("iceCandidateEvent", event);
//   if (event.candidate) {
//     sendMessage({
//       type: "candidate",
//       label: event.candidate.sdpMLineIndex,
//       id: event.candidate.sdpMid,
//       candidate: event.candidate.candidate,
//     });
//   } else {
//     console.log("end of candidates");
//   }
// }

// function handleCreateOfferError(event) {
//   console.log("createOffer() error: ", event);
// }

// function handleRemoteStreamAdded(event) {
//   console.log("remote stream added");
//   let index = -1;

//   // 빈 자리에 스트림 할당
//   for (let i = 0; i < remoteStreams.length; i++) {
//     if (!remoteStreams[i]) {
//       index = i;
//       break;
//     }
//   }

//   if (index !== -1) {
//     remoteStreams[index] = event.stream;
//     setRemoteVideo(index + 1, event.stream); // index는 0부터 시작하므로 +1
//   } else {
//     console.error("No available slot for remote stream");
//   }
// }

// // 함수 추가: 인덱스에 따라 적절한 remoteVideo에 스트림 설정
// function setRemoteVideo(index, stream) {
//   if (index === 1) {
//     console.log("앤랴닐너ㅣㅏㅇ러니ㅏㄹ찬인ㅊㄴ1111111");
//     remoteVideo1.srcObject = stream;
//   } else if (index === 2) {
//     console.log("앤랴닐너ㅣㅏㅇ러니ㅏㄹ찬인ㅊㄴ22222");
//     remoteVideo2.srcObject = stream;
//   } else if (index === 3) {
//     console.log("앤랴닐너ㅣㅏㅇ러니ㅏㄹ찬인ㅊㄴ333333");
//     remoteVideo3.srcObject = stream;
//   }
// }

// function maybeStart() {
//   console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
//   if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
//     console.log(">>>>> creating peer connection");
//     createPeerConnection();
//     pc.addStream(localStream);
//     isStarted = true;
//     console.log("isInitiator : ", isInitiator);
//     if (isInitiator) {
//       doCall();
//     }
//   }else{
//     console.error('maybeStart not Started!');
//   }
// }

// function doCall() {
//   console.log("Sending offer to peer");
//   pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
// }

// function doAnswer() {
//   console.log("Sending answer to peer");
//   pc.createAnswer().then(
//     setLocalAndSendMessage,
//     onCreateSessionDescriptionError
//   );
// }

// function setLocalAndSendMessage(sessionDescription) {
//   pc.setLocalDescription(sessionDescription);
//   sendMessage(sessionDescription);
// }

// function onCreateSessionDescriptionError(error) {
//   console.error("Falied to create session Description", error);
// }

// ******************************************************************
// ******************************************************************
// ******************************************************************
// ******************************************************************

// 4차 코드
// "use strict";

// let localVideo = document.getElementById("localVideo");

// // WebRTC 변수
// let isInitiator = false;
// let isChannelReady = false;
// let isStarted = false;
// let localStream;
// let remoteStreams = [null, null, null]; // 배열로 변경
// let pc;

// let remoteStream1;
// let remoteStream2;
// let remoteStream3;

// // STUN 서버 설정
// let pcConfig = {
//     'iceServers': [{
//         'urls': 'stun:stun.l.google.com:19302'
//       }]
// }

// let room = 'foo';

// // socket.io 서버에 연결
// let socket = io();

// // 방 생성 또는 참여 요청
// if(room !==''){
// socket.emit('create or join',room);
// console.log('Attempted to create or join Room',room);
// }

// socket.on('created', (room,id)=>{
//   console.log('Created room' + room+'socket ID : '+id);
//   isInitiator= true;
//   console.log("isInitiator",isInitiator);
// })

// socket.on('full', room=>{
//   console.log('Room '+room+'is full');
// });

// socket.on('join',room=>{
//   console.log('Another peer made a request to join room' + room);
//   isChannelReady = true;
//   isStarted=false;
//   console.log("isChannelRead",isChannelReady);
// })

// socket.on('joined',room=>{
//   console.log('joined : '+ room );
//   isChannelReady= true;
// })
// socket.on('log', array=>{
//   console.log.apply(console,array);
// });

// socket.on('message', (message)=>{
//   console.log('Client received message :',message);
//   if(message === 'got user media'){
//     maybeStart();
//   }else if(message.type === 'offer'){
//     if(!isInitiator && !isStarted){
//       maybeStart();
//     }
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//     doAnswer();
//   }else if(message.type ==='answer' && isStarted){
//     pc.setRemoteDescription(new RTCSessionDescription(message));
//   }else if(message.type ==='candidate' &&isStarted){
//     const candidate = new RTCIceCandidate({
//       sdpMLineIndex : message.label,
//       candidate:message.candidate
//     });

//     pc.addIceCandidate(candidate);
//   }
// })
// function sendMessage(message){
//   console.log('Client sending message: ',message);
//   socket.emit('message',message);
// }

// //media stream 설정
// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//     audio: true,
//   })
//   .then(gotStream)
//   .catch((error) => console.error(error));

// function gotStream(stream) {
//   console.log("Adding local stream");
//   localStream = stream;
//   localVideo.srcObject = stream;
//   sendMessage("got user media");
//   if (isInitiator) {
//     maybeStart();
//   }
// }

// function createPeerConnection() {
//   try {
//     pc = new RTCPeerConnection(pcConfig);
//     pc.onicecandidate = handleIceCandidate;
//     pc.onaddstream = handleRemoteStreamAdded;
//     console.log("Created RTCPeerConnection");
//   } catch (e) {
//     alert("connot create RTCPeerConnection object");
//     return;
//   }
// }

// function handleIceCandidate(event) {
//   console.log("iceCandidateEvent", event);
//   if (event.candidate) {
//     sendMessage({
//       type: "candidate",
//       label: event.candidate.sdpMLineIndex,
//       id: event.candidate.sdpMid,
//       candidate: event.candidate.candidate,
//     });
//   } else {
//     console.log("end of candidates");
//   }
// }

// function handleCreateOfferError(event) {
//   console.log("createOffer() error: ", event);
// }

// function handleRemoteStreamAdded(event) {
//   console.log("remote stream added");
//   let index = -1;

//   // 빈 자리에 스트림 할당
//   for (let i = 0; i < remoteStreams.length; i++) {
//     if (!remoteStreams[i]) {
//       index = i;
//       break;
//     }
//   }

//   if (index !== -1) {
//     remoteStreams[index] = event.stream;
//     setRemoteVideo(index + 1, event.stream); // index는 0부터 시작하므로 +1
//   } else {
//     console.error("No available slot for remote stream");
//   }
// }

// // 함수 추가: 인덱스에 따라 적절한 remoteVideo에 스트림 설정
// function setRemoteVideo(index, stream) {
//   const remoteVideoElement = document.getElementById(`remoteVideo${index}`);
//   remoteVideoElement.srcObject = stream;
// }

// function maybeStart() {
//   console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
//   if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
//     console.log(">>>>> creating peer connection");
//     createPeerConnection();
//     pc.addStream(localStream);
//     isStarted = true;
//     console.log("isInitiator : ", isInitiator);
//     if (isInitiator) {
//       doCall();
//     }
//   }else{
//     console.error('maybeStart not Started!');
//   }
// }

// function doCall() {
//   console.log("Sending offer to peer");
//   pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
// }

// function doAnswer() {
//   console.log("Sending answer to peer");
//   pc.createAnswer().then(
//     setLocalAndSendMessage,
//     onCreateSessionDescriptionError
//   );
// }

// function setLocalAndSendMessage(sessionDescription) {
//   pc.setLocalDescription(sessionDescription);
//   sendMessage(sessionDescription);
// }

// function onCreateSessionDescriptionError(error) {
//   console.error("Falied to create session Description", error);
// }

// ******************************************************************
// ******************************************************************
// ******************************************************************
// ******************************************************************

// 5차 코드
"use strict";

let localVideo = document.getElementById("localVideo");

// WebRTC 변수
let isInitiator = false;
let isChannelReady = false;
let isStarted = false;
let localStream;
let remoteStreams = [null, null, null]; // 배열로 변경
let pc;

let remoteStream1;
let remoteStream2;
let remoteStream3;

// STUN 서버 설정
let pcConfig = {
    'iceServers': [{
        'urls': 'stun:stun.l.google.com:19302'
      }]
}

let room = 'foo';

// socket.io 서버에 연결
let socket = io();

// 방 생성 또는 참여 요청
if(room !==''){
socket.emit('create or join',room);
console.log('Attempted to create or join Room',room);
}

socket.on('created', (room,id)=>{
  console.log('Created room' + room+'socket ID : '+id);
  isInitiator= true;
  console.log("isInitiator",isInitiator);
})

socket.on('full', room=>{
  console.log('Room '+room+'is full');
});

socket.on('join',room=>{
  console.log('Another peer made a request to join room' + room);
  isChannelReady = true;
  isStarted=false;
  console.log("isChannelRead",isChannelReady);
})

socket.on('joined',room=>{
  console.log('joined : '+ room );
  isChannelReady= true;
})
socket.on('log', array=>{
  console.log.apply(console,array);
});

socket.on('message', (message)=>{
  console.log('Client received message :',message);
  if(message === 'got user media'){
    maybeStart();
  }else if(message.type === 'offer'){
    if(!isInitiator && !isStarted){
      maybeStart();
    }
    pc.setRemoteDescription(new RTCSessionDescription(message));
    doAnswer();
  }else if(message.type ==='answer' && isStarted){
    pc.setRemoteDescription(new RTCSessionDescription(message));
  }else if(message.type ==='candidate' &&isStarted){
    const candidate = new RTCIceCandidate({
      sdpMLineIndex : message.label,
      candidate:message.candidate
    });

    pc.addIceCandidate(candidate);
  }
})
function sendMessage(message){
  console.log('Client sending message: ',message);
  socket.emit('message',message);
}

//media stream 설정
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then(gotStream)
  .catch((error) => console.error(error));

function gotStream(stream) {
  console.log("Adding local stream");
  localStream = stream;
  localVideo.srcObject = stream;
  sendMessage("got user media");
  if (isInitiator) {
    maybeStart();
  }
}

function createPeerConnection() {
  try {
    pc = new RTCPeerConnection(pcConfig);
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    console.log("Created RTCPeerConnection");
  } catch (e) {
    alert("connot create RTCPeerConnection object");
    return;
  }
}

function handleIceCandidate(event) {
  console.log("iceCandidateEvent", event);
  if (event.candidate) {
    sendMessage({
      type: "candidate",
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
    });
  } else {
    console.log("end of candidates");
  }
}

function handleCreateOfferError(event) {
  console.log("createOffer() error: ", event);
}

function handleRemoteStreamAdded(event) {
  console.log("remote stream added");
  let index = -1;

  // 빈 자리에 스트림 할당
  for (let i = 0; i < remoteStreams.length; i++) {
    if (!remoteStreams[i]) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    remoteStreams[index] = event.stream;
    setRemoteVideo(index + 1, event.stream); // index는 0부터 시작하므로 +1
  } else {
    console.error("No available slot for remote stream");
  }
}

// 함수 추가: 인덱스에 따라 적절한 remoteVideo에 스트림 설정
function setRemoteVideo(index, stream) {
  const remoteVideoElement = document.getElementById(`remoteVideo${index}`);
  remoteVideoElement.srcObject = stream;
}

function maybeStart() {
  console.log(">>MaybeStart() : ", isStarted, localStream, isChannelReady);
  if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
    console.log(">>>>> creating peer connection");
    createPeerConnection();
    pc.addStream(localStream);
    isStarted = true;
    console.log("isInitiator : ", isInitiator);
    if (isInitiator) {
      doCall();
    }
  }else{
    console.error('maybeStart not Started!');
  }
}

function doCall() {
  console.log("Sending offer to peer");
  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function doAnswer() {
  console.log("Sending answer to peer");
  pc.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

function setLocalAndSendMessage(sessionDescription) {
  pc.setLocalDescription(sessionDescription);
  sendMessage(sessionDescription);
}

function onCreateSessionDescriptionError(error) {
  console.error("Falied to create session Description", error);
}