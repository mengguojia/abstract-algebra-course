export const mod=(a,n)=>((a%n)+n)%n;
export function gcd(a,b){while(b){[a,b]=[b,a%b];}return Math.abs(a);}
export function orbit(n,k){const out=[];let x=0;do{out.push(x);x=mod(x+k,n);}while(x!==0);return out;}
export function cosets(n,k){const h=orbit(n,k);const seen=new Set();const out=[];for(let a=0;a<n;a++){if(!seen.has(a)){const c=h.map(x=>mod(a+x,n)).sort((x,y)=>x-y);c.forEach(x=>seen.add(x));out.push(c);}}return out;}
// D4: (a,b) means r^a s^b; rs acts by applying s first.
export function d4mul([a,b],[c,d]){return [mod(a+(b?-c:c),4),mod(b+d,2)];}
export function d4apply([a,b],v){return mod(a+(b?-v:v),4);}
export function units(n){return Array.from({length:n-1},(_,i)=>i+1).filter(a=>gcd(a,n)===1);}
export function inverse(a,n){return units(n).find(b=>mod(a*b,n)===1);}
export function gf4mul(a,b){let r=0;for(let i=0;i<2;i++){if((b>>i)&1)r^=a<<i;}if(r&4)r^=7;return r;}
export function sylowCandidates(order,p){let q=order;while(q%p===0)q/=p;return Array.from({length:q},(_,i)=>i+1).filter(d=>q%d===0 && d%p===1);}
