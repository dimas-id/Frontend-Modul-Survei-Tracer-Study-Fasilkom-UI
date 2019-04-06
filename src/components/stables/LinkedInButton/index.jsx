import React from "react";
import env from "../../../config";

import Button from "@material-ui/core/Button";
import LinkedInLogo from "../../../assets/img/LinkedIn.png";

export default function({ children, ...ButtonProps }) {
  const linkedinUrl = `${env.ATLAS}/api/v1/external-auths/linkedin`;
  return (
    <Button variant="outlined" {...ButtonProps} href={linkedinUrl}>
      <img
        src={LinkedInLogo}
        alt="LinkedIn"
        style={{ marginLeft: 8, marginRight: 8 }}
      />
      {children}
    </Button>
  );
}
