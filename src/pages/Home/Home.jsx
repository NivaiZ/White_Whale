import styles from './home.module.css'

export default function Home() {
	return (
		<section className={styles.general}>
			<div className={styles.general__wrapper}>
				<strong className={styles.general__text}>
					Сервис для хранения фотографии
				</strong>
			</div>
			<div className={styles.general__picture}>
				<svg
					className={styles.general__svg}
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1440 320'
				>
					<path
						fill='#a2d9ff'
						fillOpacity='1'
						d='M0,96L24,106.7C48,117,96,139,144,144C192,149,240,139,288,128C336,117,384,107,432,96C480,85,528,75,576,101.3C624,128,672,192,720,218.7C768,245,816,235,864,197.3C912,160,960,96,1008,106.7C1056,117,1104,203,1152,229.3C1200,256,1248,224,1296,186.7C1344,149,1392,107,1416,85.3L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z'
					></path>
				</svg>
			</div>
		</section>
	)
}
