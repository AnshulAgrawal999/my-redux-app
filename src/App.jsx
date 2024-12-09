import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, decrementByAmount } from './features/counter/counterSlice';

function App() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value)); // Convert input to number
  };

  return (
    <div>
      <div style={{ margin: 'auto', textAlign: 'center', padding: '20px' }}>
        <button
          style={{ marginRight: '10px' }}
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span style={{ margin: '0 10px' }}>{count}</span>
        <button
          style={{ marginLeft: '10px' }}
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <div style={{ marginTop: '20px' }}>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            style={{ marginRight: '10px' }}
          />
          <button
            onClick={() => dispatch(incrementByAmount(amount))}
            style={{ marginRight: '5px' }}
          >
            Increment By Amount
          </button>
          <button
            onClick={() => dispatch(decrementByAmount(amount))}
          >
            Decrement By Amount
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
