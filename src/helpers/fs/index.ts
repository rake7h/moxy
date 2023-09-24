import { outputJSONSync, removeSync, outputFileSync, readFileSync } from 'fs-extra';
import path from 'node:path'

interface WriteJsonFile {
    path: string
    content: Record<any, any>
}

interface WriteRawFile {
    path: string
    content: string
}

interface ReadFile {
    path: string
}

const writeJsonFile = ({ path:p, content }: WriteJsonFile) => {
    console.log('writeJsonFile', p)
    try {
        return outputJSONSync(path.normalize(p), content, {
            spaces: 2
        });
    }
    catch (e) {
        throw e
    }
}

const writeRawFile = ({ path:p, content }: WriteRawFile) => {
    console.log('writeRawFile', p)
    try {
        return outputFileSync(path.normalize(p), content);
    }
    catch (e) {
        throw e
    }
}

const deleteFile = ({ path:p }: { path: string }) => {
    console.log('deleteFile', path)
    try {
        return removeSync(path.normalize(p))
    }
    catch (e) {
        throw e
    }
}

const readFile = ({ path:p }: ReadFile) => {
    console.log('readFile', p)
    try {
        return readFileSync(path.normalize(p), "utf8");
    }
    catch (e) {
        throw e
    }
}

export { writeJsonFile, deleteFile, writeRawFile, readFile }