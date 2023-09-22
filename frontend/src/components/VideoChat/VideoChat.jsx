import { useState, useEffect, useRef } from 'react'
import { BsPhoneVibrate } from 'react-icons/bs'

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

  const getMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    const pc = new RTCPeerConnection()
    setLocalPc(pc)
    stream.getTracks().forEach((track) => pc.addTrack(track, stream))
    localVideo.current.srcObject = stream
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
    const pc = new RTCPeerConnection({})
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
  }, [])
  useEffect(() => {
    if (!localPC) return
    socket.on('message', async mes => {
      if (mes.data.candidate) {
        try {
          await localPC.addIceCandidate(mes.data.candidate)
        } catch (error) {
        }
      }
      if (mes.data.data?.type === 'answer') {
        const remoteDesc = new RTCSessionDescription(mes.data.data)
        console.log(remoteDesc)
        await localPC.setRemoteDescription(remoteDesc)
      }
    })
    localPC.addEventListener('connectionstatechange', event => {
      if (localPC.connectionState === 'connected') {
        console.log('WORD WORD WORD')
      }
    })
    localPC.addEventListener('track', async (event) => {
      console.log('event', event)
      remoteVideo.current.srcObject = event.streams[0]

    })
  }, [localPC])
  useEffect(() => {

    socket.on('message', mes => {
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