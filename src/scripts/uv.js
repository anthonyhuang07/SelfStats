document.addEventListener('DOMContentLoaded', () => {
  const uvIndex = document.getElementById('uvIndex');
  const uvLevel = document.getElementById('uvLevel');
  const infoButton = document.querySelector('.infoButton');
  const modal = document.getElementById('infoModal');

  // Function to update UV index and level
  const updateUVIndex = (uvValue) => {
    uvIndex.innerText = uvValue.toFixed(1);

    if (uvValue <= 2) {
      uvLevel.innerText = 'Low';
      document.body.style.background = 'linear-gradient(to bottom, #00E063, #006B3C)';
    } else if (uvValue <= 5) {
      uvLevel.innerText = 'Moderate';
      document.body.style.background = 'linear-gradient(to bottom, #FFD202, #B8860B)';
    } else if (uvValue <= 7) {
      uvLevel.innerText = 'High';
      document.body.style.background = 'linear-gradient(to bottom, #FF8C00, #B85E00)';
    } else if (uvValue <= 10) {
      uvLevel.innerText = 'Very High';
      document.body.style.background = 'linear-gradient(to bottom, #FF4500, #B82E00)';
    } else {
      uvLevel.innerText = 'Extreme';
      document.body.style.background = 'linear-gradient(to bottom, #9400D3, #5E0094)';
    }
  };

  // Function to fetch UV index from weather API
  const fetchUVIndex = (latitude, longitude) => {
    const apiKey = '5954ba0507c84dc9b42205019241412'; // Replace with your weather API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const uvValue = data.current.uv;
        updateUVIndex(uvValue);
      })
      .catch(error => console.error('Error fetching UV index:', error));
  };

  // Get user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchUVIndex(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        uvLevel.innerText = 'Please allow location access.';
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    uvLevel.innerText = 'Please allow location access.';
  }

  infoButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});