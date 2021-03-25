
'use strict'
$(document).ready(function () {

    /* === IBG === */

    function ibg() {
      $.each($('.ibg'), function (index, val) {
          if ($(this).find('img').length > 0) {
              let src_img = $(this).find('img').attr('src');
              $(this).css('backgroundImage', 'url("' + src_img + '")');
          }
      });
  }

  ibg();

  /* === /IBG === */

    /* === POPUP === */

    let unlock = true;
      const timeout = 300;
      const body = document.querySelector("body");
      const lockPadding = document.querySelectorAll(".lock-padding");
      
      function bodyLock() {
        const lockPaddingValue =
          window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        if (lockPadding.length > 0) {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
          }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock-scroll");
      
        unlock = false;
        setTimeout(function () {
          unlock = true;
        }, timeout);
      }
      
      function bodyUnlock() {
        setTimeout(function () {
          for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = "0px";
          }
          body.style.paddingRight = "0px";
          body.classList.remove("lock-scroll");
        }, timeout);
      
        unlock = false;
        setTimeout(function () {
          unlock = true;
        }, timeout);
      }

    function openPopup(id) {
        bodyLock(); 
        $(`.js-popup[data-id-popup='${id}']`).fadeIn(300);
      }
      
      function closePopup() {
        bodyUnlock();
        $(".js-popup").fadeOut(300);
      }
      
      $(".js-popup__close").click(closePopup);
      
      $(".js-btn-popup").click(function (e) {
        e.preventDefault();
        let indexBtnPopup = $(this).attr("href");

        openPopup(indexBtnPopup);
      });
      
      $(".js-popup").click(function (e) {
        let popup = $(".js-popup__wrapp");
        
        if (!popup.is(e.target) && popup.has(e.target).length === 0) {
          closePopup();
        }
      });

      /* === /POPUP === */


      /*=== NATIVE DATERANGEPICKER ===*/
  const date_picker_element = document.querySelector('.date-picker');
  const selected_date_element = document.querySelector('.date-picker .selected-date');
  const dates_element = document.querySelector('.date-picker .dates');
  const mth_element = document.querySelector('.date-picker .dates .month .mth');
  const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
  const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');

  const days_element = document.querySelector('.date-picker .dates .days');

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июль', 'Июнь', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

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

  function populateDates(e) {
    days_element.innerHTML = '';
    let amount_days = 31;

    if(month == 1) {
      amount_days = 28;
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
/*кнопка прокрутки вверх*/

const offset = 100;
const scrollUp = document.querySelector('.js-scroll-up');
const scrollUpSvgPath = document.querySelector('.js-scroll-up__path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = '\'' + pathLength + pathLength + '\'';
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

// getTop
const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

//updateDashoffset

const updateDashoffset = () => {
    const heigth = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / heigth);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
}

// onScroll
window.addEventListener('scroll', () => {
    updateDashoffset();
    getTop() > offset ? scrollUp.classList.add('scroll-up_active') : scrollUp.classList.remove('scroll-up_active');
});

// click
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

/*скрол по якорю*/