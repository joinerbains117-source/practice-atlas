'use strict';
let DATA;
const main=document.getElementById('main'), dialog=document.getElementById('detail'), body=document.getElementById('detail-body');
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const unique=a=>[...new Set(a)];
const product=id=>DATA.products.find(p=>p.id===id);
const industry=id=>DATA.industries.find(i=>i.id===id);
const subset=(p,i)=>DATA.cases.filter(c=>(!p||c.product===p)&&(!i||c.industry===i));
const path=(p,i,s)=>'#/'+[p,i,s].filter(Boolean).map(encodeURIComponent).join('/');
const casePath=c=>path(c.product,c.industry,c.scene)+'?case='+encodeURIComponent(c.id);
const icons={factory:'M3 22V10l7 4V8l7 5V3h4v19H3Z M7 18h2m4 0h2m3 0h2',store:'M4 11v11h17V11M2 11l3-7h15l3 7M2 11c0 4 5 4 5 0 0 4 5 4 5 0 0 4 5 4 5 0 0 4 6 4 6 0M9 22v-7h7v7',shirt:'m8 4-6 4 3 5 3-2v12h10V11l3 2 3-5-6-4c0 5-10 5-10 0Z',scale:'M13 2v21M6 23h14M3 7h20M6 7l-4 8h8L6 7ZM20 7l-4 8h8l-4-8Z'};
const icon=id=>`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="${icons[id]||icons.store}"/></svg>`;
const badge=c=>`<span class="status ${c.status==='方案参考'?'plan':''}">${escape(c.status)}</span>`;
const searchHtml=q=>`<form class="search" role="search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg><input aria-label="搜索案例" name="q" type="search" placeholder="搜索场景、客户、产品或痛点" value="${escape(q||'')}" maxlength="100"><button aria-label="开始搜索" title="开始搜索">↵</button></form>`;
const card=(c,href=casePath(c))=>`<a class="case-card" href="${escape(typeof href==='string'?href:casePath(c))}"><div class="case-meta"><span>${escape(c.customer)}</span>${badge(c)}</div><div class="card-category">${escape(c.capability)} <span>/ ${escape(c.sector)}</span></div><h3>${escape(c.scenarioName)}</h3><p>${escape(c.summary)}</p><div class="card-tags" aria-label="场景概述标签">${c.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><div class="card-products"><small>使用产品</small>${c.tools.map(t=>`<span>${escape(t)}</span>`).join('')}</div><div class="case-bottom"><span>${escape(product(c.product).short)} · 查看完整案例</span><span aria-hidden="true">↗</span></div></a>`;

