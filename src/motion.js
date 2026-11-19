/* Movimento do site público com GSAP (vendorizado em public/vendor/gsap).
   Sem GSAP ou com prefers-reduced-motion, o conteúdo aparece completo e estático. */
let ctx=null,spy=null,registered=false;
const G=()=>globalThis.gsap,ST=()=>globalThis.ScrollTrigger,SPLIT=()=>globalThis.SplitText,FLIP=()=>globalThis.Flip;
const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=()=>matchMedia('(hover: hover) and (pointer: fine)').matches;
export const motionOn=()=>!!G()&&!reduce();
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];

function register(){if(registered||!G())return;G().registerPlugin(...[ST(),SPLIT(),FLIP()].filter(Boolean));registered=true;}

export function stopMotion(){ctx?.revert();ctx=null;spy?.disconnect();spy=null;}

export function startMotion(refreshOnly=false){try{runMotion(refreshOnly)}catch(err){console.warn('Animações desativadas:',err);ctx?.revert();ctx=null;document.documentElement.classList.remove('motion');$('.preloader').forEach(p=>p.remove());document.body.classList.remove('menu-lock')}}
function runMotion(refreshOnly){scrollSpy();if(refreshOnly){if(motionOn()){ctx?.add(()=>comparatorSweep());ST()?.refresh()}return}
  if(!motionOn()){document.documentElement.classList.remove('motion');return}
  register();document.documentElement.classList.add('motion');
  ctx=G().context(()=>{const intro=introTimeline();headings();wordFill();imageReveals();cardBatches();journeyScroll();galleryReveal();marqueeVelocity();magnetic();cursorPreview();comparatorSweep();finale();heroScroll();floatLoop();
    if(intro)intro.play();});
  requestAnimationFrame(()=>ST()?.refresh());}

/* Abertura: monograma desenhado (uma vez por sessão) e entrada do hero. */
function introTimeline(){const g=G(),title=$('[data-hero-title]');if(!title)return null;const tl=g.timeline({paused:true,defaults:{ease:'expo.out'}});const first=!sessionStorage.getItem('lumea-intro')&&!/[?&]semintro/.test(location.search);
  if(first){sessionStorage.setItem('lumea-intro','1');setTimeout(()=>{if(tl.progress()<1)tl.progress(1);document.querySelector('.preloader')?.remove();document.body.classList.remove('menu-lock')},4500);const pre=document.createElement('div');pre.className='preloader';pre.setAttribute('aria-hidden','true');pre.innerHTML='<svg viewBox="0 0 80 80"><path d="M22 15v49h35"/><path class="gold" d="M51 11c-22 13-23 28-10 33 10 4 10 13-3 20M58 11 35 38M64 20 46 39M66 30l-15 12"/></svg><span>LUMÉA</span>';document.body.append(pre);document.body.classList.add('menu-lock');
    const paths=$$('path',pre);paths.forEach(p=>{const l=p.getTotalLength();p.style.strokeDasharray=l;p.style.strokeDashoffset=l});
    tl.to(paths,{strokeDashoffset:0,duration:1.1,ease:'power2.inOut',stagger:.15}).from($('span',pre),{yPercent:100,autoAlpha:0,duration:.8},'-=.5').to(pre,{clipPath:'inset(0 0 100% 0)',duration:.9,ease:'expo.inOut',onComplete:()=>{pre.remove();document.body.classList.remove('menu-lock')}},'+=.15');}
  const split=SPLIT()?SPLIT().create(title,{type:'lines',mask:'lines'}):null;
  tl.from('.hero-copy .eyebrow',{y:20,autoAlpha:0,duration:.8},first?'-=.35':0)
    .from(split?split.lines:title,{yPercent:110,duration:1.15,stagger:.09},'<.05')
    .from('.hero-lead,.hero-actions',{y:28,autoAlpha:0,duration:.9,stagger:.1},'<.35')
    .from('.hero-facts>div',{y:20,autoAlpha:0,duration:.8,stagger:.08},'<.2')
    .from('.hero-facts dt',{textContent:0,snap:{textContent:1},duration:1.4,ease:'power2.out',stagger:.1},'<')
    .fromTo('[data-hero-image]',{clipPath:'inset(100% 0% 0% 0% round 50% 50% 4px 4px)'},{clipPath:'inset(0% 0% 0% 0% round 50% 50% 4px 4px)',duration:1.5,ease:'expo.inOut',clearProps:'clipPath'},first?'<-.9':0.1)
    .from('[data-hero-image] img',{scale:1.35,duration:2.2,ease:'expo.out'},'<.2')
    .from('[data-float]',{y:40,autoAlpha:0,duration:1,stagger:.15},'-=1.2')
    .from('.hero-seal',{scale:0,rotate:-90,duration:1.2},'<.1')
    .from('.scroll-cue',{autoAlpha:0,y:-10,duration:.6},'-=.6');
  return tl;}

function floatLoop(){$$('[data-float]').forEach((el,i)=>G().to(el,{y:i?10:-10,duration:3+i,ease:'sine.inOut',yoyo:true,repeat:-1,delay:2}));}

