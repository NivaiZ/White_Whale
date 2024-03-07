import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeToken } from '../../api'
import Sidebar from '../../components/Sidebar/Sidebar'
import { logoutUser, selectFiles, setFiles } from '../../redux/filesSlice'
import styles from './dashboard.module.css'

export default function Dashboard() {
	const dispatch = useDispatch()
	const [isActive, setIsActive] = useState(false)
	const files = useSelector(selectFiles); // Измените эту строку
	const filesLength = files ? files.length : 0

	const handleLogout = () => {
		dispatch(logoutUser())
		removeToken()
	}

	const handleLinkClick = () => {
		setIsActive(true)
	}

	const handleFileUpload = (uploadedFiles) => {
		console.log('Uploaded Files:', uploadedFiles);
	
		const newFiles = uploadedFiles.map(file => ({
			id: file.id,
			url: file.url,
			// Другие свойства файла, которые могут быть полезными
		}));
	
		dispatch(setFiles([...files, ...newFiles])); // Обновите также строку с setFiles
	};

	useEffect(() => {
		console.log('Files from Redux store:', files); // Добавьте эту строку
	
		const fetchData = async () => {
			try {
				const response = await axios.get('https://615aa29e26d29508.mokky.dev/uploads');
				console.log('Response from server:', response.data);
				dispatch(setFiles(response.data));
			} catch (error) {
				console.error('Ошибка при получении файлов:', error);
			}
		};
	
		fetchData();
	}, [dispatch]);

	console.log('Files from Redux store:', files) // Добавим эту строку для отладки

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
					<ul className={styles.dashboard__flex}>
						{files && files.length > 0 ? (
							files.map((file, index) => (
								<li key={index}>
									<div className={styles.dashboard__block}>
										<img className={styles.dashboard__img} src={file.url} alt={`Image ${index}`} />
									</div>
								</li>
							))
						) : (
							<li>No files available</li>
						)}
					</ul>
				</div>
			</aside>
		</section>
	)
}