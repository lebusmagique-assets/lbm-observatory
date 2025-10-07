export default async function getBackstories(link, version, token, character) {
  const encoded = encodeURIComponent(character);
  const res = await fetch(`${link}${version}/characters/${encoded}/backstory?access_token=${token}`, {
    method: 'GET',
    mode: 'cors'
  });
  const data = await res.json();
  return data;
}


