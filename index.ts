import * as Redis from './service/redisService';
import { xmlToJson } from './service/xmlService'

async function xml2Redis(xmlAsJson: any) {
    console.log(`Welcome to XML to Redis`);
    const configTuple = []
    configTuple.push(["subdomains", JSON.stringify(xmlAsJson.config.subdomains?.subdomain)])
    const cookieObj = xmlAsJson.config.cookies?.cookie;
    cookieObj.map((element: any) => {
        configTuple.push([`cookie:${element.name}:${element.host}`, element.$t]);
    })
    await Redis.setValues(configTuple);
}

async function readRedisValues(verboseFlag:boolean = false) {
    const subdomains = await Redis.getValues("subdomains");
    const avgCookie = await Redis.getValues("cookie:dlp-avg:vector");
    if(verboseFlag){
        console.log(`subdomains: ${subdomains}`);
        console.log(`avgCookie: ${avgCookie}`);
    }
}

export async function execute(fileName:string,verboseFlag:boolean = false){
    const arg1 = process.argv[2];
    if(arg1){
        if(process.argv[3]){
            fileName = process.argv[3]
            if(arg1 === '-v'){
                verboseFlag = true;
            }
        }
        else {
            fileName = arg1 
        }
    }
    console.log(`arg1: '${arg1}'`);

const xmlAsJson = xmlToJson(fileName || 'config.xml',verboseFlag);
await xml2Redis(xmlAsJson);
await readRedisValues(verboseFlag);
process.exit(0)
}

execute("");
