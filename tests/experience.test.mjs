import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {query,pool} from '../server/db.mjs';
const base=process.env.TEST_API_URL||'http://localhost:3001/api';
test('personalization, original page reels, and account isolation persist',async()=>{
 const email=`qa-experience-${randomUUID()}@example.invalid`;let uid;
 const request=async(path,method='GET',body,token)=>{const r=await fetch(base+path,{method,headers:{'Content-Type':'application/json','X-iBook-Client':'native',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,data:await r.json()};};
 try{
  const signup=await request('/auth/signup','POST',{email,password:'Test-'+randomUUID(),name:'Experience QA'});assert.equal(signup.status,201);uid=signup.data.user.id;const token=signup.data.token;
  const preferences={interests:['Fantasy','Adventure'],readingTime:'evening',reelsEnabled:true};
  assert.equal((await request('/me','PATCH',{preferences,onboarding_completed:true,goal:30},token)).status,200);
  const me=(await request('/me','GET',undefined,token)).data;assert.deepEqual(me.user.preferences,preferences);assert.equal(me.user.onboarding_completed,true);assert.equal(me.user.goal,30);
  assert.equal((await request('/me','PATCH',{preferences:{interests:['Fantasy'],readingTime:'unknown',reelsEnabled:true}},token)).status,400);
  for(const id of ['moonlit-archive','glass-stairway','last-sun']){
   const b=(await request('/books/'+id)).data;assert.equal(b.chapters.length,3);
   for(let page=0;page<3;page++){
    const feed=(await request(`/page-reels/${id}/${page}?mode=page`,'GET',undefined,token)).data;assert.ok(feed.items.length>0);assert.ok(feed.items.every(r=>r.book_id===id&&r.page===page));
    const media=await fetch(new URL(feed.items[0].playback_url,base));assert.equal(media.status,200);assert.match(media.headers.get('content-type'),/video/);await media.body.cancel();
   }
  }
  assert.equal((await request('/library/moonlit-archive','PUT',{page:1},token)).status,200);
  const latest=(await request('/me','GET',undefined,token)).data;assert.equal(latest.library.find(x=>x.book_id==='moonlit-archive').page,1);
  assert.equal((await request('/auth/clerk','POST',{token:'not-a-real-token-even-though-it-is-long-enough'})).status,401);
 }finally{if(uid)await query('DELETE FROM ibook.users WHERE id=$1',[uid]);await pool.end();}
});
