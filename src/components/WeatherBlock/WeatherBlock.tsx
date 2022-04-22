import React from 'react'
import styles from './WeatherBlock.module.css'

interface Props {
  children: React.ReactNode
}

const WeatherBlock = ({ children }: Props): JSX.Element => {
  return <div className={styles.weatherBlock}>{children}</div>
}

export default WeatherBlock
