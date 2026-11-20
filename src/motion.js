/* Movimento do site público com GSAP (vendorizado em public/vendor/gsap).
   Sem GSAP, com prefers-reduced-motion ou se algo falhar, o conteúdo aparece completo e estático. */
let ctx=null,spy=null,journeyIO=null,registered=false;
const G=()=>globalThis.gsap,ST=()=>globalThis.ScrollTrigger,SPLIT=()=>globalThis.SplitText;
const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=()=>matchMedia('(hover: hover) and (pointer: fine)').matches;
export const motionOn=()=>!!G()&&!reduce();
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];

function register(){if(registered||!G())return;G().registerPlugin(...[ST(),SPLIT()].filter(Boolean));registered=true;}

/* Varredura: a linha desce pelo rosto; cada ponto da malha acende quando a linha passa e as ligações se desenham. */
function scanSweep(duration=1.8,light=false){const g=G(),tl=g.timeline(),line=$('.scan-line'),pts=$$('.face-mesh circle'),lines=$$('.face-mesh line');if(!line)return tl;
  tl.fromTo(line,{top:'0%',autoAlpha:0},{top:'100%',duration,ease:'power1.inOut'},0).to(line,{autoAlpha:1,duration:.2},0).to(line,{autoAlpha:0,duration:.3},duration-.3);
  if(light){pts.forEach(p=>tl.fromTo(p,{attr:{r:.5}},{attr:{r:1.1},duration:.18,yoyo:true,repeat:1,ease:'power2.out'},Number(p.getAttribute('cy'))/100*duration));return tl}
  pts.forEach(p=>tl.from(p,{attr:{r:0},autoAlpha:0,duration:.35,ease:'back.out(3)'},Number(p.getAttribute('cy'))/100*duration));
  lines.forEach(l=>{const len=Math.hypot(l.x2.baseVal.value-l.x1.baseVal.value,l.y2.baseVal.value-l.y1.baseVal.value)*8;l.style.strokeDasharray=len;tl.fromTo(l,{strokeDashoffset:len},{strokeDashoffset:0,duration:.6,ease:'power2.out'},Math.max(Number(l.getAttribute('y1')),Number(l.getAttribute('y2')))/100*duration)});
  return tl;}
/* Nova varredura leve a cada 9 s enquanto o hero estiver visível. */
function rescanLoop(){const g=G();if(!$('.scan-line'))return;const loop=g.timeline({repeat:-1,repeatDelay:7,delay:6,paused:true});loop.add(scanSweep(1.6,true));ST()?.create({trigger:'.hero',start:'top bottom',end:'bottom top',onToggle:self=>self.isActive?loop.play():loop.pause()});}
/* Traço curto antes dos rótulos das seções, desenhado ao entrar. */
function eyebrowLines(){const g=G();$$('main section:not(.hero) .eyebrow').forEach(el=>{el.classList.add('lined');g.fromTo(el,{'--line':0},{'--line':1,duration:1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}})});}
/* Inclinação 3D suave nos cartões (só com mouse). */
function tiltCards(){if(!finePointer())return;const g=G();$$('.reason,.pro-media').forEach(card=>{g.set(card,{transformPerspective:800});const rx=g.quickTo(card,'rotationX',{duration:.6,ease:'power3'}),ry=g.quickTo(card,'rotationY',{duration:.6,ease:'power3'});card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();ry(((e.clientX-r.left)/r.width-.5)*8);rx(-((e.clientY-r.top)/r.height-.5)*8)});card.addEventListener('pointerleave',()=>{rx(0);ry(0)})});}
/* Coração voa do botão até "Minha lista". */
export function flyTo(from,to){if(!from||!to)return;const a=from.getBoundingClientRect(),b=to.getBoundingClientRect(),heart=document.createElement('span');heart.className='fly-heart';heart.textContent='♥';heart.style.left=a.left+a.width/2+'px';heart.style.top=a.top+a.height/2+'px';document.body.append(heart);if(!motionOn()){heart.remove();return}register();const dx=b.left+b.width/2-(a.left+a.width/2),dy=b.top+b.height/2-(a.top+a.height/2);G().timeline({onComplete:()=>heart.remove()}).fromTo(heart,{scale:.4,xPercent:-50,yPercent:-50},{scale:1.6,duration:.25,ease:'back.out(3)'}).to(heart,{x:dx,duration:.8,ease:'power1.inOut'},'.15').to(heart,{y:dy,duration:.8,ease:'back.in(1.4)'},'.15').to(heart,{scale:.5,autoAlpha:0,duration:.25},'-=.2');}
/* Entrada curta de cards trocados (mapa do rosto, botão da lista). */
export function animateCard(el){if(!el||!motionOn())return;register();G().fromTo(el,{y:14,autoAlpha:0,filter:'blur(6px)'},{y:0,autoAlpha:1,filter:'blur(0px)',duration:.6,ease:'expo.out',clearProps:'filter'});}

