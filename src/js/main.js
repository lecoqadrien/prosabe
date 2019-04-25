let planets = document.querySelectorAll('.planet')

function getSpeed(planet) {
  return -window.scrollY * planet.getBoundingClientRect().height / 2000 
}


let un = document.querySelector('header');
let onc = document.querySelector('.oncontainer')

function parallax() {
  planets.forEach(planet => {
    planet.style.transform = `translate(0px, ${un.offsetHeight+ 100+getSpeed(planet)}px) rotate(${getSpeed(planet) / 18}deg)`;
  })
}



window.addEventListener('scroll', function () {
  requestAnimationFrame(parallax)
  parallax()

  let rat = window.scrollY / un.offsetHeight
  let ratio = +27 + 100 * rat

  if (ratio > 100) {
    ratio = 100;
  }
  onc.style.width = ratio + '%';



  if (window.scrollY > un.offsetHeight) {
    un.classList.add('isNotFixed')



  } else {
    un.classList.remove('isNotFixed')
    un.style.zIndex = '200';

  }

})