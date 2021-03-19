/* Credit to Simon Goellner, https://codepen.io/simeydotme/pen/PrQKgo, for creating the following javascript */
const pokeCards = [...document.querySelectorAll(".card")];
const style     = document.querySelector("style")

pokeCards.forEach(card => {
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
            fetch('/team',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    team: selected.map(node => node.getAttribute('data-id')).join('-')
                })
            })
        } 
    })
})