export function stopMotion(){ctx?.revert();ctx=null;spy?.disconnect();spy=null;journeyIO?.disconnect();journeyIO=null;}

export function startMotion(refreshOnly=false){try{runMotion(refreshOnly)}catch(err){console.warn('Animações desativadas:',err);ctx?.revert();ctx=null;document.documentElement.classList.remove('motion');$$('.preloader').forEach(p=>p.remove());document.body.classList.remove('menu-lock')}}
function runMotion(refreshOnly){scrollSpy();journeySteps();if(refreshOnly){if(motionOn()){ctx?.add(()=>comparatorSweep());ST()?.refresh()}return}
  if(!motionOn()){document.documentElement.classList.remove('motion');return}
  register();document.documentElement.classList.add('motion');
  ctx=G().context(()=>{const intro=introTimeline();faceTilt();heroScroll();rescanLoop();eyebrowLines();tiltCards();headings();easePhotos();careRows();journeyRail();statement();batches();comparatorSweep();galleryReveal();marqueeVelocity();magnetic();cursorPreview();finale();if(intro)intro.play();});
  requestAnimationFrame(()=>ST()?.refresh());}

/* Abertura (uma vez por sessão) e entrada do hero: o rosto se revela a partir do olhar. */
function introTimeline(){const g=G(),title=$('[data-hero-title]');if(!title)return null;const tl=g.timeline({paused:true,defaults:{ease:'expo.out'}});const first=!sessionStorage.getItem('lumea-intro')&&!/[?&]semintro/.test(location.search);
  if(first){sessionStorage.setItem('lumea-intro','1');setTimeout(()=>{if(tl.progress()<1)tl.progress(1);$('.preloader')?.remove();document.body.classList.remove('menu-lock')},4500);const pre=document.createElement('div');pre.className='preloader';pre.setAttribute('aria-hidden','true');pre.innerHTML='<svg viewBox="0 0 80 80"><path d="M22 15v49h35"/><path class="gold" d="M51 11c-22 13-23 28-10 33 10 4 10 13-3 20M58 11 35 38M64 20 46 39M66 30l-15 12"/></svg><span>LUMÉA</span>';document.body.append(pre);document.body.classList.add('menu-lock');
    const paths=$$('path',pre);paths.forEach(p=>{const l=p.getTotalLength();p.style.strokeDasharray=l;p.style.strokeDashoffset=l});
    tl.to(paths,{strokeDashoffset:0,duration:1.1,ease:'power2.inOut',stagger:.15}).from($('span',pre),{yPercent:100,autoAlpha:0,duration:.8},'-=.5').to(pre,{clipPath:'inset(0 0 100% 0)',duration:.9,ease:'expo.inOut',onComplete:()=>{pre.remove();document.body.classList.remove('menu-lock')}},'+=.15');}
  const split=SPLIT()?SPLIT().create(title,{type:'words,chars'}):null;const start=first?'-=.3':0;
  tl.fromTo('[data-face] picture',{clipPath:'circle(0% at 50% 38%)'},{clipPath:'circle(75% at 50% 38%)',duration:1.8,ease:'expo.inOut',clearProps:'clipPath'},start)
    .from('[data-face] img',{scale:1.25,duration:2.4,ease:'expo.out'},'<.1')
    .from('.hero-pill',{y:16,autoAlpha:0,duration:.8},'<.3')
    .from(split?split.chars:title,{autoAlpha:0,filter:'blur(14px)',yPercent:30,duration:1.1,ease:'power3.out',stagger:{each:.018}},'<.1')
    .from('.hero-lead,.hero-actions',{y:24,autoAlpha:0,duration:.9,stagger:.1},'-=.7')
    .add(scanSweep(1.8),'-=1')
    .from('.region .box',{scale:0,autoAlpha:0,duration:.8,ease:'back.out(2.2)',stagger:.12},'-=.6')
    .from('.region .tag',{x:-10,autoAlpha:0,clipPath:'inset(0 100% 0 0)',duration:.7,stagger:.12},'<.15')
    .from('.face-card',{y:30,autoAlpha:0,duration:1},'<.3')
    .from('.hero-stats>div',{x:30,autoAlpha:0,duration:.9,stagger:.12},'<')
    .from('.hero-stats strong',{textContent:0,snap:{textContent:1},duration:1.6,ease:'power2.out',stagger:.12},'<')
    .from('[data-slot]',{y:30,autoAlpha:0,duration:1},'-=1')
    .from('.face-note',{autoAlpha:0,duration:.6},'-=.6');
  return tl;}

