import {createPortal} from 'react-dom';

export default function Result({targetTime,remainingTime,onReset}){
    let roundedAccuracy="00";
    let accuracy;
    let finalRemainingTime="0";
    const userLost=remainingTime<=0;
    if(!userLost){
        finalRemainingTime=(remainingTime/1000).toFixed(2);
        accuracy = Math.max(0, ((targetTime - finalRemainingTime) / targetTime) * 100);
        roundedAccuracy = accuracy.toFixed(0);
    }
    
    return createPortal(<dialog className="result-modal" open>
            <h2>Score:{roundedAccuracy}</h2>
            <p>Target time :{targetTime}s</p>
            {!userLost?<p>You stopped at <strong>: {finalRemainingTime}s left</strong></p>:<p><strong>You lost</strong></p>}
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,document.getElementById('modal')
        );
};