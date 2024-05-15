import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api, { removeToken } from '../../api'
import Sidebar from '../../components/Sidebar/Sidebar'
import { FileCounter } from '../../components/fileCounter/fileCounter'
import { logoutUser, selectFiles, setFiles } from '../../redux/filesSlice'
import styles from './dashboard.module.css'

export default function Dashboard() {
	const dispatch = useDispatch()
	const [isActive, setIsActive] = useState(false)
	const files = useSelector(selectFiles) // Измените эту строку
	const filesLength = files ? files.length : 0
	const token = localStorage.getItem('token')

	const handleLogout = () => {
		dispatch(logoutUser())
		removeToken()
	}

	const handleLinkClick = () => {
		setIsActive(true)
	}

	const handleFileUpload = async (uploadedFiles) => {
		try {
			console.log('Uploaded Files:', uploadedFiles)
			const newFiles = uploadedFiles.map((file) => ({
				id: file.id,
				url: file.url,
			}))

			dispatch((state) => {
				const currentFiles = selectFiles(state)
				const updatedFiles = [...currentFiles, ...newFiles]
				return setFiles(updatedFiles)
			})
		} catch (error) {
			console.error('Error updating files:', error)
		}
	}

	const handleDeleteFile = async (fileId) => {
  try {
    const token = localStorage.getItem('token');

    // Проверяем существование файла и получаем информацию о нем
    const response = await axios.get(`https://615aa29e26d29508.mokky.dev/uploads/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fileToDelete = response.data;

    // Проверяем, что файл существует
    if (!fileToDelete) {
      console.error('File not found:', fileId);
      return;
    }

    // Отправляем запрос на удаление файла
    const deleteResponse = await axios.delete(`https://615aa29e26d29508.mokky.dev/uploads/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('File deleted successfully:', deleteResponse.data);

    // Обновляем состояние Redux, исключив удаленный файл
    dispatch((state) => {
      const currentFiles = selectFiles(state);
      const updatedFiles = currentFiles.filter((file) => file.id !== fileId);
      return setFiles(updatedFiles);
    });
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
	useEffect(() => {
		console.log('Files from Redux store:', files)
		const fetchData = async () => {
			try {
				const response = await api.get('https://615aa29e26d29508.mokky.dev/uploads', {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				})
				console.log('Response from server:', response.data)
				dispatch(setFiles(response.data))
			} catch (error) {
				console.error('Ошибка при получении файлов:', error)
			}
		}
		
		fetchData()
	}, [dispatch])

	console.log('Files from Redux store:', files)

	return (
		<section className={styles.dashboard__section}>
			<div className={styles.dashboard__wrapper}>
				<nav className={styles.dashboard__nav}>
					<div className={styles.dashboard__list}>
						<div className={styles.dashboard__inner}>
							<Link className={styles.dashboard__link} to={'/'}>
								<svg
									className={styles.dashboard__picture}
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 -960 960 960'
								>
									<path d='M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z' />
								</svg>
								<span className={styles.dashboard__sign}>Storage Service</span>
							</Link>
							<ul className={styles.dashboard__box}>
								<li className={styles.dashboard__item}>
									<Link className={styles.dashboard__link} to={'/'}>
										<span className={styles.dashboard__text}>Главная</span>
									</Link>
								</li>

								<li className={styles.dashboard__item}>
									<Link className={styles.dashboard__link} to={'/'}>
										<span className={styles.dashboard__text}>Профиль</span>
									</Link>
								</li>
							</ul>
						</div>

						<div className={styles.dashboard__right}>
							<Link
								className={`${styles.dashboard__link} ${isActive ? styles.dashboard__active : ''
									}`}
								onClick={handleLinkClick}
							>
								<div className={styles.dashboard__image}>
									<span className={styles.dashboard__span}>A</span>
								</div>
							</Link>

							<ul className={styles.dashboard__profile}>
								<li className={styles.dashboard__wrap}>
									<Link className={styles.dashboard__logout} to={'/'}>
										Редактировать профиль
									</Link>
								</li>

								<li className={styles.dashboard__wrap}>
									<Link
										className={styles.dashboard__logout}
										to={'/'}
										onClick={handleLogout}
									>
										Выйти
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>

			<aside className={styles.dashboard__aside}>
				<Sidebar onFileUpload={handleFileUpload} />
				<div className={styles.dashboard__uploads}>
					<FileCounter count={filesLength} />
					<ul className={styles.dashboard__flex}>
						{files && files.length > 0 ? (
							files.map((file, index) => (
								<li key={index}>
									<div className={styles.dashboard__block}>
										<img className={styles.dashboard__img} src={file.url} alt={`Image ${index}`} />
										<ul className={styles.button__list}>

											<li className={styles.button__item}>
												<button className={styles.button__delete} type='button'  onClick={() => handleDeleteFile(file.id)}>
													<svg className={styles.button__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
												</button>
											</li>

											<li className={styles.button__item}>
												<button className={styles.button__download} type='button'>
													<svg className={styles.button__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
												</button>
											</li>
										</ul>


									</div>
								</li>
							))
						) : (
							<li>Загрузите свой первый файл</li>
						)}
					</ul>
				</div>
			</aside>
		</section>
	)
}