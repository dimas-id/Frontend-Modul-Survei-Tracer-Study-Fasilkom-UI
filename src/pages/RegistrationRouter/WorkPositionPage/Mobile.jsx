import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authorize } from "../../../components/hocs/auth";
import { NavbarAuth } from "../../../components/stables/Navbar";
import { Container } from "../../../components/Container";
import FormDialog from "../../../components/FormDialog";

import Title from "../../../components/stables/Experience/Title";
import WorkPosition from "../../../components/stables/Experience/WorkPosition";
import PositionForm from "../../../components/stables/Experience/PositionForm";

class WorkPositionPage extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  state = {
    showModal: false
  };

  handleShowModalNew = () =>
    this.setState({
      showModal: true,
      positionId: null,
      isNewPosition: true
    });

  handleShowModalUpdate = positionId =>
    this.setState({
      positionId,
      showModal: true,
      isNewPosition: false
    });

  __handleCloseModal__ = () =>
    this.setState({
      showModal: false,
      positionId: null,
      isNewPosition: false
    });

  handleCloseModal = () => {
    if (this.state.isNewPosition) {
      window.alertDialog(
        "Apakah anda yakin?",
        "Jika anda tutup, maka pernyataan anda akan hilang.",
        this.__handleCloseModal__,
        () => null
      );
    } else {
      this.__handleCloseModal__();
    }
  };

  handleAfterSubmit = res => {
    if (!res.error) {
      this.__handleCloseModal__();
    }
  };

  renderDialogWithForm() {
    const { showModal, positionId, isNewPosition } = this.state;

    const title = isNewPosition ? "Tambah Posisi" : "Ubah Posisi";

    return (
      <FormDialog
        title={title}
        open={showModal}
        onClose={this.handleCloseModal}
      >
        <PositionForm
          update={!isNewPosition}
          positionId={positionId}
          afterSubmit={this.handleAfterSubmit}
        />
      </FormDialog>
    );
  }

  render() {
    return (
      <React.Fragment>
        <NavbarAuth />
        <Container>
          <Title
            ButtonProps={{
              onClick: this.handleShowModalNew,
              hidden: false
            }}
          >
            Riwayat Pekerjaan
          </Title>
          <WorkPosition
            onEdit={this.handleShowModalUpdate}
            onAdd={this.handleShowModalNew}
          />
        </Container>
        {this.renderDialogWithForm()}
      </React.Fragment>
    );
  }
}

function createContainer() {
  return authorize({
    mustVerified: false
  })(connect(state => ({}))(WorkPositionPage));
}

export default createContainer();
