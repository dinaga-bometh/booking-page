

document.addEventListener('DOMContentLoaded', function() {
  const savedData = JSON.parse(localStorage.getItem('userData'));
  const timeSlotData = JSON.parse(localStorage.getItem('savedData'));
  if (savedData && timeSlotData) {
    document.getElementById('display-name').textContent = savedData.fullName;
    document.getElementById('display-selected-date').textContent = timeSlotData.selectedDate;
    document.getElementById('result').textContent = timeSlotData.time;
    document.getElementById('display-duration').textContent = timeSlotData.duration;
    document.getElementById('display-mobile').textContent = savedData.phone;
    document.getElementById('display-email').textContent = savedData.email;
    document.getElementById('display-gender').textContent = savedData.gender;
    document.getElementById('ticketPrices').textContent = timeSlotData.ticketPrices;
  }
});
  



document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the total price value for all hours from the "ticketPrices" output
  const ticketPricesElement = document.getElementById('ticketPrices');
  const totalPriceForAllHoursMatch = ticketPricesElement.innerHTML.match(/Total Price for All Hours: \$([\d.]+)/);

  if (totalPriceForAllHoursMatch) {
    const totalPriceForAllHours = parseFloat(totalPriceForAllHoursMatch[1]);

    // Display the total price for all hours in the designated element
    const totalPriceForAllHoursDisplay = document.getElementById('totalPriceForAllHours');
    totalPriceForAllHoursDisplay.textContent = `$${totalPriceForAllHours.toFixed(2)}`;
  }
});








function validateFullName(fullName) {
  const fullNamePattern = /^[a-zA-Z\s]+$/;
  return fullNamePattern.test(fullName);
}

