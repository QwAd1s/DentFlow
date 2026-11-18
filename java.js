 // NAVIGATION

const navItems = document.querySelectorAll(".nav-item");

function showPage(pageId) {

document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
});
document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
});

const selectedPage = document.getElementById(pageId);
    if (!selectedPage) return;
    selectedPage.classList.add("active");
    const selectedButton = document.querySelector('.nav-item[data-page="${pageId}"]');

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

    const pageNames = {
        dashboard: "Главная",
        appointments: "Записи",
        patients: "Пациенты",
        doctors: "Врачи",
        messages: "Сообщения",
        services: "Услуги и цены",
        analytics: "Аналитика",
        ai: "Настройки ИИ"
    };

    document.getElementById("page-title").textContent =
        pageNames[pageId];

    document.getElementById("breadcrumb").textContent =
        pageNames[pageId];

    if (pageId === "appointments") {
        renderAppointments();
    }

}

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const pageId = item.dataset.page;

        showPage(pageId);

    });

});


// APPOINTMENT MODAL

const modal = document.getElementById("appointment-modal");

function openModal() {

    modal.classList.add("show");

}

function closeModal() {

    modal.classList.remove("show");

}

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});


// APPOINTMENTS DATA

let appointments = [
    {
        name: "Али Магомедов",
        doctor: "И. Ахмадов",
        time: "09:00",
        service: "Лечение кариеса",
        status: "Подтверждено"
    },
    {
        name: "Хеда Алиева",
        doctor: "М. Умарова",
        time: "10:30",
        service: "Консультация",
        status: "Ожидает"
    },
    {
        name: "Муса Хасанов",
        doctor: "А. Сулейманов",
        time: "12:00",
        service: "Удаление зуба",
        status: "Подтверждено"
    },
    {
        name: "Зарема Мусаева",
        doctor: "И. Ахмадов",
        time: "14:00",
        service: "Чистка зубов",
        status: "Подтверждено"
    }
];


// ADD APPOINTMENT

const appointmentForm = document.getElementById("appointment-form");

appointmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("patient-name").value;

    const doctor = document.getElementById("doctor-name").value;

    const service = document.getElementById("service-name").value;

    const date = document.getElementById("appointment-date").value;

    const time = document.getElementById("appointment-time").value;

    if (!name || !doctor || !service || !date || !time) {

        alert("Заполните все поля!");

        return;

    }

    const newAppointment = {

        name: name,

        doctor: doctor,

        time: time,

        service: service,

        status: "Ожидает"

    };

    appointments.push(newAppointment);

    renderAppointments();

    updateStatistics();

    appointmentForm.reset();

    closeModal();

    alert("Запись успешно создана!");

});


// RENDER APPOINTMENTS

function renderAppointments() {

    const table = document.getElementById("appointments-table");

    const table2 = document.getElementById("appointments-table-2");

    const html = appointments.map(item => {

        const initials = item.name
            .split(" ")
            .map(word => word[0])
            .slice(0, 2)
            .join("");

        const statusClass =
            item.status === "Подтверждено" ? "success" : "warning";

        return `

            <tr>

                <td>

                    <div class="patient-cell">

                        <div class="patient-avatar">${initials}</div>

                        <strong>${item.name}</strong>

                    </div>

                </td>

                <td>${item.doctor}</td>

                <td>${item.time}</td>

                <td>${item.service}</td>

                <td>

                    <span class="badge ${statusClass}">

                        ${item.status}

                    </span>

                </td>

            </tr>

        `;

    }).join("");

    table.innerHTML = html;

    table2.innerHTML = html;

}


// UPDATE STATISTICS

function updateStatistics() {

    document.getElementById("appointments-count").textContent =
        appointments.length + 14;

}


// INITIALIZATION

renderAppointments();