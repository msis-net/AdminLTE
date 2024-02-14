import { useState } from "react";
import DatePicker,{registerLocale} from "react-datepicker";
import { subDays,addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker.css"
import { ja } from "date-fns/locale/ja";
//日本語化
registerLocale("ja", ja);

const App = () => {

  const [startDate, setStartDate] = useState(new Date('2023-12-01'));
  const today = new Date()
  console.log("startDate",startDate )
  const changeDate = (event:any) => {
    console.log("index:event",new Date(event) )
    
  }
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        subDays(new Date(), 4),
        subDays(new Date(), 3),
        subDays(new Date(), 2),
        subDays(new Date(), 1),
      ],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
      ],
    },
  ]

  return (
    <div>
      <DatePicker
        inline
        locale="ja"
        selected={today}
        startDate={startDate}
        onChange={changeDate}
        highlightDates={[subDays(new Date(), 14), addDays(new Date(), 7)]}
        monthsShown={3}
        calendarStartDay={1}//開始曜日（月）
      />
    </div>
    
  );
};

export default App;

