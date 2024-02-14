import { useState } from 'react';
/*継承できない
type Prop = {
  count: number,
  onClick: () => void,
}
*/
//interfeveは継承できる
interface Arg  {
  count: number,
  onClick: () => void,
}

interface Prop extends Arg{
  onClick: () => void
}


export default function DateSelector() {

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
  
