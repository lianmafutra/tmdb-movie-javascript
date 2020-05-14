function main(){

    const baseUrl = "http://api.themoviedb.org/3/movie/top_rated?api_key=ec01f8c2eb6ac402f2ca026dc2d9b8fd";

    const loading = document.getElementsByClassName("se-pre-con");


    const getMovie = async () => {
        try {
            
   
            const response = await fetch(`${baseUrl}`);
            const responseJson = await response.json();
            renderAllMovies(responseJson.results);
            
          
        } catch(error) {
           showResponseMessage(error);
        }
    };

 

    
    $('#btn-search').click( event => {
            event.preventDefault();
            const key_search = document.getElementById("key-search").value;
           
            searchMovie(key_search)
    });

    $('#movie-tab').click( event => {
        event.preventDefault();
        $(".se-pre-con").show();
        setTimeout(function() {
            $(".se-pre-con").hide();
            getMovie();
          }, 500);

    
    });
    $('#tv-tab').click( event => {
        event.preventDefault();
        $(".se-pre-con").show();
     
        const key_search = document.getElementById("key-search").value;
        setTimeout(function() {
            $(".se-pre-con").hide();
            searchMovie("naruto");
          }, 500);
         
    });

    
        const searchMovie = async (key_search) => {
            try {
              const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=ec01f8c2eb6ac402f2ca026dc2d9b8fd&query="+key_search);
              const responseJson = await response.json();
              renderAllMovies(responseJson.results);             
              } catch(error) {
                 showResponseMessage(error);
              }
        }
    
    const renderAllMovies = (movies) => {
      
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        movies.forEach((book,index) => {
            listBookElement.innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5 id=title>${book.title}</h5>
                            <p>Release date : ${book.release_date}</p>
                            <h6>Rate :  ${book.vote_average}</h6>
                           
                            <img style="width:200px" src=https://image.tmdb.org/t/p/w500${book.poster_path}><br><br>
                            <button type="button" class="btn btn-primary btn-detail" data-toggle="modal" id="${index}" data-target="#exampleModalCenter">
                               Sinopsis
                            </button>
                            <button type="button" class="btn btn-info btn-trailer">
                            Trailer
                         </button>
                        </div>
                    </div>
                </div>
            `;
        });

       
       const buttons = document.querySelectorAll(".btn-detail");
       const listBookElement2 = document.getElementById("exampleModalLongTitle");
       const overview = document.getElementById("demo");

        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                const doublePrices = Object.fromEntries(
                    Object.entries(movies[bookId]).map(([key, value]) => [key, value])
                  );
                  
                  listBookElement2.innerHTML =doublePrices.title;
                  overview.innerHTML = doublePrices.overview;
        
            })
        });

        
      
    };

    setTimeout(function() {
        $(".se-pre-con").hide();
        getMovie();
      }, 1000);

}




