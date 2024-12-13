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
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
          <button onClick={() => dispatch(fetchCountFromAPI())}>
              Fetch Count from API
          </button>
      </div>
  );
}

export default App;
