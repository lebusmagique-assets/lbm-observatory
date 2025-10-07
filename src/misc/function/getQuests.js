export default async function getQuests(link, version, lang) {
  const res = await fetch(`${link}${version}/quests?ids=all&lang=${lang}`, {
    method: 'GET',
    mode: 'cors'
  });
  return res.json();
}


