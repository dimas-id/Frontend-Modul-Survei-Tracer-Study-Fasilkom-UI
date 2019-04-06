import React from "react";

import { storiesOf } from "@storybook/react";

import FileUploadInput from "./";

storiesOf("FileUploadInput", module).add("default", () => (
  <FileUploadInput onSelect={() => null} />
));
