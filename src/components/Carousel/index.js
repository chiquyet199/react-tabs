import React, {Component} from "react";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {
  Container,
  CurrentSlide,
  CurrentImage,
  TitleText,
  MoreText,
} from "./Carousel.style";
import {themed} from "../../utils/common";
import {connect} from "react-redux";
import {CAROUSEL_MAX_WIDTH} from "../../constants/sizes";
import {
  any,
  arrayOf,
  bool,
  element,
  number,
  object,
  shape,
  string,
} from "prop-types";

// TODO add i18n

export class NativeCarousel extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._carousel = {};
    this.state = {
      activeSlide: 0,
    };
  }

  get pagination() {
    const {activeSlide} = this.state;
    const {slides, dots, theme} = this.props;

    return (
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: "absolute",
          bottom: -10,
          left: 0,
          right: 0,
        }}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          margin: 0,
          paddingHorizontal: 0,
          backgroundColor: `${
            dots === "light" ? theme.colors.white : theme.colors.canopySteel
          }`,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
      />
    );
  }

  handleSnapToItem = index => {
    this.setState({activeSlide: index});
  };

  renderItem = ({item, index, fullWidth, screenWidth}) => {
    const imageUrl = item.url || item.thumbnail;
    const isLocalImage = typeof imageUrl === "number";
    const itemWidth = fullWidth ? screenWidth : CAROUSEL_MAX_WIDTH;

    return (
      <CurrentSlide
        onPress={() => {
          this._carousel.snapToItem(index);
        }}
      >
        <CurrentImage
          imageHeight={200}
          imageWidth={itemWidth}
          source={isLocalImage ? imageUrl : {uri: imageUrl}}
        />
        {item.title && <TitleText>{item.title}</TitleText>}
        {item.text && <MoreText>{item.text}</MoreText>}
        {item.node}
      </CurrentSlide>
    );
  };

  render = () => {
    const {activeSlide} = this.state;
    const {
      slides,
      sliderWidth = CAROUSEL_MAX_WIDTH,
      itemWidth = CAROUSEL_MAX_WIDTH,
      fullWidth = false,
      fullHeight,
      screenWidth,
    } = this.props;

    return (
      <Container
        width={fullWidth ? "100%" : sliderWidth}
        fullHeight={fullHeight}
      >
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          autoplay
          loop
          autoplayInterval={6000}
          enableMomentum={false}
          lockScrollWhileSnapping
          data={slides}
          renderItem={this.renderItem}
          onSnapToItem={this.handleSnapToItem}
          inactiveSlideOpacity={0}
          sliderWidth={fullWidth ? screenWidth : sliderWidth}
          itemWidth={fullWidth ? screenWidth : itemWidth}
          layout="default"
          firstItem={activeSlide}
        />
        {this.pagination}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  screenWidth: state.dimensions.width,
});

const mapDispatchToProps = {};

NativeCarousel.propTypes = {
  dots: string,
  fullHeight: bool,
  fullWidth: bool,
  itemWidth: number,
  screenWidth: number,
  sliderWidth: number,
  slides: arrayOf(
    shape({
      title: string,
      text: string,
      url: any,
      thumbnail: any,
      node: element,
    }),
  ).isRequired,
  theme: object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(themed(NativeCarousel));
