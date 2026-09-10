import ffmpeg from 'ffmpeg-static';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
await mkdir('public/reels',{recursive:true});
for(const art of ['forest','ocean','moon'])for(let page=0;page<3;page++){
 const args=['-y','-loop','1','-i',`assets/original/${art}.png`,'-vf',`scale=1080:-1,zoompan=z='1.06+0.00035*on':x='iw/2-(iw/zoom/2)':y='ih/${page===0?2:page===1?3:1.5}-(ih/zoom/2)':d=360:s=480x720:fps=30,fade=t=in:st=0:d=0.6,fade=t=out:st=11.4:d=0.6`,'-t','12','-c:v','libx264','-preset','veryfast','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart',`public/reels/${art}-${page}.mp4`];
 await new Promise((resolve,reject)=>{const p=spawn(ffmpeg,args,{stdio:['ignore','ignore','pipe']});let error='';p.stderr.on('data',d=>error+=d);p.on('exit',code=>code===0?resolve():reject(new Error(error)));p.on('error',reject)});console.log(`Rendered ${art}, page ${page+1}`);
}
