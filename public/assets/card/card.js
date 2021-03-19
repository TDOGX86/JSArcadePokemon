/* Credit to Simon Goellner, https://codepen.io/simeydotme/pen/PrQKgo, for creating the following javascript */
const pokeCards = [...document.querySelectorAll(".card")];
const style     = document.querySelector("style")

pokeCards.forEach(card => {
    
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
    card.addEventListener('mousedown', (e) => {
        const selected = [...document.querySelectorAll(".selected")]
        if (e.target.classList.contains('selected')) {
            e.target.classList.remove('selected')
        } else if ( selected.length < 6 ) {
            e.target.classList.add('selected')
        }
    })
    card.addEventListener('mouseup', () => {
        const selected = [...document.querySelectorAll(".selected")]

        if (selected.length == 6) {
        // edit for when 6 are clicked
          fetch('/cool')
        }
    
    })
})