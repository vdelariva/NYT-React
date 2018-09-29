import axios from "axios";

export default {
  // Get NYT articles using nytimes.com api
  apiArticles: function(topic, startDate, endDate) {
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="
    const apikey = "744063e2d6894d5d9009bfdd5398101d";
    const endURL = "&sort=newest&fl=web_url,headline,pub_date,_id";
    let url = "";

    // Build query URL
    if (startDate === "" && endDate === "") {
      url = `${baseURL}${apikey}&q=${topic}${endURL}`;
    }
    else if (endDate !== "") {
      url = `${baseURL}${apikey}&q=${topic}&end_date=${endDate}${endURL}`;
    }
    else if (startDate !== "") {
      url = `${baseURL}${apikey}&q=${topic}&begin_date=${startDate}${endURL}`;
    }
    else {
      url = `${baseURL}${apikey}&q=${topic}&begin_date=${startDate}&end_date=${endDate}${endURL}`;
    }
    
    return axios.get(url)
      .then(res => {
        return res.data.response.docs;
      });
  },
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
