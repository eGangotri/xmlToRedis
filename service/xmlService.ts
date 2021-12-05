const parser = require('xml2json');
const fs = require('fs');

export const xmlToJson = (fileName: string, verboseFlag: boolean = false) => {
    const fileContents = fs.readFileSync(fileName)
    const json = JSON.parse(parser.toJson(fileContents?.toString()));
    if (verboseFlag) {
        //Uncomment to View
        console.log("***JSON ->", JSON.stringify(json) + "***\n");
        console.log("subdomains ->", json.config.subdomains?.subdomain);
        const cookie = json.config.cookies?.cookie
        console.log("cookies", cookie);
        console.log("cookies name ->", cookie[0].name);
        console.log("cookies host->", cookie[0].host);
        console.log("cookies $t->", cookie[0].$t);
    }
    return json
}
