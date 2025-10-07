export default async function getDoneQuests(link, version, lang, token, character) {
  const encoded = encodeURIComponent(character);
  const res = await fetch(`${link}${version}/characters/${encoded}/quests?access_token=${token}&lang=${lang}`, {
    method: 'GET',
    mode: 'cors'
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.quests)) return data.quests;
  return [];
}


