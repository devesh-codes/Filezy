// src/utils/api.js
import axios from 'axios';

export const uploadFile = async (formData, setProgress) => {
  return axios.post("http://localhost:5000/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      const progress = Math.round((event.loaded * 100) / event.total);
      setProgress(progress);
    }
  });
};
