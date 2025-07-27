const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const chalk = require("chalk");

class FlutterWebCapture {
  constructor(options = {}) {
    this.options = {
      url: 'http://localhost:8080',
      port: 8080,
      routesFile: 'routes.json',
      outputDir: './captures',
      viewport: { width: 390, height: 844 },
      delay: 3000,
      headless: true,
      ...options
    };
  }

  async loadRoutes() {
    try {
      const routes = JSON.parse(fs.readFileSync(this.options.routesFile, "utf8"));
      console.log(chalk.green(`✅ ${routes.length}개의 라우트 로드됨`));
      routes.forEach(route => console.log(chalk.blue(`  • ${route.path} → ${route.filename}`)));
      return routes;
    } catch (error) {
      throw new Error(`라우트 파일 로드 실패: ${error.message}`);
    }
  }

  async createBrowser() {
    try {
      const browser = await puppeteer.launch({
        headless: this.options.headless,
        args: ["--no-sandbox"]
      });
      console.log(chalk.green("✅ 브라우저 시작됨"));
      return browser;
    } catch (error) {
      throw new Error(`브라우저 시작 실패: ${error.message}`);
    }
  }

  async capturePage(page, route) {
    try {
      const url = `${this.options.url}#${route.path}`;
      console.log(chalk.yellow(`🌐 접근 URL: ${url}`));

      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise(r => setTimeout(r, this.options.delay));

      const screenshotPath = `${this.options.outputDir}/${route.filename}`;
      await page.screenshot({ path: screenshotPath, fullPage: false });

      console.log(chalk.green(`✅ ${route.filename} 캡처 완료`));
      return true;
    } catch (error) {
      console.log(chalk.red(`❌ ${route.path} 캡처 실패: ${error.message}`));
      return false;
    }
  }

  async run() {
    try {
      // 라우트 로드
      const routes = await this.loadRoutes();

      // 브라우저 시작
      const browser = await this.createBrowser();
      const page = await browser.newPage();
      await page.setViewport(this.options.viewport);

      // 출력 디렉토리 생성
      await fs.ensureDir(this.options.outputDir);

      // 각 페이지 캡처
      let successCount = 0;
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        console.log(chalk.blue(`[${i + 1}/${routes.length}] ${route.description} 캡처 중...`));

        const success = await this.capturePage(page, route);
        if (success) successCount++;
      }

      await browser.close();
      console.log(chalk.green(`🎉 캡처 완료! (${successCount}/${routes.length} 성공)`));
      
      return {
        total: routes.length,
        success: successCount,
        failed: routes.length - successCount
      };
    } catch (error) {
      console.log(chalk.red(`❌ 에러: ${error.message}`));
      throw error;
    }
  }
}

// CLI에서 사용할 수 있도록 export
module.exports = {
  FlutterWebCapture,
  run: (options) => {
    const capture = new FlutterWebCapture(options);
    return capture.run();
  }
};

// 직접 실행 시 (기존 동작 유지)
if (require.main === module) {
  const capture = new FlutterWebCapture();
  capture.run().catch(console.error);
}
