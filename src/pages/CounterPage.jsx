import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount , reset , fetchCountFromAPI } from '../redux/counterSlice';

function CounterPage() {


    const count = useSelector((state) => state.counter.value)  ;

    
    const status = useSelector((state) => state.counter.status)  ;


    const dispatch = useDispatch()  ;

    return (
        <div>

            <h1>Counter Page</h1>

            <p>Counter: {count}</p>

            <p>Status: {status}</p>

            <button onClick={() => dispatch(increment(1))}>Increment+</button>

            <button onClick={() => dispatch(decrement(1))}>Decrement-</button>

            <button onClick={() => dispatch( incrementByAmount(2) )}> Increment by 2+ </button>

            <button onClick={() => dispatch( reset() )}> Reset to 0 </button>
            
            <button onClick={() => dispatch(fetchCountFromAPI())}>
                Fetch Count from API
            </button>

        </div>
    );
}

export default CounterPage;
