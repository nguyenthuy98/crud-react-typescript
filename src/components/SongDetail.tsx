import React, { useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { Props } from "../store";
import "./../assets/style.css";

const SongDetail = (props: Props) => {
  const audioTune = new Audio(props.currentSong.music);

  useEffect(() => {
    audioTune.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSound = (): void => {
    audioTune.play();
  };

  const pauseSound = (): void => {
    audioTune.pause();
  };

  const stopSound = (): void => {
    audioTune.pause();
    audioTune.currentTime = 0;
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div>
          <b>Song Detail</b>
          <hr />
          <ul className="list-group">
            <li className="list-group-item">
              <img src={props.currentSong.avatar} alt="avatar" className="cover-avatar"/>
              <div className="list-group-button">
                <FaPauseCircle onClick={pauseSound} className="iconAction" />
                <FaPlayCircle onClick={playSound} className="iconAction" />
                <FaStopCircle onClick={stopSound} className="iconAction" />
              </div>
            </li>
            <li className="list-group-item">
              Singer: {props.currentSong.creator}
            </li>
            <li className="list-group-item">Song: {props.currentSong.title}</li>
            <li className="list-group-item">
              Download:
              <a href={props.currentSong.music}>
                <BsDownload className="downLoadButton" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
