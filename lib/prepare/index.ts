import resolveOptions from './resolveOptions';
import { writeTemp } from './util';

export default async function prepare (sourceDir) {
  const options = await resolveOptions(sourceDir);
  
  await writeTemp('siteData.js', options.siteData);
}