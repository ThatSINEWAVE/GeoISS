// Global variables
let map;
let issMarker;
let issPath = [];

// Initialize the map
function initMap() {
    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Create custom ISS icon
    const issIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/32px-International_Space_Station.svg.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });

    // Add ISS marker to map
    issMarker = L.marker([0, 0], {
            icon: issIcon
        })
        .addTo(map)
        .bindPopup('International Space Station');
}

// Format date for display
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
}

// Update ISS location on map
function updateISSLocation(data) {
    const lat = data.latitude;
    const lng = data.longitude;

    // Update marker position
    issMarker.setLatLng([lat, lng]);
    issMarker.bindPopup(`
                <b>International Space Station</b><br>
                Latitude: ${lat.toFixed(4)}<br>
                Longitude: ${lng.toFixed(4)}<br>
                Altitude: ${data.altitude.toFixed(2)} km<br>
                Speed: ${(data.velocity / 3.6).toFixed(2)} km/s
            `);

    // Update path
    issPath.push([lat, lng]);
    if (issPath.length > 50) {
        issPath.shift();
    }

    // Draw path
    if (window.issPathLine) {
        map.removeLayer(window.issPathLine);
    }

    window.issPathLine = L.polyline(issPath, {
        color: '#6dd5ed',
        weight: 2,
        opacity: 0.7
    }).addTo(map);

    // Center map on ISS if following
    map.panTo([lat, lng]);

    // Update info panel
    document.getElementById('latitude').textContent = lat.toFixed(4) + '°';
    document.getElementById('longitude').textContent = lng.toFixed(4) + '°';
    document.getElementById('altitude').textContent = data.altitude.toFixed(2) + ' km';
    document.getElementById('velocity').textContent = (data.velocity / 3.6).toFixed(2) + ' km/s';
    document.getElementById('visibility').textContent = data.visibility;

    // Update time
    document.getElementById('update-time').textContent = 'Last updated: ' + formatDate(data.timestamp);
}

// Update astronaut information
function updateAstronauts(data) {
    const astronautList = document.getElementById('astronaut-list');
    const astronautCount = document.getElementById('astronaut-count');

    // Update count
    astronautCount.innerHTML = `
                <span class="data-label">Total:</span>
                <span class="data-value">${data.number} astronauts</span>
            `;

    // Clear previous list
    astronautList.innerHTML = '';

    // Group astronauts by craft
    const issAstronauts = data.people.filter(person => person.craft === 'ISS');
    const tiangongAstronauts = data.people.filter(person => person.craft === 'Tiangong');
    const otherAstronauts = data.people.filter(person => !['ISS', 'Tiangong'].includes(person.craft));

    // Add ISS astronauts
    if (issAstronauts.length > 0) {
        const craftHeader = document.createElement('li');
        craftHeader.textContent = `ISS Crew (${issAstronauts.length})`;
        craftHeader.style.fontWeight = 'bold';
        craftHeader.style.color = '#6dd5ed';
        craftHeader.style.paddingTop = '10px';
        astronautList.appendChild(craftHeader);

        issAstronauts.forEach(person => {
            const li = document.createElement('li');
            li.className = 'astronaut-item';
            li.innerHTML = `
                        <span class="astronaut-name">${person.name}</span>
                        <span class="astronaut-craft iss-craft">ISS</span>
                    `;
            astronautList.appendChild(li);
        });
    }

    // Add Tiangong astronauts
    if (tiangongAstronauts.length > 0) {
        const craftHeader = document.createElement('li');
        craftHeader.textContent = `Tiangong Crew (${tiangongAstronauts.length})`;
        craftHeader.style.fontWeight = 'bold';
        craftHeader.style.color = '#6dd5ed';
        craftHeader.style.paddingTop = '10px';
        astronautList.appendChild(craftHeader);

        tiangongAstronauts.forEach(person => {
            const li = document.createElement('li');
            li.className = 'astronaut-item';
            li.innerHTML = `
                        <span class="astronaut-name">${person.name}</span>
                        <span class="astronaut-craft tiangong-craft">Tiangong</span>
                    `;
            astronautList.appendChild(li);
        });
    }

    // Add other astronauts
    if (otherAstronauts.length > 0) {
        const craftHeader = document.createElement('li');
        craftHeader.textContent = `Other Spacecraft (${otherAstronauts.length})`;
        craftHeader.style.fontWeight = 'bold';
        craftHeader.style.color = '#6dd5ed';
        craftHeader.style.paddingTop = '10px';
        astronautList.appendChild(craftHeader);

        otherAstronauts.forEach(person => {
            const li = document.createElement('li');
            li.className = 'astronaut-item';
            li.innerHTML = `
                        <span class="astronaut-name">${person.name}</span>
                        <span class="astronaut-craft">${person.craft}</span>
                    `;
            astronautList.appendChild(li);
        });
    }
}

// Fetch ISS location data
async function fetchISSData() {
    try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        updateISSLocation(data);
    } catch (error) {
        console.error('Error fetching ISS data:', error);
    }
}

// Fetch astronaut data
async function fetchAstronautData() {
    try {
        const response = await fetch('https://corsproxy.io/?http://api.open-notify.org/astros.json');

        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Try parsing the response as JSON
        const data = await response.json();
        updateAstronauts(data);
    } catch (error) {
        // Log the error and provide additional details
        console.error('Error fetching astronaut data:', error);

        // Handle error gracefully, e.g., show a message to the user
        const astronautList = document.getElementById('astronaut-list');
        astronautList.innerHTML = `<li>Failed to load astronaut data. Please try again later.</li>`;
    }
}

// Refresh all data
function refreshData() {
    const button = document.getElementById('refresh-button');
    button.classList.add('loading');
    button.textContent = 'Refreshing...';

    Promise.all([fetchISSData(), fetchAstronautData()])
        .finally(() => {
            button.classList.remove('loading');
            button.textContent = 'Refresh Data';
        });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    refreshData();

    // Set up auto-refresh interval (every 10 seconds)
    setInterval(refreshData, 10000);

    // Manual refresh button
    document.getElementById('refresh-button').addEventListener('click', refreshData);
});