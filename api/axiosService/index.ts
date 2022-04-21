import axios from 'axios';
const baseUrl = 'https://api.entercosmos.space';
export default axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Request timeout
});
