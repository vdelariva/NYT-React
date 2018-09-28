import React, { Component } from "react";
import API from "../../utils/API";
import Results from "../Results";
import Saved from "../Saved";
import Jumbotron from "../Jumbotron";
import Header from "../Header";
import { Col, Row, Container } from "../Grid";
import { Input } from "../Form";
import Button from "../Button";
import "./Main.css";

class Main extends Component {
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

        {/* Render only if there are search results */}
        { this.state.results.length > 0 &&
          <Results results={this.state.results} saveArticle={this.saveArticle} />
        }

        {/* Render only if there are saved articles */}
        { this.state.articles.length > 0 &&
          <Saved articles={this.state.articles} deleteArticle={this.deleteArticle}/>
        }
      </Container>
    );
  }
}

export default Main;
