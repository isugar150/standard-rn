# 멘토리 (Mentory) 디자인 시스템

표준 RN 템플릿 위에 멘토리 브랜드 시스템이 얹힌 구조다. 모든 화면은 `.dc.html`
단일 파일로 제작되며, 390×844 모바일 프레임을 기준으로 한다.

## 1. 브랜드

- 서비스명: **멘토리**
- 도메인: 육아용품 커머스 + 커뮤니티 + 체험 연결
- 톤앤매너: 따뜻하고 친근하되 트렌디하고 감각적인 육아 서비스
- 분위기: 콘텐츠 우선(Content-first), 차분한 표면 + 멘토리 틸 액센트

## 2. 컬러

### 2.1 멘토리 브랜드 팔레트

| Role                | Token                | Light                | Usage                                       |
| ------------------- | -------------------- | -------------------- | ------------------------------------------- |
| 배경 (캔버스)        | `--mentory-bg-out`   | `oklch(0.94 0.015 80)` | 외부 캔버스 (시안/스크린샷용)             |
| 배경 (화면 내부)     | `--mentory-bg-in`    | `oklch(0.97 0.012 80)` | 앱 화면 배경                               |
| 프라이머리 (딥 틸)   | `--mentory-primary`  | `#365154`             | 헤더 텍스트, 주요 버튼, 강조 텍스트         |
| 액센트 (브라이트 틸) | `--mentory-accent`   | `#21C7C7`             | 뱃지, 활성 상태, 포인트 CTA                 |
| 액센트 텍스트        | `--mentory-accent-fg`| `#1a7a7a`             | 액센트 배경 위 텍스트                       |
| 액센트 소프트 배경   | `--mentory-accent-bg`| `rgba(33,199,199,.16)`| 태그 알약 배경 등                           |
| 본문 텍스트          | `--mentory-text`     | `#2a2a2a`             | 본문                                        |
| 보조 텍스트          | `--mentory-text-muted`| `#888` / `#999`      | 메타데이터                                  |
| 플레이스홀더         | `--mentory-text-ph`  | `#aaa`                | 입력 필드 placeholder                       |
| 경고/삭제            | `--mentory-destructive` | `#b33`            | 로그아웃 등 파괴 액션                       |

> 디자인 명세의 브랜드 색상은 raw hex로 명시한다. 표준 시맨틱 토큰과의 관계는
> §2.2를 따른다. `lib/theme.ts`의 `BRAND` 상수와 `tailwind.config.js`의
> `brand` 팔레트가 동일한 값의 인라인/유틸 진입점이다.

### 2.2 표준 시맨틱 토큰 (NativeWind / shadcn)

| Role               | Token                 | Light                | Dark                 | Usage                              |
| ------------------ | --------------------- | -------------------- | -------------------- | ---------------------------------- |
| Surface/primary    | `--background`        | `hsl(0 0% 100%)`     | `hsl(0 0% 3.9%)`     | 화면 배경                          |
| Surface/secondary  | `--secondary`         | `hsl(0 0% 96.1%)`    | `hsl(0 0% 14.9%)`    | 그룹 콘텐츠, 아이콘 타일           |
| Surface/elevated   | `--card`, `--popover` | `hsl(0 0% 100%)`     | `hsl(0 0% 3.9%)`     | 카드, 시트, 메뉴                   |
| Text/primary       | `--foreground`        | `hsl(0 0% 3.9%)`     | `hsl(0 0% 98%)`      | 타이틀, 본문                       |
| Text/secondary     | `--muted-foreground`  | `hsl(0 0% 45.1%)`    | `hsl(0 0% 63.9%)`    | 보조 카피, 메타데이터              |
| Border/default     | `--border`            | `hsl(0 0% 89.8%)`    | `hsl(0 0% 14.9%)`    | 디바이더, 외곽선                   |
| Accent/interaction | `--accent`            | `hsl(0 0% 96.1%)`    | `hsl(0 0% 14.9%)`    | pressed, focused                  |
| Primary/action     | `--primary`           | `hsl(0 0% 9%)`       | `hsl(0 0% 98%)`      | 주요 컨트롤, 활성 라벨            |
| Status/destructive | `--destructive`       | `hsl(0 84.2% 60.2%)` | `hsl(0 70.9% 59.4%)` | 파괴 액션                          |

- 멘토리 프라이머리(`#365154`)는 시각적으로 `text-primary`보다 더 차분한 톤이
  필요할 때 사용한다. `text-primary`(거의 검정)와 의미가 다르므로 혼용하지
  않는다.
- React Native 인라인 컬러가 필요한 표면(예: 애니메이션 모달 컨테이너)은
  `lib/theme.ts`의 `nativeBackground` 값을 사용한다.

## 3. 타이포그래피

- 디자인 명세 폰트: **Pretendard** (CDN: `cdn.jsdelivr.net/gh/orioncactus/pretendard`)
- 코드 폰트: 플랫폼 system sans-serif (React Native 기본)
- 디자인 명세 사이즈: 제목 15px / 700, 본문 13–13.5px, 보조 11–11.5px,
  화면 타이틀(헤더) 20px / 800

### 스케일

| Level   | Size | Weight | Usage                          |
| ------- | ---- | ------ | ------------------------------ |
| H1      | 36px | 800    | 페이지 디스플레이              |
| H2      | 30px | 600    | 주요 섹션                      |
| H3      | 24px | 600    | 카드 헤딩                      |
| H4      | 20px | 600    | 시트 타이틀                    |
| Body    | 16px | 400    | 디폴트 본문                    |
| Body/sm | 14px | 400    | 보조 카피                      |
| Caption | 12px | 500    | 라벨, 뱃지, 메타데이터         |

