import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect,useRef } from 'react';
import './Pages.css'
import {BiPlay,BiRefresh} from 'react-icons/bi'
function Pages() {
  
  const selectedSurah = useSelector((state) => state.surah.selectedSurah);
   const [surahData, setSurahData] = useState(null);
  const [translationData, setTranslationData] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startOverVisible, setStartOverVisible] = useState(false);

  const audioRef = useRef(null);
  if (selectedSurah) {
    // `selectedSurah` has a value of `selectedSurah`
    console.log("selectedSurah has a value:", selectedSurah);
  } else {
    // `selectedSurah` is either null, undefined, or falsy
    console.log("selectedSurah is empty or falsy.");
  }

  useEffect(() => {
    if (selectedSurah ) {
      axios.get(`http://api.alquran.cloud/v1/surah/${selectedSurah}`).then((response) => {
        setSurahData(response.data.data);
      });

      axios.get(`http://api.alquran.cloud/v1/surah/${selectedSurah}/en.ahmedraza`).then((response) => {
        setTranslationData(response.data.data);
      });
      axios
        .get(`https://api.quran.com/api/v4/chapter_recitations/2/${selectedSurah}`)
        .then((response) => {
          const audioData = response.data;
          if (audioData && audioData.audio_file && audioData.audio_file.audio_url) {
            const audioUrl = audioData.audio_file.audio_url;
            setAudioUrl(audioUrl);
          }
        })
        .catch((error) => {
          console.error('Error fetching audio data:', error);
          // Handle error fetching audio data (e.g., show error message)
        });
    }
  }, [selectedSurah]);
  
  
  const handleAudioToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioUrl) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setStartOverVisible(true);
        }).catch((error) => {
          console.error('Error playing audio:', error);
          // Handle error playing audio (e.g., show error message)
        });
      }
    }
  };

  const handleStartOver = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  

  return (
    <div style={{ width: "100%", minHeight: "750px", background: "#1f2125" }}>
            

      {surahData && translationData && (
        <div style={{ width: "100%", background: "#1f2125", color: "white", margin: "0" }}>
          <nav style={{ height: "15vh", background: "#1f2125", width: "100%", position: "fixed", top: 0, marginBottom: "10px" }}>
         
            <h1>{surahData.name}</h1>
            <button className='audio-btn' onClick={handleAudioToggle} disabled={!audioUrl}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer", justifyContent: "end" }}>
                {isPlaying ? 'Stop Audio' : 'Play Audio'}
                <BiPlay size={26} style={{ marginRight: '10px', color: '#2ca4ab' }} />
              </div>
            </button>
            {isPlaying && (
              <button className='audio-btn' onClick={handleStartOver}>
                <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer", justifyContent: "end" }}>

                Start Over <BiRefresh size={23} style={{ marginLeft: '10px', color: '#2ca4ab' }} />
                </div>
              </button>
            )}
      
          </nav>
          <div style={{ paddingTop: '15vh' }}>
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
            {surahData.ayahs.map((ayah, index) => (
              <div key={ayah.number} className='ayah-body'>
                <p className='surah-verse-number'>{selectedSurah} : {ayah.numberInSurah} </p>
                <div className='ayah-arab'>
                  <p>{ayah.text}</p>
                </div>
                <div className='ayah-translation'>
                  {translationData.ayahs && translationData.ayahs[index] && (
                    <p>{translationData.ayahs[index].text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  
}



export default  Pages;
