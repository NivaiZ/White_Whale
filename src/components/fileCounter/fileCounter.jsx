import React from 'react'
import styles from './filecounter.module.css'

export function FileCounter ({count}) {
	return (
		<div className={styles.fileCounter}>
      Загружено файлов: {count}
    </div>
	)
}