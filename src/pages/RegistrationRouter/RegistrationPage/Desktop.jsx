import React from "react";

import { NavbarAuth } from "../../../components/stables/Navbar";
import { Container } from "../../../components/Container";

import Registration from "./Registration";

export default function Desktop() {
  return (
    <React.Fragment>
      <NavbarAuth />
      <Container>
        <Registration />
      </Container>
    </React.Fragment>
  );
}
