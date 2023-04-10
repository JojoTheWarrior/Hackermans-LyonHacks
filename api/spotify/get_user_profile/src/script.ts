// single page application
import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "6df7668416944a8eb6ad0318fd79f76f";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
}