//filmprice locale at ayrıca başlık da ezilmemesi lazım  

const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
//console.log(notOccupiedSeats);
const movieSelectBox = document.getElementById("movie");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const container = document.querySelector(".container");

//const storage = new Storage();
//storage.setMovieDataToStorage("..", "..")

//movieSelectBox.onchange=()=>
//console.log(movieSelectBox.options[movieSelectBox.selectedIndex].innerText)

window.addEventListener("load", () => {

    //get last selectedindexes,and last selected movies index and price
    displayUI(); //her refresh yaptığımızda update ezmesin diye
    movieRefresh();
    //set last selected movie index and price
    //setMovieDataToStorage(movieSelectBox.selectedIndex, price);



})
const movieRefresh = () => {

    const selectedPrices = JSON.parse(localStorage.getItem("selectedPrice"));
    const selecteFilmNameIndexs = JSON.parse(localStorage.getItem("selecteFilmNameIndex"));
    movieSelectBox.selectedIndex = selecteFilmNameIndexs;



    updateMovieInfo(selectedPrices);
}
const displayUI = () => {
    const selectedSeatsFromStorage = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeatsFromStorage !== null && selectedSeatsFromStorage.length > 0) {
        notOccupiedSeats.forEach((seat, index) => {
            if (selectedSeatsFromStorage.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }

    // console.log(selectedSeatsFromStorage);
}

movieSelectBox.addEventListener("change", (e) => {
    //change maruz kalan (e demek) target den devam edicez
    let price = e.target.value;
    updateMovieInfo(price);

})
const updateMovieInfo = (filmPrice) => {


    let selectedSeats = document.querySelectorAll(".row .seat.selected");
    //console.log(selectedSeats);
    //NodeList i arraya çevirmek için


    const seatsIndexArray = [...selectedSeats].map(seat => [...notOccupiedSeats].indexOf(seat));

    //burada seçilmişleri boş koltukların indisinde var mı kontrol edip boşlarla bir arraya atmalıyız
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndexArray));
    //stringfy içerisine obje verirsiniz string çevirir serialize denir buna tersi de 

    const selectedSeatsCount = selectedSeats.length;
    //console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split("(")[0];
    //film.innerText = movieSelectBox.options[e.target.selectedIndex].innerText;
    total.innerText = selectedSeatsCount * parseFloat(filmPrice);
    localStorage.setItem("selectedPrice", JSON.stringify(filmPrice));
    localStorage.setItem("selecteFilmNameIndex", JSON.stringify(movieSelectBox.selectedIndex));




}
container.addEventListener("click", (e) => {
    //console.log(e.target)
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        // e.target.classList.add("selected")

    }
    let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
    //console.log(price)
    updateMovieInfo(price);

})