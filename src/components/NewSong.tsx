import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./../assets/style.css";

const NewSong = (props: any) => {
  const [song, setSong] = useState({
    avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615525268442.jpg",
    creator: "",
    music: "",
    title: "",
  });

  const { avatar, creator, music, title } = song;
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) : void => {
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
    await axios.post("http://localhost:3000/songs",song);
    props.handleClose(null);
  };
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div>
          <b>Add new song</b>
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
            <button className="btn btn-warning btn-block">Add New Song</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSong;
