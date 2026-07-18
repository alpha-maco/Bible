# Bible Project Handoff

## Project Purpose

Bible Project Mok is a React + TypeScript + Vite sample web app for exploring Genesis as an interactive genealogy and flow map. The current goal is not to reproduce a static reference image pixel-for-pixel, but to evolve a data-driven Bible genealogy viewer that can be reviewed on desktop and mobile.

## Current Implementation

- Interactive Genesis genealogy/flow page.
- Fixed compact top bar with project title and chapter scope.
- Genealogy nodes rendered on a canvas-style background.
- Clickable nodes open a draggable detail popup.
- Popup can be moved by dragging the top bar.
- Popup closes when clicking non-interactive popup content.
- Related Bible references are shown as a list.
- Clicking a related verse displays the public-domain Korean Genesis text beside the list.
- References embedded in prophetic meaning, such as `창세기 3:15`, can point the current popup to that passage.
- Detail content is grouped into readable sections:
  - 관련 구절
  - 사건 요약
  - 관련 인물·민족·제국
  - 후대 해석·영향
  - 예언적 의미
  - 고대 명칭 ↔ 현대 연결
  - 현재 사건과 연결 가능성
- Related entities are displayed as key/value rows:
  - 관련인물
  - 민족
  - 제국(현재 국가명)

## Main Directories And Files

- `index.html`
  - Vite HTML entry.
  - Browser title: `창세기 전체 계보도 샘플`.
- `src/main.tsx`
  - React root mount.
- `src/App.tsx`
  - App shell, popup selection state, popup placement, and popup drag boundary logic.
- `src/components/GenealogyFlow.tsx`
  - Renders node connection lines and node buttons.
- `src/components/FlowNode.tsx`
  - Individual clickable genealogy node.
- `src/components/DetailPanel.tsx`
  - Draggable popup, related verse browser, detail sections, key/value rendering, and internal reference navigation.
- `src/styles.css`
  - Global layout, genealogy canvas, node styles, popup styles, and responsive rules.
- `src/data/genesis_1_3.ts`
  - Current Genesis genealogy node mock data.
  - Despite the filename, the data now covers Genesis 1-50 at a high-level flow/genealogy level.
- `src/data/bible/open_korean_genesis.ts`
  - Extracted public-domain Korean Genesis 1-50 text used by the app.
- `src/data/bible/open_korean_genesis_1_10.ts`
  - Older extracted Genesis 1-10 file retained for now.
  - Not currently imported by the app.
- `data/original-bible/kor-korean.osis.xml`
  - Original public-domain Korean Bible OSIS source file.
- `data/original-bible/README.md`
  - Source and extraction notes for original Bible data.
- `.gitignore`
  - Excludes local/dependency/build artifacts and environment files.

## Technology Stack

- React 19
- TypeScript 5.8
- Vite 7
- CSS, no UI framework
- Vercel deployment
- Public-domain Korean Bible data from `seven1m/open-bibles`

## Deployment

- Production URL: https://mok-bible.vercel.app
- Vercel project name: `mok-bible`
- Vercel build command: `npm run build`
- Vercel output directory: `dist`
- The local `.vercel/` directory is intentionally ignored and should not be committed.

## Recent Changes

- Expanded Bible text data from Genesis 1-10 to Genesis 1-50.
- Added production Vercel deployment at `https://mok-bible.vercel.app`.
- Fixed Vercel build failure by setting TypeScript `moduleResolution` to `Bundler` and installing React type packages.
- Changed the large header into a compact fixed top bar.
- Reworked the genealogy layout away from a simple timeline toward a family-branch structure.
- Split Noah descendants into separate branches:
  - Seth/Noah/Shem promise line
  - Ham branch with Cush, Mizraim, Canaan, Nimrod, Babel, and Asshur-related empire background
  - Japheth is grouped with the broader non-Ham branch for the current mockup
- Changed `역사적 성취 후보` section label to `후대 해석·영향`.
- Changed `제국` label to `제국(현재 국가명)`.

## Incomplete Work

- The genealogy model is still a curated mock, not a complete biblical genealogy database.
- `src/data/genesis_1_3.ts` should be renamed because it now contains Genesis 1-50 high-level data.
- The layout is still manually positioned with `x` and `y` percentages.
- A real genealogy renderer should use structured parent/child lineage data rather than hand-authored coordinates.
- Shem, Ham, and Japheth descendants need fuller branch modeling.
- The current `셈·야벳 계열` grouping is a temporary simplification.
- Current ancient-to-modern geography values are cautious approximations and need source-backed review before production use.
- The older `src/data/bible/open_korean_genesis_1_10.ts` extraction file is obsolete but retained.
- There is no automated test suite yet.
- There is no GitHub remote connected yet.
- There are no commits yet on local `main`.

