export default async function getPvp(link, version, token) {
  const res = await fetch(`${link}${version}/pvp/stats?access_token=${token}`, {
    method: 'GET',
    mode: 'cors'
  });
  return res.json();
}


