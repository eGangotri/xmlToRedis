import { createClient } from 'redis';

const REDIS_HOST = 'redis-18955.c13.us-east-1-3.ec2.cloud.redislabs.com'
const REDIS_PORT = 18955
const REDIS_PASSWORD = 'NRMV3VwFMrSOTLYn2CUQCLnYDvLE5d4I'

function redisClient(){
    const client = createClient({
        socket:{
            host:REDIS_HOST,
            port:REDIS_PORT
        },
        password:REDIS_PASSWORD,
    });
    client.on('error', (err) => console.log('Redis Client Error', err));
    return client;
}
export async function setValues(values: any) {
    const client = redisClient();
    await client.connect();
    await client.set('key', 'value');
}

export async function getValues() {
    const client = redisClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    const value = await client.get('key');
    return value;
}
