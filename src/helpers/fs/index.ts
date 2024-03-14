import { outputJSONSync, removeSync } from 'fs-extra';
import path from 'node:path';

interface WriteJsonFile {
  path: string;
  content: Record<any, any>;
}

const writeJsonFile = ({ path: p, content }: WriteJsonFile) => {
  console.log('writeJsonFile', p);
  try {
    return outputJSONSync(path.normalize(p), content, {
      spaces: 2,
    });
  } catch (e) {
    throw e;
  }
};

const deleteFile = ({ path: p }: { path: string }) => {
  console.log('deleteFile', path);
  try {
    return removeSync(path.normalize(p));
  } catch (e) {
    throw e;
  }
};
export { writeJsonFile, deleteFile };
