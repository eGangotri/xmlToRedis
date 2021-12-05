import * as Redis from './service/redisService';
import { xmlToJson} from './service/xmlService'

async function xml2Redis(){
    console.log(`XML to Redis`);
    //await Redis.setValues(".");
    //console.log( "redis db return: " + await Redis.getValues());
}

xmlToJson('config.xml');
xml2Redis();