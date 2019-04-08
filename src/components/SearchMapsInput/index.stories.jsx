import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import SearchMapsInput from "./";

storiesOf("SearchMapsInput", module).add("default", () => (
  <SearchMapsInput onSelect={() => null} />
));
