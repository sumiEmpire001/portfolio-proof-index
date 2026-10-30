import { validate, select, summary } from './catalog.mjs';
const byId=id=>document.getElementById(id);
const node=(tag,text)=>{const result=document.createElement(tag);result.textContent=text;return result;};

async function start(){
  const embedded=byId('project-data');
  let manifest;
  if(embedded)manifest=JSON.parse(embedded.textContent);
  else {const response=await fetch('./projects.json',{cache:'no-store'});if(!response.ok)throw new Error('Could not load the project catalogue');manifest=await response.json();}
  const errors=validate(manifest);
  if(errors.length)throw new Error('Catalogue validation failed: '+errors.join('; '));
  const totals=summary(manifest.projects);
  byId('owner').textContent=manifest.public_name;
  byId('stats').textContent=`${totals.repositories} repositories · ${totals.implementations} implementations · ${totals.local_tests} local tests · ${totals.ci_verified} CI results verified`;
  byId('as-of').textContent='Recorded '+manifest.as_of+'. Evidence is a dated snapshot, not live monitoring.';
  for(const category of new Set(manifest.projects.map(p=>p.category))){const option=node('option',category);option.value=category;byId('category').append(option);}
  const render=()=>{
    const projects=select(manifest.projects,{query:byId('search').value,category:byId('category').value,status:byId('status').value});
    const cards=projects.map(project=>{
      const card=node('article',''),head=node('div',''),number=node('span',String(project.id).padStart(3,'0'));
      number.className='number';head.className='card-head';head.append(number,node('span',project.implementation==='published'?'Working code published':'Planned build'));card.append(head);
      const heading=node('h2',''),link=node('a',project.name);link.href=project.url;heading.append(link);card.append(heading,node('p',project.scope));
      const details=node('details','');details.append(node('summary','Verification and evidence'),node('p',project.required_checks));
      details.append(node('p',`${project.local_tests} local tests recorded. Repository existence ${project.repository_verified?'verified':'unverified'}.`));
      if(project.commit){const commit=node('a','Implementation commit');commit.href=project.url+'/commit/'+project.commit;details.append(commit);}
      if(project.ci_url){details.append(node('br',''));const ci=node('a','Verified CI run');ci.href=project.ci_url;details.append(ci);}
      card.append(details);return card;
    });
    byId('cards').replaceChildren(...cards);byId('count').textContent=`${projects.length} projects shown`;
    if(!projects.length)byId('cards').append(node('p','No projects match these filters.'));
  };
  for(const id of ['search','category','status'])byId(id).addEventListener('input',render);
  byId('reset').addEventListener('click',()=>{for(const id of ['search','category','status'])byId(id).value='';render();byId('search').focus();});
  render();
}
start().catch(error=>{byId('error').hidden=false;byId('error').textContent=error.message;byId('stats').textContent='Catalogue unavailable';});
