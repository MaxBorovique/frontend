import { Box, TextField } from "@mui/material";
import { AddButton } from "./AddButton";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "../utils/customHooks";
import { getAllHeroes } from "../store/slices/heroesSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  setAdding: (prev: boolean) => void;
}

export const AddHeroForm: React.FC<Props> = ({setAdding}) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [superpowers, setSuperpowers] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  

  const submitHandler = async () => {
    const formData = new FormData();
    
    formData.append("nickname", nickname);
    formData.append("real_name", realName);
    formData.append("origin_description", originDescription);
    formData.append("superpowers", superpowers);
    formData.append("catch_phrase", catchPhrase);
    
    photos.forEach((photo) => {
      formData.append("images", photo);
    });
  
    try {
      const response = await fetch("http://localhost:1000/api/cards/", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload hero data");
      }
      
      
      const result = await response.json();
      console.log("Success:", result);
      setAdding(false);
      dispatch(getAllHeroes());

      navigate(`/cards/${result._id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const closeHandler = () => {
    setAdding(false)
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setPhotos((prevImages) => [...prevImages, ...files]);
    }
  };
  
  return (
      createPortal(
        <div className="z-[5] flex justify-center items-center fixed w-full h-[100vh] backdrop-blur-md">
          <section className="relative blur-0 z-[20] h-fit right-0 left-0 top-0 bottom-0 font-normal font-body bg-cards-bg dark:bg-dark-cards-bg w-[624px] m-auto p-6">
            <div className="flex-col items-start justify-start ">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-semibold font-title text-title dark:text-dark-title">
                  Create new hero
                </h2>
                <button onClick={closeHandler} className="bg-[url('/close-light.svg')] dark:bg-[url('/close-dark.svg')] w-6 h-6 bg-no-repeat bg-center bg-cover cursor-pointer"></button>
              </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E1DFE1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#E63C3C", 
                      },
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: '#1E1E1F',
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#CECACE",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#585558",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  },
              //  info: Dark theme
                  ".dark & .MuiTextField-root": {
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#2E2D2F",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#E63C3C", 
                      },
                    },
                  },
                  ".dark & .MuiInputBase-input": {
                    color: '#CCCBCD',
                  },
                  ".dark & .MuiInputBase-input::placeholder": {
                    color: "#4C4B4E",
                  },
                  ".dark & .MuiFormLabel-root": {
                    color: "#A3A1A5",
                  },
                }}
              >
                <div className="mb-6">
                  <label
                    className="flex items-center justify-center p-4 my-4 text-center border-2 border-gray-400 border-dashed cursor-pointer text-secondary-text dark:text-dark-secondary-text"
                  >
                    Click to upload images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                  <div className="flex overflow-auto">
                    {photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`Uploaded preview ${index + 1}`}
                        className="object-cover w-24 h-24 m-1"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center gap-4 mb-6">
                  <TextField
                    id="outlined-controlled"
                    label="Nickname"
                    placeholder="SuperActor"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    
                  />
                  <TextField
                    id="outlined-controlled"
                    label="Full name"
                    placeholder="Ryan Gosling"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-6 mb-6">
                  <TextField
                    id="outlined-controlled"
                    label="Superpowers"
                    placeholder="Choosing unconventional roles, Immersing himself in roles"
                    value={superpowers}
                    onChange={(e) => setSuperpowers(e.target.value)}
      
                  />
                  <TextField
                    id="outlined-controlled"
                    label="Catch phrase"
                    placeholder="In code we trust"
                    value={catchPhrase}
                    onChange={(e) => setCatchPhrase(e.target.value)}
                  />
                  <TextField
                    id="outlined-controlled"
                    label="Description"
                    placeholder="Write your text"
                    value={originDescription}
                    onChange={(e) => setOriginDescription(e.target.value)}
                    multiline
                    rows={4}
                  />
                </div>
              </Box>
              <div className="flex justify-end">
                <AddButton handler={submitHandler} buttonText={"Add hero"} />
              </div>
            </div>
          </section>
        </div>
          ,document.getElementById("modal-root") as HTMLElement
    ) 
  );
};