/* "Contato visual": o rosto inclina levemente seguindo o cursor; os marcadores flutuam em outra profundidade. */
function faceTilt(){const hero=$('.hero'),tilt=$('[data-tilt]');if(!hero||!tilt||!finePointer())return;const g=G();g.set(tilt,{transformPerspective:900});const rx=g.quickTo(tilt,'rotationX',{duration:1,ease:'power3'}),ry=g.quickTo(tilt,'rotationY',{duration:1,ease:'power3'}),tx=g.quickTo(tilt,'x',{duration:1.2,ease:'power3'});const marks=[...$$('.region').map((m,i)=>[m,1+(i%3)*.35]),[$('.face-mesh'),.6]].filter(([m])=>m).map(([m,d])=>[g.quickTo(m,'x',{duration:1.4,ease:'power3'}),g.quickTo(m,'y',{duration:1.4,ease:'power3'}),d]);
  hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width-.5,ny=(e.clientY-r.top)/r.height-.5;ry(nx*7);rx(-ny*5);tx(nx*14);marks.forEach(([mx,my,d])=>{mx(nx*22*d);my(ny*16*d)})});hero.addEventListener('pointerleave',()=>{rx(0);ry(0);tx(0);marks.forEach(([mx,my])=>{mx(0);my(0)})});}

function heroScroll(){const g=G();if(!matchMedia('(min-width: 1025px)').matches)return;const st={trigger:'.hero',start:'top top',end:'bottom top',scrub:true};g.to('[data-face]',{yPercent:10,scale:.94,ease:'none',scrollTrigger:st});g.to('.face-mesh,.region,.face-card',{autoAlpha:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'20% top',end:'50% top',scrub:true}});g.to('.hero-copy,.hero-stats',{yPercent:-14,autoAlpha:.15,ease:'none',scrollTrigger:{...st,start:'35% top'}});}

/* Títulos sobem linha a linha atrás de uma máscara. */
function headings(){const g=G();$$('[data-split]').forEach(el=>{if(SPLIT()){SPLIT().create(el,{type:'lines',mask:'lines',autoSplit:true,onSplit:self=>g.from(self.lines,{yPercent:110,duration:1.1,ease:'expo.out',stagger:.08,scrollTrigger:{trigger:el,start:'top 88%',once:true}})})}else g.from(el,{y:40,autoAlpha:0,duration:1,scrollTrigger:{trigger:el,start:'top 88%',once:true}})});
  $$('main .eyebrow,.section-top>p,.ease-copy>p,.results-copy>p,.faq-side>p').forEach(el=>{if(el.closest('.hero'))return;g.from(el,{y:20,autoAlpha:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}})});}

