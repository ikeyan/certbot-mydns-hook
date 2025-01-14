import { fileURLToPath } from "node:url";
import { appendFile } from "node:fs/promises";
import path from "node:path";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

export const url = "https://www.mydns.jp/directedit.html";

const masterId = process.env.MYDNSJP_MASTERID;
if (!masterId) {
	throw new Error("MYDNSJP_MASTERID is not defined");
}

const masterPwd = process.env.MYDNSJP_MASTERPWD;
if (!masterPwd) {
	throw new Error("MYDNSJP_MASTERPWD is not defined");
}

// certbotが渡してくる可能性がある変数
const certbotEnvKeys = [
	"CERTBOT_DOMAIN",
	"CERTBOT_VALIDATION",
	"CERTBOT_TOKEN",
	"CERTBOT_CERT_PATH",
	"CERTBOT_KEY_PATH",
	"CERTBOT_SNI_DOMAIN",
	"CERTBOT_AUTH_OUTPUT",
];
export const getCertbotEnvs = () =>
	Object.fromEntries(
		certbotEnvKeys.flatMap((key) => {
			const value = process.env[key];
			if (value === undefined) {
				return [];
			}
			return [[key, value]];
		}),
	);

export const fetchDirectEdit = async (params: Record<string, string>) =>
	await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(`${masterId}:${masterPwd}`).toString("base64")}`,
		},
		body: new URLSearchParams(params).toString(),
	}).then(async (response) => {
		const headers = Array.from(response.headers.entries())
			.map(([key, value]) => `${key}=${value}`)
			.join(", ");
		return `${response.status} ${response.statusText} headers=${headers}`;
	});

export const logDebug = async (debug: string) =>
	await appendFile(
		`${projectRoot}/debug.log`,
		`[${(new Date()).toISOString()}] ${debug}\n`,
	);

export const logCertbotEnvsToDebug = async () =>
	await logDebug(
		`CERTBOT_* envs: ${Object.entries(process.env)
			.filter(([key]) => key.startsWith("CERTBOT_"))
			.map(([key, value]) => `${key}=${value}`)
			.join(", ")}`,
	);
