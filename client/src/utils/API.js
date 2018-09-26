import axios from "axios";

export default {
  // Get NYT articles using nytimes.com api
  apiArticles: function(topic, startYear, endYear) {
    const apikey = `744063e2d6894d5d9009bfdd5398101d`;
    let url = "";

    if (startYear === "" && endYear === "") {
      url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apikey}&q=${topic}&sort=newest&fl=web_url,headline,pub_date`;
    }
    else if (startYear === "") {
      url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apikey}&q=${topic}&end_date=${endYear}1231&sort=newest&fl=web_url,headline,pub_date`;
    }
    else if (endYear === "") {
      url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apikey}&q=${topic}&begin_date=${startYear}0101&sort=newest&fl=web_url,headline,pub_date`;
    }
    else {
      url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apikey}&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}1231&sort=newest&fl=web_url,headline,pub_date`;
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
