// const slider = document.querySelector('.slider');
const webhookUrl = 'https://discord.com/api/webhooks/1196466976034410527/kEVE1A5xSMbMuCuLfX9MiQWAAWyWTPpGdAKPmlO27JFJ4pcfUav4Eu6y484h8rvfJ1zR';

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0]);
  e.target.matches('.prev') && slider.prepend(items[items.length - 1]);
}
document.addEventListener('click', activate, false);

// function discordWebhook() {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Cookie", "__cfruid=e75135bae4669a0346440ac0e7042d1cf5de2c5b-1705333070; __dcfduid=0a2108e4b3bc11eea7caa64caf98001f; __sdcfduid=0a2108e4b3bc11eea7caa64caf98001f8b7f632e9ea6f5abaa3f17f3444264f657ae18718d84d4a75b89fa8fe100c1e7; _cfuvid=4sGPmWo_QMJX6hvea42VcFr3u3MPbV3wYdyOX1w0fys-1705333070179-0-604800000");

//   var raw = JSON.stringify({
//     "content": "Hello, Discord!"
//   });

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   fetch("https://discord.com/api/webhooks/1196466976034410527/kEVE1A5xSMbMuCuLfX9MiQWAAWyWTPpGdAKPmlO27JFJ4pcfUav4Eu6y484h8rvfJ1zR", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
// }


const scriptURL = 'https://script.google.com/macros/s/AKfycbx3Ap_fcqZ9Ob3iVSc7t74AwJC2hZjJRvql3h96QYxmzObL-dQjjM0j2kQ1-mEgwEwzgg/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