function validatePhone(phone) {
  const phonePattern = /^[0-9]{10}$/;
  return phonePattern.test(phone);
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateConfirmEmail(email, confirmEmail) {
  return email === confirmEmail;
}

function checkValidity() {
  const fullNameInput = document.getElementById('fullNameInput');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('emailInput');
  const confirmEmailInput = document.getElementById('confirmEmailInput');

  const fullNameError = document.getElementById('fullNameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');
  const confirmEmailError = document.getElementById('confirmEmailError');

  const fullName = fullNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();
  const confirmEmail = confirmEmailInput.value.trim();

  const fullNameIsValid = validateFullName(fullName);
  const phoneIsValid = validatePhone(phone);
  const emailIsValid = validateEmail(email);
  const confirmEmailIsValid = validateConfirmEmail(email, confirmEmail);

  fullNameError.textContent = fullNameIsValid ? '' : 'Invalid full name';
  phoneError.textContent = phoneIsValid ? '' : 'Invalid phone number';
  emailError.textContent = emailIsValid ? '' : 'Invalid email';
  confirmEmailError.textContent = confirmEmailIsValid ? '' : 'Emails do not match';

  const submitButton = document.getElementById('submitButton');
  submitButton.disabled = !(fullNameIsValid && phoneIsValid && emailIsValid && confirmEmailIsValid);
}

function saveAndRedirect() {
  const fullName = document.getElementById('fullNameInput').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const gender = document.getElementById('genderSelect').value;

  // Save the data to local storage
  const userData = {
    fullName: fullName,
    phone: phone,
    email: email,
    gender: gender
  };
  localStorage.setItem('userData', JSON.stringify(userData));

  // Redirect to the purchase.html page
  window.location.href = 'payment.html';
}

// Add event listeners to input elements for real-time validation
document.addEventListener('DOMContentLoaded', function() {
  const inputElements = document.querySelectorAll('.common-input');
  inputElements.forEach(input => {
    input.addEventListener('input', checkValidity);
  });

  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', saveAndRedirect);
});






document.addEventListener('DOMContentLoaded', function() {
  const cardNumberInput = document.getElementById('cardNumber');
  const expiryDateInput = document.getElementById('expiryDate');
  const cvcInput = document.getElementById('cvc');
  const nameOnCardInput = document.getElementById('nameOnCard');
  const payButton = document.getElementById('payButton');
  const cardNumberError = document.getElementById('cardNumberError');
  const expiryDateError = document.getElementById('expiryDateError');
  const cvcError = document.getElementById('cvcError');
  const nameOnCardError = document.getElementById('nameOnCardError');

  cardNumberInput.addEventListener('input', checkValidity);
  expiryDateInput.addEventListener('input', checkValidity);
  cvcInput.addEventListener('input', checkValidity);
  nameOnCardInput.addEventListener('input', checkValidity);

  function validateCardNumber(cardNumber) {
    // Implement card number validation logic
    return cardNumber.length === 16 && /^\d+$/.test(cardNumber);
  }

  function validateExpiryDate(expiryDate) {
    // Implement expiry date validation logic (e.g., MM/YY format)
    const [inputMonth, inputYear] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return (
      /^\d{2}\/\d{2}$/.test(expiryDate) &&
      +inputYear > currentYear ||
      (+inputYear === currentYear && +inputMonth >= currentMonth)
    );
  }

  function validateCVC(cvc) {
    // Implement CVC validation logic
    return /^\d{3,4}$/.test(cvc);
  }

  function validateNameOnCard(name) {
    // Implement name on card validation logic (only letters)
    return /^[A-Za-z\s]+$/.test(name);
  }

  function checkValidity() {
    const cardNumber = cardNumberInput.value.trim();
    const expiryDate = expiryDateInput.value.trim();
    const cvc = cvcInput.value.trim();
    const nameOnCard = nameOnCardInput.value.trim();

    const cardNumberIsValid = validateCardNumber(cardNumber);
    const expiryDateIsValid = validateExpiryDate(expiryDate);
    const cvcIsValid = validateCVC(cvc);
    const nameOnCardIsValid = validateNameOnCard(nameOnCard);

    cardNumberError.textContent = cardNumberIsValid ? '' : 'Invalid card number';
    expiryDateError.textContent = expiryDateIsValid ? '' : 'Invalid or expired expiry date';
    cvcError.textContent = cvcIsValid ? '' : 'Invalid CVC/CVV';
    nameOnCardError.textContent = nameOnCardIsValid ? '' : 'Invalid name on card';

    // Check if all input data is valid and enable the Pay button
    payButton.disabled = !(cardNumberIsValid && expiryDateIsValid && cvcIsValid && nameOnCardIsValid);
  }

  payButton.addEventListener('click', function() {
    try {
      // Redirect to the confirmation page
      window.location.href = 'confirmation.html';
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
});

















  
  
  // Retrieve saved data from local storage
  const savedData = JSON.parse(localStorage.getItem('savedData'));

  // Display saved data in the table
  if (savedData) {
      document.getElementById('display-selected-date').textContent = savedData.selectedDate;
      document.getElementById('result').textContent = savedData.time;
      document.getElementById('ticketPrices').textContent = savedData.ticketPrices;
  }






















const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
  
  

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

  
// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];




let selectedDate = null; // Variable to store the selected date
let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month

const renderCalendar = () => {
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" onclick="selectDate(${i})">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};

// Function to handle date selection
const selectDate = (day) => {
  if (selectedDate) {
    // If there's a previously selected date, remove its selected style
    selectedDate.classList.remove("selected");
  }

  // Update the selected date with the new selection
  selectedDate = daysTag.children[day + firstDayofMonth - 1];
  selectedDate.classList.add("selected");

  // Save the selected date in local storage
  const selectedDateString = `${currYear}-${currMonth + 1}-${day}`;
  localStorage.setItem("selectedDate", selectedDateString);

  // Update the text content of the element to display the selected date
  const displaySelectedDate = document.getElementById("display-selected-date");
  displaySelectedDate.textContent = `${day} ${months[currMonth]} ${currYear}`;
};

// Function to load the selected date from local storage
const loadSelectedDate = () => {
  const selectedDateString = localStorage.getItem("selectedDate");
  if (selectedDateString) {
    const [year, month, day] = selectedDateString.split("-");
    currYear = parseInt(year, 10);
    currMonth = parseInt(month, 10) - 1;
    firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // update the first day of the new month
    renderCalendar();
    selectDate(parseInt(day, 10));
  }
};

// Function to show the selected date
const showSelectedDate = () => {
  const selectedDateString = localStorage.getItem("selectedDate");
  if (selectedDateString) {
    const [year, month, day] = selectedDateString.split("-");
    const selectedDateText = `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
    const displaySelectedDate = document.getElementById("display-selected-date");
    displaySelectedDate.textContent = selectedDateText;
  }
};

// Call the function to show the selected date initially
showSelectedDate();

// Update the calendar based on the current month and year
const updateCalendar = () => {
  firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // Update the first day of the current month
  renderCalendar();
  showSelectedDate(); // Call the function to show the selected date after updating the calendar
};

renderCalendar();
loadSelectedDate();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      const newDate = new Date(currYear, currMonth, new Date().getDate());
      if (newDate < new Date()) {
        // Check if the new date is earlier than the current date
        date = new Date(); // Set the date back to the current date
      } else {
        date = newDate; // Otherwise, set the new date
      }
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } 
    updateCalendar(); // Update the calendar based on the current month and year
  });
});


































document.addEventListener('DOMContentLoaded', function() {
  const adultsInput = document.getElementById('adults');
  const childrenInput = document.getElementById('children');
  const forAdultsInput = document.getElementById('for_adults');
  const forChildrenInput = document.getElementById('for_children');
  const infantInput = document.getElementById('infant');
  const saveButton = document.getElementById('saveButton');
  const ticketPricesElement = document.getElementById('ticketPrices');

  // Function to increment the number of people
  function incrementInput(inputElement) {
    let currentValue = parseInt(inputElement.value);
    if (currentValue < 10) {
      inputElement.value = currentValue + 1;
      updateTicketPrices();
    }
  }

    
   
  
   
  










// Add event listener to the "Continue with Purchase" button
const continueButton = document.getElementById("continueButton");
continueButton.addEventListener("click", redirectToHome);

// Function to check if conditions are met and redirect to Home.html
function redirectToHome() {
  // Check if a date is selected
  const selectedDateString = localStorage.getItem("selectedDate");
  
  // Check if any time slot is selected
  const selectedTimeSlots = Array.from(timeSelect.selectedOptions);
  
  // Get total number of tickets
  const totalTickets = parseInt(adultsInput.value) + parseInt(childrenInput.value) +
                      parseInt(forAdultsInput.value) + parseInt(forChildrenInput.value) +
                      parseInt(infantInput.value);

  if (selectedDateString && selectedTimeSlots.length > 0 && totalTickets > 0) {
    // Redirect to Home.html
    window.location.href = "details.html";
  } else {
    // Display an error message if conditions are not met
    alert("Please select a date, time, and tickets before continuing.");
  }
}




















  // Function to decrement the number of people
  function decrementInput(inputElement) {
    let currentValue = parseInt(inputElement.value);
    if (currentValue > 0) {
      inputElement.value = currentValue - 1;
      updateTicketPrices();
    }
  }

  // Event listeners for increment and decrement buttons
  document.getElementById('adultsIncrement').addEventListener('click', function() {
    incrementInput(adultsInput);
  });

  document.getElementById('adultsDecrement').addEventListener('click', function() {
    decrementInput(adultsInput);
  });

  document.getElementById('childrenIncrement').addEventListener('click', function() {
    incrementInput(childrenInput);
  });

  document.getElementById('childrenDecrement').addEventListener('click', function() {
    decrementInput(childrenInput);
  });

  document.getElementById('forAdultsIncrement').addEventListener('click', function() {
    incrementInput(forAdultsInput);
    
  });

  document.getElementById('forAdultsDecrement').addEventListener('click', function() {
    decrementInput(forAdultsInput);
  });

  document.getElementById('forChildrenIncrement').addEventListener('click', function() {
    incrementInput(forChildrenInput);
  });

  document.getElementById('forChildrenDecrement').addEventListener('click', function() {
    decrementInput(forChildrenInput);
  });

  document.getElementById('infantIncrement').addEventListener('click', function() {
    incrementInput(infantInput);
  });

  document.getElementById('infantDecrement').addEventListener('click', function() {
    decrementInput(infantInput);
  });





    // Get all the input values
    const adultsValue = adultsInput.value;
    const childrenValue = childrenInput.value;
    const forAdultsValue = forAdultsInput.value;
    const forChildrenValue = forChildrenInput.value;
    const infantValue = infantInput.value;

    // Save all the values to local storage
    localStorage.setItem('adults', adultsValue);
    localStorage.setItem('children', childrenValue);
    localStorage.setItem('forAdults', forAdultsValue);
    localStorage.setItem('forChildren', forChildrenValue);
    localStorage.setItem('infant', infantValue);

    
  });


 
















   

  document.addEventListener('DOMContentLoaded', function() {
    // Display saved data in the table
    const savedData = JSON.parse(localStorage.getItem('savedData'));
  
    if (savedData) {
      document.getElementById('display-selected-date').textContent = savedData.selectedDate;
      document.getElementById('result').textContent = savedData.time;
      document.getElementById('ticketPrices').textContent = savedData.ticketPrices;
    }
  
    const fullNameInput = document.getElementById('full-name');
    const fullNameError = document.getElementById('full-name-error'); 
  
    fullNameInput.addEventListener('input', validateFullName);
  
    function validateFullName() {
      const fullName = fullNameInput.value.trim();
  
      if (fullName === '') {
        fullNameError.textContent = 'Full name is required';
        fullNameInput.classList.add('error');
      } else {
        fullNameError.textContent = '';
        fullNameInput.classList.remove('error');
      }
    }
  
    // ... Rest of your existing code ...
  
  });
   















  













  const timeSelect = document.getElementById("timeSelect");
  timeSelect.addEventListener("change", updateTicketInfo);
  
  function updateTicketInfo() {
      const selectedOptions = Array.from(timeSelect.selectedOptions);
  
      if (!areTimeSlotsInOrder(selectedOptions)) {
          document.getElementById("result").innerHTML = "Please select time slots in order.";
          document.getElementById("ticketPrices").innerHTML = "";
          return;
      }
  
      calculateTime(selectedOptions);
      updateTicketPrices();
  }
  
  function areTimeSlotsInOrder(selectedOptions) {
      for (let i = 1; i < selectedOptions.length; i++) {
          const prevIndex = Array.from(timeSelect.options).indexOf(selectedOptions[i - 1]);
          const currentIndex = Array.from(timeSelect.options).indexOf(selectedOptions[i]);
  
          if (currentIndex - prevIndex !== 1) {
              return false;
          }
      }
      return true;
  }
  
  function calculateTime(selectedOptions) {
      let startTime = selectedOptions[0].textContent.split(" - ")[0];
      let endTime = selectedOptions[selectedOptions.length - 1].textContent.split(" - ")[1];
  
      const totalHours = selectedOptions.length;
      const peakHours = countPeakHours(selectedOptions);
      const normalHours = totalHours - peakHours;
  
      document.getElementById("result").innerHTML = `Selected Time: ${startTime} to ${endTime}<br>`;
      document.getElementById("result").innerHTML += `Total Time: ${totalHours} hour${totalHours > 1 ? 's' : ''}<br>`;
      document.getElementById("result").innerHTML += `Peak Hours: ${peakHours} hour${peakHours > 1 ? 's' : ''}<br>`;
      document.getElementById("result").innerHTML += `Normal Hours: ${normalHours} hour${normalHours > 1 ? 's' : ''}`;
  }
  
  function countPeakHours(selectedOptions) {
      let count = 0;
      for (const option of selectedOptions) {
          if (option.classList.contains('peak')) {
              count++;
          }
      }
      return count;
  }



  
  
  function updateTicketPrices() {
      // Ticket pricing logic (customize as needed)
      const localAdultPricePeak = 6;
      const localAdultPriceNormal = 4;
      const foreignAdultPricePeak = 13;
      const foreignAdultPriceNormal = 10;
  
      const localChildPricePeak = 3;
      const localChildPriceNormal = 2;
      const foreignChildPricePeak = 8;
      const foreignChildPriceNormal = 5;
  
      // Get the selected time slots and count peak and normal hours
      const selectedOptions = Array.from(timeSelect.selectedOptions);
      const peakHours = countPeakHours(selectedOptions);
      const normalHours = selectedOptions.length - peakHours;






     









  
      // Get input values
      const localAdults = parseInt(document.getElementById('adults').value);
      const localChildren = parseInt(document.getElementById('children').value);
      const foreignAdults = parseInt(document.getElementById('for_adults').value);
      const foreignChildren = parseInt(document.getElementById('for_children').value);
      const infants = parseInt(document.getElementById('infant').value);
  
      // Calculate total price for each person separately
      let totalPriceLocalAdults = (localAdults * peakHours * localAdultPricePeak) + (localAdults * normalHours * localAdultPriceNormal);
      let totalPriceLocalChildren = (localChildren * peakHours * localChildPricePeak) + (localChildren * normalHours * localChildPriceNormal);
      let totalPriceForeignAdults = (foreignAdults * peakHours * foreignAdultPricePeak) + (foreignAdults * normalHours * foreignAdultPriceNormal);
      let totalPriceForeignChildren = (foreignChildren * peakHours * foreignChildPricePeak) + (foreignChildren * normalHours * foreignChildPriceNormal);
      let totalInfantPrice = infants * 0;
  
      // Calculate total price for all hours
      let totalPrice = totalPriceLocalAdults + totalPriceLocalChildren + totalPriceForeignAdults + totalPriceForeignChildren + totalInfantPrice;
  
      // Update ticket prices element
      const ticketPricesElement = document.getElementById('ticketPrices');
      ticketPricesElement.innerHTML = `<strong>Total Price for Local Adults:</strong> $${totalPriceLocalAdults}<br>`;
      ticketPricesElement.innerHTML += `<strong>Total Price for Local Children:</strong> $${totalPriceLocalChildren}<br>`;
      ticketPricesElement.innerHTML += `<strong>Total Price for Foreign Adults:</strong> $${totalPriceForeignAdults}<br>`;
      ticketPricesElement.innerHTML += `<strong>Total Price for Foreign Children:</strong> $${totalPriceForeignChildren}<br>`;
      ticketPricesElement.innerHTML += `<strong>Total Price for Infants:</strong> $${totalInfantPrice}<br>`;
      ticketPricesElement.innerHTML += `<strong>Total Price for All Hours:</strong> $${totalPrice}`;

       
  
  // Save the total ticket price to local storage
  localStorage.setItem('totalTicketPrice', totalPrice);

           
          
          // Save the total ticket price to local storage
        localStorage.setItem('totalTicketPrice', totalTicketPrice);
  
        return totalPrice;



  }
  






  



















  
  
  
  // Add event listeners to input elements
  const inputElements = document.querySelectorAll('input');
  inputElements.forEach(input => {
      input.addEventListener('input', updateTicketInfo);
  });
  
  // Display initial time information
  calculateTime(Array.from(timeSelect.selectedOptions));
  


  
















    loadSelectedDate();

    
   
    inputElements.forEach(input => {
        input.addEventListener('input', updateTicketInfo);
    });

    // Display initial time information
    calculateTime(Array.from(timeSelect.selectedOptions));






















    function disableContinueButton() {
      const continueButton = document.getElementById('continueButton');
      continueButton.disabled = true;
    }
  
    function enableContinueButton() {
      const continueButton = document.getElementById('continueButton');
      continueButton.disabled = false;
    }
  
    // Add event listeners to necessary elements for enabling/disabling the button
    document.getElementById('display-selected-date').addEventListener('DOMSubtreeModified', checkEnableContinue);
    document.getElementById('result').addEventListener('DOMSubtreeModified', checkEnableContinue);
    document.getElementById('ticketPrices').addEventListener('DOMSubtreeModified', checkEnableContinue);
  
    function checkEnableContinue() {
      const selectedDate = document.getElementById('display-selected-date').textContent;
      const time = document.getElementById('result').textContent;
      const ticketPrices = document.getElementById('ticketPrices').textContent;
  
      if (selectedDate !== "" && time !== "" && ticketPrices !== "") {
        enableContinueButton();
      } else {
        disableContinueButton();
      }
    }
  
    document.getElementById('continueButton').addEventListener('click', function() {
      const selectedDate = document.getElementById('display-selected-date').textContent;
      const time = document.getElementById('result').textContent;
      const ticketPrices = document.getElementById('ticketPrices').textContent;
  
      if (selectedDate === "" || time === "" || ticketPrices === "") {
        alert("Please select all required items before proceeding.");
        return; // Prevent further execution
      }
  
      const savedData = {
        selectedDate: selectedDate,
        time: time,
        ticketPrices: ticketPrices
      };
  
      localStorage.setItem('savedData', JSON.stringify(savedData));
    });








































    




















