
import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentDate, valData } from '@/store/userStore' 
console.log("dateselector",currentDate.value,valData.value)

import { format } from "date-fns";



const DateSelector = () => {
  const date = useStore(currentDate)
  console.log("isLogin:True",date)
  const [count, setCount] = useState(0);

  if(sessionStorage.isLoggin){
    console.log("isLogin:True",date)
  }else{
    //セッションが無い場合は現在日時をcurrentDateに登録する
    console.log("isLogin:False")
    const ymd = format(new Date(), 'yyyy-MM-dd')
    currentDate.set(ymd)
    //sessionStorage.setItem( "isLoggin" , String(new Date()) )
    console.log("sessionStorage-after",sessionStorage.getItem("isLogin"))

  }

  function handleClick() {
    setCount(count + 1)
    console.log("count",count)
  }

  function MyButton() {
    
        return (
          <button onClick={handleClick}>Clicked {count} times</button>
        );
 }
  return (
    <>
      <input type="date" id="setDate"/>
      
      <style>{`
              input {
                      color: #0f0;
                  }
                
        `}</style>  
    </>
        
  );
};
  
export default DateSelector;
  
  