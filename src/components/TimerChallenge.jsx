import { useRef, useState } from "react"
import ResultModal from "./ResultModal.jsx";


export default function TimerChallenge({title,targetTime}){

    const dialog= useRef();
    const timer= useRef();
    const[timeRemaning, setTimeRemaning]= useState(targetTime*1000);

 const timeIsActive= timeRemaning>0 && timeRemaning<targetTime*1000;
   function handleStart(){
   timer.current = setInterval(()=>{
       setTimeRemaning(prevTimeRemaning => prevTimeRemaning-10);
    }, 10)
   }
   if(timeRemaning<=0){
    clearInterval(timer.current);
    
    dialog.current.open();
   }
   function handleReset(){
    setTimeRemaning(targetTime*1000);
   }
   function handleStop(){
    clearInterval(timer.current);
    dialog.current.open();
   }
  return(
    <>
     <ResultModal ref={dialog} targetTime={targetTime} remaningTime={timeRemaning} onReset={handleReset}/>
    <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
            {targetTime} second{targetTime>1?'s':''}
        </p>
        <p>
            <button onClick={timeIsActive? handleStop : handleStart}>
                {timeIsActive ? 'Stop' : 'Start'}
            </button>
        </p>
        <p className={timeIsActive?"active":undefined}>
           {timeIsActive? 'time is runing...': 'Timer Inactive'}
        </p>

    </section>
    </>
  )
}