#!/usr/bin/env node
import { fetchDirectEdit, getCertbotEnvs, logDebug } from "./common";

const contents = await fetchDirectEdit({
  ...getCertbotEnvs(),
  EDIT_CMD: "DELETE",
});
await logDebug([`contents=${contents}`, JSON.stringify(getCertbotEnvs())].map((s) => s + "\n").join(""));
