export default async function getCharacters(link, version, lang, token) {
  const res = await fetch(`${link}${version}/characters?access_token=${token}&lang=${lang}`, {
    method: 'GET',
    mode: 'cors'
  });
  return res.json();
}


