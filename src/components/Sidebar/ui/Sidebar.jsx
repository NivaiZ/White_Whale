// sidebar
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  incrementFileCount,
  selectFileCount,
  setFiles,
  addFiles
} from '../../../redux/filesSlice'
import Loader from '../../Loader/Loader'
import styles from './sidebar.module.css'
import {useSidebarModel} from '../model/useSidebarModel'

export function Sidebar({
  // onFileUpload - не нужно передавать в пропсах, чисто bll метод, используй кастомный хук useModel
}) {
  // const dispatch = useDispatch() - нужно, но выносим в кастомный хук useModel, чтобы корректно разделять bll/ui (см ниже)
  // const fileCount = useSelector(state => selectFileCount(state)) -  нужно, переносим в хук
  const inputRef = useRef(null)
  // const [uploading, setUploading] = useState(false) - не нужно, переносим в redux, т.к. юзается в разных местах

  /**
   * здесь вызываем model 
   */

  const {handleFileChange, handleFileUpload, somethingElse} = useSidebarModel()

  // этот метод нужно перенести в хук с model
  const handleFileChange = async e => {
    const file = e.target.files[0]

      /** всё, что ниже - это bll, значит быть здесь не должно
       * раз работаем с апи - выносим эту логику в санки 
       * (https://redux-toolkit.js.org/api/createAsyncThunk)
       * 
       * логику setUploading (true/false) setError(тоже надо добавить), выносим в extraReducers санки, которую создадим
       * логику сохранения файлов в идеале разбиваем на 3 экшна:
       * -- setFiles (уже есть, будет использоваться только на инициализации)
       * -- addFiles (я уже добавил)
       * -- deleteFiles (по примеру того, что я сделал с addFiles)
       */
      

    //   if (Array.isArray(response.data)) {
    //     const newFiles = response.data.map(file => ({
    //       id: file.id,
    //       url: file.url,
    //     }))

    //     dispatch(addFiles(newFiles))
    //     dispatch(incrementFileCount(newFiles.length))

    //     console.log('Файлы успешно загружены!')
    //   } else if (response.data && response.data.url) {
    //     const newFile = { id: response.data.id, url: response.data.url }

    //     dispatch(addFiles([newFile]))
    //     dispatch(incrementFileCount(1))

    //     console.log('Файл успешно загружен!')
    //   } else {
    //     console.error('Некорректный ответ от сервера:', response.data)
    //   }
    // } catch (error) {
    //   console.error('Ошибка при загрузке файла:', error)
    // } finally {
    //   setUploading(false)
    // }
  }

  /** c этим методом та же история, выносим в хук и разбиваем на ui/bll/dal, лишнее выносим из хука в апи/redux */
  const handleDrop = async e => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const file = e.dataTransfer.files[0]

      if (!file) {
        console.error('Файл не выбран')
        return
      }

      const formData = new FormData()
      formData.append('file', file)

      setUploading(true)
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'https://615aa29e26d29508.mokky.dev/uploads',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('Файл успешно загружен!')
      const newFiles = response.data.files.map(file => ({
        name: file.name,
        lastModified: file.lastModified,
        // Другие свойства файла, которые вам нужны
      }))

      dispatch(setFiles(newFiles))
      onFileUpload(response.data)
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  /**
   * в итоге выше у нас должен остаться один единственный хук, который просто обращается к model компонента, а в model лежат просто обращения к bll: селекторы, вызовы диспатчей и не больше
   * 
   * ui компонент максимально тупой, его методы отвечают за рендеринг
   * и работу с browser api 
   */

  /**
   * дублирующуюся рендер логику вынести бы в отдельный метод
   * напр:
   * 
   *   const renderLink = ({ href, name, svgType }) => {
    let svg;

    switch (svgType) {
      case 'photo':
        svg = <svg>
          some svg 
          </svg>
          break
        case 'smth':
          svg = <svg>
             some svg 
          </svg>
          break
        default:
          break;
      }
  
      return <li className={styles.sidebar__item}>
        <Link className={styles.sidebar__link} to={href}>
          <div className={styles.sidebar__group}>
            { svg }  
            <span className={styles.sidebar__name}>{name}</span>
          </div>
        </Link>
      </li>
    }
   */

  return (
    <div className={styles.sidebar__block}>
      <div
        className={styles.sidebar__file}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <form className={styles.sidebar__form} method='post'>
          <div className={styles.sidebar__box}>
            <svg
              className={styles.sidebar__svg}
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 -960 960 960'
              width='24'
            >
              <path d='M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z' />
            </svg>
            <span className={styles.sidebar__sign}>
              {uploading ? (
                <Loader />
              ) : fileCount === 1 ? (
                `Перетащите файл сюда (${fileCount}/10)`
              ) : fileCount > 10 ? (
                'Макс. 10 файлов'
              ) : (
                `Перетащите файлы сюда (${fileCount}/10)`
              )}
            </span>
          </div>
          <input
            ref={inputRef}
            className={styles.sidebar__upload}
            type='file'
            name='dashboard__file'
            id='upload__file'
            onChange={handleFileChange}
            multiple
          />
        </form>
      </div>
      <ul className={styles.sidebar__list}>
        {/* здесь просто вызываем метод рендера: */}
        {/* {renderLink()} */}
        <li className={styles.sidebar__item}>
          <Link className={styles.sidebar__link} to={'/'}>
            <div className={styles.sidebar__group}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
              >
                <path d='M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z' />
              </svg>
              <span className={styles.sidebar__name}>Файлы</span>
            </div>
          </Link>
        </li>

        <li className={styles.sidebar__item}>
          <Link className={styles.sidebar__link} to={'/'}>
            <div className={styles.sidebar__group}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
              >
                <path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z' />
              </svg>
              <span className={styles.sidebar__name}>Фото</span>
            </div>
          </Link>
        </li>

        <li className={styles.sidebar__item}>
          <Link className={styles.sidebar__link} to={'/'}>
            <div className={styles.sidebar__group}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 -960 960 960'
                width='24'
              >
                <path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z' />
              </svg>
              <span className={styles.sidebar__name}>Корзина</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}
