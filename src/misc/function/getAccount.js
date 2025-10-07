export default async function getAccount(link, version, token) {
  const res = await fetch(`${link}${version}/account?access_token=${token}`, {
    method: 'GET',
    mode: 'cors'
  });
  return res.json();
}


