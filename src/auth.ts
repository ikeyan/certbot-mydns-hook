import {
	fetchDirectEdit,
	getCertbotEnvs,
	logCertbotEnvsToDebug,
	logDebug,
} from "./common.js";

await logCertbotEnvsToDebug();
const contents = await fetchDirectEdit({
	...getCertbotEnvs(),
	EDIT_CMD: "REGIST", // TXTレコードの編集コマンド
});
await logDebug(`contents=${contents}`);
