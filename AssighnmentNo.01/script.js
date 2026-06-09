// ===== Initial Events Data =====
let events = [
  {
    id: 1,
    name: "Tech Innovation Summit",
    date: "2025-07-15",
    description: "A full-day conference featuring talks on AI, blockchain, and cloud computing by industry leaders."
  },
  {
    id: 2,
    name: "Photography Workshop",
    date: "2025-06-10",
    description: "Hands-on workshop covering portrait and landscape photography techniques for beginners."
  },
  {
    id: 3,
    name: "Annual Business Gala",
    date: "2025-08-22",
    description: "Formal networking event for business professionals with keynote speakers and award ceremony."
  },
  {
    id: 4,
    name: "Web Dev Bootcamp",
    date: "2024-12-01",
    description: "Intensive three-day bootcamp covering HTML, CSS, JavaScript and React basics."
  }
];

let nextId = 5;

// ===== Set Footer Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Render All Events =====
function renderEvents(list) {
  const container = document.getElementById("eventList");
  const noEvents = document.getElementById("noEvents");
  container.innerHTML = "";

  if (list.length === 0) {
    noEvents.classList.remove("hidden");
    return;
  }

  noEvents.classList.add("hidden");

  list.forEach(function (event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(event.date);
    const isPast = eventDate < today;

    const card = document.createElement("div");
    card.classList.add("event-card");
    if (isPast) card.classList.add("past");

    // Format date nicely
    const formattedDate = eventDate.toLocaleDateString("en-PK", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p class="event-date">
        ${formattedDate}
        ${isPast ? '<span class="past-badge">Past</span>' : ''}
      </p>
      <p class="event-desc">${event.description}</p>
      <button class="delete-btn" onclick="deleteEvent(${event.id})">🗑 Delete</button>
    `;

    container.appendChild(card);
  });
}

// ===== Sort Events by Date =====
function sortEvents(arr) {
  return arr.slice().sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
}

// ===== Initial Render =====
renderEvents(sortEvents(events));

// ===== Add Event =====
function addEvent() {
  const nameInput = document.getElementById("eventName");
  const dateInput = document.getElementById("eventDate");
  const descInput = document.getElementById("eventDesc");
  const warning = document.getElementById("warningMsg");

  const name = nameInput.value.trim();
  const date = dateInput.value.trim();
  const desc = descInput.value.trim();

  // Validation
  if (!name || !date || !desc) {
    warning.classList.remove("hidden");
    return;
  }

  warning.classList.add("hidden");

  // Add to array
  events.push({
    id: nextId++,
    name: name,
    date: date,
    description: desc
  });

  // Clear form
  nameInput.value = "";
  dateInput.value = "";
  descInput.value = "";

  // Re-render sorted
  renderEvents(sortEvents(events));
}

// ===== Delete Event =====
function deleteEvent(id) {
  events = events.filter(function (e) {
    return e.id !== id;
  });
  renderEvents(sortEvents(events));
}

// ===== Search / Filter =====
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();

  if (!query) {
    renderEvents(sortEvents(events));
    return;
  }

  const filtered = events.filter(function (e) {
    return (
      e.name.toLowerCase().includes(query) ||
      e.date.includes(query)
    );
  });

  renderEvents(sortEvents(filtered));
});
