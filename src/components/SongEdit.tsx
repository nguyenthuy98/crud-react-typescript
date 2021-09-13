import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Props } from "../store";
import "./../assets/style.css";

const SongEdit = (props: Props) => {
  const [song, setSong] = useState({
    avatar: "",
    creator: "",
    music: "",
    title: "",
  });
  const { avatar, creator, music, title } = song;

  useEffect((): void => {
    setSong(props.currentSong);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // edit song function
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSong({ ...song, [e.target.name]: reader.result });
        }
      };
      if (e.target.files !== null) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
        setSong({ ...song, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:3000/songs/${props.currentSong.id}`,
      song
    );
    props.handleClose(null);
  };
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div>
          <b>Edit song</b>
          <hr />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <img 
                id="target" 
                src={avatar} 
                alt="cover-avatar" 
                className="cover-avatar"
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                accept="image/*"
                name="avatar"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control"
                placeholder="Enter Your Singer"
                name="creator"
                value={creator}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control"
                placeholder="Enter Your Music Link MP3"
                name="music"
                value={music}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control"
                placeholder="Enter Your Name"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button className="btn btn-warning btn-block">Update Song</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SongEdit;
