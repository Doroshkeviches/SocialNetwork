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
  const CONFIG = {
    iseServers: [{ url: 'stun:stun01.sipphone.com' },
    { url: 'stun:stun.ekiga.net' },
    { url: 'stun:stun.fwdnet.net' },
    { url: 'stun:stun.ideasip.com' },
    { url: 'stun:stun.iptel.org' },
    { url: 'stun:stun.rixtelecom.se' },
    { url: 'stun:stun.schlund.de' },
    { url: 'stun:stun.l.google.com:19302' },
    { url: 'stun:stun1.l.google.com:19302' },
    { url: 'stun:stun2.l.google.com:19302' },
    { url: 'stun:stun3.l.google.com:19302' },
    { url: 'stun:stun4.l.google.com:19302' },
    { url: 'stun:stunserver.org' },
    { url: 'stun:stun.softjoys.com' },
    { url: 'stun:stun.voiparound.com' },
    { url: 'stun:stun.voipbuster.com' },
    { url: 'stun:stun.voipstunt.com' },
    { url: 'stun:stun.voxgratia.org' },
    { url: 'stun:stun.xten.com' },
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
    },
    {
      url: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
    },
    {
      url: 'turn:192.158.29.39:3478?transport=tcp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
    }]
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