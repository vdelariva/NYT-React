import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Header from "../../components/Header";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input } from "../../components/Form";
import Button from "../../components/Button";
import Moment from 'react-moment';
import "./Articles.css";

class Articles extends Component {
  state = {
    results: [],
    articles: [],
    title: "",
    link: "",
    date: "",
    nytID: "",
    topic: "",
    startDate: "",
    endDate: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => {
        // console.log(`getArticles res: ${JSON.stringify(res)}`)
        this.setState({ articles: res.data, title: "", link: "", date: "", nytID: ""})
      })
      .catch(err => console.log(err));
  };

  saveArticle = (article) => {
    console.log(`Article Object: ${JSON.stringify(article)}`)
    API.saveArticle({article})
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
}

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    // Get articles via nyt api
    API.apiArticles(this.state.topic, this.state.startDate, this.state.endDate)
      .then(res => {
        // console.log(`apiArticles res: ${JSON.stringify(res)}`)
        this.setState({ results: res, topic: "", startDate: "", endDate: "" })
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Jumbotron>
          {/* <h1>New York Times - Search Articles</h1> */}
        </Jumbotron>
        <p className="pHeader">Search for and annotate articles of interest!</p>
        <Row>
          <Col size="md-12">
            <Header>
              Search
            </Header>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic"
              />
              <Input
                value={this.state.startDate}
                onChange={this.handleInputChange}
                name="startDate"
                placeholder="Start Date (YYYYMMDD)"
              />
              <Input
                value={this.state.endDate}
                onChange={this.handleInputChange}
                name="endDate"
                placeholder="End Date (YYYYMMDD)"
              />
              <Button
                onClick={this.handleFormSubmit}
                style={{ float: "right", marginBottom: 10 }}
                className={"btn btn-success"}
              >
                Search
              </Button>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Header>
              Results
            </Header>
            {this.state.results.length ? (
              <List>
                {this.state.results.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.web_url} target="_blank">
                      <strong>
                        {article.headline.main}
                      </strong>
                    </a>
                    <Button 
                      onClick={() => this.saveArticle({title:article.headline.main, url:article.web_url, date:article.pub_date, nytID:article._id})}
                      style={{ float: "right", marginBottom: 10 }}
                      className={"btn btn-success"}
                    >
                      Save
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Header>
              Saved Articles
            </Header>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url} target="_blank">
                      <strong>
                        {article.title}
                      </strong>
                    </a>
                    <Button 
                      onClick={() => this.deleteArticle(article._id)}
                      style={{ float: "right", marginBottom: 10 }}
                      className={"btn btn-danger"}
                    >
                      Remove
                    </Button>
                    <p>
                      Publication Date: <Moment format="MM/DD/YYYY">{article.date}</Moment>
                    </p>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Saved Articles</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
