
document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '4c7fce2d-a3b5-4500-8b95-58a1232425fb'; // Air Visual API key Bayu
    const apiUrl = `https://api.airvisual.com/v2/nearest_city?key=${apiKey}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const cityNameElement = document.getElementById('city-name');
            const aqiElement = document.getElementById('aqi');
            const temperatureElement = document.getElementById('temperature');
            const humidityElement = document.getElementById('humidity');

            // Update HTML oakai data
            cityNameElement.textContent = data.data.city;
            aqiElement.textContent = data.data.current.pollution.aqius;
            temperatureElement.textContent = data.data.current.weather.tp;
            humidityElement.textContent = data.data.current.weather.hu;
        })
        
        .catch((error) => {
            console.error('Error:', error);
        });
});
