const courses = [
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
    { code: "WDD 230", name: "Frontend Web Development I", credits: 2, type: "WDD", completed: false },
    { code: "WDD 231", name: "Frontend Web Development II", credits: 2, type: "WDD", completed: false },
    { code: "CSE 121b", name: "JavaScript Language", credits: 2, type: "CSE", completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, type: "CSE", completed: false },
    { code: "CSE 222", name: "Data Structures", credits: 2, type: "CSE", completed: false },
    { code: "CSE 341", name: "Web Backend Development", credits: 2, type: "CSE", completed: false }
];

const cardContainer = document.getElementById("courseCards");
const creditTotal = document.getElementById("creditTotal");

function displayCourses(courseList) {
    cardContainer.innerHTML = "";
    let total = 0;

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
    `;

        cardContainer.appendChild(card);
        total += course.credits;
    });

    creditTotal.textContent = total;
}

document.getElementById("allBtn").addEventListener("click", () => {
    displayCourses(courses);
});
document.getElementById("wddBtn").addEventListener("click", () => {
    const filtered = courses.filter(course => course.type === "WDD");
    displayCourses(filtered);
});
document.getElementById("cseBtn").addEventListener("click", () => {
    const filtered = courses.filter(course => course.type === "CSE");
    displayCourses(filtered);
});

displayCourses(courses);
