(()=>{'use strict';
const cats=[
['Job Ideas','jobs','careers, professions, and workplace roles',['research coordinator','community planner','systems analyst','field specialist'],['workforce planning','training programs','career exploration','service design']],
['Person Names','names','fictional characters and identity concepts',['character profile','fictional persona','sample identity','story protagonist'],['character development','worldbuilding','sample datasets','narrative design']],
['Email Addresses','emails','sample digital communication identities',['contact prototype','mailbox example','newsletter profile','communication template'],['interface testing','digital onboarding','messaging workflows','prototype design']],
['Passwords','passwords','synthetic security examples',['security training scenario','password policy exercise','authentication prototype','credential mockup'],['security education','interface testing','access design','simulation']],
['World Languages','languages','language learning and translation concepts',['multilingual learning kit','phrasebook concept','translation exercise','language exchange'],['learning design','cultural exploration','communication','localization']],
['Random Numbers','numbers','numeric simulations and identifiers',['number sequence','simulation sample','randomized identifier','numeric challenge'],['testing','probability exercises','data analysis','simulation']],
['Domain Names','domains','websites and digital naming',['domain concept','web identity','naming prototype','site concept'],['brand exploration','web publishing','online projects','digital discovery']],
['Coding Dictionary','coding','software engineering and programming concepts',['coding lesson','API prototype','programming glossary','developer exercise'],['software education','tool building','developer documentation','technical experiments']],
['E-commerce Products','ecommerce','retail and product design',['product concept','online storefront','retail bundle','shopping experience'],['commerce research','product discovery','catalog design','merchandising']],
['Food Generator','food','food, menus, and culinary design',['menu concept','food experience','recipe prototype','culinary workshop'],['restaurant planning','flavor exploration','hospitality','food innovation']],
['Future History','future','imagined futures and speculative scenarios',['future scenario','speculative timeline','civilization concept','tomorrow experiment'],['science fiction','scenario planning','future studies','story development']],
['Book Titles','books','publishing and literature',['book concept','novel outline','publishing series','literary project'],['creative writing','storytelling','editorial planning','publishing']],
['Music Titles','music','music and sound',['album concept','soundtrack idea','song collection','music project'],['composition','sound design','performance','music publishing']],
['Username Generator','username','online aliases and profiles',['username identity','profile prototype','community handle','account naming'],['community design','social platforms','fictional profiles','testing']],
['Other Planet Language','alien','fictional constructed language',['fictional phrasebook','invented-language dialogue','constructed vocabulary','worldbuilding text'],['fiction writing','creative linguistics','story worlds','language invention']]
];
const image='assets/collections/16-32767-neon.jpg';const grid=document.getElementById('comboGrid');if(!grid)return;
const search=document.getElementById('comboSearch'),size=document.getElementById('comboSize'),count=document.getElementById('comboCount'),status=document.getElementById('comboStatus');
const entries=[];for(let mask=1;mask<(1<<15);mask++){const indices=[];for(let i=0;i<15;i++)if(mask&(1<<i))indices.push(i);entries.push({mask,indices});}
entries.sort((a,b)=>a.indices.length-b.indices.length||a.mask-b.mask);entries.forEach((e,i)=>e.number=i+1);
// All 32767 nonempty subsets: 15 original singletons + 32752 combined-category sets.
let filtered=entries,offset=0,selected=null,results=[];const batch=36;
const title=e=>e.indices.length===1?cats[e.indices[0]][0]+' Generator':e.indices.map(i=>cats[i][0]).join(' + ');
const description=e=>e.indices.length===1?'Explore '+cats[e.indices[0]][2]+'.':'Create a structured concept combining '+e.indices.map(i=>cats[i][0]).join(', ')+'. Each field contributes a specific component.';
const words=['tech','web','media','store','shop','news','hub','zone','world','space','lab','blog','app','site','online','digital','smart','cool','super','mega','pro','link','box','cloud'];
const tlds=['.com','.net','.org','.io','.co'];
function randomDomain(){const a=words[Math.floor(Math.random()*words.length)],b=words[Math.floor(Math.random()*words.length)];return (a===b?a:a+b)+tlds[Math.floor(Math.random()*tlds.length)];}
function updateSite(link){const domain=randomDomain(),img=link.querySelector('img'),name=link.querySelector('.z-site-name');link.href='https://'+domain;name.textContent=domain;img.src='https://www.google.com/s2/favicons?domain='+encodeURIComponent(domain)+'&sz=128';img.onerror=()=>{img.onerror=null;img.src='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="20" fill="#e9e9ef"/><text x="48" y="64" text-anchor="middle" font-size="48">🌐</text></svg>');};}
function card(e){const article=document.createElement('article');article.className='z-collection';const n=e.number;article.innerHTML='<div class="z-collection-image z-site-image"><a class="z-site-link" href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit random website"><img loading="lazy" width="72" height="72" alt="Website favicon"><strong class="z-site-name"></strong><span class="z-site-visit">VISIT WEBSITE ↗</span></a></div><div class="z-collection-body"><small>GENERATOR '+String(n).padStart(5,'0')+' · '+e.indices.length+' '+(e.indices.length===1?'CATEGORY':'CATEGORIES')+'</small><h3></h3><p></p><button type="button" class="z-collection-button">OPEN GENERATOR ↓</button></div>';article.querySelector('h3').textContent=title(e);article.querySelector('p').textContent=description(e);article.querySelector('button').addEventListener('click',()=>open(e));updateSite(article.querySelector('.z-site-link'));return article;}
// Update only cards currently in the viewport to avoid thousands of network requests.
setInterval(()=>{document.querySelectorAll('#comboGrid .z-site-link').forEach(link=>{const r=link.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)updateSite(link);});},5000);

