import React from "react";

//state durumu ortadan kalktığı için functional yapıya çevirdik class componentinden

const MovieList = (props) => {

// function handleClick(event){
//   console.log(event.pageY);
// }

  return (
    //ilk önce col ve row'u ayırdık col kısmını alıp map kısmının içine koyduk
    //this.props.movie kısmındaki this'i sildik class compenent yapısını silince. Yoksa hata veriyor
    <div className="row main">
      {props.movies.map((movie) => (
        //movie.id yazarak componentleri birbirinden ayırt etmiş olduk
        <div className="col-lg-4" key={movie.id}>
          <div className="card mb-4 shadow-sm">
            <img
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
              className="card-img-top"
              alt="Sample Movie"
              height="500"
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">{movie.overview}</p>
              <div className="main-box">
                <button type="button" onClick={(event)=> props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">
                  Delete
                </button>
                <h2>
                  <span className="badge badge-info">{movie.vote_average}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