/* Fotos sobrepostas em profundidades diferentes. */
function easePhotos(){const g=G();$$('[data-depth]').forEach(el=>{const d=Number(el.dataset.depth);g.fromTo(el,{yPercent:-d},{yPercent:d,ease:'none',scrollTrigger:{trigger:'.ease',start:'top bottom',end:'bottom top',scrub:true}});g.from(el,{clipPath:'inset(100% 0 0 0 round 24px)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:el,start:'top 85%',once:true}})});g.from('.ease-badge',{scale:0,rotate:-40,duration:1.2,ease:'back.out(1.6)',scrollTrigger:{trigger:'.ease-badge',start:'top 90%',once:true}});}

function careRows(){const g=G();$$('.care-col').forEach(col=>{g.fromTo($$('h3,li',col),{y:24,autoAlpha:0},{y:0,autoAlpha:1,duration:.8,ease:'power3.out',stagger:.04,scrollTrigger:{trigger:col,start:'top 85%',once:true}})});g.fromTo('.care-bg',{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:'.care',start:'top bottom',end:'bottom top',scrub:true}});}

/* Jornada: imagem fixa à esquerda troca conforme a etapa visível (funciona mesmo sem GSAP). */
const dots=[[70,18],[68,22],[72,16],[66,20]];
function journeySteps(){journeyIO?.disconnect();const steps=$$('.journey-step');if(!steps.length)return;const shots=$$('.journey-shot'),dot=$('.journey-dot'),counter=$('.journey-counter b');journeyIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const i=Number(e.target.dataset.step);steps.forEach(s=>s.classList.toggle('is-on',s===e.target));shots.forEach((s,k)=>s.classList.toggle('is-on',k===i));if(dot){const [x,y]=dots[i]||dots[0];dot.style.setProperty('--x',x+'%');dot.style.setProperty('--y',y+'%');$('b',dot).textContent=$('h3',e.target).textContent;dot.classList.remove('pop');void dot.offsetWidth;dot.classList.add('pop')}if(counter)counter.textContent=String(i+1).padStart(2,'0')}),{rootMargin:'-45% 0px -45% 0px'});steps.forEach(s=>journeyIO.observe(s));}
function journeyRail(){G().fromTo('.journey-rail span',{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:'.journey-steps',start:'top 55%',end:'bottom 60%',scrub:true}});}

/* Frase grande acende palavra por palavra; etiquetas flutuam em profundidades diferentes. */
function statement(){const g=G(),el=$('[data-words]');if(!el)return;if(SPLIT()){const split=SPLIT().create(el,{type:'words'});g.fromTo(split.words,{opacity:.14},{opacity:1,stagger:.08,ease:'none',scrollTrigger:{trigger:el,start:'top 78%',end:'bottom 45%',scrub:true}})}
  $$('[data-chip]').forEach((c,i)=>{g.from(c,{scale:0,autoAlpha:0,duration:1,ease:'back.out(2)',delay:i*.08,scrollTrigger:{trigger:'.statement',start:'top 70%',once:true}});g.to(c,{yPercent:(i%2?-1:1)*(60+i*25),ease:'none',scrollTrigger:{trigger:'.statement',start:'top bottom',end:'bottom top',scrub:true}});g.to(c,{rotate:i%2?4:-4,duration:3+i*.4,ease:'sine.inOut',yoyo:true,repeat:-1})});}

function batches(){const g=G(),st=ST();if(!st)return;for(const [sel,from] of [['.reason',{y:60}],['.pro-card',{y:80}],['.article-list li',{x:-40}],['#faq-list details',{y:24}]]){const els=$$(sel);if(!els.length)continue;g.set(els,{autoAlpha:0,...from});st.batch(els,{start:'top 92%',once:true,onEnter:b=>g.to(b,{autoAlpha:1,x:0,y:0,duration:1,ease:'expo.out',stagger:.08,overwrite:true})})}
  $$('.pro-media').forEach(m=>g.from(m,{clipPath:'inset(100% 0 0 0 round 28px)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:m,start:'top 88%',once:true}}));}

/* O comparador mostra uma vez que pode ser arrastado. */
function comparatorSweep(){const g=G(),box=$('.comparison');if(!box)return;const range=$('input',box),p={v:50};let touched=false;const stop=()=>{touched=true;tl.kill()};range.addEventListener('pointerdown',stop,{once:true});range.addEventListener('keydown',stop,{once:true});const set=()=>{if(touched)return;box.style.setProperty('--position',p.v+'%');range.value=p.v};const tl=g.timeline({scrollTrigger:{trigger:box,start:'top 65%',once:true},onUpdate:set,delay:.3});tl.to(p,{v:28,duration:.8,ease:'power2.inOut'}).to(p,{v:72,duration:1.1,ease:'power2.inOut'}).to(p,{v:50,duration:.8,ease:'power2.inOut'});
  g.from(box,{clipPath:'inset(10% 10% 10% 10% round 28px)',duration:1.4,ease:'expo.out',clearProps:'clipPath',scrollTrigger:{trigger:box,start:'top 85%',once:true}});}

function galleryReveal(){const g=G();g.from('.gallery-item',{xPercent:30,autoAlpha:0,duration:1.2,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:'#gallery-strip',start:'top 85%',once:true}});const strip=$('#gallery-strip');if(!strip)return;const imgs=$$('.gallery-frame img',strip);const onScroll=()=>{const mid=strip.getBoundingClientRect().left+strip.clientWidth/2;imgs.forEach(img=>{const r=img.parentElement.getBoundingClientRect();img.style.transform=`translateX(${(r.left+r.width/2-mid)/strip.clientWidth*-8}%) scale(1.15)`})};strip.addEventListener('scroll',onScroll,{passive:true});onScroll();}

function marqueeVelocity(){const g=G(),track=$('.marquee-track');if(!track||!ST())return;const skew=g.quickTo(track,'skewX',{duration:.5,ease:'power3'});ST().create({trigger:'.marquee',start:'top bottom',end:'bottom top',onUpdate:self=>skew(g.utils.clamp(-8,8,self.getVelocity()/-260))});}

function magnetic(){if(!finePointer())return;const g=G();$$('.magnetic').forEach(btn=>{const x=g.quickTo(btn,'x',{duration:.6,ease:'elastic.out(1,.4)'}),y=g.quickTo(btn,'y',{duration:.6,ease:'elastic.out(1,.4)'});btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.28);y((e.clientY-r.top-r.height/2)*.38)});btn.addEventListener('pointerleave',()=>{x(0);y(0)})});}

