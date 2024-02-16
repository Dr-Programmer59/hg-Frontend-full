import { Device } from "mediasoup-client"


export default class webrtcMediaSoup_client{

    constructor(socket){

        this.socket=socket
        this.device
        this.roomName;
        this.rtpCapabilities
        this.producerTransport
        this.consumerTransports = []
        this.audioProducer
        this.videoProducer
        this.consumer
        this.isProducer = false
        this.mystream=null
        this.mainTracks=[]
        this.params = {
            // mediasoup params
            encodings: [
              {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S1T3',
              },
            ],
            // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
            codecOptions: {
              videoGoogleStartBitrate: 1000
            }
          }
          
          this.audioParams;
          this.consumingTransports = [];

          this.videoParams = {
            // mediasoup params
            encodings: [
              {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S1T3',
              },
              {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S1T3',
              },
            ],
            // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
            codecOptions: {
              videoGoogleStartBitrate: 1000
            }
          }
          this.signalNewConsumerTransport=this.signalNewConsumerTransport.bind(this)
          this.connectRecvTransport=this.connectRecvTransport.bind(this)
          // this.signalNewConsumerTransport=this.signalNewConsumerTransport.bind(this)
          
    }
    joinRoom () {

      
      this.socket.emit('joinRoom', { roomName:this.roomName }, (data) => {
        console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
        // we assign to local variable and will be used when
        // loading the client Device (see createDevice above)
        this.rtpCapabilities = data.rtpCapabilities
        
        // once we have rtpCapabilities from the Router, create Device
        this.createDevice()
      })
    }
    


   
  
    
    // A device is an endpoint connecting to a Router on the
    // server side to send/recive media
    async createDevice  () {
      try {
        this.device = new Device()
    
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
        // Loads the device with RTP capabilities of the Router (server side)
        await this.device.load({
          // see getRtpCapabilities() below
          routerRtpCapabilities: this.rtpCapabilities
        })
    
        console.log('Device RTP Capabilities', this.device.rtpCapabilities)
    
        // once the device loads, create transport
        this.socket.emit('getProducers', producerIds => {
          console.log(producerIds)
          // for each of the producer create a consumer
          // producerIds.forEach(id => signalNewConsumerTransport(id))
          console.log("these are producers ",producerIds)
          producerIds.forEach(id => this.signalNewConsumerTransport(id))
         

        })
    
      } catch (error) {
        console.log(error)
        if (error.name === 'UnsupportedError')
          console.warn('browser not supported')
      }
    }
    
   
    
    
   async signalNewConsumerTransport (remoteProducerId){
      //check if we are already consuming the remoteProducerId
      console.log("in signal new constumertranspoer")
      if (this.consumingTransports.includes(remoteProducerId)) return;
      this.consumingTransports.push(remoteProducerId);
    
      await this.socket.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
        // The server sends back params needed 
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error)
          return
        }
        console.log(`PARAMS... ${params}`)
    
        let consumerTransport
        try {
          consumerTransport = this.device.createRecvTransport({...params,iceServers : [ {
            'urls' : 'stun:stun1.l.google.com:19302'
          }]})
        } catch (error) {
          // exceptions: 
          // {InvalidStateError} if not loaded
          // {TypeError} if wrong arguments.
          console.log(error)
          return
        }
    
        consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
          try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-recv-connect', ...)
            await this.socket.emit('transport-recv-connect', {
              dtlsParameters,
              serverConsumerTransportId: params.id,
            })
    
            // Tell the transport that parameters were transmitted.
            callback()
          } catch (error) {
            // Tell the transport that something was wrong
            errback(error)
          }
        })
    
        this.connectRecvTransport(consumerTransport, remoteProducerId, params.id)
      })
    }
    
    
    
    
    
    // server informs the client of a new producer just joined
    
    getProducers() {
      this.socket.emit('getProducers', producerIds => {
        console.log("this is producer ",producerIds)
        // for each of the producer create a consumer
        producerIds.forEach(id => signalNewConsumerTransport(id))
    
      })
    }
    
    async connectRecvTransport (consumerTransport, remoteProducerId, serverConsumerTransportId){
      // for consumer, we need to tell the server first
      // to create a consumer based on the rtpCapabilities and consume
      // if the router can consume, it will send back a set of params as below
      console.log("in comsunem")
      await this.socket.emit('consume', {
        rtpCapabilities: this.device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      }, async ({ params }) => {
        if (params.error) {
          console.log('Cannot Consume')
          return
        }
    
        console.log(`Consumer Params ${params}`)
        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters
        })
    
        this.consumerTransports = [
          ...this.consumerTransports,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer,
          },
        ]
    
        // create a new div element for the new consumer media
        
        // destructure and retrieve the video track from the producer
       
        const { track } = consumer

        console.log("track " ,track ," producer id ",remoteProducerId)
        let trackreq=new MediaStream([track])
        this.mainTracks.push(trackreq)

        // document.getElementById(remoteProducerId).srcObject = new MediaStream([track])
        console.log("this is track",track)
        // the server consumer started with media paused
        // so we need to inform the server to resume
        this.socket.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
      })
    }
    

}


