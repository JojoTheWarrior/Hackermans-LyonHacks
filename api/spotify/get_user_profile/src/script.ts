// single page application
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "6df7668416944a8eb6ad0318fd79f76f";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let token: string;

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    token = accessToken;
    const sidebar = await getTopTracks();

    console.log(sidebar);

}


async function fetchWebApi(endpoint: string, method: string, body?: JSON) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body:JSON.stringify(body)
    });

    console.log(res);

    return await res.json();
  }
  
  async function getTopTracks(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=short_term&limit=4', 'GET'
    )).items;
  }