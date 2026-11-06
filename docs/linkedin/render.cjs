const { chromium } = require('/home/franckj/projects/domain-analyzer/node_modules/playwright');
const S=process.argv[2];
const head=`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;800&display=block"><style>*{margin:0;box-sizing:border-box}body{font-family:"Public Sans",Arial,sans-serif;color:#161616;-webkit-font-smoothing:antialiased}
.mark{display:inline-flex;align-items:center;justify-content:center;background:#000091;color:#fff;font-weight:800;border-radius:4px;letter-spacing:-.02em}
.card{background:#fff;border:1px solid #e3dfd8;border-radius:4px;display:grid;align-content:start;position:relative}
.pill{justify-self:start;font-weight:600;border-radius:999px;background:#e3f4e8;color:#18753c}
.stamp{position:absolute;transform:rotate(-8deg);border:3px solid #E1000F;color:#E1000F;font-weight:800;letter-spacing:.1em}</style>`;
const jobs=[
 ['logo-400.png',400,400,`<span class="mark" style="width:400px;height:400px;font-size:150px;border-radius:0">.fr</span>`],
 ['cover-1128x191.png',1128,191,`<div style="width:1128px;height:191px;background:#f9f6f2;display:flex;align-items:center;justify-content:space-between;padding:0 40px 0 290px;gap:24px">
   <div style="flex:1;min-width:0"><div style="font-size:27px;font-weight:800;line-height:1.15;letter-spacing:-.01em;white-space:nowrap">Le nom de domaine <span style="color:#000091">.fr</span> qui dit<br>ce que vous faites.</div>
   <div style="font-size:14px;color:#4a4a4a;margin-top:8px;white-space:nowrap">Noms courts déjà enregistrés · Prix sur demande · Escrow</div></div>
   <div style="display:flex;gap:10px">
    <div class="card" style="padding:12px 14px;gap:4px;width:132px"><span class="pill" style="font-size:11px;padding:1px 7px">Disponible</span><b style="color:#000091;font-size:18px">Aurae.fr</b></div>
    <div class="card" style="padding:12px 14px;gap:4px;width:132px"><span class="pill" style="font-size:11px;padding:1px 7px;background:#ececfe;color:#000091">Oct. 2026</span><b style="font-size:18px;opacity:.55">TestLab.fr</b><span style="height:14px"></span><span class="stamp" style="right:8px;bottom:6px;font-size:12px;padding:0 6px">VENDU</span></div>
   </div></div>`],
 ['post-vendu-testlab-1200.png',1200,1200,`<div style="width:1200px;height:1200px;background:#f9f6f2;padding:96px;display:grid;grid-template-rows:auto 1fr auto">
   <div style="display:flex;align-items:center;gap:18px"><span class="mark" style="width:72px;height:72px;font-size:30px">.fr</span><span style="font-size:34px;font-weight:800">France Domaine</span></div>
   <div style="align-self:center" class="card"><div style="padding:72px 64px;display:grid;gap:18px;position:relative">
     <span class="pill" style="font-size:24px;padding:4px 16px;background:#ececfe;color:#000091">Octobre 2026</span>
     <b style="font-size:128px;letter-spacing:-.03em;line-height:1">TestLab.fr</b>
     <span style="font-size:36px;color:#4a4a4a">a trouvé son propriétaire.</span>
     <span class="stamp" style="right:56px;top:56px;font-size:48px;padding:2px 22px;border-width:6px">VENDU</span></div></div>
   <div style="font-size:28px;color:#4a4a4a">francedomaine.fr/domaines</div></div>`],
];
(async()=>{const b=await chromium.launch();for(const [f,w,h,html] of jobs){const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(head+html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const ok=await p.evaluate(()=>document.fonts.check('800 20px "Public Sans"'));console.log(f,'font',ok);await p.screenshot({path:`${S}/${f}`});await p.close();}await b.close()})();
