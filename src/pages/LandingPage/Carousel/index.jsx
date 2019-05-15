import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import heliosV1 from "../../../modules/api/helios/v1";
import { LoadingFill } from "../../../components/Loading";
import { Guidelines } from "../../../styles";
import DonationCard from "../../../components/stables/DonationCard";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  }
});

class Carousel extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };
  state = {
    donationProgramList: null,
    loading: true
  };

  componentDidMount() {
    heliosV1.donation
      .getDonationProgramList(4)
      .then(({ data } )=> {
        this.setState({ donationProgramList: data.results });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  renderCarousel() {
    const { donationProgramList } = this.state;
    return (
      donationProgramList &&
      donationProgramList.map(donation => <DonationCard {...donation} />)
    );
  }

  render() {
    const settings = {
      dots: true,
      className: "center",
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const { loading } = this.state;
    if (loading) {
      return <LoadingFill />;
    }

    return <Slider {...settings}>{this.renderCarousel()}</Slider>;
  }
}

export default withStyles(styles)(Carousel);
