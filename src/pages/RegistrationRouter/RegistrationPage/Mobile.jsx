import React from "react";

import { NavbarModal } from "../../../components/stables/Navbar";
import { Container } from "../../../components/Container";

import Registration from "./Registration";

export default function Mobile() {
  return (
    <React.Fragment>
      <NavbarModal />
      <Container>
        <Registration />
      </Container>
    </React.Fragment>
  );
}
