import * as Redis from './service/redisService';
import { xmlToJson } from './service/xmlService'

async function xml2Redis(xmlAsJson: any) {
    console.log(`XML to Redis`);
    const configTuple = []
    configTuple.push(["subdomains", JSON.stringify(xmlAsJson.config.subdomains?.subdomain)])
    const cookieObj = xmlAsJson.config.cookies?.cookie;
    const cookies = cookieObj.map((element: any) => {
        configTuple.push([`cookie:${element.name}:${element.host}`, element.$t]);
    })
    //await Redis.setValues(configTuple);
}

async function readRedisValues() {
    const subdomains = await Redis.getValues("subdomains");
    const avgCookie = await Redis.getValues("cookie:dlp-avg:vector");

    console.log(`subdomains ${subdomains}`);
    console.log(`avgCookie ${avgCookie}`);
}

const xmlAsJson = xmlToJson('config.xml');
console.log("***JSON ->" + JSON.stringify(xmlAsJson) + "***\n");
console.log("subdomains ->", xmlAsJson.config.subdomains?.subdomain);
console.log('-->' + JSON.stringify(xmlAsJson.config.cookies?.cookie));
xml2Redis(xmlAsJson);
readRedisValues();


