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
