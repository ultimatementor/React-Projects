import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "./features/counter/counterSlice";
import "./App.css";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncClick = () => {
    dispatch(increment());
  };

  const handleDecClick = () => {
    dispatch(decrement());
  };

  const handleResClick = () => {
    dispatch(reset());
  };

  return (
    <>
      <h1 className="text-center text-7xl">Counter App</h1>
      <button onClick={handleIncClick}> + </button>
      <h1 className="text-center text-2xl">Counter: {count} </h1>
      <button onClick={handleDecClick} className="text-center text-2xl"> - </button> <br /><br />
      <button onClick={handleResClick} className="text-center text-2xl"> Reset </button>
    </>
  );
}

export default App;
