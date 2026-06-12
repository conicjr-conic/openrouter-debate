# OpenRouter AI 토론

OpenRouter API를 통해 서로 다른 LLM 두 개를 골라 특정 주제에 대해 토론시키는 웹 앱입니다.
웹 검색 기반의 심층 토론 프롬프트로 양쪽 AI가 최신 데이터를 인용하며 논쟁하고, 마지막에 최종 합의(결론)를 도출합니다.

## 기능

- AI1 / AI2 모델을 드롭다운에서 각각 선택 (자유 조합 가능)
- 1~3 라운드 토론, 라운드마다 서로의 주장을 반박/보완
- OpenRouter `web` 플러그인을 통한 실시간 웹 검색 기반 답변
- 다크 테마 UI + 토론 히스토리 사이드바 (localStorage 저장)

## 선택 가능한 모델

| 모델 | ID | 비용 |
| --- | --- | --- |
| Llama 3.3 70B | `meta-llama/llama-3.3-70b-instruct:free` | 무료⚡ |
| DeepSeek R1 | `deepseek/deepseek-r1:free` | 무료⚡ |
| Gemini 2.0 Flash | `google/gemini-2.0-flash-exp:free` | 무료⚡ |
| Qwen3 235B | `qwen/qwen3-235b-a22b:free` | 무료⚡ |
| Claude Opus 4 | `anthropic/claude-opus-4` | 유료 |
| GPT-4o | `openai/gpt-4o` | 유료 |

> ⚠️ 무료(`:free`) 모델이라도 OpenRouter의 `web` 검색 플러그인을 사용하면 검색 결과 수에 따라 별도 비용이 부과될 수 있습니다. 자세한 내용은 [OpenRouter 웹 검색 가격 정책](https://openrouter.ai/docs)을 참고하세요.

## 구조

```
openrouter-debate/
├── api/
│   └── debate.js   # OpenRouter chat completions 호출 (model, messages, system을 body로 받음)
├── index.html      # UI (모델 선택, 토론 진행, 히스토리)
├── vercel.json
└── README.md
```

## 환경 변수

Vercel 프로젝트 설정 → Environment Variables 에 아래 값을 등록하세요.

| 변수명 | 설명 |
| --- | --- |
| `OPENROUTER_API_KEY` | https://openrouter.ai/keys 에서 발급한 API 키 |

## 로컬에서 실행하기

```bash
npm i -g vercel
vercel dev
```

## 배포

```bash
vercel --prod
```

또는 GitHub 저장소를 Vercel에 연결하면 push 시 자동 배포됩니다.
