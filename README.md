<div align="center">

# GeoISS - International Space Station (ISS) Tracker

GeoISS is a web application that allows you to track the location of the International Space Station (ISS) in real-time. You can also see details about the ISS's current position, velocity, and altitude, as well as the astronauts currently aboard the station. The application uses the Leaflet mapping library to display the ISS's location on an interactive map and provides live updates from public APIs.

![GeoISS](https://github.com/user-attachments/assets/667c032a-8a8f-4ce7-be6a-ecef4ea96b10)

</div>

## Features
- Real-time tracking of the ISS's location on a map.
- Display of the ISS's latitude, longitude, altitude, velocity, and visibility.
- A list of astronauts currently in space, grouped by spacecraft.
- A "Refresh Data" button to fetch the latest information on the ISS and astronauts.
- Custom marker on the map to represent the ISS.
- A path showing the ISS's last 50 locations.

<div align="center">

## ☕ [Support my work on Ko-Fi](https://ko-fi.com/thatsinewave)

</div>

## Requirements
- A modern web browser (Google Chrome, Firefox, Safari, etc.)
- Internet connection to fetch live data from APIs.

## Local Setup

### 1. Clone the repository (if applicable)
If you want to deploy the application locally or contribute to the code, start by cloning this repository:

```bash
git clone <repository_url>
```

### 2. Files
The project includes the following key files:
- `index.html`: The main HTML file containing the structure of the application.
- `styles.css`: The stylesheet responsible for the layout and design.
- `script.js`: The JavaScript file that handles map initialization, data fetching, and DOM updates.

### 3. Deployment
You can deploy GeoISS by simply opening the `index.html` file in a modern browser. For web hosting, you can upload the files to any static hosting service such as GitHub Pages, Netlify, or Vercel.

### 4. API Endpoints
- **ISS Location Data:** The ISS location is fetched from the [Where the ISS at API](https://wheretheiss.at/), which provides real-time ISS position information.
- **Astronaut Data:** Astronaut data is fetched from the [Open Notify API](http://api.open-notify.org/astros.json), listing the astronauts currently in space and the spacecraft they are aboard.

### 5. Features in Detail
- **ISS Location Updates:** The location of the ISS is updated in real-time, and the position is reflected on the map. The position of the ISS is also displayed with information such as latitude, longitude, altitude, velocity, and visibility.
- **Astronaut Information:** The astronaut data shows a list of astronauts currently in space, categorized by the spacecraft they are aboard (e.g., ISS, Tiangong, and others).
- **Refresh Data:** Click the "Refresh Data" button to manually refresh the information on the ISS and astronauts. The data will reload without requiring a page refresh.

### 6. Technologies Used
- **Leaflet.js**: A leading JavaScript library for interactive maps.
- **Fetch API**: For fetching real-time data from public APIs.
- **CSS3**: For styling the application.

## Troubleshooting
- **Data Not Updating:** If the ISS or astronaut data is not updating, ensure your internet connection is stable and check the browser console for any API-related errors.
- **Map Not Loading:** Ensure that the Leaflet.js library is properly included and accessible. You can also try clearing your browser cache.

<div align="center">

## [Join my discord server](https://discord.gg/2nHHHBWNDw)

</div>

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits
- The ISS icon is courtesy of [Wikipedia](https://en.wikipedia.org/wiki/File:International_Space_Station.svg).
- This application uses public APIs to fetch real-time ISS and astronaut data.
