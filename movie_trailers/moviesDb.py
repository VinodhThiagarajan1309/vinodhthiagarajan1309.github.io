#Download the required libraries
import media
import webbrowser
import fresh_tomatoes
import json
import urllib

'''This method calls theMovieDB api and get the list of top rated movies
   which is rendered in a JSON format.
   The JSON message is parsed we create Movie
   objects out of it.
   The mehtod returns a list of movie objects'''
def get_top_rated_movies():
    json_data =urllib.urlopen("https://api.themoviedb.org/3/movie/top_rated?api_key=14f6f23935d5f6396544342f801e171d")
    movies_json_data = json.loads(json_data.read())  #JSON to Python Dictionary
    movies_list = []
    iMovieCount = 0; #iniate a counter to count the movie objects being created
    for movieObj in movies_json_data['results']:
        title =  str(movieObj['title'])
        poster =  str(movieObj['poster_path'])
        overview =  str(movieObj['overview'].encode('utf-8')) #encoded version of the string
        movie_id = str(movieObj['id'])
        trailer = ''

 
        videos_data = urllib.urlopen("https://api.themoviedb.org/3/movie/"+movie_id+"/videos?api_key=14f6f23935d5f6396544342f801e171d")
        video_json_data = json.loads(videos_data.read())

        #Inner for loop recieves a list of movie trailers and we just need one of them and only from Youtube
        #Break when link to one video is retreived
        for videoObj in video_json_data['results']:
            if videoObj['site'] == 'YouTube' :
                trailer = str(videoObj['key'])
                break

        #Create a Movie object and push it to a List
        movies_list.append(media.Movie(title,overview,
                       "http://image.tmdb.org/t/p/w500"+poster+"?api_key=14f6f23935d5f6396544342f801e171d" ,
                       "https://youtu.be/"+trailer))

        iMovieCount += 1
        #Since we are only displaying only Top 15 movies break the loop once we have created 15 movie objects
        if iMovieCount == 15:
            break
           
    return movies_list



fresh_tomatoes.open_movies_page(get_top_rated_movies())
