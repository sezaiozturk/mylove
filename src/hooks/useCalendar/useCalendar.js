import {useEffect, useState} from 'react';

const useCalendar = (startDay, deadline) => {
  const [pickerMode, setPickerMode] = useState(null);
  const [inline, setInline] = useState(false);
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const showDatePicker = () => {
    setPickerMode('datetime');
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const full =
    startDay != undefined
      ? Math.floor((deadline - startDay) / (1000 * 60 * 60 * 24))
      : 0;

  const startTimer = () => {
    const interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = deadline - now;

      let d = Math.floor(distance / (1000 * 60 * 60 * 24));
      let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        console.log('finish');
      } else {
        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, []);
  return {
    showDatePicker,
    hidePicker,
    pickerMode,
    inline,
    days,
    hours,
    minutes,
    seconds,
    full,
  };
};
export default useCalendar;
