import http from 'node:http';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root) || !existsSync(file) || !types[path.extname(file)]) {res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200, {'Content-Type':types[path.extname(file)]});
  res.end(readFileSync(file));
}).listen(8000,'127.0.0.1',()=>console.log('Algebra Atlas: http://localhost:8000'));
