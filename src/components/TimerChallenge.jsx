import {useState,useRef,useEffect} from 'react';
import Result from './Result.jsx';

export default function TimerChallenge({title,targetTime}){

    const timer=useRef();
    
    const[timeRemaining,setTimeRemaining]=useState(targetTime*1000);
    const[finished,setFinished]=useState(false);
    const timerActive = timeRemaining>0 && timeRemaining<targetTime*1000;

    useEffect(() => {
        if (timeRemaining <= 0 && !finished) {
          clearInterval(timer.current);
          setFinished(true);
        }
    });

    function handleReset(){
        setTimeRemaining(targetTime*1000);
        setFinished(false);
    }

    function handleStart(){
        timer.current=setInterval(()=>{setTimeRemaining(time => time-10)},10);
    }

    function handleStop(){
        clearInterval(timer.current);
        setFinished(true);
    }
    return (<>
        {finished && <Result onReset={handleReset} targetTime={targetTime} remainingTime={timeRemaining}/>}
        <section className="challenge"> 
            <h2>{title}</h2>
            <p className="challenge-time">{targetTime} second{targetTime > 1 ? 's':''}</p>
            <p>
                <button onClick={timerActive?handleStop:handleStart}>{timerActive?'Stop':'Start'}</button>
            </p>
            <p  className={timerActive?'active':undefined}>
                {timerActive?'Timer is running..':'Click to start'}
            </p>
        </section>
        </>);
}