const { chromium } = require('/home/franckj/projects/domain-analyzer/node_modules/playwright');
const S=process.argv[2];
const base=`<style>*{margin:0;box-sizing:border-box}body{font-family:Arial,Helvetica,"Liberation Sans",sans-serif;color:#111827}</style>`;
const blue='#000091', red='#E1000F';
const flag=`<div style="display:flex;height:6px"><div style="flex:1;background:${blue}"></div><div style="flex:1;background:#fff"></div><div style="flex:1;background:${red}"></div></div>`;
const jobs=[
 ['logo-400.png',400,400,`<div style="width:400px;height:400px;background:${blue};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:170px;letter-spacing:-4px">FD</div>`],
 ['cover-1128x191.png',1128,191,`<div style="width:1128px;height:191px;background:#fff;position:relative;display:flex;align-items:center;justify-content:flex-end;padding:0 56px">
   <div style="position:absolute;left:0;right:0;bottom:0">${flag}</div>
   <div style="text-align:right"><div style="font-size:40px;font-weight:700;letter-spacing:-1px">Le nom de domaine <span style="color:${blue}">parfait</span> pour votre marque</div>
   <div style="font-size:20px;color:#4b5563;margin-top:10px">Noms premium .fr et .com · Paiement par escrow · francedomaine.fr</div></div></div>`],
 ['post-vendu-testlab-1200.png',1200,1200,`<div style="width:1200px;height:1200px;background:#fff;position:relative;padding:90px">
   <div style="display:flex;align-items:center;gap:22px"><div style="width:84px;height:84px;border-radius:18px;background:${blue};color:#fff;font-weight:700;font-size:38px;display:flex;align-items:center;justify-content:center">FD</div><div style="font-size:40px">France<b>Domaine</b><span style="color:${blue}">.fr</span></div></div>
   <div style="margin-top:200px;font-size:150px;font-weight:700;letter-spacing:-5px;color:${blue}">TestLab.fr</div>
   <div style="margin-top:28px;font-size:46px;color:#4b5563">a trouvé son nouveau propriétaire · octobre 2026</div>
   <div style="position:absolute;right:120px;top:800px;transform:rotate(-10deg);border:12px solid ${red};color:${red};font-size:120px;font-weight:900;letter-spacing:10px;padding:8px 36px;border-radius:14px;opacity:.9">VENDU</div>
   <div style="position:absolute;left:0;right:0;bottom:0">${flag.replace(/6px/,'14px')}</div></div>`],
];
(async()=>{const b=await chromium.launch();for(const [f,w,h,html] of jobs){const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(base+html);await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`${S}/${f}`});await p.close();}await b.close();console.log('ok')})();
