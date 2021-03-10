import { endpoint } from "./env/configure-endpoint";

export async function fetchStory(url) {
  const endpointUrl = endpoint.concat("/story?");
  return fetch(
    endpointUrl +
      new URLSearchParams({
        url,
      })
  ).then(data => data.json());
}
