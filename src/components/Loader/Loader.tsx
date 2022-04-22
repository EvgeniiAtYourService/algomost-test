import React from 'react'
import styles from './Loader.module.css'

interface Props {
  isOn?: boolean
}

const Loader = ({ isOn }: Props): JSX.Element => {
  if (isOn) {
    return <div className={styles.loader}></div>
  }
  return <span></span>
}

export default Loader
