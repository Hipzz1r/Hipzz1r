import "./player.css";

import { useRef, useState } from "react";
import CustomWebRTC from "../lib/webrtc";
import { useEffect } from "react";

function Player(props) {
    const localVideo = useRef();
    const videos = useRef();
    const muteButton = useRef();
    const vidButton = useRef();
    const [WebRTC, setWebRTC] = useState({});
    const peers = {};

    useEffect(() => {
        setWebRTC(new CustomWebRTC(peers, localVideo.current, videos.current, muteButton.current, vidButton.current));
        return () => WebRTC.removeLocalStream;
    }, []);

    return (
        <>
            <div id="videos" className="container" ref={videos}>
                <video id="localVideo" className="vid" autoPlay muted ref={localVideo}></video>
            </div>
            <br />
            <div style={{ display: "block" }}>
                <button id="switchButton" className="settings" onClick={WebRTC.switchMedia}>
                    Switch Camera
                </button>
                <button id="muteButton" className="settings" onClick={WebRTC.toggleMute} ref={muteButton}>
                    Unmuted
                </button>
                <button id="vidButton" className="settings" onClick={WebRTC.toggleVid} ref={vidButton}>
                    Video Enabled
                </button>
            </div>
        </>
    );
}

export default Player;
