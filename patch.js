var fs=require('fs');  
var c=JSON.parse(fs.readFileSync('tsconfig.json','utf8'));  
c.compilerOptions.baseUrl='.';  
c.compilerOptions.paths={};  
c.compilerOptions.paths['@/*']=['src/*'];  
fs.writeFileSync('tsconfig.json',JSON.stringify(c,null,2));  