- 본문 텍스트는 12px 이상, 인터랙티브 라벨은 최소 14px.

## 4. Spacing & Layout

모든 간격은 4px 베이스 유닛.

| Token       | Value | Usage                            |
| ----------- | ----: | -------------------------------- |
| `--space-1` |   4px | 타이트 아이콘/라벨               |
| `--space-2` |   8px | 컴팩트 로우                      |
| `--space-3` |  12px | 리스트, 카드 갭                  |
| `--space-4` |  16px | 화면 거터, 카드 패딩             |
| `--space-5` |  20px | 메뉴 로우 패딩, 멘토리 화면 거터 |
| `--space-6` |  24px | 그룹 구분                        |
| `--space-8` |  32px | 섹션 구분                        |

- 멘토리 화면 거터: **20px** (`.dc.html` 기준)
- 풀스크린 시트는 상·하 safe-area 존중
- 메뉴 로우는 16px horizontal / 12px vertical 패딩

## 5. 공통 컴포넌트 패턴

### 5.1 멘토리 패턴

- **플레이스홀더 이미지** (`.stripe`): 대각선 스트라이프 + 테두리 + 얕은 그림자,
  라벨 텍스트로 용도 표시. 실제 이미지 미정인 자리에서 사용.
- **가로 스크롤 섹션** (`.hscroll`): `gap 14–16px`, 스크롤바 숨김. 가로 페이징이
  필요할 땐 `react-native-reanimated-carousel`을 사용한다.
- **카드**: 흰 배경, `border-radius 14–20px`,
  `box-shadow: 0 2px 8px rgba(54,81,84,.06)`
- **알약(pill) 배지/칩**: `border-radius 999px`
- **바텀시트**: 반투명 backdrop + 하단 슬라이드 패널 (24px 상단 라운드). 옵션 선택,
  글쓰기 메뉴 등에 사용. `@gorhom/bottom-sheet` 사용.
- **스티키 헤더**: 반투명 블러 배경, 화면 상단 고정.
- **하단 고정 CTA 바**: 스크롤 최하단 고정 액션 바 (장바구니/구매, 일기쓰기 등).

### 5.2 표준 컴포넌트 (Reusables)

- **Header action**: 40px 터치 타겟의 아이콘 전용 `Button` (`variant="ghost"`)
- **Navigation sheet**: 브랜디드 헤더 + 계정 요약 + 그룹화된 내비 로우 + 옵션 정보 카드.
  spacing 16px 거터, 12px 로우 갭, 24px 그룹 갭.
- **Navigation row**: secondary 아이콘 타일 + 타이틀 + 보조 설명 + 뱃지 + chevron
- **Account summary**: 아바타 + 이름 + 보조 라벨 + chevron (외곽선 카드)

## 6. 내비게이션 원칙

- 검색은 각 탭 헤더에서 전역 접근
- 드릴다운(게시글, 상품, 체험 상세 등)은 오른쪽에서 페이지 전환(push) 방식
- 옵션 선택 등 짧은 액션은 바텀시트로 처리

## 7. Motion & Interaction

| Type     | Duration | Usage                              |
| -------- | -------: | ---------------------------------- |
| Micro    | 100–150ms | 버튼 press feedback               |
| Standard | 180–220ms | 내비게이션 시트 open/close        |

- `transform`과 `opacity`만 애니메이트
- Press feedback은 플랫폼의 active-state 스타일
- 시트는 horizontal translation

## 8. 아이콘

- 커스텀 스타일링한 라인 아이콘 (`stroke 2px`, `round cap/join`)
- 활성 상태는 solid로 전환 (탭바 아이콘 패턴 참고)
- 브랜드 로고는 실제 로고 대신 **색상 배지 + 이니셜**로 대체 표현
  (예: `Avatar` + `AvatarFallback`에 이니셜 텍스트)

## 9. Depth & Surface

**전략: mixed.** 그룹 표면은 톤 시프트 + 단일 border 토큰, 모달 시트는 기존
soft-shadow. 코너는 내부 로우는 타이트하게, 카드/시트는 부드럽게.

## 10. Accessibility

- WCAG 2.2 AA: 본문 4.5:1, 모든 인터랙티브 컨트롤의 web focus state
- 아이콘 전용 컨트롤은 항상 `accessibilityLabel` 부여
- 메뉴 액션은 최소 40px 터치 타겟, native modal 컨트롤로 접근 가능
- 모션은 짧고 패널 전환에만 한정

### Accepted Debt

| Item                                       | Location            | Why accepted                                                                                                       | Owner / Exit                                                         |
| ------------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| No custom reduced-motion branch            | Navigation sheet    | RN 기본 애니메이션이 짧고 비핵심. 시스템 preference hook 미공유.                                                    | 앱 전반에 영구 모션 도입 시 shared preference 추가.                  |
| 멘토리 브랜드 색상 raw hex 사용            | Brand layer         | `.dc.html` 디자인 명세 일치. 시맨틱 토큰만으로는 멘토리 톤을 재현할 수 없어 `BRAND`/`tailwind brand` 레이어로 분리. | 멘토리 전용 시맨틱 토큰 정식 도입 시 CSS variable로 승격 가능.        |