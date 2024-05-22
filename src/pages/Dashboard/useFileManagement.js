import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectFiles, setFiles } from '../../redux/filesSlice'

export function useFileManagement() {
  const dispatch = useDispatch();
  const files = useSelector(selectFiles);

  const handleFileUpload = async (uploadedFiles) => {
    try {
      const newFiles = uploadedFiles.map((file) => ({
        id: file.id,
        url: file.url,
      }));
      dispatch(setFiles([...files, ...newFiles]));
    } catch (error) {
      console.error('Error updating files:', error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://615aa29e26d29508.mokky.dev/uploads/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setFiles(files.filter((file) => file.id !== fileId)));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return { handleFileUpload, handleDeleteFile };
}
