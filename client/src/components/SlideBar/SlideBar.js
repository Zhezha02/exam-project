import React from "react";
import Flickity from "react-flickity-component";
import style from "./SlideBar.module.sass";
import carouselConstants from "../../carouselConstants";
import "./flickity.css";
import { ExampleSlide, FeedbackSlide, MainSlide } from "./sliderTypes";

const options = {
  draggable: true,
  wrapAround: true,
  pageDots: false,
  prevNextButtons: true,
  autoPlay: true,
  groupCells: true,
  lazyLoad: true,
};

const styles = {
  [carouselConstants.MAIN_SLIDER]: style.mainCarousel,
  [carouselConstants.EXAMPLE_SLIDER]: style.exampleCarousel,
  [carouselConstants.FEEDBACK_SLIDER]: style.feedbackCarousel,
};

const slideTypes = {
  [carouselConstants.MAIN_SLIDER]: (props) => (
    <MainSlide
      className={style["carousel-cell"]}
      key={props.index}
      src={props.src}
    />
  ),
  [carouselConstants.EXAMPLE_SLIDER]: (props) => (
    <ExampleSlide
      className={style["example-cell"]}
      key={props.index}
      src={props.src}
      data={carouselConstants.EXAMPLE_SLIDER_TEXT[props.index]}
    />
  ),
  [carouselConstants.FEEDBACK_SLIDER]: (props) => (
    <FeedbackSlide
      className={style["feedback-cell"]}
      key={props.index}
      src={props.src}
      data={carouselConstants.FEEDBACK_SLIDER_TEXT[props.index]}
    />
  ),
};

const SliderBar = (props) => {
  const { carouselType, images } = props;
  const className = styles[carouselType];
  const renderSlide = slideTypes[carouselType];

  return (
    <Flickity className={className} elementType={"div"} options={options}>
      {Object.entries(images).map(([_, value], index) =>
        renderSlide({ src: value, index })
      )}
    </Flickity>
  );
};

export default SliderBar;
