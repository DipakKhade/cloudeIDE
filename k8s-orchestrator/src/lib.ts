import { load } from 'js-yaml';
import fs from 'fs';

export const parseYaml = (projectId:string):any => {
  const obj = load(fs.readFileSync(`${process.cwd()}/config.yml`, {
    encoding: 'utf-8'
  }))

  const str = JSON.stringify(obj, null, 2);
  const returnObj = JSON.parse(str.replace(/"project-id"/g, `"${projectId}"`));
  return returnObj;
}

