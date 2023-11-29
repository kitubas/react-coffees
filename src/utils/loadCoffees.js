const COFFEE_API_BASE_URL = 'https://api.sampleapis.com/coffee';

async function fetchCoffees(type) {
    try {
        const response = await fetch(`${COFFEE_API_BASE_URL}/${type}`);
        if (!response.ok) {
            throw new Error(`Error fetching ${type} coffees: ${response.statusText}`);
        }
        const coffeesJson = await response.json();
        return coffeesJson;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow so that the calling function is aware an error occurred.
    }
}

export async function loadHotCoffees(callback) {
    const coffeesJson = await fetchCoffees('hot');
    callback({ coffees: coffeesJson, theme: 'hot' });
}

export async function loadIcedCoffees(callback) {
    const coffeesJson = await fetchCoffees('iced');
    callback({ coffees: coffeesJson, theme: 'iced' });
}