function addBatch(){if(offset>=filtered.length){status.textContent=filtered.length?'All '+filtered.length.toLocaleString()+' generators loaded.':'No matching generators.';return;}const frag=document.createDocumentFragment();const end=Math.min(offset+batch,filtered.length);for(;offset<end;offset++)frag.appendChild(card(filtered[offset]));grid.appendChild(frag);status.textContent=offset.toLocaleString()+' of '+filtered.length.toLocaleString()+' generators displayed · scroll for more';}
function filter(){const q=search.value.trim().toLowerCase(),k=size.value;filtered=entries.filter(e=>(k==='all'||e.indices.length===+k)&&(!q||title(e).toLowerCase().includes(q)||description(e).toLowerCase().includes(q)||String(e.number)===q||('generator '+e.number).includes(q)));offset=0;grid.replaceChildren();count.textContent=filtered.length.toLocaleString()+' generators';addBatch();}
let debounce;search.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(filter,180)});size.addEventListener('change',filter);
const observer=new IntersectionObserver(rows=>{if(rows.some(r=>r.isIntersecting))addBatch()},{rootMargin:'1000px'});observer.observe(document.getElementById('comboSentinel'));
const ws=document.getElementById('comboWorkspace'),tbody=document.querySelector('#comboTable tbody');
function open(e){selected=e;ws.hidden=false;document.getElementById('comboTitle').textContent=title(e);document.getElementById('comboDescription').textContent=description(e);generate();ws.scrollIntoView({behavior:'smooth',block:'start'});}
// Domain-specific idea components. Each selected field contributes an explicit deliverable.
const quick=document.getElementById('generatorQuickSearch'),quickMatches=document.getElementById('generatorQuickMatches');
if(quick&&quickMatches){
 let quickTimer;
 quick.addEventListener('input',()=>{clearTimeout(quickTimer);quickTimer=setTimeout(()=>{
  const q=quick.value.trim().toLowerCase();quickMatches.replaceChildren();
  if(!q){quickMatches.hidden=true;return;}
  const terms=q.split(/\s*\+\s*|\s*,\s*|\s+and\s+/).map(x=>x.trim()).filter(Boolean);const hits=entries.filter(e=>String(e.number)===q||('generator '+e.number)===q||title(e).toLowerCase().includes(q)||(terms.length>1&&terms.every(term=>e.indices.some(i=>cats[i][0].toLowerCase().includes(term))))).slice(0,15);
  if(!hits.length){const p=document.createElement('p');p.textContent='No matching generator. Try another topic or category.';quickMatches.appendChild(p);}
  for(const e of hits){const btn=document.createElement('button');btn.type='button';btn.textContent=String(e.number).padStart(5,'0')+' — '+title(e);btn.addEventListener('click',()=>{quick.value=title(e);quickMatches.hidden=true;open(e);});quickMatches.appendChild(btn);}
  quickMatches.hidden=false;
 },130);});
}
const domainPlans=[
 {role:'workforce plan',items:['community climate technician','digital archive curator','urban farming coordinator','remote learning designer'],details:['a training pathway and required skills','a day-to-day task list and work setting','an apprenticeship plan and assessment rubric']},
 {role:'fictional character profile',items:['a maritime researcher named Elira','a young inventor named Taren','a library keeper named Nori','a field botanist named Sela'],details:['a believable backstory and personal motivation','a name, occupation, and short biography','a character arc with a specific conflict']},
 {role:'synthetic email communication',items:['a fictional onboarding email','a sample event invitation','a simulated support response','a test newsletter welcome message'],details:['a clearly fictional sender and recipient','a subject line and appropriate message body','a safe example address reserved for testing']},
 {role:'security-training example',items:['a password hygiene workshop','a mock login screen test','an authentication awareness exercise','a sample passphrase policy'],details:['a demonstration using non-production credentials','a checklist for safe password handling','a test-only authentication scenario']},
 {role:'language learning activity',items:['a multilingual travel phrasebook','a bilingual beginner lesson','a translation practice worksheet','a pronunciation comparison exercise'],details:['a source phrase and a checked example translation','a vocabulary list with usage notes','a simple learning objective and exercises']},
 {role:'numeric dataset',items:['a synthetic demand forecast table','a reproducible random sampling exercise','a fictional inventory ID series','a probability classroom simulation'],details:['defined columns and numeric ranges','a clear randomization method and validation rule','a sample dataset with explicit units']},
 {role:'website naming concept',items:['a fictional learning portal domain','a prototype culinary marketplace name','a sample publishing platform name','a test project landing-page identity'],details:['a pronounceable candidate domain and naming rationale','a proposed URL structure and page purpose','a reminder to verify real domain availability']},
 {role:'software learning module',items:['a Python data validation lesson','a JavaScript interface prototype','a beginner CSV parsing exercise','an API response modeling workshop'],details:['inputs, outputs, and acceptance criteria','a small runnable example and explanation','a testing checklist and common failure cases']},
 {role:'retail product concept',items:['a reusable starter kit','a modular desk accessory','a themed educational bundle','a compact travel organizer'],details:['target buyer, product components, and intended use','a realistic product listing and specifications','packaging and fulfillment considerations']},
 {role:'culinary concept',items:['a roasted vegetable grain bowl','a citrus herb fish dish','a plant-based noodle meal','a seasonal fruit dessert'],details:['ingredients, preparation method, and serving style','an allergen and dietary note','a menu description and approximate prep workflow']},
 {role:'speculative future scenario',items:['a floating coastal research district in 2480','a lunar materials library in 2670','an orbital farming cooperative in 2350','a climate-adaptive university in 2190'],details:['a fictional timeline with causes and consequences','the technology assumptions and social tradeoffs','a clear statement that the scenario is speculative']},
 {role:'book publishing concept',items:['a near-future mystery novella','an illustrated science guide','a culinary travel anthology','a character-driven adventure novel'],details:['a title, premise, and target readership','a three-part story outline','a chapter plan and narrative point of view']},
 {role:'music project concept',items:['an ambient field-recording album','an acoustic folk EP','a cinematic instrumental soundtrack','a rhythmic electronic concept album'],details:['genre, mood, and instrumentation','a track-title list and sonic direction','a production brief and intended listening context']},
 {role:'fictional username identity',items:['a short astronomy-themed username','a nature-inspired community handle','a fictional artist profile name','a developer demo account alias'],details:['readable character rules and a sample handle','a fictional profile use case','a note that account availability is unverified']},
 {role:'constructed-language writing',items:['a fictional greeting phrase','a short invented-language dialogue','a consistent vocabulary mini-lexicon','a fictional proverb and its English gloss'],details:['stable word meanings and grammar notes','an English interpretation tied to the same lexicon','a fictional-language disclaimer']}
];
const pairBridges={
 '0-10':'Design a plausible occupation that exists inside a clearly fictional future scenario.',
 '8-9':'Create a food product suitable for an online store, with ingredients, packaging, and a buyer.',
 '11-12':'Turn the musical mood and instrumentation into a book premise, without treating a song title as a plot.',
 '6-13':'Build a coherent digital brand using a domain candidate and a matching username.',
 '0-7':'Define a practical programming course linked to the skills of the proposed occupation.',
 '11-14':'Develop a fictional-language phrase that belongs to a book world, with a stable English meaning.',
 '4-12':'Create a language-learning music activity with pronunciation and lyric-writing exercises.',
 '5-7':'Build a coding exercise that generates and validates synthetic numeric data.',
 '9-10':'Imagine a future food system, stating what is fictional and what is feasible today.',
 '9-12':'Create a food-themed music project with a concrete performance or production format.',
 '2-3':'Make a fictional email onboarding example and use test-only credentials, never real passwords.',
 '1-2':'Create a fictional character identity and a corresponding sample email address.'
};
const connectors=['Create','Design','Develop','Prototype','Outline','Plan'];
function rand(a){return a[Math.floor(Math.random()*a.length)];}
function safeLabel(x){return x.replace(/^[a-z]/,c=>c.toUpperCase());}
function buildIdea(e,serial){
 const ids=e.indices,primary=ids[serial%ids.length],p=domainPlans[primary];
 const item=rand(p.items), detail=rand(p.details);
 const others=ids.filter(x=>x!==primary);
 const secondary=others.length?others[(serial+Math.floor(Math.random()*others.length))%others.length]:null;
 const task=secondary===null?null:domainPlans[secondary];
 const pairKey=secondary===null?'':[primary,secondary].sort((a,b)=>a-b).join('-');
 const bridge=pairBridges[pairKey]||null;
 const extras=others.filter(x=>x!==secondary).map(x=>{
   const d=domainPlans[x];return d.role+': '+rand(d.items)+' ('+rand(d.details)+')';
 });
 const title=secondary===null?safeLabel(item):safeLabel(item)+' + '+rand(task.items);
 const lines=['Core deliverable: '+item+'.','Execution: '+detail+'.'];
 if(task){lines.push('Connected component ('+cats[secondary][0]+'): '+rand(task.items)+'.');lines.push('Integration: '+(bridge||'Use the '+task.role+' as a concrete supporting element of the '+p.role+', with its own deliverable and purpose.'));}
 if(extras.length)lines.push('Additional selected fields: '+extras.join('; ')+'.');
 lines.push('Output: one fictional or prototype concept with defined components, not a verified real-world claim.');
 return [title,lines.join(' ')];
}
function generate(){
 if(!selected)return;
 const q=Number(document.getElementById('comboQuantity').value)||25;
 results=[];const name=title(selected);const seen=new Set();
 for(let j=0;j<q;j++){
   let idea,concept,attempt=0;
   do{[idea,concept]=buildIdea(selected,j+attempt);attempt++;}while(seen.has(idea+'|'+concept)&&attempt<30);
   seen.add(idea+'|'+concept);
   results.push([String(selected.number).padStart(5,'0')+'-'+String(j+1).padStart(5,'0'),name,idea,concept]);
 }
 tbody.replaceChildren();const frag=document.createDocumentFragment();
 for(const row of results.slice(0,100)){const tr=document.createElement('tr');for(const value of row){const td=document.createElement('td');td.textContent=value;tr.appendChild(td);}frag.appendChild(tr);}tbody.appendChild(frag);
 document.getElementById('comboPreviewNote').textContent='Showing '+Math.min(100,results.length)+' of '+results.length+' generated concepts. All selected categories contribute to the description.';
}
document.getElementById('comboGenerate').addEventListener('click',generate);
document.getElementById('comboDownload').addEventListener('click',()=>{if(!results.length)return;const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';const csv=[['ID','Generator','Idea','Concept'],...results].map(row=>row.map(quote).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='zharief-combined-ideas-'+selected.mask+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);});
filter();
})();