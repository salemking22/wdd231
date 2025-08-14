document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery-container");
    const visitMessage = document.getElementById("visit-message-text");

    // ✅ Corrected fetch path — interest.json is in chamber/, discover.js is in chamber/scripts/
    fetch('../interest.json')
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
                        <img src="${item.image}" 
                             alt="${item.alt}" 
                             width="${item.width}" 
                             height="${item.height}" 
                             loading="lazy" />
                        <figcaption>${item.description}</figcaption>
                    </figure>
                    <address>${item.address}</address>
                    <button type="button" aria-label="Learn more about ${item.name}">Learn More</button>
                `;

                galleryContainer.appendChild(card);
            });
        })
        .catch(err => {
            galleryContainer.innerHTML = '<p>Sorry, we could not load the items at this time.</p>';
            console.error('Fetch error:', err);
        });

    // 🕓 Display last visit message
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

    // 📅 Footer year and last modified
    const yearElem = document.getElementById("year");
    if (yearElem) yearElem.textContent = new Date().getFullYear();

    const lastModElem = document.getElementById("lastModified");
    if (lastModElem) lastModElem.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;
});