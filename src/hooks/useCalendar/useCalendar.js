import {useEffect, useState} from 'react';
let interval;

const useCalendar = (mode = 'date') => {
  const [pickerMode, setPickerMode] = useState(null);
  const [inline, setInline] = useState(false);
  const [full, setFull] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const showDatePicker = () => {
    setPickerMode(mode);
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const distanceDay = (firstDate, secondDate) => {
    (firstDate && secondDate) != undefined
      ? setDays(Math.floor((secondDate - firstDate) / (1000 * 60 * 60 * 24)))
      : setDays(0);
  };

  const startTimer = (firstDate, secondDate) => {
    if ((firstDate && secondDate) != undefined) {
      setFull(Math.floor((secondDate - firstDate) / (1000 * 60 * 60 * 24)) + 1);

      interval = setInterval(() => {
        let now = new Date().getTime();
        let distance = secondDate - now;

        let d = Math.floor(distance / (1000 * 60 * 60 * 24));
        let h = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          clearInterval(interval);
        } else {
          setDays(d);
          setHours(h);
          setMinutes(m);
          setSeconds(s);
        }
      }, 1000);
    }
  };
  useEffect(() => {}, []);
  const stop = () => {
    console.log('stop');
    clearInterval(interval);
  };

  return {
    showDatePicker,
    hidePicker,
    pickerMode,
    inline,
    full,
    days,
    hours,
    minutes,
    seconds,
    startTimer,
    distanceDay,
    stop,
  };
};
export default useCalendar;
