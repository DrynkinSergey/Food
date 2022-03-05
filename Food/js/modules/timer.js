function timer({timerSelector, deadline, daysSelector, hoursSelector, minutesSelector, secondsSelector}) {

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

    function startTimer(timerSelector, endtime) {
        const timer = document.querySelector(timerSelector),
            days = timer.querySelector(daysSelector),
            hours = timer.querySelector(hoursSelector),
            minutes = timer.querySelector(minutesSelector),
            seconds = timer.querySelector(secondsSelector);

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

    startTimer(timerSelector, deadline);
}

export default  timer;