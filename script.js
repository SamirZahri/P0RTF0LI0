document.documentElement.classList.add('js');
const data = window.PORTFOLIO_DATA;
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const esc = (s='') => String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const roleText = roles => (roles || []).join(' · ');
const embedUrl = (platform,id,start=0) => platform === 'vimeo'
  ? `https://player.vimeo.com/video/${encodeURIComponent(id)}`
  : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}${start ? `?start=${Number(start)}` : ''}`;
const iframe = (item,title) => `<iframe loading="lazy" src="${embedUrl(item.platform,item.videoId,item.startSeconds)}" title="${esc(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

function init(){
  if(!data) return;
  $('#hero-positioning').textContent=data.identity.positioning;
  $('#director-statement').textContent=data.directorStatement;
  $('#experimental-intro').textContent=data.experimental.intro;
  $('#professional-subtitle').textContent=data.professionalPractice.subtitle;
  $('#about-text').textContent=data.about;
  renderSelected(); renderArchive(); renderExperimental(); renderProfessional(); renderGallery(); renderAcademic(); renderTechnical(); renderJourney(); renderContact(); initPortrait(); initNav(); initDialogs(); initReveal();
}

function renderSelected(){
  $('#selected-films').innerHTML=data.selectedFilmWork.map((f,i)=>`<article class="featured-film reveal">
    <div class="film-media">${iframe(f,`${f.title} — film player`)}</div>
    <div class="film-info"><div class="film-index">FILM ${String(i+1).padStart(2,'0')}</div><h3>${esc(f.title)}</h3>
      <div class="meta-row"><span>${esc(f.year)}</span><span>${esc(f.format)}</span><span>DIRECTOR · ${esc(f.director)}</span></div>
      <p class="role-line"><strong>My Role</strong>${esc(roleText(f.roles))}</p>
      <div class="film-copy"><h4>Short Synopsis</h4><p>${esc(f.synopsis)}</p><h4>My Contribution</h4><p>${esc(f.contribution)}</p>${f.production?`<h4>Production Context</h4><p>${esc(f.production)}</p>`:''}</div>
    </div></article>`).join('');
}

function renderArchive(){
  $('#film-archive').innerHTML=data.filmArchive.map((f,i)=>{
    const primary=f.videoId?{platform:f.platform,videoId:f.videoId}:f.videos?.[0];
    return `<article class="archive-card reveal"><span class="num">ARCHIVE ${String(i+1).padStart(2,'0')}</span><h3>${esc(f.title)}</h3>${f.originalTitle?`<div class="original" lang="ar">${esc(f.originalTitle)}</div>`:''}<div class="archive-meta"><div>${esc(f.year||'')}</div><div>Director · ${esc(f.director)}</div><div>My Role · ${esc(roleText(f.roles))}</div></div>${primary?`<button class="watch-button" data-video-platform="${esc(primary.platform)}" data-video-id="${esc(primary.videoId)}" data-start="${primary.startSeconds||0}" data-title="${esc(f.title)}">Watch Film</button>`:''}${f.videos?.length>1?`<button class="watch-button" data-video-platform="${esc(f.videos[1].platform)}" data-video-id="${esc(f.videos[1].videoId)}" data-start="${f.videos[1].startSeconds||0}" data-title="${esc(f.title)} — Part 2">Watch Part 2</button>`:''}</article>`;
  }).join('');
}

function renderExperimental(){
  $('#experimental-projects').innerHTML=data.experimental.projects.map((p,i)=>`<article class="experimental-card reveal"><div><span class="ai-badge">${esc(p.format)}</span><h3>${esc(p.title)}</h3><div class="meta-row"><span>${esc(p.year)}</span>${p.duration?`<span>${esc(p.duration)}</span>`:''}${p.creator?`<span>${esc(p.creator)}</span>`:''}</div>${p.roles?`<p class="role-line"><strong>Role</strong>${esc(roleText(p.roles))}</p>`:''}</div><div class="film-copy">${p.synopsis?`<h4>Synopsis</h4><p>${esc(p.synopsis)}</p>`:''}${p.description?`<h4>Project</h4><p>${esc(p.description)}</p>`:''}${p.videoId?`<button class="watch-button" data-video-platform="youtube" data-video-id="${esc(p.videoId)}" data-title="${esc(p.title)}">Watch Project</button>`:''}${p.episodes?`<h4>Episodes</h4><div class="episode-list">${p.episodes.map(e=>`<button class="watch-button" data-video-platform="youtube" data-video-id="${esc(e.videoId)}" data-title="${esc(e.title)}">${esc(e.title)}</button>`).join('')}</div>`:''}${p.credits?`<h4>Credits</h4><p>${Object.entries(p.credits).map(([k,v])=>`${esc(k)}: ${esc(v)}`).join('<br>')}</p>`:''}</div></article>`).join('');
}

function renderProfessional(){
  $('#practice-categories').innerHTML=data.professionalPractice.categories.map(c=>`<span>${esc(c)}</span>`).join('');
  $('#professional-work').innerHTML=data.professionalPractice.selectedWork.map((w,i)=>`<article class="practice-card reveal"><p>PRAC ${String(i+1).padStart(2,'0')} · ${esc(w.category)} ${w.year?`· ${esc(w.year)}`:''}</p><h3>${esc(w.title)}</h3><button class="watch-button" data-video-platform="${esc(w.platform)}" data-video-id="${esc(w.videoId)}" data-title="${esc(w.title)}">Watch</button></article>`).join('');
}

