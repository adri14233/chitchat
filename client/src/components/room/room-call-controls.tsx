import { useState } from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa';
import { BiVideo, BiVideoOff } from 'react-icons/bi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoomService from '../../services/room-service';

const roomService = new RoomService();

const RoomCallControls: React.FC<{
  toggleAudio: () => void;
  toggleVideo: () => void;
}> = ({ toggleAudio, toggleVideo }) => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [searchParams, _] = useSearchParams();

  const handleHangUp = async () => {
    const url = searchParams.get('url');

    // const finalSummary = await roomService.fecthFinalSummary(url!);

    // console.log(finalSummary);

    navigate(`/calls/summary/${url}`);
  };

  const handleMute = () => {
    toggleAudio();
    setIsMuted(!isMuted);
  };

  const handleVideoToggle = () => {
    toggleVideo();
    setIsVideoOn(!isVideoOn);
  };

  return (
    <div className="bottom-0 w-1/2 h-24 bg-background-black-call m-0 flex text-white items-center justify-center">
      <button onClick={handleMute} className="sidebar-icon">
        {isMuted ? (
          <FaMicrophoneSlash size={'20'} />
        ) : (
          <FaMicrophone size={'20'} />
        )}
      </button>
      <button
        onClick={handleHangUp}
        className="sidebar-icon bg-red-600 hover:bg-red-400 hover:text-white"
      >
        <AiFillPhone size={'25'} />
      </button>
      <button onClick={handleVideoToggle} className="sidebar-icon">
        {isVideoOn ? <BiVideoOff size={'20'} /> : <BiVideo size={'20'} />}
      </button>
    </div>
  );
};

export default RoomCallControls;
