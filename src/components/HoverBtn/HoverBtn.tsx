import React from 'react'
import styles from './HoverBtn.module.css'

interface Props {
  setListActive: React.Dispatch<React.SetStateAction<boolean>>
}

const HoverBtn = ({ setListActive }: Props): JSX.Element => {
  const handleHover = () => {
    setListActive(true)
  }

  return (
    <div className={styles.chooseCity} onMouseEnter={handleHover}>
      Выберите город
    </div>
  )
}

export default HoverBtn
