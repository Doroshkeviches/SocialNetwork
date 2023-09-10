import { useState, useEffect } from 'react'
import { BsPhoneVibrate } from 'react-icons/bs'

import PeerConnection from '../utils/PeerConnection'
import socket from '../../socket'

import MainWindow from './WebRTC/MainWindow'
import CallWindow from './WebRTC/CallWindow'
import CallModal from './WebRTC/CallModal'

export default function VideoChat() {
  const [callFrom, setCallFrom] = useState('')
  const [calling, setCalling] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [localSrc, setLocalSrc] = useState(null)
  const [remoteSrc, setRemoteSrc] = useState(null)

  const [pc, setPc] = useState(null)
  const [config, setConfig] = useState(null)
  useEffect(() => {
    socket.on('request', ({ from }) => {
      setCallFrom(from)
      setShowModal(true)
    })
  }, [])

  useEffect(() => {
    if (!pc) return
    socket
      .on('call', (data) => {
        if (data.sdp) {
          pc.setRemoteDescription(data.sdp)

          if (data.sdp.type === 'offer') {
            pc.createAnswer()
          }
        } else {
          pc.addIceCandidate(data.candidate)
        }
      })
      .on('end', () => finishCall(false))
  }, [pc])

  const startCall = (isCaller, remoteId, config) => {
    setShowModal(false)
    setCalling(true)
    setConfig(config)

    const _pc = new PeerConnection(remoteId)
      .on('localStream', (stream) => {
        console.log(_pc, 'Local stateIceCond')

        setLocalSrc(stream)
      })
      .on('remoteStream', (stream) => {
        console.log(_pc, 'remote stateIceCond')

        setRemoteSrc(stream)
        setCalling(false)
      })
      .start(isCaller, config)
    console.log(_pc.getPeerConnections())
    setPc(_pc)
  }

  const rejectCall = () => {
    console.log(pc, 'rejected call stateIceCond')

    socket.emit('end', { to: callFrom })

    setShowModal(false)
  }

  const finishCall = (isCaller) => {
    console.log(pc, 'finish call call stateIceCond')

    pc.stop(isCaller)

    setPc(null)
    setConfig(null)

    setCalling(false)
    setShowModal(false)

    setLocalSrc(null)
    setRemoteSrc(null)
  }

  return (
    <div className='app'>
      <h1>React WebRTC</h1>
      <MainWindow startCall={startCall} />
      {calling && (
        <div className='calling'>
          <button disabled>
            <BsPhoneVibrate />
          </button>
        </div>
      )}
      {showModal && (
        <CallModal
          callFrom={callFrom}
          startCall={startCall}
          rejectCall={rejectCall}
        />
      )}
      {remoteSrc && (
        <CallWindow
          localSrc={localSrc}
          remoteSrc={remoteSrc}
          config={config}
          mediaDevice={pc?.mediaDevice}
          finishCall={finishCall}
        />
      )}
    </div>
  )
}