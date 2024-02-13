
import { useState } from 'react';

type Prop = {
  count: number,
  onClick: () => void,
}

const DateSelector = () => {

  const [count, setCount] = useState(0);
  
  function MyButton({ count, onClick }: Prop) {
    return (
      <button onClick={onClick}>
        Clicked {count} times
      </button>
    );
  }

  function handleClick() {
    setCount(count + 1)
    console.log("count",count)
  }
  return (
    <>
      <MyButton count={count} onClick={handleClick} />
      
    </>
        
  );
};
  
  export default DateSelector;
  
  