import { load } from 'js-yaml';
import fs from 'fs';
import { parseAllDocuments } from 'yaml'

export const parseYaml = (projectId: string): any => {
  const obj = parseAllDocuments(fs.readFileSync(`${process.cwd()}/config.yaml`, {
    encoding: 'utf-8'
  }))

  const docs = obj.map((doc: any) => doc.toJS())
  const return_doc = []
  for (let doc of docs) {
    const str = JSON.stringify(doc, null, 2);
    const returnObj = JSON.parse(str.replace(/"project-id"/g, `"${projectId}"`));
    return_doc.push(returnObj)
  }
  return return_doc
}

