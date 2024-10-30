const timeframeLinks = document.querySelectorAll(".link");

const cardTitles = document.querySelectorAll(
  ".main__card__description-box__event-div__title"
);
const currentHours = document.querySelectorAll(
  ".main__card__description-box__time-div__time"
);
const previousHours = document.querySelectorAll(
  ".main__card__description-box__time-div__time-span"
);

// Fetch data asynchronously
async function fetchData() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      console.log("Oops, something went wrong");
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to update the displayed data based on selected timeframe
async function updateDisplayedData(timeframe) {
  const data = await fetchData();
  if (!data) return;

  data.forEach((item, i) => {
    cardTitles[i].textContent = item.title;
    currentHours[i].textContent = `${item.timeframes[timeframe].current}hrs`;
    previousHours[i].textContent = `Last ${
      timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
    } - ${item.timeframes[timeframe].previous}hrs`;
  });
}

// Function to set the active link styling
function setActiveLink(selectedLink) {
  timeframeLinks.forEach((link) => {
    if (link === selectedLink) {
      link.style.color = "white"; // Selected link color
    } else {
      link.style.color = "#5847eb"; // Unselected link color
    }
  });
}

// Set weekly data as default on page load
window.addEventListener("DOMContentLoaded", () => {
  const defaultLink = document.querySelector(".link[data-default]");
  const defaultTimeframe = defaultLink.textContent.toLowerCase();
  updateDisplayedData(defaultTimeframe);
  setActiveLink(defaultLink);
});

// Event listener for each timeframe link
timeframeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    const selectedTimeframe = link.textContent.toLowerCase();
    updateDisplayedData(selectedTimeframe);
    setActiveLink(link);
  });
});
