import logo from './logo.svg';
import './App.css';
import { items } from './data'
import { useEffect, useState } from 'react';

function App() {

  const keys = 'QWEASDZXC';

  const [displayText, setDisplayText] = useState('')
  const [isStart, setIsStart] = useState(true);
  const [currVolume, setCurrVolume] = useState(1);


  useEffect(() => {

    window.addEventListener('keypress',handleKeyPress);

    return () => {
      window.removeEventListener('keypress',handleKeyPress);
    }
  }, [currVolume,isStart])


  const handleKeyPress = (event) => {

    const name = (event.key).toUpperCase();
    const value = event.code

    if (keys.includes(name) && isStart) {
      const beat = document.getElementById(`${name}`)

      beat.volume = currVolume;

      console.log(isStart);

      const promise = beat.play();

      if (promise !== null) {
        promise.catch(() => beat.play());
      }


      const currentOBJ = items.find(item => item.key === name);
      setDisplayText(currentOBJ.text)




    }
  }


  const handleClick = (e,drumPad, id) => {


    document.getElementById(`${e.target.id}`).style.backgroundColor = 'orange';

    setTimeout(() => {
      document.getElementById(`${e.target.id}`).style.backgroundColor = 'grey';

    }, 100);


    const beat = document.getElementById(`${id}`)

    beat.volume = currVolume;

    if (isStart) {

      setDisplayText(drumPad.text);

      const promise = beat.play();

      if (promise !== null) {
        promise.catch(() => beat.play());
      }

    }


  }

  const handleVolume = (e) => {
    const audio = document.querySelector('audio');

    audio.volume = (e.target.value / 100).toFixed(1);

    setCurrVolume(Number(audio.volume));

  }

  return (
    <div className="App">
      <div id='drum-machine'>
        <div id='left_part'>
          {
            items?.map((drumPad) => (
              <div className='drum-pad'  id={drumPad.text} onClick={(e) => handleClick(e,drumPad, drumPad.key)}>
                {drumPad.key}
                <audio type='audio/mp3' className='clip' id={drumPad.key} src={drumPad.src} controls />
              </div>
            ))
          }
        </div>

        <div id='right_part'>

          <div className='power_btn_wrapper'>
            <span>Power</span>
            <div onClick={() => setIsStart((prev) => !prev)} className='btn_wrapper'>
              <div className={isStart ? 'active' : 'active off'}>

              </div>
            </div>
          </div>

          <div id='display'>
            {displayText}
          </div>

          <input type="range" min='1' max='100' className='slider' id='volume-range' onChange={handleVolume} />

          <div className='bank_btn_wrapper'>
            <span>Bank</span>
            <div className='btn_wrapper'>
              <div className='active off'>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
