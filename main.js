const movieDataResult = document.querySelector(".result");
const popupWindow = document.querySelector("#popup_window");
const asideImage = document.querySelector(".popup_image");
const originalTitle = document.querySelector(".original_title");
const Overview = document.querySelector(".overview");
const vote = document.querySelector(".vote_average");
const language = document.querySelector(".original_language");
const close = document.querySelector(".fa-window-close");
let preLoader = false;

  

const getData = async  () => {
    const data= await fetch("https://api.themoviedb.org/4/list/1?api_key=9a13efedc86e6b304de3edce95233c87");
    const res = await data.json();
    const { results } = res;
    return results;
};


const popupWindowData = (element) => {
    popupWindow.style.display = "flex";
    popupWindow.style.top = "0";
    popupWindow.style.backgroundColor = "var(--popup_background-color)";
    const popupImage = document.createElement('img');
    popupImage.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
    asideImage.appendChild(popupImage);
    originalTitle.innerHTML = (`Title: ${element.original_title}`);
    Overview.innerHTML = (`${element.overview}`);
    vote.innerHTML = (`Vote: ${element.vote_average}`);
    language.innerHTML = (`Language: ${element.original_language}`);
};


(async function() {
    try{ 
        popupWindow.style.display = "none";
        const res = await getData();
        preLoader = true;
        preLoader ?  document.querySelector('body').classList.add("loaded") : res; 

        const posterImages = res.map(item => {  
            const moviePosterImage = `<div class="movie_wrapper"><img class="movie_img" value="${item.id}" src="https://image.tmdb.org/t/p/w500${item.poster_path}"/></div>`
            return moviePosterImage;
        }).join("");
       return   movieDataResult.innerHTML = posterImages;
    }catch(err){
        if(err) return document.querySelector('body').classList.add("loaded"); 

    }
})();




movieDataResult.addEventListener("click", async  (e) => {
    const idFromTarget = e.target.getAttribute("value");
    const parseIdFromTargetToNumber = parseInt(idFromTarget);
    const res = await getData();

    res.forEach(async element => {
        if(element.id === parseIdFromTargetToNumber){
            popupWindowData(element);
        }else {
            return;
        }
    });
});

close.addEventListener("click", () => {
    popupWindow.style.display = "none";
    popupWindow.style = null;
    asideImage.removeChild(asideImage.childNodes[0]);
});






