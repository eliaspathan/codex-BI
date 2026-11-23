const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
for(const test of ['test.cjs','test-amazon.cjs'])execFileSync(process.execPath,[path.join(__dirname,test)],{cwd:__dirname,stdio:'inherit'});
const output=path.join(__dirname,'dist');
fs.mkdirSync(output,{recursive:true});
for(const file of ['index.html','amazon-picks.html'])fs.copyFileSync(path.join(__dirname,file),path.join(output,file));
console.log('Built both website pages; review catalogues are excluded from website assets.');
