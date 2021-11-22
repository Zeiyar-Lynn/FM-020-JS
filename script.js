let data = null;
const url = './data.json'
const xhr = new XMLHttpRequest();

xhr.open('GET', url, true);
xhr.send()
xhr.onload = () => {
   data = JSON.parse(xhr.response);
   displayData('daily')
}
xhr.onerror = () => {
   console.log(error);
}

const buttons = document.querySelectorAll('#options button');
const stats = document.querySelectorAll('.stats');
const keywords = {daily : 'Yesterday', weekly : 'Last Week', monthly : 'Last Month'};

buttons.forEach( btn => {
   btn.onclick = e => {
      displayData(e.target.id);
      removeClass()
      e.target.classList.add('on');
   }
})

function displayData(time) {
   stats.forEach( (stat, i) => {
      const datas = data[i].timeframes[time];
      const div = document.createElement('div');
      div.classList.add('duration','flex');
      
      if (stat.children.length == 2)
         stat.lastElementChild.remove();
      
      div.innerHTML = `<p><span>${datas.current}</span>hrs</p>
      <p>${keywords[time]} - <span>${datas.previous}</span>hrs</p>`;
      stat.append(div);
   });
}

function removeClass() {
   buttons.forEach( btn => {
      btn.classList.remove('on')
   })
}
