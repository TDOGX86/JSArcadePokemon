/* Credit to Simon Goellner, https://codepen.io/simeydotme/pen/PrQKgo, for creating the following javascript */

const cards = [...document.querySelectorAll(".card")];
const style = document.querySelector("style")

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const l = e.offsetX;
        const t = e.offsetY;
        const h = e.target.offsetHeight;
        const w = e.target.offsetWidth;
        const lp = Math.abs(Math.floor(100 / w * l)-100);
        const tp = Math.abs(Math.floor(100 / h * t)-100);
        const bg = `background-position: ${lp}% ${tp}%;`
        const holostyle = `.card.active:before { ${bg} }`
        card.classList.add('active')
        style.innerHTML = holostyle
    })
    card.addEventListener('mouseout', () => {
        card.classList.remove("active");
    })
})