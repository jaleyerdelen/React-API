import React from "react";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import axios from "axios";
require('dotenv').config();



class App extends React.Component {
  state = {
    movies: [],
    searchQuery:""
  };
  
//fetch'den gelen promiseleri asenkron yapıyı kabul etmek için async ve await kullandık
  // async componentDidMount() {
  //   //verilerimizin olduğu yer URL
  //   const baseURL = "http://localhost:3002/movies";
  //   const response = await fetch(baseURL);
  //   console.log(response)
  //   //response.json demek; gelen veri json formatında olsun.
  //   const data = await response.json();
  //   console.log(data)
  //   //gelen data'yı movies'in içine yerleştirdik.
  //   this.setState({movies: data})
  // }

  //axios ile tek seferde verileri json formatında aldık.
  //yukarındankinden farkı response fetch kullanmadık. response ile çevirmemize de gerek kalmadan direkt dataya ulaştık



  async componentDidMount() {
    // 1.const populer filmlerden çektiğimiz apı, 2.ise bizim kendi oluşturduğumuz moviedb deki listemiz.
     const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
   // const response = await axios.get(`https://api.themoviedb.org/3/list/7073237?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    //console.log(response.data.items);
    this.setState({ movies: response.data.results})
  }




  deleteMovie = (movie) => {
     const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
  }

  //FETCH API
  // deleteMovie = async (movie) => {
  //   const baseURL = `http://localhost:3002/movies/${movie.id}`
  //   await fetch(baseURL, {
  //     method:"DELETE"
  //   })
  //    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);


//AXİOS API
   deleteMovie = async (movie) => {
     axios.post(`https://api.themoviedb.org/3/list/7073237/remove_item?media_id=${movie.id}&session_id=${process.env.REACT_APP_SESSION_ID}&api_key=${process.env.REACT_APP_API_KEY}`)
      const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
     

    //movies'i NewMovieList olarak değiştirdik. Elimizde film bilgisi olmasaydı bunu kullanırdık.
    // this.setState({
    //   movies: newMovieList
    // })

    // Yukarıdakine alternatif, diğer yol.
    this.setState((state) => ({
      movies: newMovieList,
    }));


    }
  searchMovie = (event) => {
//search butonunda yazı yazdığımız değerler
    //console.log(event.target.value)

   //state'i update ettik. Her değişiklik yaptığımızda uptade etmiş olacağız.
    this.setState({searchQuery: event.target.value})

  }
  
  render() {

    let filteredMovies = this.state.movies.filter(
      (movie) => {
        return movie.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      }
    )

    return (
      <div className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5">
              <SearchBar searchMovieProp= {this.searchMovie} />
            </div>
          </div>
          <MovieList
            movies={filteredMovies} 
            deleteMovieProp={this.deleteMovie} //delete'i propslayacağız
          />
        </div>
      </div>
    
    );
  }

}
export default App;
