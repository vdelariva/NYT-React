import React from "react";
import Header from "../Header";
import { Col, Row } from "../Grid";
import { List, ListItem } from "../List";
import Button from "../Button";

const Results = props => (
  <Row>
    <Col size="md-12">
      <Header>
        Results
      </Header>
        <List>
          {props.results.map(article => (
            <ListItem key={article._id}>
              <a href={article.web_url} target="_blank">
                <strong>
                  {article.headline.main}
                </strong>
              </a>
              <Button 
                onClick={() => props.saveArticle({title:article.headline.main, url:article.web_url, date:article.pub_date, nytID:article._id})}
                style={{ float: "right", marginBottom: 10 }}
                className={"btn btn-success"}
              >
                Save
              </Button>
            </ListItem>
          ))}
        </List>
    </Col>
  </Row>
);

export default Results;