function heroScroll(){const g=G();g.to('[data-hero-image] picture',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});g.to('.hero-copy',{yPercent:-12,autoAlpha:.2,ease:'none',scrollTrigger:{trigger:'.hero',start:'center top',end:'bottom top',scrub:true}});}

/* Títulos de seção sobem linha a linha por trás de uma máscara. */
function headings(){const g=G();$$('[data-split]').forEach(el=>{if(SPLIT()){SPLIT().create(el,{type:'lines',mask:'lines',autoSplit:true,onSplit:self=>g.from(self.lines,{yPercent:110,duration:1.1,ease:'expo.out',stagger:.08,scrollTrigger:{trigger:el,start:'top 88%',once:true}})})}else g.from(el,{y:40,autoAlpha:0,duration:1,scrollTrigger:{trigger:el,start:'top 88%',once:true}})});
  $$('.section-heading .eyebrow,.section-heading>p,.manifesto-copy .eyebrow,.journey-head .eyebrow,.clinic-copy .eyebrow,.final-copy .eyebrow').forEach(el=>g.from(el,{y:24,autoAlpha:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));}

/* Manifesto: as palavras acendem conforme a leitura. */
function wordFill(){const g=G();$$('[data-words]').forEach(el=>{if(!SPLIT())return;const split=SPLIT().create(el,{type:'words'});g.fromTo(split.words,{opacity:.16},{opacity:1,stagger:.08,ease:'none',scrollTrigger:{trigger:el,start:'top 82%',end:'bottom 52%',scrub:true}})});
  g.from('.principles li',{x:-30,autoAlpha:0,duration:.8,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'.principles',start:'top 90%',once:true}});}

/* Imagens editoriais revelam de baixo para cima com leve zoom. */
function imageReveals(){const g=G();$$('[data-reveal-img]').forEach(el=>{const img=$('img',el);const tl=g.timeline({scrollTrigger:{trigger:el,start:'top 85%',once:true}});tl.fromTo(el,{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1.4,ease:'expo.inOut',clearProps:'clipPath'});if(img)tl.from(img,{scale:1.3,duration:1.8,ease:'expo.out'},'<.15')});
  $$('.manifesto-media img,.final-media img').forEach(img=>g.fromTo(img,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));}

function cardBatches(){const g=G(),st=ST();if(!st)return;const groups=[['.area-panel',{y:80}],['.treatment-card',{y:70}],['.pro-card',{y:90}],['.article-list li',{x:-40}],['#faq-list details',{y:24}]];
  for(const [sel,from] of groups){const els=$$(sel);if(!els.length)continue;g.set(els,{autoAlpha:0,...from});st.batch(els,{start:'top 92%',once:true,onEnter:batch=>g.to(batch,{autoAlpha:1,x:0,y:0,duration:1,ease:'expo.out',stagger:.08,overwrite:true})});}
  g.from('.pro-card:nth-child(2)',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.professional-grid',start:'top bottom',end:'bottom top',scrub:true}});}

/* Jornada: no desktop fica presa e corre na horizontal, com a linha do tempo se desenhando. */
function journeyScroll(){const g=G(),mm=g.matchMedia();mm.add('(min-width: 1025px)',()=>{const inner=$('.journey-inner'),section=$('.journey');if(!inner)return;const distance=()=>Math.max(0,inner.scrollWidth-innerWidth);const tween=g.to(inner,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:section,start:'top top',end:()=>'+='+distance(),pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1}});g.fromTo('.journey-line span',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:section,start:'top top',end:()=>'+='+distance(),scrub:true,invalidateOnRefresh:true}});
    $$('.journey-step').forEach(step=>{g.from($('.journey-media',step),{clipPath:'inset(0% 0% 0% 100%)',ease:'power2.out',scrollTrigger:{trigger:step,containerAnimation:tween,start:'left 95%',end:'left 55%',scrub:true}});g.from($$('.journey-num,h3,p',step),{y:40,autoAlpha:0,stagger:.06,scrollTrigger:{trigger:step,containerAnimation:tween,start:'left 80%',end:'left 55%',scrub:true}})});});
  mm.add('(max-width: 1024px)',()=>{$$('.journey-step').forEach(step=>g.from(step,{y:60,autoAlpha:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:step,start:'top 90%',once:true}}))});}

function galleryReveal(){const g=G();g.from('.gallery-item',{xPercent:30,autoAlpha:0,duration:1.2,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:'#gallery-strip',start:'top 85%',once:true}});const strip=$('#gallery-strip');if(!strip)return;const imgs=$$('.gallery-frame img',strip);const onScroll=()=>{const mid=strip.getBoundingClientRect().left+strip.clientWidth/2;imgs.forEach(img=>{const r=img.parentElement.getBoundingClientRect();const d=(r.left+r.width/2-mid)/strip.clientWidth;img.style.transform=`translateX(${d*-8}%) scale(1.15)`})};strip.addEventListener('scroll',onScroll,{passive:true});onScroll();}