## Known Issues And Technical Debt

- Manual SVG line rendering can become visually tangled as nodes increase.
- Popup close behavior can conflict with interactive content unless each interactive section stops event propagation.
- The popup width and fixed positioning may need additional mobile tuning.
- `GenesisNodeId` is currently `string`, which is flexible but less type-safe.
- Some related entity values combine ancient empire names and modern country/region approximations in one string.
- The public-domain Korean text source includes older orthography and punctuation.
- `data/original-bible/kor-korean.osis.xml` is about 5.7 MB; acceptable for source preservation, but future data ingestion should be scripted and documented.
- `node_modules/`, `dist/`, `.vercel/`, TypeScript build info, and emitted config artifacts should never be committed.

## Next Work Order

1. Create a new GitHub repository for this project.
2. Connect local `origin` to the new GitHub repository.
3. Review `PROJECT_HANDOFF.md` and `.gitignore`.
4. After approval, stage, commit, and push the current baseline.
5. Rename `src/data/genesis_1_3.ts` to a Genesis-wide name, such as `src/data/genesis_genealogy.ts`.
6. Replace manual coordinates with a structured lineage model:
   - `parentId`
   - `branch`
   - `lineageGroup`
   - `relationType`
   - `chapterRange`
7. Build or adopt a genealogy layout engine for family-tree branching.
8. Separate Bible text data extraction into a script.
9. Add automated tests for verse reference parsing and popup behavior.
10. Add deployment notes for Codex Cloud/Web continuation.

## Local Run

```powershell
cd E:\DevOps\BibleProject\Mok
npm install
npm run dev
```

Local Vite URL:

```text
http://localhost:5173
```

If PowerShell blocks `npm.ps1`, use:

```powershell
npm.cmd install
npm.cmd run dev
```

## Test And Verification

Current manual verification:

```powershell
cd E:\DevOps\BibleProject\Mok
npm run build
```

Expected result:

- TypeScript build passes.
- Vite creates `dist/`.
- Production deployment uses the same build command.

Recommended future tests:

- Unit test `창세기 n:m` and `창세기 n:m-k` reference parsing.
- Unit test missing verse handling.
- Component test node click -> popup opens.
- Component test embedded reference click -> related verse panel updates.
- Mobile visual check for popup placement and genealogy canvas readability.

## Deploy

Preview deployment:

```powershell
cd E:\DevOps\BibleProject\Mok
vercel deploy
```

Production deployment:

```powershell
cd E:\DevOps\BibleProject\Mok
vercel deploy --prod
```

Production URL:

```text
https://mok-bible.vercel.app
```

## Environment Variables

No runtime environment variables are currently required.

Do not commit secrets. If future integrations need secrets, use Vercel environment variables and keep local `.env` files untracked.

## Security Review

Security scan performed during handoff preparation:

- No `.env` or `.env.*` files found outside ignored dependency/build folders.
- No private key files found outside ignored dependency/build folders.
- No obvious API key/access token/private key/password patterns found in project source/data files outside ignored dependency/build folders.
- `.gitignore` excludes:
  - `.vercel/`
  - `node_modules/`
  - `dist/`
  - `.env`
  - `.env.*`
  - TypeScript build info
  - emitted Vite config artifacts
  - logs and OS/editor noise

## Design Decisions So Far

- Avoid copyrighted Bible translations by default. Use public-domain or clearly open resources unless the user explicitly approves another source.
- Preserve the original Bible source separately under `data/original-bible/`.
- Keep extracted app-ready Bible data under `src/data/bible/`.
- Prefer data-driven genealogy over trying to reproduce a static image exactly.
- Treat Genesis as branching family history, not only a chronological timeline.
- Separate Ham's line visually because it leads to distinct nation/empire background such as Mizraim/Egypt, Canaan, Babel, and Asshur.
- Keep popup details in the current node context instead of stacking multiple popups.
- Use key/value rows for related people, nations, and empires to improve readability.
- Keep Vercel production URL fixed for mobile review.

## GitHub Handoff Status

- Current branch: `main`
- Remote: `origin` -> `https://github.com/alpha-maco/Bible.git`
- Commits: none yet
- Local changes: all project files are currently untracked
- GitHub repository: `alpha-maco/Bible`
- GitHub visibility: public
- GitHub comparison: remote has no branch heads yet, so there is no remote commit to compare against

Connected repository:

```text
https://github.com/alpha-maco/Bible
```

Do not run `git add`, `git commit`, or `git push` until the user approves the prepared state.
