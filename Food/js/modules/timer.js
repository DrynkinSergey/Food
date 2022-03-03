function timer() {

    const deadline = '2022-03-30';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        }
    }

    function startTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        function zeroPad(time) {
            if (time >= 0 && time < 10) {
                return `0${time}`;
            } else return time;
        }

        function updateTimer() {
            const timeData = getTimeRemaining(endtime);
            days.innerHTML = zeroPad(timeData.days);
            hours.innerHTML = zeroPad(timeData.hours);
            minutes.innerHTML = zeroPad(timeData.minutes);
            seconds.innerHTML = zeroPad(timeData.seconds);
        }

        updateTimer();
        let timerInterval = setInterval(updateTimer, 1000);


    }

    startTimer('.timer', deadline);
}

export default  timer;