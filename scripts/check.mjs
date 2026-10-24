import assert from 'node:assert/strict';
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const json = p => JSON.parse(readFileSync(join(root,p),'utf8'));
const pkg = json('package.json');
assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
for (const p of ['plugin.json','.claude-plugin/plugin.json','gemini-extension.json']) {
  const m=json(p); assert.equal(m.name,'engineering-principles'); assert.equal(m.version,pkg.version);
}
assert.equal(json('.claude-plugin/marketplace.json').plugins[0].version,pkg.version);
assert.equal(json('.agents/plugins/marketplace.json').plugins[0].source.path,'./');
assert.deepEqual(pkg.pi.skills,['./skills']);
assert.equal(json('.claude-plugin/plugin.json').skills,'./skills/');
const skill=readFileSync(join(root,'skills/engineering-principles/SKILL.md'),'utf8');
assert.ok(skill.includes(`version: "${pkg.version}"`));
assert.match(skill,/^---\nname: engineering-principles\n/);
function walk(dir) {
  for(const entry of readdirSync(dir)) {
    if(entry==='.git') continue;
    const p=join(dir,entry), s=lstatSync(p); assert.ok(!s.isSymbolicLink());
    if(s.isDirectory()) walk(p);
    else if(p.endsWith('.md')) {
      for(const [,target] of readFileSync(p,'utf8').matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
        if(/^[a-z]+:|^#/.test(target)) continue;
        const linked=resolve(dirname(p),target.split('#')[0]);
        assert.ok(linked.startsWith(root)); assert.ok(lstatSync(linked).isFile(),`${p}: ${target}`);
      }
    }
  }
}
walk(root);
console.log('Native manifests, version identity and Markdown links verified.');