function breadcrumb(p,i){return `<nav class="breadcrumb" aria-label="当前位置"><a href="#/library">全部案例</a>${p?`<b aria-hidden="true">/</b><a href="${path(p.id)}">${escape(p.short)}</a>`:''}${i?`<b aria-hidden="true">/</b><span>${escape(i.name)}</span>`:''}</nav>`;}
function home(){const count=DATA.cases.length;main.innerHTML=`<section class="hero fade-in"><div><div class="eyebrow">A FIELD GUIDE TO BETTER WORK</div><h1><span class="owner-name">Raymond殷圣尧的</span><br>客户成功<br><em>最佳实践案例</em></h1><p>走进企业协作与 AI 的业务现场。<br>按产品、行业和场景，发现可以借鉴的工作方式。</p></div><div class="hero-art" aria-hidden="true"><div class="orbit"><div class="art-core"><svg viewBox="0 0 64 64"><path d="M12 12h40v40H12zM25 12v40M39 12v40M12 25h40M12 39h40"/><circle cx="32" cy="32" r="26"/></svg></div><div class="orbit-label ol1"><small>01 / PLATFORM</small>从产品出发</div><div class="orbit-label ol2"><small>02 / INDUSTRY</small>走进行业</div><div class="orbit-label ol3"><small>03 / SCENARIO</small>回到业务现场</div></div><div class="art-caption">CONNECT IDEAS. INSPIRE ACTION.</div></div></section><div class="stats-bar"><div class="stat"><strong>02</strong><span>产品专题</span></div><div class="stat"><strong>${String(DATA.industryGroups.filter(g=>DATA.cases.some(c=>g.members.includes(c.industry))).length).padStart(2,'0')}</strong><span>行业方向</span></div><div class="stat"><strong>${count}</strong><span>精选场景</span></div><span class="path-note">产品 → 行业 → 场景 → 实践</span></div><section><div class="section-head"><h2><small>01 / EXPLORE</small>选择一个产品专题</h2>${searchHtml()}</div><div class="product-grid">${DATA.products.map((p,n)=>`<a class="product-card ${p.id}" href="${path(p.id)}"><div class="product-top"><span class="product-icon">${p.id==='feishu'?'↗':'W'}</span><small>0${n+1} / ${p.en}</small></div><h3>${escape(p.name)}</h3><p>${escape(p.intro)}</p><div class="product-foot"><span>${unique(subset(p.id).map(c=>c.industry)).length} 个行业方向 · ${subset(p.id).length} 个精选场景</span><span class="arrow-circle" aria-hidden="true">→</span></div><span class="card-pattern" aria-hidden="true"></span></a>`).join('')}</div><div class="browse-tip"><span>按统一结构呈现：场景描述 / 痛点 / 解决方案 / 业务价值</span><span>保持好奇，让实践带来启发。</span></div></section><section class="selected-section"><div class="section-head"><h2><small>02 / EDITOR'S PICKS</small>从这些场景开始</h2><a class="text-link" href="#/library">查看全部案例 →</a></div><div class="case-grid">${['feishu-voc','wps-craft','wps-legal-mail'].map(id=>DATA.cases.find(c=>c.id===id)).filter(Boolean).map(card).join('')}</div></section>`;document.title='Raymond殷圣尧的客户成功最佳实践案例';}
function matchesFilters(c, f={}) {
 const group=DATA.industryGroups.find(g=>g.members.includes(c.industry));
 if(f.group && group?.id!==f.group)return false;
 if(f.sector && c.sector!==f.sector)return false;
 if(f.capability && c.capability!==f.capability)return false;
 if(f.scene && c.scene!==f.scene)return false;
 if(f.tool && !c.tools.includes(f.tool))return false;
 if(f.customer && c.customer!==f.customer)return false;
 if(f.status && c.status!==f.status)return false;
 const text=[c.customer,c.title,c.summary,c.description,c.problem,...c.steps,c.value,c.scene,c.scenarioName,c.capability,c.sector,...c.tags,...c.tools,product(c.product).name,industry(c.industry).name,group?.name].join(' ').toLocaleLowerCase();
 return (f.q||'').toLocaleLowerCase().split(/\s+/).filter(Boolean).every(t=>text.includes(t));
}
const filterKeys=['group','sector','capability','scene','tool','customer','status','q'];
function readFilters(params){return Object.fromEntries(filterKeys.map(k=>[k,params.get(k)||'']));}
function filterLink(base, f, key, value){
 const next={...f,[key]:value};
 if(key==='group'){next.sector='';next.scene='';}
 if(key==='capability')next.scene='';
 const qs=new URLSearchParams(Object.entries(next).filter(([,v])=>v));
 return base+(qs.size?'?'+qs:'');
}
function catalogPage(p,i,scene,params=new URLSearchParams()){
 const base=path(p?.id,i?.id,scene),f=readFilters(params),pool=subset(p?.id,i?.id).filter(c=>!scene||c.scene===scene);
 const result=pool.filter(c=>matchesFilters(c,f));
 const facet=(label,key,choices)=>`<div class="facet-row"><span class="facet-label">${label}</span><div class="facet-options" role="group" aria-label="${label}"><a class="facet-chip ${f[key]?'':'active'}" ${f[key]?'':'aria-current="true"'} href="${escape(filterLink(base,f,key,''))}">全部</a>${choices.map(([value,name])=>{const count=pool.filter(c=>matchesFilters(c,{...f,[key]:value,...(key==='group'?{sector:'',scene:''}:key==='capability'?{scene:''}:{})})).length;if(!count&&f[key]!==value)return '';return `<a class="facet-chip ${f[key]===value?'active':''}" ${f[key]===value?'aria-current="true"':''} href="${escape(filterLink(base,f,key,value))}">${escape(name)} <small>${count}</small></a>`}).join('')}</div></div>`;
 const values=key=>unique(pool.flatMap(c=>Array.isArray(c[key])?c[key]:[c[key]])).map(v=>[v,v]);
 const groups=DATA.industryGroups.filter(g=>pool.some(c=>g.members.includes(c.industry))).map(g=>[g.id,g.name]);
 const sectors=unique(pool.filter(c=>!f.group||DATA.industryGroups.find(g=>g.id===f.group)?.members.includes(c.industry)).map(c=>c.sector)).map(v=>[v,v]);
 const sceneValues=unique(pool.filter(c=>!f.capability||c.capability===f.capability).map(c=>c.scene)).map(v=>[v,v]);
 const active=filterKeys.filter(k=>f[k]);
 main.innerHTML=`${breadcrumb(p,i)}<section class="page-title catalog-title fade-in"><div><div class="eyebrow">${p?.en||'THE PRACTICE ATLAS'} / CASE LIBRARY</div><h1>${escape(i?i.name:p?p.name:'全部实践案例')}</h1><p>选行业，看业务场景；按产品能力，找到可借鉴的做法。</p></div><div class="catalog-count"><strong>${pool.length}</strong><span>个精选案例</span></div></section>
 <nav class="platform-tabs" aria-label="产品专题"><a class="${p?'':'active'}" href="#/library">全部产品</a>${DATA.products.map(x=>`<a class="${p?.id===x.id?'active':''}" href="${path(x.id)}">${escape(x.name)}</a>`).join('')}</nav>
 <section class="catalog-panel" aria-label="案例筛选"><div class="catalog-search"><div><strong>找到适合你的业务场景</strong><p>行业、能力、产品与客户可以组合筛选</p></div>${searchHtml(f.q)}</div>
 ${!i?facet('所属行业','group',groups):''}
 ${facet('细分行业','sector',sectors)}
 ${facet('能力大类','capability',DATA.capabilities.filter(x=>pool.some(c=>c.capability===x)).map(x=>[x,x]))}
 ${facet('使用产品','tool',values('tools'))}
 <details class="more-filters" ${f.customer||f.status||f.scene?'open':''}><summary>更多筛选 · 客户 / 状态 / 具体场景</summary>${facet('客户名称','customer',values('customer'))}${facet('案例状态','status',values('status'))}${!scene?facet('具体场景','scene',sceneValues):''}</details></section>
 <div class="result-bar"><p class="list-summary" aria-live="polite">找到 <strong>${result.length}</strong> 个案例<span> / 共 ${pool.length} 个</span></p><a class="reset-filters" href="${base}">清空筛选 ↺</a></div>
 ${active.length?`<div class="selected-filters">${active.map(k=>`<a href="${escape(filterLink(base,f,k,''))}" aria-label="移除筛选 ${escape(k==='group'?DATA.industryGroups.find(g=>g.id===f[k])?.name||f[k]:f[k])}">${escape(k==='group'?DATA.industryGroups.find(g=>g.id===f[k])?.name||f[k]:f[k])} ×</a>`).join('')}</div>`:''}
 ${result.length?`<section class="case-grid">${result.map(c=>card(c,filterLink(base,f,'case',c.id))).join('')}</section>`:`<section class="empty"><h2>当前组合没有匹配案例</h2><p>试着移除一个筛选条件，或换个关键词。</p><a class="text-link" href="${base}">清空筛选，查看全部案例 →</a></section>`}`;
 document.title=`${p?.short||'全部案例'}${i?' · '+i.name:''} · 实践图谱`;
 const form=main.querySelector('form.search');form.onsubmit=e=>{e.preventDefault();location.hash=filterLink(base,f,'q',new FormData(form).get('q').trim()).slice(1)};
}
function productPage(p,params){catalogPage(p,null,null,params)}
function industryPage(p,i,scene,params){catalogPage(p,i,scene,params)}
function searchPage(q){catalogPage(null,null,null,new URLSearchParams({q}))}

