export default async function getStories(link, version, lang, ids = 'all') {
  const res = await fetch(`${link}${version}/stories?ids=${ids}&lang=${lang}`, {
    method: 'GET',
    mode: 'cors'
  });
  return res.json();
}


