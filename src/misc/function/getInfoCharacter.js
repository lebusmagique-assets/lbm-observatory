export default async function getInfoCharacter(link, version, lang, token, character) {
  const encoded = encodeURIComponent(character);
  const res = await fetch(`${link}${version}/characters/${encoded}/core?access_token=${token}&lang=en`, { // api returns stable fields in en
    method: 'GET',
    mode: 'cors'
  });
  const data = await res.json();
  return data;
}