/* Artigos: a imagem do texto acompanha o cursor na lista. */
function cursorPreview(){const box=$('.cursor-preview'),list=$('.article-list');if(!box||!list||!finePointer())return;const g=G(),img=$('img',box);const x=g.quickTo(box,'x',{duration:.55,ease:'power3'}),y=g.quickTo(box,'y',{duration:.55,ease:'power3'});g.set(box,{xPercent:-50,yPercent:-50,scale:0,autoAlpha:0});
  list.addEventListener('pointermove',e=>{x(e.clientX);y(e.clientY)});$$('.article-row',list).forEach(row=>row.addEventListener('pointerenter',()=>{img.src=row.dataset.preview;g.to(box,{scale:1,autoAlpha:1,rotate:g.utils.random(-6,6),duration:.5,ease:'expo.out'})}));list.addEventListener('pointerleave',()=>g.to(box,{scale:0,autoAlpha:0,duration:.4,ease:'power3.in'}));}

function finale(){const g=G();g.fromTo('.final-media img',{scale:1.25},{scale:1,ease:'none',scrollTrigger:{trigger:'.final',start:'top bottom',end:'bottom bottom',scrub:true}});g.from('.final-actions',{y:30,autoAlpha:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:'.final-actions',start:'top 92%',once:true}});g.fromTo('.footer-word',{yPercent:60},{yPercent:0,ease:'none',scrollTrigger:{trigger:'.footer',start:'top bottom',end:'bottom bottom',scrub:true}});g.from('.quote-mark',{scale:.4,rotate:-25,autoAlpha:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.testimonials',start:'top 80%',once:true}});}

/* Menu acompanha a seção visível. */
function scrollSpy(){spy?.disconnect();const links=$$('.site-header nav a');spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;links.forEach(a=>{const on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('active',on);on?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current')})}),{rootMargin:'-45% 0px -50% 0px'});links.forEach(a=>{const s=$(a.getAttribute('href'));if(s)spy.observe(s)});}

/* Barra de progresso, cabeçalho que se esconde ao descer e botão flutuante após o hero. */
let lastY=0,ticking=false;
addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;const h=document.documentElement,y=scrollY,header=$('.site-header');$('.scroll-progress')?.style.setProperty('transform',`scaleX(${y/(h.scrollHeight-innerHeight||1)})`);if(header){header.classList.toggle('scrolled',y>40);if(!header.classList.contains('menu-open'))header.classList.toggle('header-hidden',y>innerHeight*.8&&y>lastY+2);if(y<lastY-2)header.classList.remove('header-hidden')}$('.floating-book')?.classList.toggle('show',y>innerHeight*.9&&y<h.scrollHeight-innerHeight*1.6);lastY=y;})},{passive:true});
addEventListener('load',()=>ST()?.refresh());
