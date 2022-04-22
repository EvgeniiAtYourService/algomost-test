import React from 'react'
import { CityData } from '../../redux/types/weather'
import styles from './CityList.module.css'
import cn from 'classnames'

interface Props {
  listActive: boolean
  citiesData: CityData[] | null
  fetchWeather: (city: CityData) => void
  setListActive: React.Dispatch<React.SetStateAction<boolean>>
}

const CityList = ({
  listActive,
  citiesData,
  fetchWeather,
  setListActive,
}: Props): JSX.Element => {
  const handleHover = () => {
    setListActive(true)
  }
  const handleLeave = () => {
    setListActive(false)
  }
  return (
    <div
      className={cn(styles.list, { [styles.active]: listActive })}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {citiesData?.map((city) => (
        <p
          key={city.id}
          onClick={() => {
            fetchWeather(city)
            setListActive(false)
          }}
          className={styles.city}
        >
          {city.localizedName}
        </p>
      ))}
    </div>
  )
}

export default CityList
