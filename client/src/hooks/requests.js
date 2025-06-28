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
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};