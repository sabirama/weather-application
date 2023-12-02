function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const monthNames = [
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
  const month = monthNames[now.getMonth()];
  const day = now.getDate().toString().padStart(2, "0");

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${month} ${day}, ${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

function updateDateTime() {
  const currentDateTime = getCurrentDateTime();
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");

  dateElement.innerHTML = `${currentDateTime.date}`;
  timeElement.innerHTML = `${currentDateTime.time}`;
}

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Initial update when the page loads
updateDateTime();
