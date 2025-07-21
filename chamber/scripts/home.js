document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

  document.getElementById("temperature").textContent = "24";
  document.getElementById("condition").textContent = "Partly Cloudy";
  document.getElementById("humidity").textContent = "65";
  document.getElementById("wind").textContent = "10";

  loadSpotlights();
  loadForecast();
});

async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    const members = data.members;

    const spotlightContainer = document.getElementById('spotlightContainer');
    if (!spotlightContainer) {
      console.error('No spotlight container found');
      return;
    }

    const spotlights = members.filter(m =>
      m.membership === 'gold' || m.membership === 'silver'
    );

    const selected = spotlights.sort(() => 0.5 - Math.random()).slice(0, 3);

    spotlightContainer.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <h4>${member.name}</h4>
        <img src="images/${member.image}" alt="${member.name}" loading="lazy">
        <p><strong>Membership:</strong> ${member.membership}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading spotlights:', error);
  }
}

async function loadForecast() {
  const forecastContainer = document.getElementById('forecast');
  if (!forecastContainer) return;

  const dummyData = [
    { day: "Monday", temp: 23, condition: "Sunny" },
    { day: "Tuesday", temp: 21, condition: "Cloudy" },
    { day: "Wednesday", temp: 19, condition: "Rain" }
  ];

  forecastContainer.innerHTML = '';

  dummyData.forEach(day => {
    const card = document.createElement('div');
    card.classList.add('forecast-card');
    card.innerHTML = `
      <h3>${day.day}</h3>
      <p>Temp: ${day.temp} °C</p>
      <p>Condition: ${day.condition}</p>
    `;
    forecastContainer.appendChild(card);
  });
}
