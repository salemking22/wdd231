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
            directory.innerHTML = "<p>Failed to load members. Please try again later.</p>";
        }
    }

    function displayMembers(members) {
        directory.innerHTML = "";

        members.forEach((member) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const name = document.createElement("h3");

            if (member.name === "Tech Innovators") {
                // Tech Innovators: name as plain text, website link on a new line
                name.textContent = member.name;
                card.appendChild(name);

                const website = document.createElement("a");
                website.setAttribute("href", member.website);
                website.setAttribute("target", "_blank");
                website.setAttribute("rel", "noopener noreferrer");
                website.textContent = "Visit Website";
                card.appendChild(website);
            } else {
                // Other members: name as a clickable link
                name.innerHTML = `<a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.name}</a>`;
                card.appendChild(name);
            }

            const img = document.createElement("img");
            img.setAttribute("src", `images/${member.image}`);
            img.setAttribute("alt", `${member.name} Logo`);
            img.setAttribute("width", "200");
            img.setAttribute("height", "200");
            img.setAttribute("loading", "lazy");
            img.classList.add("member-img");

            const address = document.createElement("p");
            address.textContent = member.address;

            const phone = document.createElement("p");
            phone.textContent = member.phone;

            card.appendChild(img);
            card.appendChild(address);
            card.appendChild(phone);

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
