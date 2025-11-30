// login.js — simple phone-based lookup (demo)
async function login(){
  const phone = document.getElementById('phone').value.trim();
  const resEl = document.getElementById('result');
  if(!phone){ resEl.innerText = 'Enter phone number'; return; }
  try{
    const snap = await window.db.ref('users').orderByChild('phone').equalTo(phone).once('value');
    if(snap.exists()){
      const data = snap.val();
      const keys = Object.keys(data);
      const userId = keys[0];
      resEl.innerHTML = 'Login success. Your ID: <span class="idbox">' + userId + '</span>';
      // optionally redirect to dashboard.html (not included in this demo)
    } else {
      resEl.innerText = 'User not found';
    }
  }catch(err){
    console.error(err);
    resEl.innerText = 'Login failed: ' + (err && err.message ? err.message : err);
  }
}
