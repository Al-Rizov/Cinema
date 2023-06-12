const title = document.getElementById("title-02");
const box = document.getElementById("title-01");
const container = document.querySelector(".container");
//const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const smallBtn = document.getElementById("small");
const mediumBtn = document.getElementById("medium");
const largeBtn = document.getElementById("large");
const colosseumBtn = document.getElementById("colosseum");
const westWing = document.createElement('div');
const colosseumBody = document.createElement('div');
const eastWing = document.createElement('div');
const moviesList = [Fantasymovie, Bladelurcher, Scifi, Spymovie];
const poster = document.getElementById("poster");
const synopsis = document.getElementById("synopsis");


let ticketPrice = parseInt(movieSelect.value);

/*

5. Add posters for the movies.

*/

function wipeSlateClean(){
    container.innerHTML = '';
    westWing.innerHTML = '';
    colosseumBody.innerHTML = '';
    eastWing.innerHTML = '';
}

function changeClass() {
    title.classList.toggle("titleMouseOver");
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}

movieSelect.addEventListener('change', ev => {
    ticketPrice = +ev.target.value;
    let choice = ev.target.value
    poster.innerHTML = ''
    let image = document.createElement('img')

    switch(choice) {
        case '10':
            synopsis.innerHTML = moviesList[0].synopsis;
            poster.appendChild(image);
            image.src = moviesList[0].poster;
            break;

        case '12':
            synopsis.innerHTML = moviesList[1].synopsis;
            poster.appendChild(image);
            image.src = moviesList[1].poster;
            break;

        case '14':
            synopsis.innerHTML = moviesList[2].synopsis;
            poster.appendChild(image);
            image.src = moviesList[2].poster;
            break;

        case '16':
            synopsis.innerHTML = moviesList[3].synopsis;
            poster.appendChild(image);
            image.src = moviesList[3].poster;
            break;

        default: console.log('Something went wrong with the switch statement.')
    }

    updateSelectedCount();
});


box.addEventListener("mouseover", changeClass);
box.addEventListener("mouseout", changeClass);

container.addEventListener("click", function(ev) {
    if (ev.target.classList.contains("seat") &&
    !ev.target.classList.contains("occupied")) {
        ev.target.classList.toggle("selected");

        updateSelectedCount();
    }
})


function buildRoom(position, rows, seats, seat_arrangement, row_arrangement) {
    

    if(position !== westWing && position !== eastWing && position !== colosseumBody){
        wipeSlateClean();
        let screen = document.createElement('div');
        container.appendChild(screen);
        screen.classList.add('screen');
    }

    for(i=0; i<rows; i++){
        const row = document.createElement('div');
        position.appendChild(row);
        row.classList.add('row', row_arrangement)

            for(j=0; j<seats; j++){
                const seat = document.createElement('div');
                seat.innerText= String.fromCharCode(65+i) + '-' + (j+1);
                row.appendChild(seat);
                seat.classList.add('seat', seat_arrangement)
                
            }
    }
    
}

function buildColloseum(){
    wipeSlateClean();
    
    let screen = document.createElement('div');
    let frame = document.createElement('div');
    
    container.appendChild(screen);
    container.appendChild(frame);
    screen.classList.add('screen');
    frame.classList.add('frame');

   
    frame.appendChild(westWing);
    westWing.classList.add('west')
    buildRoom(westWing,26,10, undefined, 'col_row')

    frame.appendChild(colosseumBody);
    colosseumBody.classList.add('colosseumBody');
    buildRoom(colosseumBody, 26, 20, undefined,'col_row');

    frame.appendChild(eastWing);
    eastWing.classList.add('east');
    buildRoom(eastWing,26,10, undefined, 'col_row');

    
}

smallBtn.addEventListener('click', ()=>buildRoom(container,11,10))
mediumBtn.addEventListener('click', ()=>buildRoom(container,12,20, 'hall_m'));
largeBtn.addEventListener('click', ()=>buildRoom(container,15,22, 'hall_l', 'row_l'));
colosseumBtn.addEventListener('click',buildColloseum)