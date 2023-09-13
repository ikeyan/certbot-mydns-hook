#!/usr/bin/env node
import { appendFile } from "fs/promises";
import { fetchDirectEdit, getCertbotEnvs } from "./common";

const contents = await fetchDirectEdit({
  ...getCertbotEnvs(),
  EDIT_CMD: "DELETE",
});
const debug = [`contents=${contents}`, JSON.stringify(getCertbotEnvs())].map((s) => s + "\n").join("");
await appendFile(__dirname + "/debug.log", debug);
