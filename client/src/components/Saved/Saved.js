import React from "react";
import Moment from 'react-moment';
import Header from "../Header";
import { Col, Row } from "../Grid";
import { List, ListItem } from "../List";
import Button from "../Button";

const Saved = props => (
  <Row>
    <Col size="md-12">
      <Header>
        Saved Articles
      </Header>
      <List>
        {props.articles.map(article => (
          <ListItem key={article._id}>
            <a href={article.url} target="_blank">
              <strong>
                {article.title}
              </strong>
            </a>
            <Button 
              onClick={() => props.deleteArticle(article._id)}
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
    </Col>
  </Row>
);

export default Saved;
