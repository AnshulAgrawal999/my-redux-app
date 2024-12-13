import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount , fetchCountFromAPI } from './redux/counterSlice';

function App() {

    const count = useSelector((state) => state.counter.value);
    const status = useSelector((state) => state.counter.status);
    const dispatch = useDispatch();

    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Counter: {count}</h1>
          <p>Status: {status}</p>
          <button onClick={() => dispatch(increment(1))}>Increment 1 </button>
          <button onClick={() => dispatch(decrement(1))}>Decrement 1 </button>
          <button onClick={() => dispatch(incrementByAmount(2))}>Increment by 2</button>
          <button onClick={() => dispatch(fetchCountFromAPI())}>
              Fetch Count from API
          </button>
      </div>
  );
}

export default App;
