const API_URL = 'http://localhost:8000'; 
 async function httpGetPlanets() {

  const response = await fetch('http://localhost:8000/planets');
  const planets = await response.json();
  return planets;
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch('http://localhost:8000/launches');
  const launches = await response.json();
  return launches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try {
    const response = await fetch('http://localhost:8000/launches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });

    if (!response.ok) {
      throw new Error('Failed to submit launch');
    }

    return response;
  } catch (error) {
    console.error('Error submitting launch:', error);
    return {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  return await fetch(`http://localhost:8000/launches/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to abort launch');
    }
    return response;
  }).catch((error) => {
    console.error('Error aborting launch:', error);
    return {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    };
  });
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};