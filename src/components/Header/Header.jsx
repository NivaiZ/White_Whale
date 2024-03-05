import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.module.css'

export default function Header() {
	return (
		<header className={styles.header__block}>
			<div className={styles.header__wrapper}>
				<div className={styles.header__logo}>
					<Link
						to='/'
						className={`${styles.banner__link} ${styles.banner__general}`}
					>
						Storage service
					</Link>
				</div>
				<nav className={styles.header__nav}>
					<ul className={styles.header__list}>
						<li className={styles.header__item}>
							<Link to={`/registration`} className={styles.header__link}>
								<button className={styles.header__registration}>
									Регистрация
								</button>
							</Link>
						</li>

						<li className={styles.header__item}>
							<Link to={`/authorization`} className={styles.header__link}>
								<button className={styles.header__authorization}>
									Авторизация
								</button>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
