"use strict";

let localVideo = document.getElementById("localVideo");
let remoteVideo1 = document.getElementById("remoteVideo1");
let remoteVideo2 = document.getElementById("remoteVideo2");
let remoteVideo3 = document.getElementById("remoteVideo3");

// WebRTC 변수
let isInitiator = false;
let isChannelReady = false;
let isStarted = false;
let localStream;
let remoteStream;
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
   // 방이 가득 찼을 때 새로운 방 생성
   room = 'room' + Math.floor(Math.random() * 1000);
   console.log('Creating new room: ' + room);
   socket.emit('create or join', room);
});

socket.on('join',room=>{
  console.log('Another peer made a request to join room' + room);
  console.log('This peer is the initiator of room' + room + '!');
  isChannelReady = true;
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
  if (!remoteStream1) {
    remoteStream1 = event.stream;
    remoteVideo1.srcObject = remoteStream1;
  } else if (!remoteStream2) {
    remoteStream2 = event.stream;
    remoteVideo2.srcObject = remoteStream2;
  } else if (!remoteStream3) {
    remoteStream3 = event.stream;
    remoteVideo3.srcObject = remoteStream3;
  }
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