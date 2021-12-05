const parser = require('xml2json');
const fs = require('fs');

export const xmlToJson = (fileName: string) => {
    const fileContents = fs.readFileSync(fileName)
    const json = JSON.parse(parser.toJson(fileContents?.toString()));
    return json;
}
