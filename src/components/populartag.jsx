import React from "react";
import { Segment, Header, Input, Grid, Divider, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PopularTag = ({ tag }) => {
  return (
    <Grid.Column>
      <Segment
        className="pointer noSelect "
        raised
        as={Link}
        style={{ display: "block", textDecoration: "none" }}
        to={`/topics/${tag.short}`}
      >
        <div className="inline fs20 black">{tag.name}</div>
      </Segment>
    </Grid.Column>
  );
};

export default PopularTag;
