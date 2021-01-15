const MIN_SCROLLING = 33.33333
const TIME = 600000 //ms in 10minutes
const newsletter = document.querySelector('.newsletter-panel')
const closeBtn = document.querySelector('#closeBtn')
var winheight, docheight, trackLength, throttlescroll
var minScrollingObtained = false
var showNewsletterPermission = true
 
const getDocHeight = () => {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}

const getmeasurements = () => {
    winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    docheight = getDocHeight()
    trackLength = docheight - winheight
}
 
const amountscrolled = () => {
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    if (pctScrolled >= MIN_SCROLLING){
        setScroll(true)
    }
}
 
const setScroll = value => {
    minScrollingObtained = value
}

const setPermission = value => {
    showNewsletterPermission = value
}

const display = () => {
    if (minScrollingObtained && showNewsletterPermission ) {
        newsletter.style.transform = 'translateY(0)'
    } else {
        newsletter.style.transform = 'translateY(100%)'
    }
}

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("resize", ()=>{
    getmeasurements()
}, false)
 
window.addEventListener("scroll", ()=>{
    clearTimeout(throttlescroll)
        throttlescroll = setTimeout(()=>{
        amountscrolled()
        display()
    }, 5)
}, false)

closeBtn.addEventListener('click', ()=>{
    setPermission(false)
    setScroll(false)
    delay(TIME).then(() => setPermission(true))
    display()
})

getmeasurements()