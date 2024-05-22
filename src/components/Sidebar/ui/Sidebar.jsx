import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectFileCount } from '../../../redux/filesSlice'
import Loader from '../../Loader/Loader'
import { useSidebarModel } from '../model/useSidebarModel'
import styles from './sidebar.module.css'

export function Sidebar() {
  const inputRef = useRef(null)
  const fileCount = useSelector(selectFileCount)
  const { handleFileChange, handleDrop, handleDragOver, uploading } = useSidebarModel(inputRef)

  const renderLink = ({ href, name, svgType }) => {
    let svg
    switch (svgType) {
      case 'photo':
        svg = <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 -960 960 960'
          width='24'
        >
          <path d='M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z' />
        </svg>
        break
      case 'files':
        svg = <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 -960 960 960'
          width='24'
        >
          <path d='M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z' />
        </svg>
        break
      case 'trash':
        svg = <svg
          xmlns='http://www.w3.org/2000/svg'
          height='24'
          viewBox='0 -960 960 960'
          width='24'
        >
          <path d='M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z' />
        </svg>
    }
    return (
      <li className={styles.sidebar__item}>
        <Link className={styles.sidebar__link} to={href}>
          <div className={styles.sidebar__group}>
            {svg}
            <span className={styles.sidebar__name}>{name}</span>
          </div>
        </Link>
      </li>
    )
  }

  return (
    <div className={styles.sidebar__block}>
      <div className={styles.sidebar__file} onDrop={handleDrop} onDragOver={handleDragOver}>
        <form className={styles.sidebar__form} method='post'>
          <div className={styles.sidebar__box}>
            <svg className={styles.sidebar__svg} xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'>
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
        {renderLink({ href: '/', name: 'Файлы', svgType: 'files' })}
        {renderLink({ href: '/', name: 'Фото', svgType: 'photo' })}
        {renderLink({ href: '/', name: 'Корзина', svgType: 'trash' })}
      </ul>
    </div>
  )
}
