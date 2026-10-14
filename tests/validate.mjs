import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const data=JSON.parse(readFileSync(new URL('../data.json',import.meta.url)));
assert.equal(data.products.length,2);
const ids=new Set();
for(const c of data.cases){
 assert(!ids.has(c.id),'duplicate case id');ids.add(c.id);
 assert(data.products.some(p=>p.id===c.product),'unknown product');
 assert(data.industries.some(i=>i.id===c.industry),'unknown industry');
 for(const key of ['id','customer','title','summary','problem','value','scene','source','verified'])assert.equal(typeof c[key],'string',key);
 assert.equal(c.steps.length,3,'three summarized steps required');
 assert(c.tools.length>0,'missing tools');
 assert(['实践案例','试用案例','场景演示','方案参考','适配参考'].includes(c.status));
 assert(c.title.length<=36,'title too long');
 assert(c.summary.length<=70,'summary too long');
 assert(!/https?:\/\/|ou_[a-z0-9]+|gh[op]_[A-Za-z0-9]+|未经允许|未获得客户/.test(JSON.stringify(c)),'public data must be sanitized');
}
for(const p of data.products)assert(data.cases.some(c=>c.product===p.id));
console.log(`PASS: ${data.cases.length} cases, unique IDs, valid product/industry hierarchy, consistent fields, publication checks.`);
