// functions/_middleware.js
// 저장소 루트의 /functions 폴더에 이 파일을 두면 Cloudflare Pages가 자동으로 인식합니다.
// 모든 HTML 응답의 </head> 바로 앞에 애드센스 스크립트를 자동으로 삽입해줍니다.
// index.html, privacy.html 등 어떤 페이지도 직접 수정할 필요가 없습니다.

const ADSENSE_CLIENT_ID = "ca-pub-여기에본인퍼블리셔ID"; // 본인 값으로 교체

class HeadInjector {
  element(element) {
    element.append(
      `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}" crossorigin="anonymous"></script>`,
      { html: true }
    );
  }
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  return new HTMLRewriter().on("head", new HeadInjector()).transform(response);
}
