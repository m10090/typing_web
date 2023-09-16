const typing = document.getElementById('Typing')
const timeTaken = document.getElementById('timeTaken')
const body = document.querySelector('body')
// end 

const k = ['this', 'C', 'is', 'a', 'test'].join(' ') // "this C is a test"
function spanToken(letter) {
  typing.innerHTML += (
    `<span class='letter'>
      ${letter != 0 ? letter : '&nbsp;'}
    </span>`)
}
[...k].forEach(spanToken)
typing.removeChild(typing.childNodes[0])
// functions' variables 
class checkTime {
  constructor() {
    deleted = false;
    deletedStart = 0;
    startTime = 0;
    endTime = 0;
    right = false;
  }
  start() {
    if (this.deleted === false) {
      this.startTime = new Date().getTime();
    }
  }
  end(right) {
    if (this.deleted === false) {
      this.endTime = new Date().getTime();
      this.right = right;
    }
    else {
      this.afterDelete = new Date().getTime();
    }
  }
  delete() {
    this.deleted = true;
    this.deletedStart = new Date().getTime();
  }
  get timeTaken() {
    return Math.round((this.endTime - this.startTime) / 100000000000)
  }
}
const wordTimer = Array.from({ length: k.length }, () => { return new checkTime() })
var i = 0;
// functions 
function reset() {
  setTimeout(() => { typing.value = '' }, 5)
}
function next(e) {
  // detect modifiers except shift
  if (e.metaKey | e.ctrlKey | e.altKey) return;
  if (e.key === 'Shift') return;
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
    if (e.key === k[i] | e.shiftKey && e.key === k[i]) {
      key.classList.add('correct')
      wordTimer[i].end(true)
    }
    else {
      key.classList.add('incorrect')
      wordTimer[i].end(false)
    }
    i++;
    if (i === k.length) return;
    wordTimer[i].start()
  }
}
//  Event Listeners
typing.addEventListener('mousedown', () => { wordTimer[i].start() }, once = true)
body.addEventListener('keydown', next, { passive: true })
// style fixing
setInterval(() => {
  if (i === k.length) return;
  typing.style['left'] = -typing.clientWidth / 2 + body.clientWidth / 2;
  typing.style['top'] = (body.clientHeight - 2 * typing.clientHeight) / 3;
}, 100)
setInterval(() => {
  if (i === k.length) {
    body.innerHTML = (`<h1 class = "absolute top-1/3"> your are done you took 
      ${wordTimer.map((a) => { return a.timeTaken }).reduce((a, b) => { return a + b })} s 
    </h1>`)
    clearInterval()
  }
}, 200)
