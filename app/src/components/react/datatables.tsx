/**
 * https://datatables.net/
 */

import { useState,useEffect  } from 'react';
import { useStore } from '@nanostores/react';
import { currentDate } from '@/store/userStore' 
import { format } from "date-fns";


export const DateSelector = () => {
  
  const date = useStore(currentDate)

  useEffect(() => {
    if(sessionStorage.isLoggin){
      console.log("isLogin:True",date)
    }else{
      //セッションが無い場合は現在日時をcurrentDateに登録する
      console.log("isLogin:False")
      const ymd = format(new Date(), 'yyyy-MM-dd')
      currentDate.set(ymd)
    }
  }, []);

  const changeDate = (event:any) => {
    console.log("index:event",new Date(event.target.value) )
    const ymd = format(new Date(event.target.value) , 'yyyy-MM-dd')
    currentDate.set(ymd)
  }
  
  const inputStyle = {
    border: "solid 0px #999",
    borderRadius:'var(--dp-border-radius, 5px)',
    padding:'0.1em',
    lineHeight: '2.15rem',
    fontSize: '1.6em',
  };

  return (
    <>
    <input type="date" style={inputStyle} value={date} onChange={changeDate}/>
    </> 
  );
};
 
export default DateSelector;
  
  