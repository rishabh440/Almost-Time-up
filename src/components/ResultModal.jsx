import { forwardRef, useRef , useImperativeHandle} from "react";
 const ResultModal= forwardRef(function ResultModal({targetTime,remaningTime, onReset }, ref){

    const userlost= (remaningTime<=0);
    const formatedTimeRemaning= (remaningTime / 1000).toFixed(2);
    const score= Math.round((1-remaningTime/(targetTime*1000))*100);
    const dialog= useRef();
    useImperativeHandle(ref, ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })
    return(
        <dialog ref={dialog} className="result-modal" onClose={onReset} >
        {userlost &&<h2> You Lost </h2>}
        {!userlost && <h2>Your Score:{score}</h2>}
        <p>
            The target was <strong>{targetTime} seconds</strong>;

        </p>
        <p>
            You stopped timer with <strong>{formatedTimeRemaning} seconds left</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
        </form>
        
        </dialog>
    );
});
export default ResultModal;