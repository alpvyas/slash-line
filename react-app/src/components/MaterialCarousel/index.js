import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";

const MaterialCarousel = (games) => {

  const items =  [
    {
      name: "Item 1",
      description: "Hello World!"
    },
    {
      name: "Item 2",
      description: "Hallo Welt!"
    },
    {
      name: "Item 3",
      description: "Hola Mundo!"
    },
    {
      name: "Item 4",
      description: "Bonjour tout le monde!"
    },
  ]

  return (
    <>
      <Carousel>
        {
          items.map( (item, index) => <Item key={index} item={item} />)
        }
      </Carousel>
    </>
  )
};

const Item = ( { key, item }) => {

  return (
    <Paper>
      <h2>{item.name}</h2>
      <p>{item.description}</p>

      <Button className="check-button">
        Check it out!
      </Button>
    </Paper>
  )
};
export default MaterialCarousel;