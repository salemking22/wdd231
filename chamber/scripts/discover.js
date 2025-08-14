// Visitor message using localStorage
const visitMessage = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
}
localStorage.setItem('lastVisit', now);

// Get the container
const container = document.querySelector('.grid-container');

// Fetch the interest JSON
fetch('data/interest.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((item, index) => {
            // Create card
            const card = document.createElement('div');
            card.classList.add('interest-card');

            // Name
            const h2 = document.createElement('h2');
            h2.textContent = item.name;
            card.appendChild(h2);

            // Image
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = `images/${item.image}`;
            img.alt = item.name;
            img.loading = 'lazy';
            figure.appendChild(img);
            card.appendChild(figure);

            // Address
            const address = document.createElement('address');
            address.textContent = item.address;
            card.appendChild(address);

            // Description
            const p = document.createElement('p');
            p.textContent = item.description;
            card.appendChild(p);

            // Button
            const btn = document.createElement('button');
            btn.textContent = 'Learn more';
            card.appendChild(btn);

            // Append card to container
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading interest.json:', error));

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;
