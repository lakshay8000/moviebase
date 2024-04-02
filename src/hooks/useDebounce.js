/* 
THIS USEDEBOUCE CUSTOM HOOK WILL TAKE A CALLBACK AND DELAY AS AN ARGUMENT AND THEN 
IT WILL RETURN THE CALLBACK WHICH WILL BE EXECUTED AFTER SOME DELAY

The callback which we originally used in the onChange of search bar-
(e) => setSearchText(e.target.value);
Now we will make it a debounced callback, means this will be executed after some 
delay-
    
*/

import {useRef} from "react";


function useDebounce(callback, delay) {
    const timerIdRef= useRef(null);                           // declare timerId, updated timerId will be stored here and used by the below function through closure. Below function will use memorised timerId to stop previous timers (if running)

    function debounceCallback(...args) {   // In this inner fn, we will put our original callback in delay, the arguments passed here will be required by the original callback, in our case we will pass the event as argument while calling the function. NOTE- We use ...args while creating the function, value of ...args is the unused argument which we put while calling the function
        clearTimeout(timerIdRef.current);             // if already a timer is running, stop it

        timerIdRef.current= setTimeout(() => {
            callback(...args);             // here in our case, ...args == event
        }, delay);
    }

    // return callback with delay-
    return debounceCallback;

}

export default useDebounce;