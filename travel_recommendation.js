async function fetchTravelData() {
  try {
      const response = await fetch('travel_recommendation_api.json');
      if (!response.ok) {
          throw new Error('Failed to fetch travel data');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching travel data:', error);
      return null;
  }
}

let destinations = null;

fetchTravelData().then(data => {
  console.log(data);
  destinations = data;
});

const renderBeaches = (parent) => {
  const beachDestinations = destinations.beaches;

  beachDestinations.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <img src="${dest.imageUrl}" alt="${dest.name}" />
      <h3>${dest.name}</h3>
      <p>${dest.description}</p>
      <a href="#" class="visit-btn">Visit</a>
    `;
    parent.appendChild(card);
  });
}

const renderNoResults = (parent) => {
  const noResultsMessage = document.createElement('p');
  noResultsMessage.textContent = 'No results found.';
  noResultsMessage.style.color = '#333';
  parent.appendChild(noResultsMessage);
}

const renderTemples = (parent) => {
  const templeDestinations = destinations.temples;

  templeDestinations.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <img src="${dest.imageUrl}" alt="${dest.name}" />
      <h3>${dest.name}</h3>
      <p>${dest.description}</p>
      <a href="#" class="visit-btn">Visit</a>
    `;
    parent.appendChild(card);
  });
}

const renderCountries = (parent) => {
    const countryDestinations = destinations.countries;
    countryDestinations.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <img src="${dest.imageUrl}" alt="${dest.name}" />
      <h3>${dest.name}</h3>
      <p>${dest.description}</p>
      <a href="#" class="visit-btn">Visit</a>
    `;
    parent.appendChild(card);
  });
}

const queryProcessor = (parent, query) => {
  // Check if query includes certain keywords
  if (query.includes('beach')) {
    // We can match 'beach', 'beaches', 'BEACH', etc.
    console.log('Searching for beaches...');
    renderBeaches(parent);
  } else if (query.includes('temple')) {
    // Matches 'temple', 'temples', 'TEMPLE'...
    console.log('Searching for temples...');
    renderTemples(parent);
  } else if (query.includes('country') || query.includes('countries')) {
    // Matches 'country', 'countries', 'COUNTRY', etc.
    console.log('Searching for countries...');
    renderCountries(parent);
  } else {
    // No recognized keyword
    console.log('No results found.');
    renderNoResults(parent);
  }
};

export { queryProcessor };
