var findSimilarGenres = (rootGenre) => {
    var affected_countries = new Map();

    // loops through all countries and the genres they have
    for (country in all_genres){
        hasGenre = false;
        var obj = all_genres[country];

        for (i = 0; i < obj.length; i++){
            genre = obj[i];

            // checking if this genre is related to the rootGenre
            if (genre.indexOf(rootGenre) > 0){
                // this is related
                if (hasGenre == false){
                    hasGenre = true;
                    affected_countries[country] = [genre];
                } else {
                    affected_countries[country].push(genre);
                }
            }
        }
    }

    return affected_countries;
}