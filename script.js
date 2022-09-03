
function App(){ 
    const [breakLength, setBreakLength] = React.useState(5) 
    const [sessionLength, setSessionLength] = React.useState(25) 
    const[play, setPlay] = React.useState(false) 
    const [timingType, setTimingType] = React.useState('SESSION') 
    const [timeLeft, setTimeLeft] = React.useState(1500) 


    const timeout = setTimeout(() => {
        if(timeLeft && play){
            setTimeLeft(timeLeft - 1)
        }
    }, 1000) 

    function handleBreakIncrement(){
        if(breakLength < 60){
            setBreakLength(breakLength + 1)
        }
    } 
    function handleBreakDecrement(){
        if(breakLength > 1){
            setBreakLength(breakLength - 1)
        }
    }  
    function handleSessionIncrement(){
        if(sessionLength < 60){
            setSessionLength(sessionLength + 1) 
            setTimeLeft(timeLeft + 60)
        }
    } 
    function handleSessionDecrement(){ 
        if(sessionLength > 1){
            setSessionLength(sessionLength - 1) 
            setTimeLeft(timeLeft - 60)
        }

    } 
    const title = timingType === 'SESSION' ? 'Session' : 'Break' 
    function timeFormater(){
        let minutes = Math.floor(timeLeft / 60) 
        let seconds = timeLeft - minutes * 60 
        let formatedSeconds = seconds < 10 ? '0' + seconds : seconds 
        let formatedMinutes = minutes < 10 ? '0' + minutes : minutes 

        return `${formatedMinutes}:${formatedSeconds}`
    } 
    
    function handlePlay(){
        clearTimeout(timeout) 
        setPlay(!play)
    } 
    function resetTimer(){
        let audio = document.getElementById('beep') 
        if(!timeLeft && timingType === 'SESSION'){
            setTimeLeft(breakLength * 60) 
            setTimingType("BREAK") 
            audio.play()
        } 
        if(!timeLeft && timingType === 'BREAK'){
            setTimeLeft(sessionLength * 60) 
            setTimingType('SESSION') 
            audio.pause() 
            audio.currentTime = 0
        }
    }
    function clock(){
        if(play){
            timeout 
            resetTimer()
        } else {
            clearTimeout(timeout)
        }
    } 
    function handleReset(){
        clearTimeout(timeout) 
        setPlay(false) 
        setTimeLeft(1500) 
        setBreakLength(5) 
        setSessionLength(25) 
        setTimingType("SESSION") 
        const audio = document.getElementById("beep") 
        audio.pause() 
        audio.currentTime = 0;
    }

    React.useEffect(() => {
        clock()
    }, [play, timeLeft, timeout])


    
    return (
    <div className="container">
       <h1 className="display-1 text-center">25 + 5 Clock</h1> 
    
    
       <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body ">
              <h5 className="card-header text-center" id="break-label">Break Length</h5> 
              <div className="card-length">
             
              <button disabled={play} className="btn btn-primary" id="break-increment" onClick={handleBreakIncrement}>+</button> 
              <p className="card-text break-text" id="break-length">{breakLength}</p> 
              <button disabled={play} className="btn btn-primary" id="break-decrement" onClick={handleBreakDecrement}>-</button> 
              </div>
              
            </div>
          </div>
          </div>
          <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-header text-center" id="session-label" >Session Length</h5>
              <div className="card-length">
              <button disabled={play} className="btn btn-primary" id="session-increment" onClick={handleSessionIncrement}>+</button> 
              <p className="card-text break-text" id="session-length">{sessionLength}</p>
              <button disabled={play} className="btn btn-primary" id="session-decrement" onClick={handleSessionDecrement}>-</button>  
              </div>
              
            </div>
          </div>
        </div>
      </div> 
      <div className="card text-center col-sm-6 m-4" > 
        <div className="card-body">
          <h5 className="card-header" id="timer-label">{title}</h5>
          <p className="card-text" id="time-left">{timeFormater()}</p> 
          <button className="btn btn-primary" id="start_stop" onClick={handlePlay}>Start/Stop</button> 
          <button className="btn btn-primary" id="reset" onClick={handleReset}>Reset</button> 
         
        </div>

      </div> 
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
    </div>
    )
} 
ReactDOM.render(<App/>, document.getElementById('app'))