const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced)document.documentElement.classList.add('js-motion');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const welcome=document.querySelector('#welcome');
document.body.style.overflow='hidden';
document.querySelector('#open-gift').addEventListener('click',()=>{welcome.classList.add('gone');document.body.style.overflow='';document.querySelector('.brand').focus();});
let scenes=[],selected=0;
const gallery=document.querySelector('#gallery'),lightbox=document.querySelector('#lightbox');
fetch('scenes.json').then(r=>{if(!r.ok)throw Error('Gallery unavailable');return r.json()}).then(data=>{scenes=data;scenes.forEach((scene,index)=>{const button=document.createElement('button');button.className='memory';if(!reduced)button.classList.add('memory-enter');button.style.setProperty('--rotation',`${[-2,1.5,-1,2,-1.5,1][index%6]}deg`);button.setAttribute('aria-label',`Open picture ${index+1}: ${scene.title}`);const img=document.createElement('img');img.src=scene.src;img.alt=scene.title;img.loading='lazy';img.decoding='async';const caption=document.createElement('span');caption.className='caption';caption.textContent=scene.title;const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0');caption.append(number);button.append(img,caption);button.addEventListener('click',()=>{selected=index;showPicture();lightbox.showModal()});gallery.append(button);observer.observe(button)})}).catch(()=>{gallery.textContent='The album could not load. Please refresh to try again.'});
function showPicture(){const scene=scenes[selected];lightbox.querySelector('img').src=scene.src;lightbox.querySelector('img').alt=scene.title;lightbox.querySelector('figcaption').textContent=`${String(selected+1).padStart(2,'0')} / ${scene.title}`}
function move(direction){selected=(selected+direction+scenes.length)%scenes.length;showPicture()}
lightbox.querySelector('.close').onclick=()=>lightbox.close();lightbox.querySelector('.previous').onclick=()=>move(-1);lightbox.querySelector('.next').onclick=()=>move(1);
lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowRight')move(1);if(event.key==='ArrowLeft')move(-1)});
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
let scrollFrame=0;
function updateScroll(){
 const max=document.documentElement.scrollHeight-innerHeight;
 document.querySelector('.progress').style.width=`${max>0?scrollY/max*100:0}%`;
 if(!reduced){const hero=document.querySelector('.hero');const offset=Math.min(scrollY,hero.offsetHeight);hero.style.setProperty('--scroll-depth',`${offset*.12}px`);}
 scrollFrame=0;
}
window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll)},{passive:true});
updateScroll();
document.querySelector('#candle').addEventListener('click',function(){if(this.classList.contains('out'))return;this.classList.add('out');this.setAttribute('aria-label','Your birthday wish has been made');document.querySelector('#candle-message').textContent='May every beautiful thing you wished for find its way to you. ♡';if(!reduced)for(let i=0;i<24;i++){const spark=document.createElement('span');spark.className='spark';spark.textContent=i%3?'✦':'♡';spark.style.setProperty('--x',`${(Math.random()-.5)*600}px`);spark.style.setProperty('--y',`${-Math.random()*300}px`);document.querySelector('.closing').append(spark);setTimeout(()=>spark.remove(),2100)}});
