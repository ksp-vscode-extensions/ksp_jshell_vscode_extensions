(()=>{var t={873:(t,e,n)=>{"use strict";const r=n(77),i=n(17),o=n(381).mkdirsSync,c=n(318).utimesMillisSync,s=n(733);function a(t,e,n,o){const c=(o.dereference?r.statSync:r.lstatSync)(e);if(c.isDirectory())return function(t,e,n,i,o){return e?l(n,i,o):function(t,e,n,i){return r.mkdirSync(n),l(e,n,i),f(n,t)}(t.mode,n,i,o)}(c,t,e,n,o);if(c.isFile()||c.isCharacterDevice()||c.isBlockDevice())return function(t,e,n,i,o){return e?function(t,e,n,i){if(i.overwrite)return r.unlinkSync(n),u(t,e,n,i);if(i.errorOnExist)throw new Error(`'${n}' already exists`)}(t,n,i,o):u(t,n,i,o)}(c,t,e,n,o);if(c.isSymbolicLink())return function(t,e,n,o){let c=r.readlinkSync(e);if(o.dereference&&(c=i.resolve(process.cwd(),c)),t){let t;try{t=r.readlinkSync(n)}catch(t){if("EINVAL"===t.code||"UNKNOWN"===t.code)return r.symlinkSync(c,n);throw t}if(o.dereference&&(t=i.resolve(process.cwd(),t)),s.isSrcSubdir(c,t))throw new Error(`Cannot copy '${c}' to a subdirectory of itself, '${t}'.`);if(s.isSrcSubdir(t,c))throw new Error(`Cannot overwrite '${t}' with '${c}'.`);return function(t,e){return r.unlinkSync(e),r.symlinkSync(t,e)}(c,n)}return r.symlinkSync(c,n)}(t,e,n,o);if(c.isSocket())throw new Error(`Cannot copy a socket file: ${e}`);if(c.isFIFO())throw new Error(`Cannot copy a FIFO pipe: ${e}`);throw new Error(`Unknown file: ${e}`)}function u(t,e,n,i){return r.copyFileSync(e,n),i.preserveTimestamps&&function(t,e,n){(function(t){return 0==(128&t)})(t)&&function(t,e){f(t,128|e)}(n,t),function(t,e){const n=r.statSync(t);c(e,n.atime,n.mtime)}(e,n)}(t.mode,e,n),f(n,t.mode)}function f(t,e){return r.chmodSync(t,e)}function l(t,e,n){r.readdirSync(t).forEach((r=>function(t,e,n,r){const o=i.join(e,t),c=i.join(n,t);if(r.filter&&!r.filter(o,c))return;const{destStat:u}=s.checkPathsSync(o,c,"copy",r);return a(u,o,c,r)}(r,t,e,n)))}t.exports=function(t,e,n){"function"==typeof n&&(n={filter:n}),(n=n||{}).clobber=!("clobber"in n)||!!n.clobber,n.overwrite="overwrite"in n?!!n.overwrite:n.clobber,n.preserveTimestamps&&"ia32"===process.arch&&process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269","Warning","fs-extra-WARN0002");const{srcStat:c,destStat:u}=s.checkPathsSync(t,e,"copy",n);if(s.checkParentPathsSync(t,c,e,"copy"),n.filter&&!n.filter(t,e))return;const f=i.dirname(e);return r.existsSync(f)||o(f),a(u,t,e,n)}},189:(t,e,n)=>{"use strict";const r=n(77),i=n(17),o=n(381).mkdirs,c=n(257).pathExists,s=n(318).utimesMillis,a=n(733);function u(t,e,n,r){if(!n.filter)return r(null,!0);Promise.resolve(n.filter(t,e)).then((t=>r(null,t)),(t=>r(t)))}function f(t,e,n,o,c){(o.dereference?r.stat:r.lstat)(e,((s,u)=>s?c(s):u.isDirectory()?function(t,e,n,i,o,c){return e?y(n,i,o,c):function(t,e,n,i,o){r.mkdir(n,(r=>{if(r)return o(r);y(e,n,i,(e=>e?o(e):d(n,t,o)))}))}(t.mode,n,i,o,c)}(u,t,e,n,o,c):u.isFile()||u.isCharacterDevice()||u.isBlockDevice()?function(t,e,n,i,o,c){return e?function(t,e,n,i,o){if(!i.overwrite)return i.errorOnExist?o(new Error(`'${n}' already exists`)):o();r.unlink(n,(r=>r?o(r):l(t,e,n,i,o)))}(t,n,i,o,c):l(t,n,i,o,c)}(u,t,e,n,o,c):u.isSymbolicLink()?function(t,e,n,o,c){r.readlink(e,((e,s)=>e?c(e):(o.dereference&&(s=i.resolve(process.cwd(),s)),t?void r.readlink(n,((t,e)=>t?"EINVAL"===t.code||"UNKNOWN"===t.code?r.symlink(s,n,c):c(t):(o.dereference&&(e=i.resolve(process.cwd(),e)),a.isSrcSubdir(s,e)?c(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${e}'.`)):a.isSrcSubdir(e,s)?c(new Error(`Cannot overwrite '${e}' with '${s}'.`)):function(t,e,n){r.unlink(e,(i=>i?n(i):r.symlink(t,e,n)))}(s,n,c)))):r.symlink(s,n,c))))}(t,e,n,o,c):u.isSocket()?c(new Error(`Cannot copy a socket file: ${e}`)):u.isFIFO()?c(new Error(`Cannot copy a FIFO pipe: ${e}`)):c(new Error(`Unknown file: ${e}`))))}function l(t,e,n,i,o){r.copyFile(e,n,(r=>r?o(r):i.preserveTimestamps?function(t,e,n,r){return function(t){return 0==(128&t)}(t)?function(t,e,n){return d(t,128|e,n)}(n,t,(i=>i?r(i):p(t,e,n,r))):p(t,e,n,r)}(t.mode,e,n,o):d(n,t.mode,o)))}function p(t,e,n,i){!function(t,e,n){r.stat(t,((t,r)=>t?n(t):s(e,r.atime,r.mtime,n)))}(e,n,(e=>e?i(e):d(n,t,i)))}function d(t,e,n){return r.chmod(t,e,n)}function y(t,e,n,i){r.readdir(t,((r,o)=>r?i(r):m(o,t,e,n,i)))}function m(t,e,n,r,o){const c=t.pop();return c?function(t,e,n,r,o,c){const s=i.join(n,e),l=i.join(r,e);u(s,l,o,((e,i)=>e?c(e):i?void a.checkPaths(s,l,"copy",o,((e,i)=>{if(e)return c(e);const{destStat:a}=i;f(a,s,l,o,(e=>e?c(e):m(t,n,r,o,c)))})):m(t,n,r,o,c)))}(t,c,e,n,r,o):o()}t.exports=function(t,e,n,r){"function"!=typeof n||r?"function"==typeof n&&(n={filter:n}):(r=n,n={}),r=r||function(){},(n=n||{}).clobber=!("clobber"in n)||!!n.clobber,n.overwrite="overwrite"in n?!!n.overwrite:n.clobber,n.preserveTimestamps&&"ia32"===process.arch&&process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n\tsee https://github.com/jprichardson/node-fs-extra/issues/269","Warning","fs-extra-WARN0001"),a.checkPaths(t,e,"copy",n,((s,l)=>{if(s)return r(s);const{srcStat:p,destStat:d}=l;a.checkParentPaths(t,p,e,"copy",(s=>{if(s)return r(s);u(t,e,n,((s,a)=>s?r(s):a?void function(t,e,n,r,s){const a=i.dirname(n);c(a,((i,c)=>i?s(i):c?f(t,e,n,r,s):void o(a,(i=>i?s(i):f(t,e,n,r,s)))))}(d,t,e,n,r):r()))}))}))}},464:(t,e,n)=>{"use strict";const r=n(981).fromCallback;t.exports={copy:r(n(189)),copySync:n(873)}},590:(t,e,n)=>{"use strict";const r=n(981).fromPromise,i=n(749),o=n(17),c=n(381),s=n(542),a=r((async function(t){let e;try{e=await i.readdir(t)}catch{return c.mkdirs(t)}return Promise.all(e.map((e=>s.remove(o.join(t,e)))))}));function u(t){let e;try{e=i.readdirSync(t)}catch{return c.mkdirsSync(t)}e.forEach((e=>{e=o.join(t,e),s.removeSync(e)}))}t.exports={emptyDirSync:u,emptydirSync:u,emptyDir:a,emptydir:a}},530:(t,e,n)=>{"use strict";const r=n(981).fromCallback,i=n(17),o=n(77),c=n(381);t.exports={createFile:r((function(t,e){function n(){o.writeFile(t,"",(t=>{if(t)return e(t);e()}))}o.stat(t,((r,s)=>{if(!r&&s.isFile())return e();const a=i.dirname(t);o.stat(a,((t,r)=>{if(t)return"ENOENT"===t.code?c.mkdirs(a,(t=>{if(t)return e(t);n()})):e(t);r.isDirectory()?n():o.readdir(a,(t=>{if(t)return e(t)}))}))}))})),createFileSync:function(t){let e;try{e=o.statSync(t)}catch{}if(e&&e.isFile())return;const n=i.dirname(t);try{o.statSync(n).isDirectory()||o.readdirSync(n)}catch(t){if(!t||"ENOENT"!==t.code)throw t;c.mkdirsSync(n)}o.writeFileSync(t,"")}}},720:(t,e,n)=>{"use strict";const{createFile:r,createFileSync:i}=n(530),{createLink:o,createLinkSync:c}=n(865),{createSymlink:s,createSymlinkSync:a}=n(635);t.exports={createFile:r,createFileSync:i,ensureFile:r,ensureFileSync:i,createLink:o,createLinkSync:c,ensureLink:o,ensureLinkSync:c,createSymlink:s,createSymlinkSync:a,ensureSymlink:s,ensureSymlinkSync:a}},865:(t,e,n)=>{"use strict";const r=n(981).fromCallback,i=n(17),o=n(77),c=n(381),s=n(257).pathExists,{areIdentical:a}=n(733);t.exports={createLink:r((function(t,e,n){function r(t,e){o.link(t,e,(t=>{if(t)return n(t);n(null)}))}o.lstat(e,((u,f)=>{o.lstat(t,((o,u)=>{if(o)return o.message=o.message.replace("lstat","ensureLink"),n(o);if(f&&a(u,f))return n(null);const l=i.dirname(e);s(l,((i,o)=>i?n(i):o?r(t,e):void c.mkdirs(l,(i=>{if(i)return n(i);r(t,e)}))))}))}))})),createLinkSync:function(t,e){let n;try{n=o.lstatSync(e)}catch{}try{const e=o.lstatSync(t);if(n&&a(e,n))return}catch(t){throw t.message=t.message.replace("lstat","ensureLink"),t}const r=i.dirname(e);return o.existsSync(r)||c.mkdirsSync(r),o.linkSync(t,e)}}},72:(t,e,n)=>{"use strict";const r=n(17),i=n(77),o=n(257).pathExists;t.exports={symlinkPaths:function(t,e,n){if(r.isAbsolute(t))return i.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),n(e)):n(null,{toCwd:t,toDst:t})));{const c=r.dirname(e),s=r.join(c,t);return o(s,((e,o)=>e?n(e):o?n(null,{toCwd:s,toDst:t}):i.lstat(t,(e=>e?(e.message=e.message.replace("lstat","ensureSymlink"),n(e)):n(null,{toCwd:t,toDst:r.relative(c,t)})))))}},symlinkPathsSync:function(t,e){let n;if(r.isAbsolute(t)){if(n=i.existsSync(t),!n)throw new Error("absolute srcpath does not exist");return{toCwd:t,toDst:t}}{const o=r.dirname(e),c=r.join(o,t);if(n=i.existsSync(c),n)return{toCwd:c,toDst:t};if(n=i.existsSync(t),!n)throw new Error("relative srcpath does not exist");return{toCwd:t,toDst:r.relative(o,t)}}}}},259:(t,e,n)=>{"use strict";const r=n(77);t.exports={symlinkType:function(t,e,n){if(n="function"==typeof e?e:n,e="function"!=typeof e&&e)return n(null,e);r.lstat(t,((t,r)=>{if(t)return n(null,"file");e=r&&r.isDirectory()?"dir":"file",n(null,e)}))},symlinkTypeSync:function(t,e){let n;if(e)return e;try{n=r.lstatSync(t)}catch{return"file"}return n&&n.isDirectory()?"dir":"file"}}},635:(t,e,n)=>{"use strict";const r=n(981).fromCallback,i=n(17),o=n(749),c=n(381),s=c.mkdirs,a=c.mkdirsSync,u=n(72),f=u.symlinkPaths,l=u.symlinkPathsSync,p=n(259),d=p.symlinkType,y=p.symlinkTypeSync,m=n(257).pathExists,{areIdentical:h}=n(733);function S(t,e,n,r){f(t,e,((c,a)=>{if(c)return r(c);t=a.toDst,d(a.toCwd,n,((n,c)=>{if(n)return r(n);const a=i.dirname(e);m(a,((n,i)=>n?r(n):i?o.symlink(t,e,c,r):void s(a,(n=>{if(n)return r(n);o.symlink(t,e,c,r)}))))}))}))}t.exports={createSymlink:r((function(t,e,n,r){r="function"==typeof n?n:r,n="function"!=typeof n&&n,o.lstat(e,((i,c)=>{!i&&c.isSymbolicLink()?Promise.all([o.stat(t),o.stat(e)]).then((([i,o])=>{if(h(i,o))return r(null);S(t,e,n,r)})):S(t,e,n,r)}))})),createSymlinkSync:function(t,e,n){let r;try{r=o.lstatSync(e)}catch{}if(r&&r.isSymbolicLink()){const n=o.statSync(t),r=o.statSync(e);if(h(n,r))return}const c=l(t,e);t=c.toDst,n=y(c.toCwd,n);const s=i.dirname(e);return o.existsSync(s)||a(s),o.symlinkSync(t,e,n)}}},749:(t,e,n)=>{"use strict";const r=n(981).fromCallback,i=n(77),o=["access","appendFile","chmod","chown","close","copyFile","fchmod","fchown","fdatasync","fstat","fsync","ftruncate","futimes","lchmod","lchown","link","lstat","mkdir","mkdtemp","open","opendir","readdir","readFile","readlink","realpath","rename","rm","rmdir","stat","symlink","truncate","unlink","utimes","writeFile"].filter((t=>"function"==typeof i[t]));Object.assign(e,i),o.forEach((t=>{e[t]=r(i[t])})),e.exists=function(t,e){return"function"==typeof e?i.exists(t,e):new Promise((e=>i.exists(t,e)))},e.read=function(t,e,n,r,o,c){return"function"==typeof c?i.read(t,e,n,r,o,c):new Promise(((c,s)=>{i.read(t,e,n,r,o,((t,e,n)=>{if(t)return s(t);c({bytesRead:e,buffer:n})}))}))},e.write=function(t,e,...n){return"function"==typeof n[n.length-1]?i.write(t,e,...n):new Promise(((r,o)=>{i.write(t,e,...n,((t,e,n)=>{if(t)return o(t);r({bytesWritten:e,buffer:n})}))}))},e.readv=function(t,e,...n){return"function"==typeof n[n.length-1]?i.readv(t,e,...n):new Promise(((r,o)=>{i.readv(t,e,...n,((t,e,n)=>{if(t)return o(t);r({bytesRead:e,buffers:n})}))}))},e.writev=function(t,e,...n){return"function"==typeof n[n.length-1]?i.writev(t,e,...n):new Promise(((r,o)=>{i.writev(t,e,...n,((t,e,n)=>{if(t)return o(t);r({bytesWritten:e,buffers:n})}))}))},"function"==typeof i.realpath.native?e.realpath.native=r(i.realpath.native):process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?","Warning","fs-extra-WARN0003")},674:(t,e,n)=>{"use strict";t.exports={...n(749),...n(464),...n(590),...n(720),...n(573),...n(381),...n(338),...n(670),...n(257),...n(542)}},573:(t,e,n)=>{"use strict";const r=n(981).fromPromise,i=n(183);i.outputJson=r(n(508)),i.outputJsonSync=n(578),i.outputJSON=i.outputJson,i.outputJSONSync=i.outputJsonSync,i.writeJSON=i.writeJson,i.writeJSONSync=i.writeJsonSync,i.readJSON=i.readJson,i.readJSONSync=i.readJsonSync,t.exports=i},183:(t,e,n)=>{"use strict";const r=n(813);t.exports={readJson:r.readFile,readJsonSync:r.readFileSync,writeJson:r.writeFile,writeJsonSync:r.writeFileSync}},578:(t,e,n)=>{"use strict";const{stringify:r}=n(780),{outputFileSync:i}=n(670);t.exports=function(t,e,n){const o=r(e,n);i(t,o,n)}},508:(t,e,n)=>{"use strict";const{stringify:r}=n(780),{outputFile:i}=n(670);t.exports=async function(t,e,n={}){const o=r(e,n);await i(t,o,n)}},381:(t,e,n)=>{"use strict";const r=n(981).fromPromise,{makeDir:i,makeDirSync:o}=n(233),c=r(i);t.exports={mkdirs:c,mkdirsSync:o,mkdirp:c,mkdirpSync:o,ensureDir:c,ensureDirSync:o}},233:(t,e,n)=>{"use strict";const r=n(749),{checkPath:i}=n(468),o=t=>"number"==typeof t?t:{mode:511,...t}.mode;t.exports.makeDir=async(t,e)=>(i(t),r.mkdir(t,{mode:o(e),recursive:!0})),t.exports.makeDirSync=(t,e)=>(i(t),r.mkdirSync(t,{mode:o(e),recursive:!0}))},468:(t,e,n)=>{"use strict";const r=n(17);t.exports.checkPath=function(t){if("win32"===process.platform&&/[<>:"|?*]/.test(t.replace(r.parse(t).root,""))){const e=new Error(`Path contains invalid characters: ${t}`);throw e.code="EINVAL",e}}},338:(t,e,n)=>{"use strict";const r=n(981).fromCallback;t.exports={move:r(n(436)),moveSync:n(736)}},736:(t,e,n)=>{"use strict";const r=n(77),i=n(17),o=n(464).copySync,c=n(542).removeSync,s=n(381).mkdirpSync,a=n(733);function u(t,e,n){try{r.renameSync(t,e)}catch(r){if("EXDEV"!==r.code)throw r;return function(t,e,n){return o(t,e,{overwrite:n,errorOnExist:!0,preserveTimestamps:!0}),c(t)}(t,e,n)}}t.exports=function(t,e,n){const o=(n=n||{}).overwrite||n.clobber||!1,{srcStat:f,isChangingCase:l=!1}=a.checkPathsSync(t,e,"move",n);return a.checkParentPathsSync(t,f,e,"move"),function(t){const e=i.dirname(t);return i.parse(e).root===e}(e)||s(i.dirname(e)),function(t,e,n,i){if(i)return u(t,e,n);if(n)return c(e),u(t,e,n);if(r.existsSync(e))throw new Error("dest already exists.");return u(t,e,n)}(t,e,o,l)}},436:(t,e,n)=>{"use strict";const r=n(77),i=n(17),o=n(464).copy,c=n(542).remove,s=n(381).mkdirp,a=n(257).pathExists,u=n(733);function f(t,e,n,r,i){return r?l(t,e,n,i):n?c(e,(r=>r?i(r):l(t,e,n,i))):void a(e,((r,o)=>r?i(r):o?i(new Error("dest already exists.")):l(t,e,n,i)))}function l(t,e,n,i){r.rename(t,e,(r=>r?"EXDEV"!==r.code?i(r):function(t,e,n,r){o(t,e,{overwrite:n,errorOnExist:!0,preserveTimestamps:!0},(e=>e?r(e):c(t,r)))}(t,e,n,i):i()))}t.exports=function(t,e,n,r){"function"==typeof n&&(r=n,n={});const o=(n=n||{}).overwrite||n.clobber||!1;u.checkPaths(t,e,"move",n,((n,c)=>{if(n)return r(n);const{srcStat:a,isChangingCase:l=!1}=c;u.checkParentPaths(t,a,e,"move",(n=>n?r(n):function(t){const e=i.dirname(t);return i.parse(e).root===e}(e)?f(t,e,o,l,r):void s(i.dirname(e),(n=>n?r(n):f(t,e,o,l,r)))))}))}},670:(t,e,n)=>{"use strict";const r=n(981).fromCallback,i=n(77),o=n(17),c=n(381),s=n(257).pathExists;t.exports={outputFile:r((function(t,e,n,r){"function"==typeof n&&(r=n,n="utf8");const a=o.dirname(t);s(a,((o,s)=>o?r(o):s?i.writeFile(t,e,n,r):void c.mkdirs(a,(o=>{if(o)return r(o);i.writeFile(t,e,n,r)}))))})),outputFileSync:function(t,...e){const n=o.dirname(t);if(i.existsSync(n))return i.writeFileSync(t,...e);c.mkdirsSync(n),i.writeFileSync(t,...e)}}},257:(t,e,n)=>{"use strict";const r=n(981).fromPromise,i=n(749);t.exports={pathExists:r((function(t){return i.access(t).then((()=>!0)).catch((()=>!1))})),pathExistsSync:i.existsSync}},542:(t,e,n)=>{"use strict";const r=n(77),i=n(981).fromCallback;t.exports={remove:i((function(t,e){r.rm(t,{recursive:!0,force:!0},e)})),removeSync:function(t){r.rmSync(t,{recursive:!0,force:!0})}}},733:(t,e,n)=>{"use strict";const r=n(749),i=n(17),o=n(837);function c(t,e,n){const i=n.dereference?t=>r.stat(t,{bigint:!0}):t=>r.lstat(t,{bigint:!0});return Promise.all([i(t),i(e).catch((t=>{if("ENOENT"===t.code)return null;throw t}))]).then((([t,e])=>({srcStat:t,destStat:e})))}function s(t,e){return e.ino&&e.dev&&e.ino===t.ino&&e.dev===t.dev}function a(t,e){const n=i.resolve(t).split(i.sep).filter((t=>t)),r=i.resolve(e).split(i.sep).filter((t=>t));return n.reduce(((t,e,n)=>t&&r[n]===e),!0)}function u(t,e,n){return`Cannot ${n} '${t}' to a subdirectory of itself, '${e}'.`}t.exports={checkPaths:function(t,e,n,r,f){o.callbackify(c)(t,e,r,((r,o)=>{if(r)return f(r);const{srcStat:c,destStat:l}=o;if(l){if(s(c,l)){const r=i.basename(t),o=i.basename(e);return"move"===n&&r!==o&&r.toLowerCase()===o.toLowerCase()?f(null,{srcStat:c,destStat:l,isChangingCase:!0}):f(new Error("Source and destination must not be the same."))}if(c.isDirectory()&&!l.isDirectory())return f(new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`));if(!c.isDirectory()&&l.isDirectory())return f(new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`))}return c.isDirectory()&&a(t,e)?f(new Error(u(t,e,n))):f(null,{srcStat:c,destStat:l})}))},checkPathsSync:function(t,e,n,o){const{srcStat:c,destStat:f}=function(t,e,n){let i;const o=n.dereference?t=>r.statSync(t,{bigint:!0}):t=>r.lstatSync(t,{bigint:!0}),c=o(t);try{i=o(e)}catch(t){if("ENOENT"===t.code)return{srcStat:c,destStat:null};throw t}return{srcStat:c,destStat:i}}(t,e,o);if(f){if(s(c,f)){const r=i.basename(t),o=i.basename(e);if("move"===n&&r!==o&&r.toLowerCase()===o.toLowerCase())return{srcStat:c,destStat:f,isChangingCase:!0};throw new Error("Source and destination must not be the same.")}if(c.isDirectory()&&!f.isDirectory())throw new Error(`Cannot overwrite non-directory '${e}' with directory '${t}'.`);if(!c.isDirectory()&&f.isDirectory())throw new Error(`Cannot overwrite directory '${e}' with non-directory '${t}'.`)}if(c.isDirectory()&&a(t,e))throw new Error(u(t,e,n));return{srcStat:c,destStat:f}},checkParentPaths:function t(e,n,o,c,a){const f=i.resolve(i.dirname(e)),l=i.resolve(i.dirname(o));if(l===f||l===i.parse(l).root)return a();r.stat(l,{bigint:!0},((r,i)=>r?"ENOENT"===r.code?a():a(r):s(n,i)?a(new Error(u(e,o,c))):t(e,n,l,c,a)))},checkParentPathsSync:function t(e,n,o,c){const a=i.resolve(i.dirname(e)),f=i.resolve(i.dirname(o));if(f===a||f===i.parse(f).root)return;let l;try{l=r.statSync(f,{bigint:!0})}catch(t){if("ENOENT"===t.code)return;throw t}if(s(n,l))throw new Error(u(e,o,c));return t(e,n,f,c)},isSrcSubdir:a,areIdentical:s}},318:(t,e,n)=>{"use strict";const r=n(77);t.exports={utimesMillis:function(t,e,n,i){r.open(t,"r+",((t,o)=>{if(t)return i(t);r.futimes(o,e,n,(t=>{r.close(o,(e=>{i&&i(t||e)}))}))}))},utimesMillisSync:function(t,e,n){const i=r.openSync(t,"r+");return r.futimesSync(i,e,n),r.closeSync(i)}}},458:t=>{"use strict";t.exports=function(t){if(null===t||"object"!=typeof t)return t;if(t instanceof Object)var n={__proto__:e(t)};else n=Object.create(null);return Object.getOwnPropertyNames(t).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))})),n};var e=Object.getPrototypeOf||function(t){return t.__proto__}},77:(t,e,n)=>{var r,i,o=n(147),c=n(161),s=n(520),a=n(458),u=n(837);function f(t,e){Object.defineProperty(t,r,{get:function(){return e}})}"function"==typeof Symbol&&"function"==typeof Symbol.for?(r=Symbol.for("graceful-fs.queue"),i=Symbol.for("graceful-fs.previous")):(r="___graceful-fs.queue",i="___graceful-fs.previous");var l,p=function(){};if(u.debuglog?p=u.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(p=function(){var t=u.format.apply(u,arguments);t="GFS4: "+t.split(/\n/).join("\nGFS4: "),console.error(t)}),!o[r]){var d=global[r]||[];f(o,d),o.close=function(t){function e(e,n){return t.call(o,e,(function(t){t||h(),"function"==typeof n&&n.apply(this,arguments)}))}return Object.defineProperty(e,i,{value:t}),e}(o.close),o.closeSync=function(t){function e(e){t.apply(o,arguments),h()}return Object.defineProperty(e,i,{value:t}),e}(o.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",(function(){p(o[r]),n(491).equal(o[r].length,0)}))}function y(t){c(t),t.gracefulify=y,t.createReadStream=function(e,n){return new t.ReadStream(e,n)},t.createWriteStream=function(e,n){return new t.WriteStream(e,n)};var e=t.readFile;t.readFile=function(t,n,r){return"function"==typeof n&&(r=n,n=null),function t(n,r,i,o){return e(n,r,(function(e){!e||"EMFILE"!==e.code&&"ENFILE"!==e.code?"function"==typeof i&&i.apply(this,arguments):m([t,[n,r,i],e,o||Date.now(),Date.now()])}))}(t,n,r)};var n=t.writeFile;t.writeFile=function(t,e,r,i){return"function"==typeof r&&(i=r,r=null),function t(e,r,i,o,c){return n(e,r,i,(function(n){!n||"EMFILE"!==n.code&&"ENFILE"!==n.code?"function"==typeof o&&o.apply(this,arguments):m([t,[e,r,i,o],n,c||Date.now(),Date.now()])}))}(t,e,r,i)};var r=t.appendFile;r&&(t.appendFile=function(t,e,n,i){return"function"==typeof n&&(i=n,n=null),function t(e,n,i,o,c){return r(e,n,i,(function(r){!r||"EMFILE"!==r.code&&"ENFILE"!==r.code?"function"==typeof o&&o.apply(this,arguments):m([t,[e,n,i,o],r,c||Date.now(),Date.now()])}))}(t,e,n,i)});var i=t.copyFile;i&&(t.copyFile=function(t,e,n,r){return"function"==typeof n&&(r=n,n=0),function t(e,n,r,o,c){return i(e,n,r,(function(i){!i||"EMFILE"!==i.code&&"ENFILE"!==i.code?"function"==typeof o&&o.apply(this,arguments):m([t,[e,n,r,o],i,c||Date.now(),Date.now()])}))}(t,e,n,r)});var o=t.readdir;t.readdir=function(t,e,n){"function"==typeof e&&(n=e,e=null);var r=a.test(process.version)?function(t,e,n,r){return o(t,i(t,e,n,r))}:function(t,e,n,r){return o(t,e,i(t,e,n,r))};return r(t,e,n);function i(t,e,n,i){return function(o,c){!o||"EMFILE"!==o.code&&"ENFILE"!==o.code?(c&&c.sort&&c.sort(),"function"==typeof n&&n.call(this,o,c)):m([r,[t,e,n],o,i||Date.now(),Date.now()])}}};var a=/^v[0-5]\./;if("v0.8"===process.version.substr(0,4)){var u=s(t);h=u.ReadStream,S=u.WriteStream}var f=t.ReadStream;f&&(h.prototype=Object.create(f.prototype),h.prototype.open=function(){var t=this;v(t.path,t.flags,t.mode,(function(e,n){e?(t.autoClose&&t.destroy(),t.emit("error",e)):(t.fd=n,t.emit("open",n),t.read())}))});var l=t.WriteStream;l&&(S.prototype=Object.create(l.prototype),S.prototype.open=function(){var t=this;v(t.path,t.flags,t.mode,(function(e,n){e?(t.destroy(),t.emit("error",e)):(t.fd=n,t.emit("open",n))}))}),Object.defineProperty(t,"ReadStream",{get:function(){return h},set:function(t){h=t},enumerable:!0,configurable:!0}),Object.defineProperty(t,"WriteStream",{get:function(){return S},set:function(t){S=t},enumerable:!0,configurable:!0});var p=h;Object.defineProperty(t,"FileReadStream",{get:function(){return p},set:function(t){p=t},enumerable:!0,configurable:!0});var d=S;function h(t,e){return this instanceof h?(f.apply(this,arguments),this):h.apply(Object.create(h.prototype),arguments)}function S(t,e){return this instanceof S?(l.apply(this,arguments),this):S.apply(Object.create(S.prototype),arguments)}Object.defineProperty(t,"FileWriteStream",{get:function(){return d},set:function(t){d=t},enumerable:!0,configurable:!0});var w=t.open;function v(t,e,n,r){return"function"==typeof n&&(r=n,n=null),function t(e,n,r,i,o){return w(e,n,r,(function(c,s){!c||"EMFILE"!==c.code&&"ENFILE"!==c.code?"function"==typeof i&&i.apply(this,arguments):m([t,[e,n,r,i],c,o||Date.now(),Date.now()])}))}(t,e,n,r)}return t.open=v,t}function m(t){p("ENQUEUE",t[0].name,t[1]),o[r].push(t),S()}function h(){for(var t=Date.now(),e=0;e<o[r].length;++e)o[r][e].length>2&&(o[r][e][3]=t,o[r][e][4]=t);S()}function S(){if(clearTimeout(l),l=void 0,0!==o[r].length){var t=o[r].shift(),e=t[0],n=t[1],i=t[2],c=t[3],s=t[4];if(void 0===c)p("RETRY",e.name,n),e.apply(null,n);else if(Date.now()-c>=6e4){p("TIMEOUT",e.name,n);var a=n.pop();"function"==typeof a&&a.call(null,i)}else{var u=Date.now()-s,f=Math.max(s-c,1);u>=Math.min(1.2*f,100)?(p("RETRY",e.name,n),e.apply(null,n.concat([c]))):o[r].push(t)}void 0===l&&(l=setTimeout(S,0))}}global[r]||f(global,o[r]),t.exports=y(a(o)),process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!o.__patched&&(t.exports=y(o),o.__patched=!0)},520:(t,e,n)=>{var r=n(781).Stream;t.exports=function(t){return{ReadStream:function e(n,i){if(!(this instanceof e))return new e(n,i);r.call(this);var o=this;this.path=n,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=65536,i=i||{};for(var c=Object.keys(i),s=0,a=c.length;s<a;s++){var u=c[s];this[u]=i[u]}if(this.encoding&&this.setEncoding(this.encoding),void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(void 0===this.end)this.end=1/0;else if("number"!=typeof this.end)throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}null===this.fd?t.open(this.path,this.flags,this.mode,(function(t,e){if(t)return o.emit("error",t),void(o.readable=!1);o.fd=e,o.emit("open",e),o._read()})):process.nextTick((function(){o._read()}))},WriteStream:function e(n,i){if(!(this instanceof e))return new e(n,i);r.call(this),this.path=n,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,i=i||{};for(var o=Object.keys(i),c=0,s=o.length;c<s;c++){var a=o[c];this[a]=i[a]}if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],null===this.fd&&(this._open=t.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}}},161:(t,e,n)=>{var r=n(57),i=process.cwd,o=null,c=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return o||(o=i.call(process)),o};try{process.cwd()}catch(t){}if("function"==typeof process.chdir){var s=process.chdir;process.chdir=function(t){o=null,s.call(process,t)},Object.setPrototypeOf&&Object.setPrototypeOf(process.chdir,s)}t.exports=function(t){function e(e){return e?function(n,r,i){return e.call(t,n,r,(function(t){u(t)&&(t=null),i&&i.apply(this,arguments)}))}:e}function n(e){return e?function(n,r){try{return e.call(t,n,r)}catch(t){if(!u(t))throw t}}:e}function i(e){return e?function(n,r,i,o){return e.call(t,n,r,i,(function(t){u(t)&&(t=null),o&&o.apply(this,arguments)}))}:e}function o(e){return e?function(n,r,i){try{return e.call(t,n,r,i)}catch(t){if(!u(t))throw t}}:e}function s(e){return e?function(n,r,i){function o(t,e){e&&(e.uid<0&&(e.uid+=4294967296),e.gid<0&&(e.gid+=4294967296)),i&&i.apply(this,arguments)}return"function"==typeof r&&(i=r,r=null),r?e.call(t,n,r,o):e.call(t,n,o)}:e}function a(e){return e?function(n,r){var i=r?e.call(t,n,r):e.call(t,n);return i&&(i.uid<0&&(i.uid+=4294967296),i.gid<0&&(i.gid+=4294967296)),i}:e}function u(t){return!t||"ENOSYS"===t.code||!(process.getuid&&0===process.getuid()||"EINVAL"!==t.code&&"EPERM"!==t.code)}var f;r.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&function(t){t.lchmod=function(e,n,i){t.open(e,r.O_WRONLY|r.O_SYMLINK,n,(function(e,r){e?i&&i(e):t.fchmod(r,n,(function(e){t.close(r,(function(t){i&&i(e||t)}))}))}))},t.lchmodSync=function(e,n){var i,o=t.openSync(e,r.O_WRONLY|r.O_SYMLINK,n),c=!0;try{i=t.fchmodSync(o,n),c=!1}finally{if(c)try{t.closeSync(o)}catch(t){}else t.closeSync(o)}return i}}(t),t.lutimes||function(t){r.hasOwnProperty("O_SYMLINK")&&t.futimes?(t.lutimes=function(e,n,i,o){t.open(e,r.O_SYMLINK,(function(e,r){e?o&&o(e):t.futimes(r,n,i,(function(e){t.close(r,(function(t){o&&o(e||t)}))}))}))},t.lutimesSync=function(e,n,i){var o,c=t.openSync(e,r.O_SYMLINK),s=!0;try{o=t.futimesSync(c,n,i),s=!1}finally{if(s)try{t.closeSync(c)}catch(t){}else t.closeSync(c)}return o}):t.futimes&&(t.lutimes=function(t,e,n,r){r&&process.nextTick(r)},t.lutimesSync=function(){})}(t),t.chown=i(t.chown),t.fchown=i(t.fchown),t.lchown=i(t.lchown),t.chmod=e(t.chmod),t.fchmod=e(t.fchmod),t.lchmod=e(t.lchmod),t.chownSync=o(t.chownSync),t.fchownSync=o(t.fchownSync),t.lchownSync=o(t.lchownSync),t.chmodSync=n(t.chmodSync),t.fchmodSync=n(t.fchmodSync),t.lchmodSync=n(t.lchmodSync),t.stat=s(t.stat),t.fstat=s(t.fstat),t.lstat=s(t.lstat),t.statSync=a(t.statSync),t.fstatSync=a(t.fstatSync),t.lstatSync=a(t.lstatSync),t.chmod&&!t.lchmod&&(t.lchmod=function(t,e,n){n&&process.nextTick(n)},t.lchmodSync=function(){}),t.chown&&!t.lchown&&(t.lchown=function(t,e,n,r){r&&process.nextTick(r)},t.lchownSync=function(){}),"win32"===c&&(t.rename="function"!=typeof t.rename?t.rename:function(e){function n(n,r,i){var o=Date.now(),c=0;e(n,r,(function s(a){if(a&&("EACCES"===a.code||"EPERM"===a.code||"EBUSY"===a.code)&&Date.now()-o<6e4)return setTimeout((function(){t.stat(r,(function(t,o){t&&"ENOENT"===t.code?e(n,r,s):i(a)}))}),c),void(c<100&&(c+=10));i&&i(a)}))}return Object.setPrototypeOf&&Object.setPrototypeOf(n,e),n}(t.rename)),t.read="function"!=typeof t.read?t.read:function(e){function n(n,r,i,o,c,s){var a;if(s&&"function"==typeof s){var u=0;a=function(f,l,p){if(f&&"EAGAIN"===f.code&&u<10)return u++,e.call(t,n,r,i,o,c,a);s.apply(this,arguments)}}return e.call(t,n,r,i,o,c,a)}return Object.setPrototypeOf&&Object.setPrototypeOf(n,e),n}(t.read),t.readSync="function"!=typeof t.readSync?t.readSync:(f=t.readSync,function(e,n,r,i,o){for(var c=0;;)try{return f.call(t,e,n,r,i,o)}catch(t){if("EAGAIN"===t.code&&c<10){c++;continue}throw t}})}},813:(t,e,n)=>{let r;try{r=n(77)}catch(t){r=n(147)}const i=n(981),{stringify:o,stripBom:c}=n(780),s={readFile:i.fromPromise((async function(t,e={}){"string"==typeof e&&(e={encoding:e});const n=e.fs||r,o=!("throws"in e)||e.throws;let s,a=await i.fromCallback(n.readFile)(t,e);a=c(a);try{s=JSON.parse(a,e?e.reviver:null)}catch(e){if(o)throw e.message=`${t}: ${e.message}`,e;return null}return s})),readFileSync:function(t,e={}){"string"==typeof e&&(e={encoding:e});const n=e.fs||r,i=!("throws"in e)||e.throws;try{let r=n.readFileSync(t,e);return r=c(r),JSON.parse(r,e.reviver)}catch(e){if(i)throw e.message=`${t}: ${e.message}`,e;return null}},writeFile:i.fromPromise((async function(t,e,n={}){const c=n.fs||r,s=o(e,n);await i.fromCallback(c.writeFile)(t,s,n)})),writeFileSync:function(t,e,n={}){const i=n.fs||r,c=o(e,n);return i.writeFileSync(t,c,n)}};t.exports=s},780:t=>{t.exports={stringify:function(t,{EOL:e="\n",finalEOL:n=!0,replacer:r=null,spaces:i}={}){const o=n?e:"";return JSON.stringify(t,r,i).replace(/\n/g,e)+o},stripBom:function(t){return Buffer.isBuffer(t)&&(t=t.toString("utf8")),t.replace(/^\uFEFF/,"")}}},981:(t,e)=>{"use strict";e.fromCallback=function(t){return Object.defineProperty((function(...e){if("function"!=typeof e[e.length-1])return new Promise(((n,r)=>{t.call(this,...e,((t,e)=>null!=t?r(t):n(e)))}));t.apply(this,e)}),"name",{value:t.name})},e.fromPromise=function(t){return Object.defineProperty((function(...e){const n=e[e.length-1];if("function"!=typeof n)return t.apply(this,e);t.apply(this,e.slice(0,-1)).then((t=>n(null,t)),n)}),"name",{value:t.name})}},496:t=>{"use strict";t.exports=require("vscode")},491:t=>{"use strict";t.exports=require("assert")},57:t=>{"use strict";t.exports=require("constants")},147:t=>{"use strict";t.exports=require("fs")},37:t=>{"use strict";t.exports=require("os")},17:t=>{"use strict";t.exports=require("path")},781:t=>{"use strict";t.exports=require("stream")},837:t=>{"use strict";t.exports=require("util")}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,n),o.exports}var r={};(()=>{"use strict";var t=r;Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const e=n(496),i=n(17),o=n(147),c=n(37);function s(t,e){let r=n(674);const c=o.readdirSync(t);for(const n of c){const c=i.join(t,n);o.lstatSync(c).isDirectory()?s(c,e):r.chmod(c,e)}r.chmod(t,e)}t.activate=function(t){const r="win32"===process.platform;let a=e.commands.registerCommand("JavaSelectedCodeExecutor.RunCode",(function(){if(void 0===e.window.activeTextEditor)return void e.window.showErrorMessage("ファイルが開かれていません。");if("java"!==e.window.activeTextEditor.document.languageId)return void e.window.showErrorMessage("これは Java ファイルではありません。");let t=e.window.activeTextEditor.selection,a="";a=a+"void print(Object param) { "+c.EOL,a=a+"    System.out.print(param); "+c.EOL,a=a+"} "+c.EOL,a=a+""+c.EOL,a=a+"void println(Object param) { "+c.EOL,a=a+"    System.out.println(param); "+c.EOL,a=a+"} "+c.EOL,a=a+""+c.EOL,a=a+"String input() { "+c.EOL,a=a+'    Scanner in = new Scanner(System.in, "MS932"); '+c.EOL,a=a+"    return in.nextLine(); "+c.EOL,a=a+"} "+c.EOL,a=a+"char inputToChar() { "+c.EOL,a=a+"    return input().charAt(0); "+c.EOL,a=a+"} "+c.EOL,a=a+""+c.EOL,a=a+"int inputToInt() { "+c.EOL,a=a+"    return Integer.parseInt(input()); "+c.EOL,a=a+"} "+c.EOL,a=a+""+c.EOL,a=a+"double inputToDouble() { "+c.EOL,a=a+"    return Double.parseDouble(input()); "+c.EOL,a=a+"} "+c.EOL,a=a+""+c.EOL,a=a+"long inputToLong() { "+c.EOL,a=a+"    return Long.parseLong(input()); "+c.EOL,a=a+"} "+c.EOL,a=a+""+c.EOL,a=a+"float inputToFloat() { "+c.EOL,a=a+"    return Float.parseFloat(input()); "+c.EOL,a=a+"} "+c.EOL,a=a+""+c.EOL,a=a+"short inputToShort() { "+c.EOL,a=a+"    return Short.parseShort(input()); "+c.EOL,a=a+"} "+c.EOL,a=a+'println("[Java Selected Code Executor]コードの実行を開始します。");'+c.EOL,a=a+'println("[Java Selected Code Executor]------------------コードの実行結果------------------");'+c.EOL,a=t.isEmpty?a+e.window.activeTextEditor.document.getText()+c.EOL:a+e.window.activeTextEditor.document.getText(t)+c.EOL,a=a+'println("[Java Selected Code Executor]----------------------------------------------------");'+c.EOL,a=a+'println("[Java Selected Code Executor]コードの実行が完了しました。");'+c.EOL,a=a+'println("[Java Selected Code Executor]Enterキーを押して終了します。");'+c.EOL,a=a+"input();"+c.EOL,a=a+"/ex"+c.EOL;let u=i.join(c.tmpdir(),"vscode-extension-temp"+Math.random().toString(36).slice(-8)+".jsh");o.writeFile(u,a,(t=>{let a="",f="",l="";r?(a="cmd.exe",f="jdk-11_win",l="jshell.exe"):(a="bash",f="jdk-11_linux",l="jshell");let p=e.workspace.getConfiguration("JavaSelectedCodeExecutor").get("java_home","");""!=p||(e.window.showInformationMessage("内部的に保持しているJavaで動作します。"),p=i.join(c.tmpdir(),f),o.existsSync(p))||(n(674).copySync(i.join(__dirname,f),p),s(p,"755"));let d=i.join(p,"bin",l),y=e.window.createTerminal("jshell実行",a);y.sendText(d+" -J-Dfile.encoding=utf8 --execution local "+u+" && exit"),y.show()}))}));t.subscriptions.push(a)},t.deactivate=function(){}})(),module.exports=r})();