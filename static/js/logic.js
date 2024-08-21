// Define the URL for the earthquake data
const earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"; // 1.0_day.geojson last 7 days

// Create the map object and set its initial view to a given location and zoom level
let map = L.map("map").setView([37.7749, -122.4194], 5); // Adjust latitude, longitude, and zoom as needed

// Add the base layer (background map) using OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(map);

// Function to determine the marker size based on earthquake magnitude
function markerSize(magnitude) {
    return magnitude * 4; // Adjust the multiplier for different sizing
}

// Function to determine the marker color based on earthquake depth
function markerColor(depth) {
    if (depth > 90) return "#FF0000";
    if (depth > 70) return "#FF4500";
    if (depth > 50) return "#FF8C00";
    if (depth > 30) return "#FFD700";
    if (depth > 10) return "#ADFF2F";
    return "#7CFC00";
}

// Fetch the earthquake data and plot it on the map
d3.json(earthquakeDataUrl).then(data => {
    // Get the data
    console.log(data)

    // Loop through the data and create a marker for each earthquake
    data.features.forEach(earthquake => {
        let coords = earthquake.geometry.coordinates;
        let magnitude = earthquake.properties.mag;
        let depth = coords[2];
        let lat = coords[1];
        let lon = coords[0];

        // Create a circle marker with size based on magnitude and color based on depth
        L.circleMarker([lat, lon], {
            radius: markerSize(magnitude),
            fillColor: markerColor(depth),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(`<h3>Magnitude: ${magnitude}</h3><hr><p>Depth: ${depth} km</p><p>${earthquake.properties.place}</p>`).addTo(map);
    });
});

// Create a legend to provide context for the data
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let grades = [-10, 10, 30, 50, 70, 90];
    let colors = [
        "#7CFC00",
        "#ADFF2F",
        "#FFD700",
        "#FF8C00",
        "#FF4500",
        "#FF0000"
    ];

    // Add a title to the legend
    div.innerHTML += '<strong>Depth (km)</strong><br>';

    // Loop through the intervals to generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.8;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

// Add the legend to the map
legend.addTo(map);

