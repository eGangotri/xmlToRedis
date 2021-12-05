const parser = require('xml2json');
const fs = require('fs');

export const xmlToJson = (fileName:string) =>{
    fs.readFile( fileName, function(err:any, data:any) {
        if(!err){
            const json = JSON.parse(parser.toJson(data?.toString()));
            //console.log("***JSON ->", JSON.stringify(json) + "***\n");
            console.log("subdomains ->", json.config.subdomains?.subdomain);
            const cookie = json.config.cookies?.cookie
            console.log("cookies", cookie );
            console.log("cookies name ->", cookie[0].name );
            console.log("cookies host->", cookie[0].host );
            console.log("cookies $t->", cookie[0].$t );
        }
        else {
            console.log("failure",err);
        }
     });
}
 