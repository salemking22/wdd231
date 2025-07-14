document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const gridBtn = document.getElementById("grid-view");
    const listBtn = document.getElementById("list-view");

    async function getMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Could not fetch member data.");
            const members = await response.json();
            displayMembers(members);
        } catch (err) {
            console.error("Fetch error:", err);
            directory.innerHTML = "<p>Failed to load members.</p>";
        }
    }

    function displayMembers(members) {
        directory.innerHTML = "";
        members.forEach((member) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
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