/* A faixa de tratamentos inclina levemente com a velocidade da rolagem. */
function marqueeVelocity(){const g=G(),track=$('.marquee-track');if(!track||!ST())return;const skew=g.quickTo(track,'skewX',{duration:.5,ease:'power3'});ST().create({trigger:'.marquee',start:'top bottom',end:'bottom top',onUpdate:self=>skew(g.utils.clamp(-8,8,self.getVelocity()/-260))});}

function magnetic(){if(!finePointer())return;const g=G();$$('.magnetic').forEach(btn=>{const x=g.quickTo(btn,'x',{duration:.6,ease:'elastic.out(1,.4)'}),y=g.quickTo(btn,'y',{duration:.6,ease:'elastic.out(1,.4)'});btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.28);y((e.clientY-r.top-r.height/2)*.38)});btn.addEventListener('pointerleave',()=>{x(0);y(0)})});}

/* Artigos: a imagem do texto acompanha o cursor na lista. */
function cursorPreview(){const box=$('.cursor-preview'),list=$('.article-list');if(!box||!list||!finePointer())return;const g=G(),img=$('img',box);const x=g.quickTo(box,'x',{duration:.55,ease:'power3'}),y=g.quickTo(box,'y',{duration:.55,ease:'power3'});g.set(box,{xPercent:-50,yPercent:-50,scale:0,autoAlpha:0});
  list.addEventListener('pointermove',e=>{x(e.clientX);y(e.clientY)});$$('.article-row',list).forEach(row=>row.addEventListener('pointerenter',()=>{img.src=row.dataset.preview;g.to(box,{scale:1,autoAlpha:1,rotate:g.utils.random(-6,6),duration:.5,ease:'expo.out'})}));list.addEventListener('pointerleave',()=>g.to(box,{scale:0,autoAlpha:0,duration:.4,ease:'power3.in'}));}

/* O comparador mostra uma vez que pode ser arrastado. */
function comparatorSweep(){const g=G(),box=$('.comparison');if(!box)return;const range=$('input',box),p={v:50};let touched=false;const stop=()=>{touched=true;tl.kill()};range.addEventListener('pointerdown',stop,{once:true});range.addEventListener('keydown',stop,{once:true});const set=()=>{if(touched)return;box.style.setProperty('--position',p.v+'%');range.value=p.v};const tl=g.timeline({scrollTrigger:{trigger:box,start:'top 65%',once:true},onUpdate:set,delay:.3});tl.to(p,{v:28,duration:.8,ease:'power2.inOut'}).to(p,{v:72,duration:1.1,ease:'power2.inOut'}).to(p,{v:50,duration:.8,ease:'power2.inOut'});
  g.from(box,{clipPath:'inset(8% 8% 8% 8% round 12px)',duration:1.4,ease:'expo.out',clearProps:'clipPath',scrollTrigger:{trigger:box,start:'top 85%',once:true}});}

function finale(){const g=G();g.from('.final-actions',{y:30,autoAlpha:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:'.final-actions',start:'top 92%',once:true}});g.fromTo('.footer-word',{yPercent:60},{yPercent:0,ease:'none',scrollTrigger:{trigger:'.footer',start:'top bottom',end:'bottom bottom',scrub:true}});g.from('.quote-mark',{scale:.4,rotate:-25,autoAlpha:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.testimonials',start:'top 80%',once:true}});}

/* Animação dos tratamentos ao filtrar (Flip). */
export function flipGrid(animate,mutate){const flip=FLIP();if(!animate||!motionOn()||!flip||!registered){mutate();ST()?.refresh();return}let done=false;try{const state=flip.getState('.treatment-card');mutate();done=true;flip.from(state,{targets:'.treatment-card',duration:.7,ease:'power3.inOut',absolute:true,scale:true,onEnter:els=>G().fromTo(els,{autoAlpha:0,scale:.85},{autoAlpha:1,scale:1,duration:.6,stagger:.04,ease:'expo.out'}),onComplete:()=>ST()?.refresh()});G().set('.treatment-card',{autoAlpha:1,y:0})}catch(err){if(!done)mutate();console.warn(err)}}

/* Menu acompanha a seção visível. */
function scrollSpy(){spy?.disconnect();const links=$$('.site-header nav a');spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;links.forEach(a=>{const on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('active',on);on?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current')})}),{rootMargin:'-45% 0px -50% 0px'});links.forEach(a=>{const s=$(a.getAttribute('href'));if(s)spy.observe(s)});}

/* Barra de progresso, cabeçalho que se esconde ao descer e botão flutuante após o hero. */
let lastY=0,ticking=false;
addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;const h=document.documentElement,y=scrollY,header=$('.site-header');$('.scroll-progress')?.style.setProperty('transform',`scaleX(${y/(h.scrollHeight-innerHeight||1)})`);if(header){header.classList.toggle('scrolled',y>40);if(!header.classList.contains('menu-open'))header.classList.toggle('header-hidden',y>innerHeight*.8&&y>lastY+2);if(y<lastY-2)header.classList.remove('header-hidden')}$('.floating-book')?.classList.toggle('show',y>innerHeight*.9&&y<h.scrollHeight-innerHeight*1.6);lastY=y;})},{passive:true});
addEventListener('load',()=>ST()?.refresh());
