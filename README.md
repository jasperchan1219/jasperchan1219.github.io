# Jasper Cheng-Yen Chan — academic website

這是現有研究網站的 GitHub Pages 移轉版。文字、圖片與版面保留目前網站的內容。

## 第一次上線

1. 在自己的 GitHub 帳號建立 **Public** repository。若希望網址是 `https://你的帳號.github.io/`，repository 名稱必須是 `你的帳號.github.io`。若此名稱已有網站，請先確認再使用，避免覆蓋現有內容；也可以改用 `jasper-academic-site`，網址會是 `https://你的帳號.github.io/jasper-academic-site/`。
2. 將本資料夾的檔案上傳到 repository 根目錄，並確認 `.github/workflows/pages.yml` 也有上傳。不要把整個資料夾多包一層。
3. 開啟 repository 的 **Settings → Pages → Build and deployment → Source**，選擇 **GitHub Actions**。
4. 在 **Actions → Publish academic website → Run workflow** 執行第一次發布。如果設定前已有自動執行失敗，設定後重新執行即可。
5. 等工作成功後，**Settings → Pages** 會提供正式網站連結。

## 修改網站文字

1. 在 repository 開啟 `content.json`。
2. 點鉛筆圖示 **Edit this file**。
3. 搜尋你想修改的原文，只改冒號右邊雙引號內的內容。
4. 點 **Commit changes**，提交至 `main`。
5. 在 **Actions** 確認發布成功，再重新整理網站。

你不需要修改 `_templates/page.html` 或 `scripts/build.mjs`，就可以更新現有內容。

| 要修改的內容 | content.json 的位置 |
| --- | --- |
| 姓名、職稱、自介、申請年度 | `homepage` |
| 電子郵件、頁籤標題、頁尾 | `site` |
| 研究標題、說明、圖片和圖說 | `research` |
| 早期研究與專案 | `earlier_work` |
| 論文、投稿狀態、研討會與碩論 | `publications` |
| 學歷、工作、獎項和研究興趣 | `background` |
| 聯絡區塊 | `contact` |

publication 的標題欄位是 `pub_title`、`pub_title_2` 等；相同編號的 `pub_meta` 是作者和狀態。例如 `pub_title` 搭配 `pub_meta`，`pub_title_2` 搭配 `pub_meta_2`。改狀態時可直接搜尋原本的狀態句子。

### 文字格式

- 粗體：`**文字**`
- 斜體：`*文字*`
- 連結：`[顯示文字](https://example.com)`
- 換行：在 JSON 字串內使用 `\n`。
- 如果內容包含英文雙引號，要寫成 `\"`；通常用中文引號「」或彎引號 “ ” 更方便。
- 保留原本的雙引號、逗號和大括號，欄位名稱不要更改。

如果格式錯誤或找不到圖片，發布會停止，先前成功發布的網站會繼續顯示。到 Actions 查看錯誤、修正後再次提交即可。

## 替換圖片

1. 在 GitHub 的 `assets` 資料夾使用 **Add file → Upload files** 上傳新圖片，檔名建議用英文、數字和連字號，例如 `new-flight.png`。
2. 在 `content.json` 找到該研究的 `image_path` 或 `image_path_2`，改為 `assets/new-flight.png`。
3. 同時更新對應的 `image_alt`（圖片描述）和 `caption`（圖說）。
4. 提交變更，等待 Actions 成功。

支援 PNG、JPEG、WebP、GIF。保持未發表研究的原則：上傳適合公開的圖片；此套件沒有加入未發表論文 PDF。

## 本機預覽（可選）

電腦已安裝 Node.js 時，在本資料夾執行：

```sh
node scripts/build.mjs
```

接著用瀏覽器開啟 `_site/index.html`。不需要安裝任何額外套件。

## 結構

- `content.json`：日常編輯的內容。
- `assets/`：網站圖片。
- `_templates/page.html`：版面模板。
- `scripts/build.mjs`：把內容填入版面並檢查圖片。
- `.github/workflows/pages.yml`：提交變更後自動建置與發布。

目前編輯檔支援修改既有項目；若要新增研究或論文項目，需要同時擴充模板，或請協助者處理。圖片路徑採相對路徑，可在個人首頁與專案型 Pages 網址使用。

官方說明：
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files
