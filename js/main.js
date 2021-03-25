
'use strict'
$(document).ready(function () {

      /*=== NATIVE DATERANGEPICKER ===*/
  const date_picker_element = document.querySelector('.date-picker');
  const selected_date_element = document.querySelector('.date-picker .selected-date');
  const dates_element = document.querySelector('.date-picker .dates');
  const mth_element = document.querySelector('.date-picker .dates .month .mth');
  const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
  const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
  const week_element = document.querySelector('.week');

  const days_element = document.querySelector('.date-picker .dates .days');

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июль', 'Июнь', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let selectedDate = date;
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;

  mth_element.textContent = months[month] + ' ' + year;

  selected_date_element.textContent = formatDate(date);
  selected_date_element.dataset.value = selectedDate;

  populateDates();
  populateWeek();

  // EVENT LISTENERS
  date_picker_element.addEventListener('click', toggleDatePicker);
  next_mth_element.addEventListener('click', goToNextMonth);
  prev_mth_element.addEventListener('click', goToPrevMonth);

  // FUNCTIONS
  function toggleDatePicker (e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
      dates_element.classList.toggle('active');
    }
    
  }

  function goToNextMonth(e) {
    e.preventDefault();
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
  }

  function goToPrevMonth(e) {
    e.preventDefault();
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
  }

  function populateWeek(e) {
    for(let i = 0; i < 7; i++) {
      
      const week_elem = document.createElement('div');
      week_elem.classList.add('week-day');
      week_elem.textContent = week[i];
      week_element.appendChild(week_elem);
    }
  }

  function populateDates(e) {
    days_element.innerHTML = '';
    let amount_days = 31;
    
    if(month == 1) {
      amount_days = 28;
      if(year % 4 == 0) {
        amount_days = 29;
      }
    }
    else if(month == 3 || month == 5 || month == 8 || month == 10) {
      amount_days = 30;
    }
    let selectedWeekDay = new Date(year + '-' + (month + 1) + '-' + 1);
    let getSelectedWeekDay = selectedWeekDay.getDay();
    console.log(getSelectedWeekDay)
    for (let i = 1; i < getSelectedWeekDay; i++) {
      const day_element = document.createElement('div');
      days_element.appendChild(day_element);
    }
    for (let i = 0; i < amount_days; i++) {
      
      const day_element = document.createElement('div');
      day_element.classList.add('day');
      day_element.textContent = i + 1;

      if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
        day_element.classList.add('selected');
      }

      day_element.addEventListener('click', function () {
        selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
        selectedDay = (i + 1);
        selectedMonth = month;
        selectedYear = year;

        selected_date_element.textContent = formatDate(selectedDate);
        selected_date_element.dataset.value = selectedDate;

        populateDates();
      })

      days_element.appendChild(day_element);
    }
  }

  // HELPER FUNCTION 
  function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains(selector)) {
        return true;
      }
    }
    
    return false;
  }

  function formatDate (d) {
    let day = d.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let year = d.getFullYear();

    return day + ' / ' + month + ' / ' + year;
  }

  /*=== /NATIVE DATERANGEPICKER ===*/

});
