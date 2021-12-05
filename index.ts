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

async function readRedisValues() {
    const subdomains = await Redis.getValues("subdomains");
    const avgCookie = await Redis.getValues("cookie:dlp-avg:vector");
}

const xmlAsJson = xmlToJson('config.xml');
xml2Redis(xmlAsJson);
readRedisValues();
process.exit(0)
