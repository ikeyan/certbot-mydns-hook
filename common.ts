const url = "https://www.mydns.jp/directedit.html";

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
const getCertbotEnvs = () =>
  Object.fromEntries(
    certbotEnvKeys.flatMap((key) => {
      const value = process.env[key];
      if (value === undefined) {
        return [];
      }
      return [[key, value]];
    })
  );

const fetchDirectEdit = async (params: Record<string, string>) =>
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${masterId}:${masterPwd}`).toString("base64")}`,
    },
    body: new URLSearchParams(params).toString(),
  }).then((response) => response.text());

export { url, masterId, masterPwd, getCertbotEnvs, fetchDirectEdit };
