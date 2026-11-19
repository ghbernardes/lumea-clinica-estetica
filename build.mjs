import fs from 'node:fs/promises';
await fs.mkdir('dist',{recursive:true});for(const item of ['index.html','admin.html','404.html','public','src','robots.txt'])await fs.cp(item,`dist/${item}`,{recursive:true});
const clean=p=>p.replace(/import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?/g,'').replace(/\bexport /g,'');
const common=(await Promise.all(['src/data/seed.js','src/services/repository.js','src/ui.js','src/motion.js'].map(p=>fs.readFile(p,'utf8')))).map(clean).join('\n');
const app=clean(await fs.readFile('src/app.js','utf8')),admin=clean(await fs.readFile('src/admin.js','utf8'));
const code=`${common}\nif(location.hash==='#painel'){document.body.classList.add('admin-body');${admin}}else{${app}}\nwindow.addEventListener('hashchange',()=>{if((location.hash==='#painel')!==document.body.classList.contains('admin-body'))location.reload()});`;
let html=await fs.readFile('index.html','utf8');html=html.replace('</head>','<link rel="stylesheet" href="src/styles/admin.css"></head>').replace('<script type="module" src="src/app.js"></script>',()=>`<script type="module">${code.replaceAll('admin.html','index.html#painel').replaceAll('</script','<\\/script')}</script>`);
await fs.writeFile('dist/index.html',html);await fs.writeFile('dist/admin.html','<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=index.html#painel"><title>Painel LUMÉA</title><a href="index.html#painel">Abrir painel</a>');
console.log('Build estático e portátil concluído em dist/. Abra dist/index.html ou use npm run dev.');
