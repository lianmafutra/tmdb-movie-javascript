import "./style/style.css";
import "./style/bootstrap.min.css";


 const loading = document.getElementsByClassName("se-pre-con");
 let listBook = document.getElementById("listBook");
    
    
    let getMovie = async (type='movie') => {
        listBook.innerHTML = "height:0px";
        try {
            let response = await fetch(`http://api.themoviedb.org/3/${type}/top_rated?api_key=ec01f8c2eb6ac402f2ca026dc2d9b8fd`);
            let responseJson = await response.json();
          
            setTimeout(function() {
                $(".se-pre-con").hide();
                renderAllMovies(type,responseJson.results);
              }, 1000);
           
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
        getMovie('movie');
    });

    $('#tv-tab').click( event => {
        event.preventDefault();
        $(".se-pre-con").show();
        
        getMovie('tv');
    });
    $('#fav-tab').click( event => {
        event.preventDefault();
        alert("belum ada favorite");
      
    });


    
        const searchMovie = async (key_search) => {
            try {
              const response     = await fetch("https://api.themoviedb.org/3/search/movie?api_key=ec01f8c2eb6ac402f2ca026dc2d9b8fd&query="+key_search);
              const responseJson = await response.json();
              renderAllMovies(responseJson.results);     

              } catch(error) {
                 showResponseMessage(error);
              }
        }
    
    const renderAllMovies = (type,movies) => {

        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        movies.forEach((book,index) => {
            
            //default movies
            let title        = book.title;
            let release_date = book.release_date;

            //API TV
            if(type=='tv'){
                title        = book.name;
                release_date = book.first_air_date
            }

            listBookElement.innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5 id=title>${title}</h5>
                            <p>Release date : ${release_date}</p>
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
                let doublePrices = Object.fromEntries(
                    Object.entries(movies[bookId]).map(([key, value]) => [key, value])
                  );

                    //default movies
                    let title_detail        =  doublePrices.title;

                    
                    if(type=='tv'){
                        title_detail        =  doublePrices.name;
                     
                    }

                  listBookElement2.innerHTML  = title_detail;
                  overview.innerHTML          =  doublePrices.overview;
        
            })
        });

        
      
    };

   //first load
    getMovie();
 






