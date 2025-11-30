// register.js — creates a unique customer ID and writes minimal user profile to Realtime Database
function makeId(){
  // Create a compact unique ID: timestamp + random chars
  const t = Date.now().toString(36).slice(-6);
  const r = Math.random().toString(36).slice(2,6).toUpperCase();
  return 'ID'+t+'-'+r;
}

async function register(){
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const referral = document.getElementById('referral').value.trim();

  const resEl = document.getElementById('result');
  if(!name || !phone){ resEl.innerText = 'Please enter name and phone.'; return; }

  const userId = makeId();

  try{
    // write user object
    await window.db.ref('users/' + userId).set({
      userId: userId,
      name: name,
      phone: phone,
      referral: referral || null,
      sponsorId: null,
      parentId: null,
      downlines: {},
      commissionBalance: 0,
      createdAt: Date.now()
    });

    // compute sponsor and parent placement (BFS spillover)
    // if referral provided and exists, use it as sponsor, else use system root
    const snap = await window.db.ref('users').once('value');
    const users = snap.val() || {};

    let sponsorId = null;
    if(referral && users[referral]) sponsorId = referral;

    if(!sponsorId){
      const rootSnap = await window.db.ref('system/root').once('value');
      sponsorId = rootSnap.exists() ? rootSnap.val() : null;
      if(!sponsorId){
        // create root
        await window.db.ref('users/root').set({ userId:'root', name:'Root', createdAt:Date.now(), downlines:{} , commissionBalance:0, level:0});
        await window.db.ref('system/root').set('root');
        sponsorId = 'root';
      }
    }

    // BFS to find parent under sponsor for 3x width
    function findParent(startId){
      const WIDTH = 3;
      const q = [startId];
      const visited = {};
      while(q.length){
        const id = q.shift();
        if(visited[id]) continue;
        visited[id]=1;
        const member = users[id];
        if(!member) continue;
        const downs = member.downlines ? Object.keys(member.downlines) : [];
        if(downs.length < WIDTH) return id;
        downs.forEach(d=> q.push(d));
      }
      return startId;
    }

    const parentId = findParent(sponsorId);

    // set parent and update parent's downlines
    await window.db.ref('users/' + userId + '/parentId').set(parentId);
    await window.db.ref('users/' + userId + '/sponsorId').set(sponsorId);
    await window.db.ref('users/' + parentId + '/downlines/' + userId).set(true);

    resEl.innerHTML = 'Registered! Your ID: <span class="idbox">' + userId + '</span>';
    document.getElementById('name').value=''; document.getElementById('phone').value=''; document.getElementById('referral').value='';

  }catch(err){
    console.error(err);
    resEl.innerText = 'Registration failed: ' + (err && err.message ? err.message : err);
  }
}