const photoState={items:[],index:0};
function renderGallery(){
  const gallery=$('#photo-gallery');
  gallery.innerHTML=data.photography.map((name,i)=>`<button class="photo-item" type="button" data-index="${i}" aria-label="Open photograph ${i+1} of ${data.photography.length}"><img src="./assets/images/photography/${esc(name)}" alt="Photograph by Samir Zahri, image ${i+1}" loading="lazy" decoding="async"><span class="photo-number">FRAME ${String(i+1).padStart(2,'0')}</span></button>`).join('');
  $$('.photo-item',gallery).forEach((item)=>{ const img=$('img',item); img.addEventListener('error',()=>item.classList.add('is-missing')); item.addEventListener('click',()=>openPhoto(Number(item.dataset.index))); });
  photoState.items=data.photography;
}
function openPhoto(index){photoState.index=(index+photoState.items.length)%photoState.items.length;const name=photoState.items[photoState.index];$('#lightbox-image').src=`./assets/images/photography/${name}`;$('#lightbox-count').textContent=`FRAME ${String(photoState.index+1).padStart(2,'0')} / ${photoState.items.length}`;const d=$('#photo-lightbox');if(!d.open)d.showModal();}

function renderAcademic(){
  $('#education-list').innerHTML=data.education.map(e=>`<article class="education-item reveal"><div class="period">${esc(e.period||e.year)}</div><div><h3>${esc(e.qualification||e.provider)}</h3><p>${esc(e.field||e.focus)}${e.institution?` · ${esc(e.institution)}`:''}${e.location?` · ${esc(e.location)}`:''}</p></div></article>`).join('');
  $('#academic-focus').innerHTML=data.academicFocus.map(a=>`<div class="grade"><span>${esc(a.subject)}</span><b>${esc(a.grade)}</b></div>`).join('');
}
function renderTechnical(){ const labels={cameraAndCapture:'Camera & Capture',supportAndMovement:'Support & Movement',lighting:'Lighting',postProduction:'Post-Production',creativeTechnology:'Creative Technology'}; $('#technical-grid').innerHTML=Object.entries(data.technicalBackground).map(([k,items])=>`<section class="technical-group reveal"><h3>${labels[k]}</h3><ul>${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></section>`).join(''); }
function renderJourney(){ $('#journey-list').innerHTML=data.journey.map(j=>`<div class="journey-item reveal"><time>${esc(j.period||j.year)}</time><div>${esc(j.event)}</div></div>`).join(''); }
function renderContact(){
  const c=data.contact;
  const email=`<a class="contact-link contact-email" href="mailto:${esc(c.email)}" aria-label="Email Samir Zahri"><span class="contact-link-label">Email</span><span class="contact-link-detail">${esc(c.email)}</span><span class="contact-link-arrow" aria-hidden="true">↗</span></a>`;
  const platforms=(c.links||[]).map(link=>`<a class="contact-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(link.ariaLabel)}"><span class="contact-link-label">${esc(link.label)}</span><span class="contact-link-detail">${esc(link.detail)}</span><span class="contact-link-arrow" aria-hidden="true">↗</span></a>`).join('');
  $('#contact-links').innerHTML=email+platforms;
}
function initPortrait(){ const img=$('#portrait'); img.addEventListener('error',()=>img.closest('.hero-portrait').classList.add('is-missing')); }
function initNav(){ const btn=$('.nav-toggle'),nav=$('.site-nav'); btn.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open));}); $$('.site-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');btn.setAttribute('aria-expanded','false');})); }
function initDialogs(){
  document.addEventListener('click',e=>{const b=e.target.closest('[data-video-id]');if(!b)return;const d=$('#video-dialog');$('#dialog-frame').innerHTML=iframe({platform:b.dataset.videoPlatform,videoId:b.dataset.videoId,startSeconds:Number(b.dataset.start||0)},b.dataset.title||'Video');d.showModal();});
  $('.dialog-close').addEventListener('click',()=>closeVideo()); $('#video-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget)closeVideo();});
  $('.lightbox-close').addEventListener('click',()=>$('#photo-lightbox').close()); $('.lightbox-nav.prev').addEventListener('click',()=>openPhoto(photoState.index-1)); $('.lightbox-nav.next').addEventListener('click',()=>openPhoto(photoState.index+1));
  document.addEventListener('keydown',e=>{if($('#photo-lightbox').open){if(e.key==='ArrowLeft')openPhoto(photoState.index-1);if(e.key==='ArrowRight')openPhoto(photoState.index+1);}});
}
function closeVideo(){ $('#video-dialog').close(); $('#dialog-frame').innerHTML=''; }
function initReveal(){ const items=$$('.reveal'); if(matchMedia('(prefers-reduced-motion: reduce)').matches){items.forEach(x=>x.classList.add('is-visible'));return;} const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.08});items.forEach(x=>io.observe(x)); }
init();
