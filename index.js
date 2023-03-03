import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";


const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
}

const KeyboardKey = ({ play, deactivateAudio, sound: { id, key, url, keyCode } }) => {
    const handleKeydown = (e) => {
      if(keyCode === e.keyCode) {
        const audio = document.getElementById(key);
        play(key, id);
        deactivateAudio(audio)
      }
    }
    
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
    }, [])
  
    return (
      <button value="test" id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
        <audio className="clip" src={url} id={key} />
        {key}
      </button>
    );
  }
  
  const Keyboard = ({ sounds, play, power, deactivateAudio }) =>  (
    <div className="keyboard">
      {power 
        ? sounds.map((sound) => <KeyboardKey sound={sound} play={play} deactivateAudio={deactivateAudio} />)
        : sounds.map((sound) => <KeyboardKey sound={{...sound, url: "#" }} play={play} deactivateAudio={deactivateAudio} />)        
      }
    </div>
  );
  
  const DumControle = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
    <div className="controle">
      <button onClick={stop}>Turn Power {power ? 'OFF' : 'ON'}</button>
      <h2>Volume: %{Math.round(volume * 100)}</h2>
      <input
        max="1"
        min="0"
        step='0.01'
        type="range"
        value={volume}
        onChange={handleVolumeChange}
        />
      <h2 id="display" >{name}</h2>
      <button onClick={changeSoundGroup}>Change Sounds Group</button>
    </div>
  );

  const changeSoundGroup = () => {
    setSoundName("")
    if(soundType === "heaterKit"){
        setSoundType("smoothPianoKit");
        setSounds(soundsGroup.smoothPianoKit);
    } else {
        setSoundType("heaterKit");
        setSounds(soundsGroup.heaterKit);
    }
  }

  return (
    <div id="drum-machine">
      {setKeyVolume()}
      <div className="wrapper"></div>
      changeSoundGroup={changeSoundGroup}
          handleVolumeChange={handleVolumeChange} 
      </div>
    )


  ReactDOM.render(<App />, document.querySelector("#app"))
