const clockElement = document.querySelector('#mumbai-clock');
function updateClock(){
  const now = new Date();
  clockElement.textContent = new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit',hour12:true}).format(now).toUpperCase()+' IST';
  clockElement.dateTime = now.toISOString();
}
updateClock(); setInterval(updateClock,30000);
document.querySelector('#year').textContent = new Date().getFullYear();

const projects = {
  botanical:{category:'Packaging · Gifting · Branding',title:'Little details, lasting impressions.',description:'My design journey began with a plant gifting brand, creating everything from packaging labels to website banners. It’s where I learned that even the smallest touchpoint can help tell a brand’s story.',facts:[['Experience','Plant gifting brand and ARPHIBO GARDENTECH'],['Design scope','Packaging labels, custom gifting labels, brand assets and website banners'],['At ARPHIBO','50+ packaging and custom gifting labels alongside e-commerce responsibilities'],['Approach','Clean layouts, purposeful typography and a considered customer experience']]},
  spatial:{category:'Creative concepts · Event design',title:'Stories you can step into.',description:'As a Designer at Buzzaar Retail Marketing Solutions, I work on creative and event design for malls, airports and brand activations — bringing concepts from presentations through to production and on-site setup.',facts:[['Role','Designer · September 2025–Present'],['Organisation','Buzzaar Retail Marketing Solutions · Mumbai'],['Design scope','Concept development, client presentations, material selection and print-ready production files'],['On site','Setup coordination, client feedback and photography of completed installations']]},
  digital:{category:'Social media · Digital communication',title:'Every touchpoint tells a story.',description:'I create purposeful digital visuals, combining a background in commerce and e-commerce with an eye for clear, intentional design. At ARPHIBO GARDENTECH, my work included social media creatives, brand assets and website banners.',facts:[['At ARPHIBO','45+ social media designs and creatives'],['Design scope','Social content, website banners, branding and layout design'],['Working tools','Figma and Canva'],['Perspective','Visual clarity informed by brand stories, audiences and customer experience']]}
};
const dialog=document.querySelector('#project-dialog');
function openProject(key){
  const project=projects[key]; if(!project)return;
  document.querySelector('#dialog-category').textContent=project.category;
  document.querySelector('#dialog-title').textContent=project.title;
  document.querySelector('#dialog-description').textContent=project.description;
  const facts=document.querySelector('#dialog-facts');facts.replaceChildren();
  for(const [label,value] of project.facts){const row=document.createElement('div');row.className='dialog-fact';const term=document.createElement('span');term.textContent=label;const detail=document.createElement('div');detail.textContent=value;row.append(term,detail);facts.append(row);}
  dialog.showModal();
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project)));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});

const notes=[
  {title:'It started with<br>something green.',caption:'A plant gifting brand.<br>And a curiosity for design.',art:'❧',color:'#687254',background:'#fcfaf5'},
  {title:'A head for business.<br>An eye for detail.',caption:'Commerce, e-commerce<br>and a love for thoughtful visuals.',art:'✳',color:'#8c4a64',background:'#f8edf1'},
  {title:'Always learning.<br>Always making.',caption:'Figma & Canva today.<br>New creative possibilities tomorrow.',art:'✦',color:'#81724b',background:'#f6f1df'}
];
let noteIndex=0;
const noteCard=document.querySelector('#story-card');
noteCard.addEventListener('click',()=>{noteIndex=(noteIndex+1)%notes.length;const note=notes[noteIndex];document.querySelector('#note-title').innerHTML=note.title;document.querySelector('#note-caption').innerHTML=note.caption;document.querySelector('#note-art').textContent=note.art;document.querySelector('#note-art').style.color=note.color;document.querySelector('#note-count').textContent=`0${noteIndex+1} / 03`;noteCard.style.background=note.background;noteCard.classList.add('changing');setTimeout(()=>noteCard.classList.remove('changing'),200);document.querySelector('#live-announcement').textContent=note.title.replace('<br>',' ')+' '+note.caption.replace('<br>',' ');});

let flowerIndex=0;
const flowerColors=['#edbfd0','#c5cdb6','#d7c6e6','#e8d298'];
document.querySelector('[data-sticker]').addEventListener('click',event=>{flowerIndex=(flowerIndex+1)%flowerColors.length;event.currentTarget.style.color=flowerColors[flowerIndex];document.querySelector('#live-announcement').textContent='A fresh color for the flower.';});

const cursor=document.querySelector('.cursor-flower');
if(matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches){
  let x=0,y=0,tx=0,ty=0,active=false,frame;
  function animate(){x+=(tx-x)*.16;y+=(ty-y)*.16;cursor.style.transform=`translate(${x+18}px,${y+18}px) rotate(${x*.09}deg)`;if(active||Math.abs(tx-x)+Math.abs(ty-y)>.5)frame=requestAnimationFrame(animate);else frame=undefined;}
  document.querySelectorAll('.project-image').forEach(area=>{area.addEventListener('pointerenter',e=>{active=true;tx=e.clientX;ty=e.clientY;x=tx;y=ty;cursor.style.opacity='1';if(!frame)frame=requestAnimationFrame(animate);});area.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;});area.addEventListener('pointerleave',()=>{active=false;cursor.style.opacity='0';});});
}
