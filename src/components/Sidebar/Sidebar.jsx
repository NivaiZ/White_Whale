import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../../api'
import { setFiles } from '../../redux/actions'
import styles from './sidebar.module.css'

export default function Sidebar({ onFileUpload }) {
	const dispatch = useDispatch() // Получаем функцию dispatch из хука
	const files = useSelector(state => state.files) // Получаем массив файлов из стейта

	const [selectedFile, setSelectedFile] = useState(null)
	const [uploading, setUploading] = useState(false)

	const handleFileChange = e => {
		console.log('File selected:', e.target.files[0])
		const file = e.target.files[0]
		setSelectedFile(file)
		setUploading(false)
	}

	// Обработчик загрузки файла
	const handleFileUpload = async () => {
		console.log('Uploading file...')
		if (!selectedFile) {
			console.error('Файл не выбран')
			return
		}

		try {
			const formData = new FormData()
			formData.append('file', selectedFile)
			console.log('FormData:', formData)
			setUploading(true)

			const response = await api.post('/api/media/upload', formData)

			console.log('Файл успешно загружен!')
			dispatch(setFiles(response.data.files))
			// Передаем информацию о загруженном файле в Dashboard
			onFileUpload(response.data)
		} catch (error) {
			console.error('Ошибка при загрузке файла:', error)
			// Добавьте более детальную обработку ошибок
		} finally {
			setUploading(false)
		}
	}

	return (
		<div className={styles.sidebar__block}>
			<div className={styles.sidebar__file}>
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
							{selectedFile ? selectedFile.name : 'Загрузить файл'}
						</span>
					</div>
					<input
						className={styles.sidebar__upload}
						type='file'
						name='dashboard__file'
						id='upload__file'
						onChange={handleFileChange}
						multiple
						// accept='.jpg, .jpeg, .png, .gif' // Пример ограничения на типы файлов
					/>
				</form>
				{selectedFile && (
					<button
						className={styles.sidebar__uploadButton}
						type='button'
						onClick={handleFileUpload}
						disabled={uploading}
					>
						{uploading ? 'Загрузка...' : 'Загрузить'}
					</button>
				)}
			</div>

			<ul className={styles.sidebar__list}>
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
