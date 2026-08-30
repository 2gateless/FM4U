// KBS 1FM, MBC FM4U의 "지금 이 순간" 재생 주소를 물어봐서 streams.json에 저장합니다.
// GitHub Actions가 이 스크립트를 5분마다 자동으로 실행합니다.

import { writeFile } from "node:fs/promises";

async function getKbs1fm() {
  const res = await fetch(
    "https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/24"
  );
  const data = await res.json();
  const item =
    (data.channel_item && data.channel_item[0]) ||
    (data.channel && data.channel.item && data.channel.item[0]);
  return item && item.service_url;
}

async function getMbc4u() {
  const res = await fetch(
    "https://sminiplay.imbc.com/aacplay.ashx?agent=webapp&channel=mfm"
  );
  const text = await res.text();
  return text.trim();
}

async function main() {
  const result = {
    updatedAt: new Date().toISOString(),
    cbsmusic:
      "https://m-aac.cbs.co.kr/mweb_cbs939/_definst_/cbs939.stream/playlist.m3u8",
  };

  try {
    result.kbs1fm = await getKbs1fm();
  } catch (err) {
    console.error("KBS 1FM 조회 실패:", err);
  }

  try {
    result.mbc4u = await getMbc4u();
  } catch (err) {
    console.error("MBC FM4U 조회 실패:", err);
  }

  await writeFile("streams.json", JSON.stringify(result, null, 2) + "\n");
  console.log("streams.json 갱신 완료", result);
}

main();
