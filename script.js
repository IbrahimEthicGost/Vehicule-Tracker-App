const map = L.map('map').setView([36.75, 3.06], 14); // Alger

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Liste enrichie des véhicules
const vehicles = [
  {
    id: 1,
    name: "Taxi 01",
    emoji: "🚕",
    marque: "Hyundai",
    conducteur: "Ahmed B.",
    immatriculation: "123-AL-45",
    statut: "Actif",
    coords: [36.75, 3.06],
    icon: createIcon("🚕")
  },
  {
    id: 2,
    name: "Camion 02",
    emoji: "🚚",
    marque: "Iveco",
    conducteur: "Samir L.",
    immatriculation: "456-BJ-78",
    statut: "En Maintenance",
    coords: [36.76, 3.07],
    icon: createIcon("🚚")
  },
  {
    id: 3,
    name: "Moto 03",
    emoji: "🏍️",
    marque: "Yamaha",
    conducteur: "Kamel T.",
    immatriculation: "789-CD-99",
    statut: "Actif",
    coords: [36.74, 3.05],
    icon: createIcon("🏍️")
  }
];

// Marqueurs
vehicles.forEach(vehicle => {
  vehicle.marker = L.marker(vehicle.coords, { icon: vehicle.icon })
    .addTo(map)
    .bindPopup(`${vehicle.emoji} ${vehicle.name}`);
});

// Mise à jour sidebar
function updateSidebar() {
  const container = document.getElementById("vehicle-list");
  container.innerHTML = "";

  vehicles.forEach(vehicle => {
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.innerHTML = `
      <div><span class="emoji">${vehicle.emoji}</span><strong>${vehicle.name}</strong></div>
      <p>🚗 <strong>Marque:</strong> ${vehicle.marque}</p>
      <p>👨‍✈️ <strong>Conducteur:</strong> ${vehicle.conducteur}</p>
      <p>🏷️ <strong>Immatriculation:</strong> ${vehicle.immatriculation}</p>
      <p>🛠️ <strong>Statut:</strong> ${vehicle.statut}</p>
      <p>📍 ${vehicle.coords[0].toFixed(5)}, ${vehicle.coords[1].toFixed(5)}</p>
    `;
    container.appendChild(card);
  });
}

// Simulation de déplacement
setInterval(() => {
  vehicles.forEach(vehicle => {
    const latOffset = (Math.random() - 0.5) * 0.001;
    const lngOffset = (Math.random() - 0.5) * 0.001;

    const newLat = vehicle.coords[0] + latOffset;
    const newLng = vehicle.coords[1] + lngOffset;

    vehicle.coords = [newLat, newLng];
    vehicle.marker.setLatLng(vehicle.coords);
    vehicle.marker.setPopupContent(`${vehicle.emoji} ${vehicle.name}<br>📍 ${newLat.toFixed(5)}, ${newLng.toFixed(5)}`);
  });

  updateSidebar();
}, 2000);

function createIcon(emoji) {
  return L.divIcon({
    html: `<div style="font-size: 24px;">${emoji}</div>`,
    iconSize: [30, 30],
    className: "emoji-icon"
  });
}

// Initialisation
updateSidebar();
