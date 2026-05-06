import { jwtDecode } from "jwt-decode";

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return false;

    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}
