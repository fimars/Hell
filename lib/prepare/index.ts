import resolveOptions from './resolveOptions';
import { writeTemp } from './util';

export default async function prepare (sourceDir) {
  const options = await resolveOptions(sourceDir);
  
  await writeTemp('siteData.js', `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`);
};