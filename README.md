# Movie Trailers website using Python



### Concept:

Build a site using **Python** that shows top rated movies with their Title and Trailer information.The data is fed dynamically by the [themoviedb](https://www.themoviedb.org/documentation/api) api. Since this is a demo website the count of movie listed has been limited to top 15 movies. The number can be configured in moviesDB.py file

### Requirements:

* [Python - based on your OS](https://www.python.org/downloads/)
* Chrome browser preferably
* Sign up for getting an API token from [themoviedb](https://www.themoviedb.org/documentation/api)


### Sample JSON Object that drives the site

    {"poster_path":"\/lIv1QinFqz4dlp5U4lQ6HaiskOZ.jpg",
    "adult":false,
    "overview":"Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.",
    "release_date":"2014-10-10",
    "genre_ids":[  
    18,
    10402
    ],
    "id":244786,
    "original_title":"Whiplash",
    "original_language":"en",
    "title":"Whiplash",
    "backdrop_path":"\/6bbZ6XyvgfjhQwbplnUh1LSj1ky.jpg",
    "popularity":6.230627,
    "vote_count":1874,
    "video":false,
    "vote_average":8.34
    }
    
### Screenshots

![alt text](http://s20.postimg.org/xg1rg6jv1/Website_Screen_Shot.png "Website Screen shot")

![alt text](http://s20.postimg.org/h6blda971/Website_Screenshot_with_Trailer.png "Website Screen shot with trailer")


### Future Use Cases

* Show movie votes , ratings and story line on hover
* Provide option for the user to provide rating (api supports it)
* Provide navigation options to swtich between Top Rated , Now in Theatres and Coming Soon (api supports it)
