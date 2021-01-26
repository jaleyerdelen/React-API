import React from "react";

class SearchBar extends React.Component {

state = {
    searchQuery: ""
}
 // event.preventDefault varsayılan davranışı durdurdu. Mesela search butonuna gidip yazdığımızda sayfayı yenilemiyor
handleFormSubmit = (event) => {
    event.preventDefault();
}

    render() {
        return (
           <form onSubmit= {this.handleFormSubmit}>
                <div className="form-row  mb-3">
                    <div className="col-12">
                        <div>
                           <input
                            onChange= {this.props.searchMovieProp} 
                             type="text" className="form-control" 
                             placeholder="Search a movie"
                        
                             />
                        </div>

                    </div>
               </div>
           </form>
        )
    }
}

export default SearchBar;