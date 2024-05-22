import { useDispatch, useSelector } from 'react-redux'
import { selectFileCount } from '../../../redux/filesSlice'

/**
 * здесь описываем всю модель и методы компонента, 
 * чтобы передать их в ui
 */
export const useSidebarModel = () => {
  const dispatch = useDispatch()
  const fileCount = useSelector(state => selectFileCount(state))
  

  const handleFileChange = (file) => {
    dispatch('some action to trigger handleChange')
    // либо можем просто вызвать санку напрямую отсюда
  }

  const handleFileUpload = (file) => {
    // то же, что и выше
  }

  return {
    fileCount,
    handleFileChange,
    handleFileUpload
  }
}
