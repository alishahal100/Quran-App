import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Surah.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Surah() {
  const [surah, setSurah] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://api.alquran.cloud/v1/surah').then((response)=>{
      setSurah(response.data.data)
      console.log(response.data)
    })
  }, [])

  const handleSurahClick = (surahNumber) => {
    dispatch({ type: 'SELECT_SURAH', payload: surahNumber })
    console.log(surahNumber);
    navigate('/pages')
  }

  return ( 
    <div>
      <div className="qur-con">
        {surah &&
          Array.isArray(surah) &&
          surah.map((obj, index) => {
            return (
              <div className="surahs" key={index} onClick={() => handleSurahClick(obj.number)}>
                <div className="left">
                  <div className='surah-num'>
                    <h3 className='surah-objnum'>{obj.number}</h3>
                  </div>
                  <div className='surah-name'>
                    <h3>{obj.englishName}</h3>
                    <h3 className='surah-engtran'>{obj.englishNameTranslation}</h3>
                  </div>
                </div>
                <div className="right">
                  <h3>{obj.name}</h3>
                  <h3 className='surah-ayah'>{obj.numberOfAyahs} ayahs</h3>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export default Surah
