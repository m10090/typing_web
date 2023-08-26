const typing = document.getElementById('Typing')
const timeTaken = document.getElementById('timeTaken')
const body = document.querySelector('body')


typing.style['left'] = -typing.style.width/2 + body.style.width/2;
const k = ['this', 'is', 'a', 'test'].join(' ')
const spanToken = (letter) => { typing.innerHTML += (`<span class='letter'>${letter != 0 ? letter : '&nbsp;'}</span>`) }
[...k].forEach(spanToken)
typing.removeChild(typing.childNodes[0])

// functions' variables 
class checkTime {
  deleted = false;
  deletedStart = 0;
  startTime = 0;
  endTime = 0;
  right = false;
  start() {
    if (this.deleted === false) {
      this.startTime = new Date().getTime() ;
    }
  }
  end(right) {
    if (this.deleted === false) {
      this.endTime = new Date().getTime() ;
      this.right = right;
    }
    else {
      this.afterDelete = new Date().getTime() ;
    }
  }
  delete() {
    this.deleted = true;
    this.deletedStart = new Date().getTime() ;
  }
  get timeTaken() {
    return this.endTime - this.startTime
  }
}
const wordTimer = Array.from({length: k.length}, () => {return new checkTime()})
var i = 0;
// functions 
function reset() {
  setTimeout(() => { typing.value = '' }, 5)
}
function re() {
  if (i===k.length) return ;
  const key = typing.childNodes[i];
  typing.childNodes.forEach(element => {
    element.classList.remove('curser')
  });
  key.classList.add('curser')
}
function next(e) {
  if (i === k.length) {
    console.log(wordTimer)
    return
  }
  const key = typing.childNodes[i];
  if (e.key === 'Backspace') {
    i = i ? i - 1 : 0;
    const key = typing.childNodes[i]
    key.classList.remove('correct', 'incorrect')
  }
  else {
    if (e.key === k[i]) {
      key.classList.add('correct')
      wordTimer[i].end(true)
    }
    else {
      key.classList.add('incorrect')
      wordTimer[i].end(false)
    }
    i++;
    if (i === k.length) return ;
    wordTimer[i].start()
  }
}

//  Event Listeners
// typing.addEventListener('keypress', startTimer, { once: true })
body.addEventListener('mousedown',()=>{wordTimer[i].start()}, once=true)
body.addEventListener('keydown', next)
body.addEventListener('keydown', re)
