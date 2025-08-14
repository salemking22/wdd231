// main.js (with localStorage and lazy loading)

const tipsContainer = document.getElementById('tips-container');
const modal = document.getElementById('tip-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

async function loadTips() {
    try {
        const response = await fetch('data/tips.json');
        const tips = await response.json();

        tips.forEach(tip => {
            const tipDiv = document.createElement('div');
            tipDiv.classList.add('tip');

            tipDiv.innerHTML = `
                <h3>${tip.title}</h3>
                <img src="${tip.image}" alt="${tip.title}" loading="lazy" />
                <p>${tip.description}</p>
            `;

            // Add click event to open modal and save to localStorage
            tipDiv.addEventListener('click', () => {
                openModal(tip);
                localStorage.setItem('lastTip', JSON.stringify(tip));
            });

            tipsContainer.appendChild(tipDiv);
        });

        // Check if there's a tip saved in localStorage
        const savedTip = localStorage.getItem('lastTip');
        if (savedTip) {
            openModal(JSON.parse(savedTip));
        }

    } catch (error) {
        console.error('Error loading tips:', error);
        tipsContainer.innerHTML = '<p>Failed to load tips. Please try again later.</p>';
    }
}

// Function to open the modal
function openModal(tip) {
    modalTitle.textContent = tip.title;
    modalImage.src = tip.image;
    modalImage.alt = tip.title;
    modalDescription.textContent = tip.description;
    modal.style.display = 'block';
}

// Close modal when clicking the close button
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Call the function
loadTips();
