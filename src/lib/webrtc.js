import { io } from "socket.io-client";
const SimplePeer = window.SimplePeer;

const REMOTE_HOST = "http://localhost:3012";

const configuration = {
    iceServers: [
        {
            urls: "stun:openrelay.metered.ca:80",
        },
        {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject",
        },
        {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject",
        },
        {
            urls: "turn:openrelay.metered.ca:443?transport=tcp",
            username: "openrelayproject",
            credential: "openrelayproject",
        },
    ],
};

let constraints = {
    audio: true,
    video: {
        width: {
            max: 300,
        },
        height: {
            max: 300,
        },
    },
};

constraints.video.facingMode = {
    ideal: "user",
};

class CustomWebRTC {
    constructor(peers, localVideo, videos, vidButton, muteButton) {
        this.peers = peers;
        this.localVideo = localVideo;
        this.videos = videos;
        this.vidButton = vidButton;
        this.muteButton = muteButton;

        // enabling the camera at startup
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                console.log("Received local stream");
                this.localVideo.srcObject = stream;
                this.localStream = stream;
                this.init();
            })
            .catch((e) => console.log(`getusermedia error ${e}`));
    }

    /**
     * initialize the socket connections
     */
    init() {
        this.socket = io(REMOTE_HOST);

        this.socket.on("initReceive", (socket_id) => {
            console.log("INIT RECEIVE " + socket_id);
            this.addPeer(socket_id, false);

            this.socket.emit("initSend", socket_id);
        });

        this.socket.on("initSend", (socket_id) => {
            console.log("INIT SEND " + socket_id);
            this.addPeer(socket_id, true);
        });

        this.socket.on("removePeer", (socket_id) => {
            console.log("removing peer " + socket_id);
            this.removePeer(socket_id);
        });

        this.socket.on("disconnect", () => {
            console.log("GOT DISCONNECTED");
            for (let socket_id in this.peers) {
                this.removePeer(socket_id);
            }
        });

        this.socket.on("signal", (data) => {
            this.peers[data.socket_id].signal(data.signal);
        });
    }

    /**
     * Remove a peer with given socket_id.
     * Removes the video element and deletes the connection
     * @param {String} socket_id
     */
    removePeer(socket_id) {
        let videoEl = document.getElementById(socket_id);
        if (videoEl) {
            const tracks = videoEl.srcObject.getTracks();

            tracks.forEach((track) => {
                track.stop();
            });

            videoEl.srcObject = null;
            videoEl.parentNode.removeChild(videoEl);
        }
        if (this.peers[socket_id]) this.peers[socket_id].destroy();
        delete this.peers[socket_id];
    }

    /**
     * Creates a new peer connection and sets the event listeners
     * @param {String} socket_id
     *                 ID of the peer
     * @param {Boolean} am_initiator
     *                  Set to true if the peer initiates the connection process.
     *                  Set to false if the peer receives the connection.
     */
    addPeer(socket_id, am_initiator) {
        this.peers[socket_id] = new SimplePeer({
            initiator: am_initiator,
            stream: this.localStream,
            config: configuration,
        });
        console.log(socket_id);
        this.peers[socket_id].on("signal", (data) => {
            this.socket.emit("signal", {
                signal: data,
                socket_id: socket_id,
            });
        });

        this.peers[socket_id].on("stream", (stream) => {
            console.log(this.videos);
            let newVid = document.createElement("video");
            newVid.srcObject = stream;
            newVid.id = socket_id;
            newVid.playsinline = false;
            newVid.autoplay = true;
            newVid.className = "vid";
            newVid.onclick = () => this.openPictureMode(newVid);
            newVid.ontouchstart = (e) => this.openPictureMode(newVid);
            this.videos.appendChild(newVid);
        });
    }

    /**
     * Opens an element in Picture-in-Picture mode
     * @param {HTMLVideoElement} el video element to put in pip mode
     */
    openPictureMode = (el) => {
        console.log("opening pip");
        el.requestPictureInPicture();
    };

    /**
     * Switches the camera between user and environment. It will just enable the camera 2 cameras not supported.
     */
    switchMedia = () => {
        if (constraints.video.facingMode.ideal === "user") {
            constraints.video.facingMode.ideal = "environment";
        } else {
            constraints.video.facingMode.ideal = "user";
        }

        const tracks = this.localStream.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        this.localVideo.srcObject = null;
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            for (let socket_id in this.peers) {
                for (let index in this.peers[socket_id].streams[0].getTracks()) {
                    for (let index2 in stream.getTracks()) {
                        if (
                            this.peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind
                        ) {
                            this.peers[socket_id].replaceTrack(
                                this.peers[socket_id].streams[0].getTracks()[index],
                                stream.getTracks()[index2],
                                this.peers[socket_id].streams[0]
                            );
                            break;
                        }
                    }
                }
            }

            this.localStream = stream;
            this.localVideo.srcObject = stream;

            this.updateButtons();
        });
    };

    setScreen() {
        navigator.mediaDevices.getDisplayMedia().then((stream) => {
            for (let socket_id in this.peers) {
                for (let index in this.peers[socket_id].streams[0].getTracks()) {
                    for (let index2 in stream.getTracks()) {
                        if (
                            this.peers[socket_id].streams[0].getTracks()[index].kind === stream.getTracks()[index2].kind
                        ) {
                            this.peers[socket_id].replaceTrack(
                                this.peers[socket_id].streams[0].getTracks()[index],
                                stream.getTracks()[index2],
                                this.peers[socket_id].streams[0]
                            );
                            break;
                        }
                    }
                }
            }
            this.localStream = stream;

            this.localVideo.srcObject = this.localStream;
            this.socket.emit("removeUpdatePeer", "");
        });
        this.updateButtons();
    }

    /**
     * Disables and removes the local stream and all the connections to other this.peers.
     */
    removeLocalStream() {
        if (this.localStream) {
            const tracks = this.localStream.getTracks();

            tracks.forEach((track) => {
                track.stop();
            });

            this.localVideo.srcObject = null;
        }

        for (let socket_id in this.peers) {
            this.removePeer(socket_id);
        }
    }

    /**
     * Enable/disable microphone
     */
    toggleMute() {
        for (let index in this.localStream.getAudioTracks()) {
            this.localStream.getAudioTracks()[index].enabled = !this.localStream.getAudioTracks()[index].enabled;
            this.muteButton.innerText = this.localStream.getAudioTracks()[index].enabled ? "Unmuted" : "Muted";
        }
    }

    /**
     * Enable/disable video
     */
    toggleVid() {
        for (let index in this.localStream.getVideoTracks()) {
            this.localStream.getVideoTracks()[index].enabled = !this.localStream.getVideoTracks()[index].enabled;
            this.vidButton.innerText = this.localStream.getVideoTracks()[index].enabled
                ? "Video Enabled"
                : "Video Disabled";
        }
    }

    /**
     * updating text of buttons
     */
    updateButtons() {
        for (let index in this.localStream.getVideoTracks()) {
            this.vidButton.innerText = this.localStream.getVideoTracks()[index].enabled
                ? "Video Enabled"
                : "Video Disabled";
        }
        for (let index in this.localStream.getAudioTracks()) {
            this.muteButton.innerText = this.localStream.getAudioTracks()[index].enabled ? "Unmuted" : "Muted";
        }
    }
}

export default CustomWebRTC;
