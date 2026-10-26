(function(root){
const SLOTS=[.2,.4,.6,.8],COST={snare:30,branch:40,log:50};
function project(lane,d){return {x:60+480*(lane===1?d:1-d),y:205+205*lane,scale:1.05};}
class Playtest{
 constructor(){this.phase='prep';this.time=0;this.duration=60;this.oak=100;this.materials=160;this.traps=[];this.enemies=[];this.piles=[];this.effects=[];this.events=[];this.nextId=1;this.stats={kills:0,recovered:0,absorptions:0,retreats:0,swings:0,drops:0};this.crew={state:'home',lane:1,d:0,target:null,load:0,timer:0};this.schedule=[{t:5,lane:1},{t:10,lane:0},{t:14,lane:2},{t:20,lane:1},{t:24,lane:0},{t:27,lane:2},{t:32,lane:1},{t:34,lane:1},{t:38,lane:0},{t:40,lane:0},{t:44,lane:2},{t:46,lane:2},{t:49,lane:1}];this.spawnIndex=0;this.supplyAt=15;this.addTrap('log',0,2);this.addTrap('branch',1,1);}
 id(){return this.nextId++;}
 event(type,text){this.events.push({type,text});}
 addTrap(type,lane,slot){const trap={id:this.id(),type,lane,slot,d:SLOTS[slot],cooldown:0,swing:0};this.traps.push(trap);return trap;}
 start(){if(this.phase==='prep'){this.phase='playing';this.event('start','Traps are armed! Build defenses and recover bones while they work.');}}
 place(type,lane,slot){if(!['prep','playing'].includes(this.phase))return 'Resume the game to build.';if(!COST[type]||!Number.isInteger(lane)||lane<0||lane>2||!Number.isInteger(slot)||slot<0||slot>3)return 'Choose a marked trap position.';if(type==='log'&&lane===2)return 'Log Drops need a branch below them.';if(this.traps.some(t=>t.lane===lane&&t.slot===slot))return 'That position already has this trap.';if(this.materials<COST[type])return 'Not enough materials. Salvage bones or wait for supplies.';this.materials-=COST[type];this.addTrap(type,lane,slot);this.event('build',type==='snare'?'Root Snare planted. It catches enemies automatically.':type==='log'?'Log Drop armed. Skeletons fall onto the branch below.':'Brambles planted. They strike automatically.');return null;}
 remove(id){if(!['prep','playing'].includes(this.phase))return false;const t=this.traps.find(t=>t.id===id);if(!t)return false;this.traps=this.traps.filter(x=>x!==t);this.materials+=this.phase==='prep'?COST[t.type]:Math.floor(COST[t.type]/2);return true;}
 spring(id){if(this.phase!=='playing')return 'Start or resume the wave first.';const t=this.traps.find(t=>t.id===id&&t.type==='branch');if(!t)return 'Build a Brambles on this branch first.';if(t.cooldown>0)return 'Those brambles are resetting.';const targets=this.enemies.filter(e=>e.lane===t.lane&&Math.abs(e.d-t.d)<=.13&&e.hp>0&&!e.fall);if(!targets.length)return; t.cooldown=5;t.swing=.6;this.stats.swings++;for(const e of targets){e.hp--;e.flash=.25;if(e.hp<=0){this.stats.kills++;this.piles.push({id:this.id(),lane:e.lane,d:e.d,value:e.brute?40:25,life:14});this.effects.push({lane:e.lane,d:e.d,life:.7});}else{e.stun=1.4;}}this.enemies=this.enemies.filter(e=>e.hp>0);this.event('swing',`Auto-whack! ${targets.length} skeleton${targets.length===1?'':'s'} hit.`);return null;}
 send(id){if(this.phase!=='playing')return 'Start or resume the wave first.';if(this.crew.state!=='home')return 'The crew is already out. Recall it or wait for its return.';const pile=this.piles.find(p=>p.id===id);if(!pile)return 'That bone pile is gone.';Object.assign(this.crew,{state:'out',lane:pile.lane,d:0,target:id,load:0,timer:0});this.event('send','Crew dispatched. Nearby skeletons will make it retreat.');return null;}
 recall(){if(this.crew.state==='home')return;this.dropLoad();this.crew.state='return';this.crew.target=null;this.event('recall','Crew recalled. It’s heading home.');}
 dropLoad(){const c=this.crew;if(c.load){this.piles.push({id:this.id(),lane:c.lane,d:c.d,value:c.load,life:14});c.load=0;}}
 step(dt){if(this.phase!=='playing')return;this.time+=dt;
 while(this.spawnIndex<this.schedule.length&&this.schedule[this.spawnIndex].t<=this.time){const wave=this.schedule[this.spawnIndex++];this.enemies.push({id:this.id(),lane:wave.lane,d:1,hp:1,brute:false,held:0,stun:0,flash:0,speed:.043});}
 if(this.time>=this.supplyAt&&this.time<60){this.materials+=20;this.supplyAt+=15;this.event('supply','Supply delivery: +20 materials.');}
 for(const t of this.traps){t.cooldown=Math.max(0,t.cooldown-dt);t.swing=Math.max(0,t.swing-dt);}
 for(const e of this.enemies){if(e.fall>0){e.fall=Math.max(0,e.fall-dt);continue;}e.flash=Math.max(0,e.flash-dt);e.held=Math.max(0,e.held-dt);e.stun=Math.max(0,e.stun-dt);const before=e.d;if(e.held<=0&&e.stun<=0)e.d-=dt*(e.brute?.03:e.speed);
  const snare=this.traps.find(t=>t.type==='snare'&&t.lane===e.lane&&t.cooldown<=0&&e.d<=t.d+.035&&before>=t.d-.035);if(snare&&e.held<=0){e.d=Math.max(e.d,snare.d);e.held=e.brute?2.5:4.5;snare.cooldown=11;this.event('snare','Caught! The snare holds it while your brambles reset.');}
  if(!e.brute){const pile=this.piles.find(p=>p.lane===e.lane&&Math.abs(p.d-e.d)<.03);if(pile){this.piles=this.piles.filter(p=>p!==pile);e.brute=true;e.hp=2;e.flash=.6;this.stats.absorptions++;this.event('absorb','A Bone Brute! It absorbed a pile and now takes two hits.');}}
  if(e.d<=.035&&e.lane<2){e.fromLane=e.lane;e.fromD=e.d;e.lane++;e.d=1;e.fall=.65;this.event('ladder','Skeletons are climbing down toward the home!');}else if(e.d<=.035){this.oak=Math.max(0,this.oak-(e.brute?35:20));e.hp=0;this.event('damage','A skeleton reached the Oak!');}
 }
 this.enemies=this.enemies.filter(e=>e.hp>0);
 for(const t of this.traps){if(t.type!=='log'||t.cooldown>0)continue;const e=this.enemies.find(e=>e.lane===t.lane&&!e.fall&&Math.abs(e.d-t.d)<.08);if(e){t.cooldown=8;t.swing=.65;e.fromLane=e.lane;e.fromD=e.d;e.lane++;e.d=1-e.d;e.held=0;e.stun=0;e.fall=.65;this.stats.drops++;this.event('drop','Timber! A skeleton drops onto the branch below.');}}
 // Armed branches fire only when a living enemy enters their lane-local sweep.
 for(const t of this.traps)if(t.type==='branch'&&t.cooldown<=0)this.spring(t.id);
 const c=this.crew;
 if(c.state==='out'||c.state==='gather'){
  if(this.enemies.some(e=>e.lane===c.lane&&Math.abs(e.d-c.d)<.075)){this.dropLoad();c.state='flee';c.target=null;this.stats.retreats++;this.event('retreat','Too close! The crew is retreating.');}
 }
 if(c.state==='out'){const pile=this.piles.find(p=>p.id===c.target);if(!pile){c.state='return';c.target=null;}else{c.d=Math.min(pile.d,c.d+.36*dt);if(Math.abs(c.d-pile.d)<.005){c.state='gather';c.timer=.65;}}}
 else if(c.state==='gather'){c.timer-=dt;if(c.timer<=0){const pile=this.piles.find(p=>p.id===c.target);if(pile){c.load=pile.value;this.piles=this.piles.filter(p=>p!==pile);}c.state='return';c.target=null;}}
 else if(c.state==='return'||c.state==='flee'){
  if(c.state==='return'&&c.load&&this.enemies.some(e=>e.lane===c.lane&&Math.abs(e.d-c.d)<.075)){this.dropLoad();c.state='flee';this.stats.retreats++;this.event('retreat','The crew dropped its load and ran!');}
  c.d=Math.max(0,c.d-dt*(c.state==='flee'?.6:.36));if(c.d===0){if(c.load){this.materials+=c.load;this.stats.recovered+=c.load;this.event('salvaged',`Recovered ${c.load} materials.`);}c.load=0;c.state='home';}
 }
 for(const p of this.piles)p.life-=dt;this.piles=this.piles.filter(p=>p.life>0);for(const p of this.effects)p.life-=dt;this.effects=this.effects.filter(p=>p.life>0);
 if(this.oak<=0){this.phase='lost';this.event('lost','The Oak needs another try.');}
 else if(this.time>=60&&this.spawnIndex===this.schedule.length&&this.enemies.length===0){this.phase='won';this.event('won','The Oak is safe!');}
 }
}
root.BonePick={Playtest,SLOTS,COST,project};if(typeof module!=='undefined')module.exports=root.BonePick;
})(typeof globalThis!=='undefined'?globalThis:this);
