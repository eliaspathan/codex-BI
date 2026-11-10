const vm=require('node:vm'),assert=require('node:assert/strict');
const nodes=new Map();function element(k){if(!nodes.has(k))nodes.set(k,{value:k==='#store'?'All':k==='#sort'?'discount':'',checked:false,innerHTML:'',textContent:'',hidden:false,dataset:{},classList:{toggle(){},add(){},remove(){}},setAttribute(){},insertAdjacentHTML(){},append(){},addEventListener(){},scrollIntoView(){},showModal(){},close(){}});return nodes.get(k)}
const context=vm.createContext({document:{querySelector:element,querySelectorAll:()=>[],createElement:()=>({}),addEventListener(){}},localStorage:{getItem:()=>null,setItem(){}},setInterval(){},setTimeout(){},clearTimeout(){},console});
const html=require('node:fs').readFileSync(require('node:path').join(__dirname,'index.html'),'utf8');vm.runInContext(html.split('<script>')[1].split('</script>')[0],context);const run=s=>vm.runInContext(s,context);
assert.match(element('#result-count').textContent,/0 verified deals/);assert.equal(element('#preview-notice').hidden,true);
run("setMode('preview')");assert.match(element('#result-count').textContent,/12 sample examples/);
element('#budget').checked=true;run("render()");assert.match(element('#result-count').textContent,/4 sample examples/);
run("reset();selectStore('Target')");assert.match(element('#result-count').textContent,/1 sample examples/);
run("reset();category='Electronics';render()");assert.match(element('#result-count').textContent,/5 sample examples/);
run("reset();save('p1');view='saved';render()");assert.match(element('#result-count').textContent,/1 sample examples saved/);
element('#search').value='nothing matches';run("render()");assert.equal(element('#empty').hidden,false);run("reset()");
for(const d of [{store:'Amazon',price:10,original:10,sample:true},{store:'Amazon',price:0,original:10,sample:true},{store:'Amazon',price:5,original:10,checkedAt:'2020-01-01T00:00:00Z'},{store:'Amazon',price:5,original:10,checkedAt:new Date().toISOString(),expires:'2020-01-01T00:00:00Z'},{store:'Amazon',price:5,original:10,checkedAt:new Date().toISOString(),unavailable:true}])assert.equal(run('isEligible('+JSON.stringify(d)+')'),false);
assert.equal(run("isEligible({store:'Amazon',price:5,original:10,checkedAt:new Date().toISOString()})"),true);
assert.equal(run('stores.length'),9);assert.equal(run("picture('headphones').includes('id=\"shell\"')"),false);
assert(html.includes('<!-- DEALNEWS FEED TEMPORARILY COMMENTED OUT.'));assert(!/<(?:script|img)[^>]+src=|<link[^>]+rel="stylesheet"/.test(html));
console.log('PASS: verified default, preview labeling, search, filters, saved items, nine stores, price/expiry guards, standalone assets, and disabled DealNews section.');