function showCase(c){
 const detailTags=(label,items,kind)=>`<div class="detail-tag-row"><b>${label}</b><div class="card-tags ${kind}">${items.map(t=>`<span>${escape(t)}</span>`).join('')}</div></div>`;
 body.innerHTML=`<div class="detail-kicker">${escape(product(c.product).short)} / ${escape(c.sector)} / ${escape(c.capability)}</div><h2 class="detail-title" id="dialog-title">${escape(c.scenarioName)}</h2><p class="detail-summary">${escape(c.summary)}</p><div class="detail-customer"><strong>${escape(c.customer)}</strong>${badge(c)}</div><div class="detail-tags">${detailTags('场景概述',c.tags,'')}${detailTags('使用产品',c.tools,'product-tags')}</div><section class="detail-section"><h3>01 / 场景描述</h3><p>${escape(c.description)}</p></section><section class="detail-section"><h3>02 / 痛点</h3><p>${escape(c.problem)}</p></section><section class="detail-section"><h3>03 / 解决方案</h3><ol class="steps">${c.steps.map(s=>`<li>${escape(s)}</li>`).join('')}</ol></section><section class="detail-section value-section"><h3>04 / 业务价值</h3><p>${escape(c.value)}</p></section><details class="provenance"><summary>材料来源与阅读说明</summary><p><b>材料依据</b> · ${escape(c.source)}<br>整理于 ${c.verified}${c.note?`<br>${escape(c.note)}`:''}<br>${escape(c.editorial)}<br>业务价值为材料摘要或定性归纳，不构成效果保证；具体产品能力以实际环境为准。</p></details><button class="share-button" id="share">复制此案例链接 ↗</button>`;
 document.getElementById('share').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);toast('案例链接已复制')}catch{toast('可复制浏览器地址栏分享此案例')}};
 if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
}
function toast(msg){let el=document.getElementById('toast');el.textContent=msg;el.classList.add('visible');setTimeout(()=>el.classList.remove('visible'),3500);}
let priorBase='',returnFocus=null;
function render(){
 if(!DATA)return;
 const hash=location.hash.slice(1)||'/',[url,query]=hash.split('?');let parts;
 try{parts=url.split('/').filter(Boolean).map(decodeURIComponent)}catch{parts=[]}
 const params=new URLSearchParams(query||''),p=product(parts[0]),i=industry(parts[1]),c=DATA.cases.find(c=>c.id===params.get('case'));
 params.delete('case');const base=url+(params.size?'?'+params:'');
 if(base!==priorBase||!main.querySelector('section')){
  if(parts[0]==='search')searchPage(params.get('q')||'');
  else if(parts[0]==='library')catalogPage(null,null,null,params);
  else if(p&&i&&subset(p.id,i.id).length)industryPage(p,i,parts[2],params);
  else if(p)productPage(p,params);else home();
  if(url!==priorBase.split('?')[0])window.scrollTo(0,0);
  priorBase=base;
  document.querySelectorAll('form.search').forEach(form=>{if(!form.onsubmit)form.onsubmit=e=>{e.preventDefault();location.hash='/library?q='+encodeURIComponent(new FormData(form).get('q').trim())}});
 }
 if(c){if(!dialog.open)returnFocus=document.activeElement;showCase(c)}else if(dialog.open){dialog.close();if(returnFocus?.isConnected)returnFocus.focus()}
}
function closeDetail(){
 const [url,query]=(location.hash.slice(1)||'/').split('?'),params=new URLSearchParams(query||'');
 if(params.has('case')){params.delete('case');location.hash=url+(params.size?'?'+params:'')}else dialog.close();
}
document.querySelector('.close').onclick=closeDetail;dialog.addEventListener('cancel',e=>{e.preventDefault();closeDetail()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail()}});
document.getElementById('about').onclick=()=>{body.innerHTML=`<div class="about-content"><div class="eyebrow">ABOUT THIS COLLECTION</div><h2 class="detail-title" id="dialog-title">好案例，也需要清晰的边界。</h2><p>实践图谱将飞书与金山 WPS 材料整理为可快速浏览的业务场景。你可以选择飞书或金山 WPS，再组合筛选所属行业、细分行业、能力大类、使用产品、客户和案例状态；关键词会同时检索正文与标签。</p><h3>同一结构，便于借鉴</h3><p>每个案例包含场景描述、痛点、解决方案与业务价值。场景概述标签帮助理解业务主题，使用产品标签展示材料明确涉及的产品或模块；方案或试用中的产品组合，以案例状态为准。</p><h3>看懂案例状态</h3><p><b>实践案例：</b>材料描述的应用实践。<br><b>试用案例：</b>材料明确处于试用阶段。<br><b>场景演示：</b>演示流程与输出，不等于全面推广。<br><b>方案参考：</b>规划做法与预期价值，需实际验证。</p><h3>关于材料与维护</h3><p>本站为独立摘要，不代表产品官方立场。内容不含原始业务数据、内部人员资料或受限附件。案例摘要保留材料名称与整理日期；量化收益未经验证不作承诺。</p><p>内容持续更新；如需增加或调整案例，可由站点维护者统一更新发布。</p></div>`;dialog.showModal();dialog.scrollTop=0;};
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();main.scrollIntoView()});
window.addEventListener('hashchange',render);
fetch('data.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('data');return r.json()}).then(data=>{DATA=data;document.getElementById('updated').textContent=data.updated.replaceAll('-','.');render()}).catch(()=>{main.innerHTML='<section class="empty"><h1>案例暂时未能载入</h1><p>请检查网络后刷新页面。</p><button class="text-link" onclick="location.reload()">重新加载 ↻</button></section>'});
