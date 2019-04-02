import React, {Fragment} from "react";
import Carousel from "nuka-carousel";
import {TitleText, MoreText, Container, SlideContainer} from "./Carousel.style";
import {themed} from "../../utils/common";
import {any, arrayOf, bool, element, shape, string} from "prop-types";
import styles from "./Carousel.css";

export const WebCarousel = ({
  dots,
  fullHeight,
  fullWidth,
  slides,
  wrapAround,
}) => {
  return (
    <Container width={fullWidth && "100%"} fullHeight={fullHeight}>
      <Carousel
        className={dots === "light" && "light-dots"}
        width="100%"
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
        autoplay
        autoPlayInterval={6000}
        wrapAround={wrapAround}
        pauseOnHover={false}
        initialSlideHeight={180}
        initialSlideWidth={340}
        dragging={false}
        {...styles}
      >
        {slides.map(slide => (
          <Fragment key={slide.thumbnail || slide.url}>
            <img src={slide.thumbnail || slide.url} alt={slide.title} />
            <SlideContainer>
              {slide.title && <TitleText>{slide.title}</TitleText>}
              {slide.text && <MoreText>{slide.text}</MoreText>}
              {slide.node}
            </SlideContainer>
          </Fragment>
        ))}
      </Carousel>
    </Container>
  );
};

WebCarousel.defaultProps = {
  wrapAround: true,
};

WebCarousel.propTypes = {
  dots: string,
  fullWidth: bool,
  fullHeight: bool,
  slides: arrayOf(
    shape({
      title: string,
      text: string,
      url: any,
      thumbnail: any,
      node: element,
    }),
  ).isRequired,
  wrapAround: bool,
};
export default themed(WebCarousel);
