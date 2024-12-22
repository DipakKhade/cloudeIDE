import { load } from 'js-yaml';
import fs from 'fs';

export const parseYaml = ():any => {
  const obj = load(fs.readFileSync(`${process.cwd()}/config.yml`, {
    encoding: 'utf-8'
  }))
  return obj;
}

