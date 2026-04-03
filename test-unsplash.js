const ids = [
  'nwmZhwOSVnM',
  'OWnsckZyDAE',
  'eNQDqj3qKj4',
  '50KffXbjIOg',
  'Xns5s92Ipcc',
  'Z-1cQs8hm3M',
  'FsmOEIRJMeA',
  'LxkWpGMEwlM',
  'POFG828-GQc',
  'Q6NFU3igbDw',
  'xKECMK7y-hA',
  'B9fM-C6lPG8',
  'VtNLbOAeO68',
  '3tpobXvtAEw'
];

async function getUrls() {
  for (const id of ids) {
    try {
      const res = await fetch(`https://unsplash.com/photos/${id}/download`);
      console.log(`${id}: ${res.url}`);
    } catch (e) {
      console.error(`${id}: Error`);
    }
  }
}

getUrls();
