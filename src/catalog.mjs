export function validate(manifest) {
  const errors = [], ids = new Set(), names = new Set();
  if (!manifest || manifest.owner !== 'sumiEmpire001' || !Array.isArray(manifest.projects)) return ['Expected sumiEmpire001 portfolio manifest'];
  if (manifest.projects.length !== 100) errors.push('Expected exactly 100 projects');
  for (const project of manifest.projects) {
    if (!project || typeof project !== 'object') { errors.push('Invalid project record'); continue; }
    const label = String(project.name ?? project.id ?? '?');
    if (!Number.isInteger(project.id) || project.id < 1 || project.id > 100 || ids.has(project.id)) errors.push(label + ': invalid or duplicate ID');
    ids.add(project.id);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.name ?? '') || names.has(project.name)) errors.push(label + ': invalid or duplicate name');
    names.add(project.name);
    if (project.url !== `https://github.com/${manifest.owner}/${project.name}`) errors.push(label + ': mismatched repository URL');
    if (!['planned', 'published'].includes(project.implementation)) errors.push(label + ': invalid implementation status');
    if (typeof project.repository_verified !== 'boolean') errors.push(label + ': repository verification must be explicit');
    if (!Number.isInteger(project.local_tests) || project.local_tests < 0) errors.push(label + ': invalid local test count');
    if (!project.scope || !project.required_checks || !project.category) errors.push(label + ': missing build scope or verification requirements');
    if (project.implementation === 'planned' && (project.local_tests !== 0 || project.commit || project.ci_url)) errors.push(label + ': planned project claims implementation evidence');
    if (project.implementation === 'published' && (!project.repository_verified || !/^[0-9a-f]{40}$/.test(project.commit ?? '') || project.local_tests < 1)) errors.push(label + ': published implementation lacks repository, commit or local test evidence');
    if (project.ci_url && !new RegExp(`^https://github\\.com/${manifest.owner}/${project.name}/actions/runs/[0-9]+$`).test(project.ci_url)) errors.push(label + ': CI evidence must point to this repository');
  }
  return errors;
}

export function select(projects, {query='', category='', status=''}={}) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return projects.filter(p => (!category || p.category === category) && (!status || p.implementation === status) && words.every(word => `${p.name} ${p.scope} ${p.category}`.toLowerCase().includes(word))).sort((a,b)=>a.id-b.id);
}

export function summary(projects) {
  return {repositories: projects.filter(p=>p.repository_verified).length,
    implementations:projects.filter(p=>p.implementation==='published').length,
    local_tests:projects.reduce((total,p)=>total+p.local_tests,0),
    ci_verified:projects.filter(p=>Boolean(p.ci_url)).length};
}
