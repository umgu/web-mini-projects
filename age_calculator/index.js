document.addEventListener("DOMContentLoaded", () => {
    function setMonthSelector(months, selector) {
        months.forEach( (month) => {
            let option = document.createElement("option");
            option.setAttribute("value", month);
            option.innerHTML=month;
            selector.append(option);
        });
    }

    function setDateSelector(selector) {
        let date=1;
        while( date<=31 ) {
            let option = document.createElement("option");
            option.setAttribute("value", date);
            option.innerHTML=date++;
            selector.append(option);
        }
    }

    const months = {"January":1, "February":2, "March":3, "April":4, "May":5, "June":6, "July":7, "August":8, " September":9, "October":10, "November":11, "December":12};
    const birthMonthSelector = document.getElementById("birth-month");
    setMonthSelector(Object.keys(months), birthMonthSelector);
    const currentMonthSelector = document.getElementById("current-month");
    setMonthSelector(Object.keys(months), currentMonthSelector);

    const birthDateSelector = document.getElementById("birth-date");
    setDateSelector(birthDateSelector);
    const currentDateSelector = document.getElementById("current-date");
    setDateSelector(currentDateSelector);

    const birthYear = document.getElementById("birth-year");
    const birthMonth = document.getElementById("birth-month");
    const birthDate = document.getElementById("birth-date");

    const currentYear = document.getElementById("current-year");
    const currentMonth = document.getElementById("current-month");
    const currentDate = document.getElementById("current-date");
    
    const result = document.getElementById("result");
    const calculateBtn = document.getElementById("calculate-btn");

    calculateBtn.addEventListener("click", ()=> {
        const y = Math.abs(currentYear.value - birthYear.value);
        const m = Math.abs(months[currentMonth.value] - months[birthMonth.value]);
        const d = Math.abs(currentDate.value - birthDate.value);
        result.innerHTML = `<span>${y} Years, ${m} months, ${d} Days</span><br>
                            <span>= ${ ( y + m/12 + d/(30*12) ).toFixed(2)} Years</span><br>
                            <span>= ${ ( y*12 + m + d/30 ).toFixed(2)} Months</span><br>
                            <span>= ${ ( y*52 + m*30/7 + d/7 ).toFixed(2)} Weeks</span><br>
                            <span>= ${ ( y*365 + m*30 + d)} Days</span>`;  
    })

    const resetBtn = document.getElementById("reset-btn");
    resetBtn.addEventListener("click", () => {
        location.reload(true);
    })
})