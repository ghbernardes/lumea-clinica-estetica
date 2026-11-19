import fs from 'node:fs';import vm from 'node:vm';
const html=fs.readFileSync('dist/index.html','utf8');const start=html.indexOf('<script type="module">')+'<script type="module">'.length,end=html.lastIndexOf('</script>');
if(start<21||end<start)throw new Error('Bundle portátil ausente.');const code=html.slice(start,end);new vm.Script(code,{filename:'lumea-portable.js'});if(/\bimport\s*\{/.test(code))throw new Error('O bundle portátil mantém uma importação externa.');
const paths=new Set([...html.matchAll(/(?:src|href)="((?:public|src)\/[^"#]+)"/g)].map(m=>m[1]));for(const p of paths)if(!fs.existsSync('dist/'+p))throw new Error('Ativo ausente no build: '+p);
for(const file of fs.readdirSync('public/images').filter(f=>f.endsWith('.webp')&&!f.includes('-sm'))){const small=file.replace('.webp','-sm.webp');if(!fs.existsSync('dist/public/images/'+small))throw new Error('Imagem responsiva ausente: '+small);}
console.log(`Bundle portátil compilado, sem imports externos; ${paths.size} referências estáticas e todas as variantes de imagem verificadas.`);
