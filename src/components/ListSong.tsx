/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FunctionComponent } from "react";
import axios from "axios";
import SongDetail from "./SongDetail";
import SongEdit from "./SongEdit";
import NewSong from "./NewSong";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { Song } from "../store";
import "./../assets/style.css";

const ListSongs: FunctionComponent = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [song, setSong] = useState<Song>({
    id: 0,
    avatar: '',
    creator: '',
    music: '',
    title: ''
  });
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isAddNew, setAddNew] = useState<boolean>(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const togglePopup = (id: any) => {
    setOpenPopup(!openPopup);
    if (id !== null) {
      setSong(songs.filter(el => el.id === id)[0]);
    } else {
      loadSongs();
    }
  };

  const viewDetail = (id: any) => {
    setEdit(false);
    setAddNew(false);
    togglePopup(id);
  }

  const loadSongs = async () => {
    const result = await axios.get("http://localhost:3000/songs");
    setSongs(result.data);
  };

  const deleteSong = async (id: any) => {
    await axios.delete(`http://localhost:3000/songs/${id}`);
    loadSongs();
  };

  const editSong = (id: any) => {
    setEdit(true);
    setAddNew(false);
    togglePopup(id);
  };

  const addSong = () => {
    setAddNew(true);
    setEdit(false);
    setOpenPopup(!openPopup);
  };

  return (
    <div className="container">
      <div className="add-item-area">
        <GrAdd 
          className="add-song"
          onClick={() => addSong()}
        />
      </div>
      <div className="py-4">
        <h3>‎Top 100: South Korea on Apple Music</h3>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <td>#</td>
              <td>Cover Image</td>
              <td>Song</td>
              <td>Artist</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.id}</td>
                <td>
                  <img
                    src={song.avatar}
                    alt="avatar"
                    width="50%"
                    className="cover-avatar"
                    onClick={() => viewDetail(song.id)}
                  />
                </td>
                <td onClick={() => viewDetail(song.id)}>{song.title}</td>
                <td>{song.creator}</td>
                <td>
                  <AiTwotoneEdit
                    className="action-button"
                    onClick={() => editSong(song.id)}
                  />
                  <RiDeleteBin6Fill
                    className="action-button"
                    onClick={() => deleteSong(song.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openPopup && !isEdit && !isAddNew  && (
          <SongDetail
            currentSong={song}
            handleClose={togglePopup}
          />
        )}
        {
          openPopup && isEdit && !isAddNew && (
            <SongEdit
              currentSong={song}
              handleClose={togglePopup}
            />
          )
        }
        {
          openPopup && isAddNew && !isEdit && (
            <NewSong handleClose={togglePopup} />
          )
        }
      </div>
    </div>
  );
};
export default ListSongs;
