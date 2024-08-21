# Earthquake Visualization with Leaflet

This project is an interactive map visualization of earthquake data using [Leaflet](https://leafletjs.com/). The map plots earthquakes based on their longitude and latitude and provides insights into the magnitude and depth of each earthquake. Additionally, the map includes tectonic plates boundaries to illustrate the relationship between earthquake occurrences and tectonic activity.

## Data Sources

- **Earthquake Data**: [M1.0+ Earthquakes in past day](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson)
- **Tectonic Plates Data**: [Tectonic Plates GeoJSON](https://github.com/fraxen/tectonicplates)

## Project Preview
[https://steve-yuan-8276.github.io/leaflet-challenge/](https://steve-yuan-8276.github.io/leaflet-challenge/)

Click the link below to view the project preview.

## Project Overview

### Part 1: Earthquake Data Visualization

In the first part of the project, we visualize earthquake data on a map:

- **Earthquake Markers**:
    - The size of each marker represents the magnitude of the earthquake. Larger markers indicate stronger earthquakes.
    - The color of each marker corresponds to the depth of the earthquake. Darker colors represent deeper earthquakes.
- **Popups**:
    - Clicking on a marker will display a popup with additional information about the earthquake, including its magnitude, depth, and location.
- **Legend**:
    - A legend is included in the bottom right corner of the map to provide context on the color coding used for the depth of the earthquakes.


### Part 2: Tectonic Plates and Multiple Layers

In the second part of the project, we enhance the visualization by adding tectonic plates boundaries and multiple base layers:

- **Tectonic Plates**:

    - The map includes tectonic plates boundaries, allowing users to see the relationship between the location of earthquakes and tectonic plate edges.
- **Additional Base Layers**:

    - **Grayscale**: A grayscale map layer for a more subdued view.
    - **Outdoors**: A terrain-focused map layer, highlighting geographical features.
- **Layer Control**:

    - Users can switch between the different base maps (Satellite, Grayscale, Outdoors) and toggle the visibility of the earthquake data and tectonic plates boundaries.

Thanks for your time. Have fun!
