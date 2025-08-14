// discover.js

const galleryContainer = document.getElementById('gallery');

fetch('https://salemking22.github.io/wdd231/chamber/interest.json')
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        displayGallery(data);
    })
    .catch(err => {
        console.error('Fetch error:', err);
        galleryContainer.innerHTML = `<p class="error">Failed to load gallery. Please try again later.</p>`;
    });

function displayGallery(locations) {
    locations.forEach(location => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
      <img src="${location.image}" 
           alt="${location.alt}" 
           width="${location.width}" 
           height="${location.height}" 
           loading="lazy">
      <div class="card-content">
        <h2>${location.name}</h2>
        <p><strong>Address:</strong> ${location.address}</p>
        <p>${location.description}</p>
      </div>
    `;

        galleryContainer.appendChild(card);
    });
}