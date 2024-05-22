import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFiles, incrementFileCount } from '../../../redux/filesSlice'

export function useSidebarModel(inputRef) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await axios.post('https://615aa29e26d29508.mokky.dev/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data && response.data.id) {
        const newFile = {
          id: response.data.id,
          url: response.data.url,
        };
        dispatch(addFiles([newFile]));
        dispatch(incrementFileCount(1));
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    handleFileChange,
    handleDrop,
    handleDragOver,
    uploading,
  };
}
