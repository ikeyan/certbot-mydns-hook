import {
	fetchDirectEdit,
	getCertbotEnvs,
	logCertbotEnvsToDebug,
	logDebug,
} from "./common.js";

await logCertbotEnvsToDebug();
const contents = await fetchDirectEdit({
	...getCertbotEnvs(),
	EDIT_CMD: "DELETE",
});
await logDebug(`contents=${contents}`);
