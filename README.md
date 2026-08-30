# fm4u — 라디오 웹앱

KBS 1FM · MBC FM4U · CBS 음악FM을 안드로이드 폰 브라우저에서 바로 들을 수 있는 심플한 웹앱입니다.
Netlify 없이 **GitHub Pages + GitHub Actions**만으로 동작합니다.

## 파일 구성

- `index.html` — 화면 (채널 3개, 재생 버튼)
- `streams.json` — 지금 이 순간의 실제 재생 주소를 담아두는 파일
- `scripts/refresh.mjs` — KBS·MBC 서버에 최신 주소를 물어봐서 `streams.json`을 새로 쓰는 스크립트
- `.github/workflows/refresh-streams.yml` — 위 스크립트를 5분마다 자동 실행하고, 바뀐 내용을 자동으로 커밋·push하는 설정

## 동작 원리

CBS 음악FM은 주소가 고정이라 그냥 재생하면 되지만, KBS·MBC는 "지금 이 순간의 진짜 주소"를 매번 새로 물어봐야 합니다. GitHub Pages는 정적 파일만 서비스하므로, 대신 **GitHub Actions가 5분마다 자동으로** 최신 주소를 물어봐서 `streams.json`에 저장해두고, 웹앱은 그 파일을 읽기만 합니다.

## 저장소에 올리는 방법 (웹 에디터로 하나씩, 기존 방식과 동일)

`github.com/2gateless/fm4u` 저장소에서 "Add file → Create new file"로 아래 파일들을 순서대로 만들어주세요. 경로를 파일명 칸에 그대로 입력하면(예: `.github/workflows/refresh-streams.yml`) 폴더가 자동으로 생성됩니다.

1. `index.html`
2. `streams.json`
3. `scripts/refresh.mjs`
4. `.github/workflows/refresh-streams.yml`

## 저장소 설정 (한 번만)

1. **Settings → Actions → General → Workflow permissions**에서 **"Read and write permissions"**를 선택하고 저장하세요. (이게 없으면 Actions가 자동 커밋을 못 합니다.)
2. **Settings → Pages**에서 Source를 **"Deploy from a branch"**, Branch를 **`main` / `root`**로 설정하세요.
3. 저장 후 몇 분 뒤 `https://2gateless.github.io/fm4u/` 주소로 사이트가 열립니다.
4. **Actions** 탭에서 "Refresh stream URLs" 워크플로우를 한 번 수동 실행(Run workflow)해서 `streams.json`이 정상적으로 갱신되는지 확인해보세요.
5. 안드로이드 크롬에서 위 주소를 열고 메뉴(⋮) → "홈 화면에 추가"를 하면 앱처럼 아이콘으로 쓸 수 있습니다.

## 참고 / 한계

- 주소는 최대 5분 간격으로 갱신됩니다. GitHub Actions 스케줄은 서버가 바쁠 때 몇 분 더 늦게 실행될 수 있습니다.
- MBC 주소에는 보안 토큰이 포함되어 있어 유효 시간이 있을 수 있습니다. 만약 MBC 재생이 자주 실패한다면, 유효 시간이 5분보다 짧다는 뜻이니 알려주시면 갱신 주기를 더 짧게 조정하거나 다른 방식을 찾아드릴게요.
- 방송사가 API 형식을 바꾸면 `scripts/refresh.mjs`의 해당 부분만 고치면 됩니다.
