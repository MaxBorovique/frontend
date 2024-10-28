import { Box, TextField } from "@mui/material";
import { AddButton } from "./AddButton";
import { useState, useEffect } from "react";
import { Card } from "../types/Card";
import client from "../api/apiClient";
import { useAppDispatch } from "../utils/customHooks";
import { getOneHero } from "../store/slices/heroesSlice";

interface Props {
  hero: Card | null;
  setEditing: (prev: boolean) => void;
}

export const EditHeroForm: React.FC<Props> = ({ hero, setEditing }) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>(hero?.images || []);
  const [nickname, setNickname] = useState(hero?.nickname || '');
  const [realName, setRealName] = useState(hero?.real_name || '');
  const [originDescription, setOriginDescription] = useState(hero?.origin_description || '');
  const [superpowers, setSuperpowers] = useState(hero?.superpowers || '');
  const [catchPhrase, setCatchPhrase] = useState(hero?.catch_phrase || '');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hero) {
      setNickname(hero.nickname || '');
      setRealName(hero.real_name || '');
      setOriginDescription(hero.origin_description || '');
      setSuperpowers(hero.superpowers || '');
      setCatchPhrase(hero.catch_phrase || '');
      setExistingPhotos(hero.images || []);
    }
  }, [hero]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPhotos(Array.from(files));
    }
  };

  const validateForm = () => {
    if (!nickname.trim()) {
      setError("Nickname is required");
      return false;
    }
    if (!realName.trim()) {
      setError("Real name is required");
      return false;
    }
    if (photos.length === 0 && existingPhotos.length === 0) {
      setError("At least one image is required");
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    try {
      setError(null);
      
      if (!hero?._id) {
        setError("Hero ID is missing");
        return;
      }

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      
      const formData = new FormData();
      
      formData.append("nickname", nickname);
      formData.append("real_name", realName);
      formData.append("origin_description", originDescription);
      formData.append("superpowers", superpowers);
      formData.append("catch_phrase", catchPhrase);
      formData.append("_id", hero._id);

      
      existingPhotos.forEach((photo) => {
        formData.append("existing_images", photo);
      });
      
      photos.forEach((photo) => {
        formData.append("images", photo);
      });

      const response = await client.put(`${hero._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("Success:", response.data);
      if (hero._id) {
        dispatch(getOneHero(hero._id));
      }
      setEditing(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeHandler = () => {
    setEditing(false);
  };

  return (
    <div className="z-[5] flex justify-center items-start fixed w-full h-[100vh] backdrop-blur-md ">
      <section className="relative blur-0 z-[20] h-fit right-0 left-0 top-0 bottom-0 font-normal font-body bg-cards-bg dark:bg-dark-cards-bg w-[624px] mt-[-60px] p-6">
        <div className="flex-col items-start justify-start">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-4xl font-semibold font-title text-title dark:text-dark-title">
              Edit Hero
            </h2>
            <button 
              onClick={closeHandler} 
              className="bg-[url('/close-light.svg')] dark:bg-[url('/close-dark.svg')] w-6 h-6 bg-no-repeat bg-center bg-cover cursor-pointer"
            />
          </div>
          
          {error && (
            <div className="p-3 mb-4 text-red-500 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}
          
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
              <label className="flex items-center justify-center p-4 my-4 text-center border-2 border-gray-400 border-dashed cursor-pointer text-secondary-text dark:text-dark-secondary-text">
                Click to upload images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>

              {existingPhotos.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Existing Images:</p>
                  <div className="flex overflow-auto">
                    {existingPhotos.map((photo, index) => (
                      <img
                        key={`existing-${index}`}
                        src={`http://localhost:1000/${photo}`}
                        alt={`Existing ${index + 1}`}
                        className="object-cover w-24 h-24 m-1"
                      />
                      
                    ))}
                  </div>
                </div>
              )}
              
              {photos.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">New Images:</p>
                  <div className="flex overflow-auto">
                    {photos.map((photo, index) => (
                      <img
                        key={`new-${index}`}
                        src={URL.createObjectURL(photo)}
                        alt={`New ${index + 1}`}
                        className="object-cover w-24 h-24 m-1"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <TextField
                required
                id="nickname"
                label="Nickname"
                placeholder="SuperActor"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                error={!nickname.trim()}
                helperText={!nickname.trim() ? "Nickname is required" : ""}
              />
              <TextField
                required
                id="realName"
                label="Full name"
                placeholder="Ryan Gosling"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                error={!realName.trim()}
                helperText={!realName.trim() ? "Full name is required" : ""}
              />
            </div>

            <div className="flex flex-col gap-6 mb-6">
              <TextField
                id="superpowers"
                label="Superpowers"
                placeholder="Choosing unconventional roles, Immersing himself in roles"
                value={superpowers}
                onChange={(e) => setSuperpowers(e.target.value)}
              />
              <TextField
                id="catchPhrase"
                label="Catch phrase"
                placeholder="In code we trust"
                value={catchPhrase}
                onChange={(e) => setCatchPhrase(e.target.value)}
              />
              <TextField
                id="originDescription"
                label="Origin description"
                placeholder="Some details about the hero"
                value={originDescription}
                onChange={(e) => setOriginDescription(e.target.value)}
                multiline
                rows={4}
              />
            </div>
          </Box>
          
          <div className="flex justify-end">
            <AddButton 
              handler={submitHandler} 
              buttonText={isSubmitting ? "Updating..." : "Update Hero"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};