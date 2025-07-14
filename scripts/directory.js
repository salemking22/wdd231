document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const gridBtn = document.getElementById("grid-view");
    const listBtn = document.getElementById("list-view");

    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Network response was not ok");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            directory.innerHTML = "<p>Failed to load members data.</p>";
            console.error("Fetch error:", error);
        }
    }

    function displayMembers(members) {
        directory.innerHTML = "";

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
        <h3>${member.name}</h3>
       <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeho<img src="images/${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeholder.png';" />
lder.png';" />


        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      `;
            directory.appendChild(card);
        });
    }

    gridBtn.addEventListener("click", () => {
        directory.classList.add("grid");
        directory.classList.remove("list");
    });

    listBtn.addEventListener("click", () => {
        directory.classList.add("list");
        directory.classList.remove("grid");
    });

    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

    getMembers();
});
