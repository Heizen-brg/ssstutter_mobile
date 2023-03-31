import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon, Loader } from ".";
const Slick = (props) => {
  const {
    children,
    isDot = true,
    isArrow = true,
    vertical = true,
    autoPlay = true,
    perView = 1,
    mobileView = 1,
    loop = true,
    fade = false,
    centerMode = false,
    slideIndex = 0,
    dragging = false,
    className,
  } = props;

  const sliderRef = useRef(null);
  useEffect(() => {
    sliderRef.current.slickGoTo(slideIndex);
  }, [slideIndex]);

  const RightArrow = ({ currentSlide, slideCount, onClick }) => {
    return (
      <button
        type="button"
        className={`absolute z-10 top-1/2 right-2 -translate-y-1/2 ${
          currentSlide === slideCount - 1 ? " slick-disabled" : ""
        }`}
        onClick={onClick}
      >
        <Icon name="right" width="30" height="30" color="white" />
      </button>
    );
  };
  const LeftArrow = ({ currentSlide, slideCount, onClick }) => {
    return (
      <button
        type="button"
        className={`${
          currentSlide === 0 ? " slick-disabled" : ""
        } absolute z-10 top-1/2 left-2 -translate-y-1/2`}
        onClick={onClick}
      >
        <Icon name="left" color="white" width="30" height="30" />
      </button>
    );
  };
  const settings = {
    dots: isDot,
    arrows: isArrow,
    infinite: loop,
    speed: 500,
    className: className,
    lazyLoad: true,
    slidesToShow: perView,
    slidesToScroll: perView + 1 - perView,
    autoplay: autoPlay,
    centerMode: centerMode,
    autoplaySpeed: 5000,
    fade: fade,
    vertical: vertical,
    verticalSwiping: vertical,
    // adaptiveHeight: true,
    // swipeToSlide: true,
    swipe: true,
    touchThreshold: 200,
    initSlide: 0,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: mobileView,
          slidesToScroll: mobileView + 1 - mobileView,
        },
      },
    ],
    onLazyLoad: (loader) => <Loader />,
    beforeChange: (currentSlide, nextSlide) => {
      // console.log("before change", currentSlide, nextSlide);
    },
    afterChange: (currentSlide) => {
      // console.log("after change", currentSlide);
    },

    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
  };
  return (
    <Slider ref={sliderRef} {...settings}>
      {children}
    </Slider>
  );
};

export default Slick;
