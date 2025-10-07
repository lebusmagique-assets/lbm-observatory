export default async function getSeasons(link, version, lang, ids = 'all') {
  const res = await fetch(`${link}${version}//stories/seasons?ids=${ids}&lang=${lang}`, {
    method: 'GET',
    mode: 'cors'
  });
  return res.json();
}


