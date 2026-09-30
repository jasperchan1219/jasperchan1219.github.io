import {readFile,writeFile,mkdir,cp,rm,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const content=JSON.parse(await readFile(resolve(root,'content.json'),'utf8'));
const template=await readFile(resolve(root,'_templates/page.html'),'utf8');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
function url(s){if(!/^(https:\/\/|mailto:|#[A-Za-z0-9_-])/.test(s))throw Error('Only HTTPS, email and section links are supported: '+s);return esc(s)}
function rich(s){
 const links=[];
 s=s.replace(/\[([^\]\n]+)\]\(([^\s)]+)\)/g,(_,label,target)=>{links.push('<a href="'+url(target)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+'</a>');return '\u0000'+(links.length-1)+'\u0000'});
 s=esc(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*\n]+)\*/g,'<em>$1</em>').replace(/\n/g,'<br>');
 return s.replace(/\u0000(\d+)\u0000/g,(_,i)=>links[Number(i)]);
}
const assetPaths=[];
const html=template.replace(/\{\{\s*(text|attr|rich|url|asset):([\w.]+)\s*\}\}/g,(_,kind,path)=>{
 const value=path.split('.').reduce((v,k)=>v?.[k],content);
 if(typeof value!=='string')throw Error('Missing text field: '+path);
 if(kind==='asset'){
  if(!/^assets\/[A-Za-z0-9_./-]+\.(png|jpe?g|webp|gif)$/i.test(value)||value.includes('..'))throw Error('Invalid image path: '+path);
  assetPaths.push(value);return esc(value);
 }
 return kind==='rich'?rich(value):kind==='url'?url(value):esc(value);
});
if(/\{\{\s*(text|attr|rich|url|asset):/.test(html))throw Error('Unresolved template field');
for(const path of assetPaths)await stat(resolve(root,path));
await rm(resolve(root,'_site'),{recursive:true,force:true});
await mkdir(resolve(root,'_site'),{recursive:true});
await cp(resolve(root,'assets'),resolve(root,'_site/assets'),{recursive:true});
await writeFile(resolve(root,'_site/index.html'),html);
await writeFile(resolve(root,'_site/.nojekyll'),'');
console.log('Website built successfully; '+assetPaths.length+' image references checked.');
