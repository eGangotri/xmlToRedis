import * as Redis from './service/redisService';
import { xmlToJson} from './service/xmlService'

async function xml2Redis(xmlAsJson:any){
    console.log(`XML to Redis`);
    const configTuple = []
    configTuple.push(["subdomains",xmlAsJson.config.subdomains?.subdomain])
    const cookieObj = xmlAsJson.config.cookies?.cookie;
    const cookies = cookieObj.map( (element:any) =>{
        configTuple.push([`cookie:${element.name}:${element.host}`, element.$t]);
    })
    console.log(configTuple);
    await Redis.setValues(configTuple);
}

const xmlAsJson = xmlToJson('config.xml');
console.log("***JSON ->"+ JSON.stringify(xmlAsJson) + "***\n");
console.log("subdomains ->", xmlAsJson.config.subdomains?.subdomain);
console.log('-->' + JSON.stringify(xmlAsJson.config.cookies?.cookie));
xml2Redis(xmlAsJson);

Redis.getValues("subdomains").then(x=>{console.log('-->' + x)});
Redis.getValues("cookie:dlp-avg:vector").then(x=>{console.log('-->' + x)});

