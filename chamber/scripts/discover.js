document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery-container");
    const visitMessage = document.getElementById("visit-message-text");

    // Fetch the interest.json data
    fetch('data/interest.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            galleryContainer.innerHTML = '';

            data.forEach(item => {
                const card = document.createElement('section');
                card.className = 'gallery-card';

                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <figure>
                        <img src="${item.image}" alt="${item.alt}" width="400" height="180" loading="lazy" />
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button type="button" aria-label="Learn more about ${item.name}">Learn More</button>
                `;

                galleryContainer.appendChild(card);
            });
        })
        .catch(err => {
            galleryContainer.innerHTML = '<p>Sorry, we could not load the items at this time.</p>';
            console.error('Fetch error:', err);
        });

    // localStorage visit message
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        visitMessage.textContent = diffDays < 1
            ? "Back so soon! Awesome!"
            : `You last visited ${diffDays} ${diffDays === 1 ? "day" : "days"} ago.`;
    }

    localStorage.setItem("lastVisit", now);

    // Footer year
    const yearElem = document.getElementById("year");
    if (yearElem) yearElem.textContent = new Date().getFullYear();

    // Footer last modified date and time
    const lastModElem = document.getElementById("lastModified");
    if (lastModElem) {
        const lastModified = new Date(document.lastModified);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        lastModElem.textContent = `Last Modified: ${lastModified.toLocaleString('en-ZW', options)}`;
    }
});
