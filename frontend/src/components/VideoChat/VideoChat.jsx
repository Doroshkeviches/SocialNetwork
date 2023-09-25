import { useState, useEffect, useRef } from 'react'
import { BsPhoneVibrate } from 'react-icons/bs'
import freeice from 'freeice'
import PeerConnection from '../utils/PeerConnection'
import socket from '../../socket'

import MainWindow from './WebRTC/MainWindow'
import CallWindow from './WebRTC/CallWindow'
import CallModal from './WebRTC/CallModal'
import useUser from '../hooks/useUser'
export default function VideoChat() {
  const { author, avatar } = useUser()
  const [localPC, setLocalPc] = useState(null)
  const [remotePC, setRemotePC] = useState(null)
  const remoteVideo = useRef()
  const localVideo = useRef()
  let CONFIG = {}
  const start = async () => {
    const response =
      await fetch("https://edu-web-platform1.metered.live/api/v1/turn/credentials?apiKey=97196a8bbe9f292e6455b6396ab32b9224ed");
      const iceServers = await response.json();
      CONFIG.iceServers = iceServers
  }

  
  const getMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    const pc = new RTCPeerConnection(CONFIG)
    setLocalPc(pc)
    stream.getTracks().forEach((track) => pc.addTrack(track, stream))
    localVideo.current.srcObject = stream
    console.log('localStream', stream)
    const offer = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    })
    await pc.setLocalDescription(offer)


    socket.send({
      from: author,
      data: offer,
    })


    pc.addEventListener('icecandidate', event => {
      if (event.candidate) {
        socket.send({
          'candidate': event.candidate
        })
      }
    })
  }
  const remoteMedia = async (offer) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    const pc = new RTCPeerConnection(CONFIG)
    setLocalPc(pc) // can break app )
    stream.getTracks().forEach((track) => pc.addTrack(track, stream))
    localVideo.current.srcObject = stream
    await pc.setRemoteDescription(offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    socket.send({
      from: author,
      data: answer
    })

    pc.addEventListener('icecandidate', event => {
      if (event.candidate) {
        socket.send({
          candidate: event.candidate
        })
      }
    })
  }
  useEffect(() => {
    socket.emit('joinVideo', 'Room')
    start()
  }, [])
  useEffect(() => {
    if (!localPC) return
    socket.emit('messageVideo', async mes => {
      if (mes.data.candidate) {
        try {
          await localPC.addIceCandidate(mes.data.candidate)
        } catch (error) {
        }
      }
      if (mes.data.data?.type === 'answer') {
        const remoteDesc = new RTCSessionDescription(mes.data.data)
        await localPC.setRemoteDescription(remoteDesc)
      }
    })
    localPC.addEventListener('connectionstatechange', event => {
      if (localPC.connectionState === 'connected') {
        console.log('WORD WORD WORD')
      }
    })
    localPC.addEventListener('track', async (event) => {
      const [remoteStream] = event.streams
      console.log('event', remoteStream)
      remoteVideo.current.srcObject = remoteStream

    })
  }, [localPC])
  useEffect(() => {

    socket.emit('message', mes => {
      const data = mes.data
      if (data.data?.type === 'offer' && data?.from !== author) {
        remoteMedia(data.data)
      } else if (data.data?.type === 'answer' && data?.from !== author) {

      } else {
      }
    })

  }, [])

  return (
    <div className='app'>
      <h1>React WebRTC</h1>
      <button
        onClick={() => getMedia()}
      >Click</button>
      <video className='remote' ref={remoteVideo} autoPlay />
      <video
        className='local'
        ref={localVideo}
        autoPlay
        muted
      />
    </div>
  )
}