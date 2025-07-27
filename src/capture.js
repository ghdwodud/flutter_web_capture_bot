const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const chalk = require("chalk");

console.log(chalk.cyan("🤖 Flutter Web Capture Bot 시작..."));

const routes = JSON.parse(fs.readFileSync("routes.json", "utf8"));
console.log(chalk.green(`✅ ${routes.length}개의 라우트 로드됨`));
routes.forEach(route => console.log(chalk.blue(`  • ${route.path} → ${route.filename}`)));

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    
    console.log(chalk.green("✅ 브라우저 시작됨"));
    
    await fs.ensureDir("./captures");
    
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      console.log(chalk.blue(`[${i + 1}/${routes.length}] ${route.description} 캡처 중...`));
      
      try {
        const url = `http://localhost:8080/#${route.path}`;
        console.log(chalk.yellow(`🌐 접근 URL: ${url}`));
        
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
        await new Promise(r => setTimeout(r, 3000));
        
        const screenshotPath = `./captures/${route.filename}`;
        await page.screenshot({ path: screenshotPath, fullPage: false });
        
        console.log(chalk.green(`✅ ${route.filename} 캡처 완료`));
      } catch (error) {
        console.log(chalk.red(`❌ ${route.path} 캡처 실패: ${error.message}`));
      }
    }
    
    await browser.close();
    console.log(chalk.green("🎉 모든 캡처 완료!"));
  } catch (error) {
    console.log(chalk.red(`❌ 에러: ${error.message}`));
  }
})();
