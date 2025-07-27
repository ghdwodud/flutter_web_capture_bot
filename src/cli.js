#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const capture = require('./capture');

program
  .name('flutter-web-capture')
  .description('Flutter Web 앱의 모든 페이지를 자동으로 캡처하는 도구')
  .version('1.0.0');

program
  .command('capture')
  .description('Flutter Web 앱 캡처 실행')
  .option('-u, --url <url>', 'Flutter 앱 URL (기본값: http://localhost:8080)', 'http://localhost:8080')
  .option('-p, --port <port>', '포트 번호 (기본값: 8080)', '8080')
  .option('-r, --routes <file>', '라우트 설정 파일 (기본값: routes.json)', 'routes.json')
  .option('-o, --output <dir>', '출력 디렉토리 (기본값: captures)', 'captures')
  .option('-w, --width <width>', '뷰포트 너비 (기본값: 390)', '390')
  .option('-h, --height <height>', '뷰포트 높이 (기본값: 844)', '844')
  .option('-d, --delay <ms>', '페이지 로딩 대기 시간 (기본값: 3000)', '3000')
  .option('--headless', '헤드리스 모드 (기본값: true)', true)
  .option('--no-headless', '헤드리스 모드 비활성화')
  .action(async (options) => {
    try {
      console.log('🤖 Flutter Web Capture Bot 시작...');
      console.log(`📋 설정:`);
      console.log(`  • URL: ${options.url}`);
      console.log(`  • 포트: ${options.port}`);
      console.log(`  • 라우트 파일: ${options.routes}`);
      console.log(`  • 출력 디렉토리: ${options.output}`);
      console.log(`  • 뷰포트: ${options.width}x${options.height}`);
      console.log(`  • 대기 시간: ${options.delay}ms`);
      console.log(`  • 헤드리스: ${options.headless}`);
      
      await capture.run({
        url: options.url,
        port: options.port,
        routesFile: options.routes,
        outputDir: options.output,
        viewport: {
          width: parseInt(options.width),
          height: parseInt(options.height)
        },
        delay: parseInt(options.delay),
        headless: options.headless
      });
    } catch (error) {
      console.error('❌ 에러:', error.message);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('새로운 프로젝트 초기화')
  .option('-n, --name <name>', '프로젝트 이름')
  .option('-u, --url <url>', '기본 URL')
  .action(async (options) => {
    try {
      const projectName = options.name || 'flutter-web-capture';
      const defaultUrl = options.url || 'http://localhost:8080';
      
      // 기본 설정 파일 생성
      const config = {
        url: defaultUrl,
        port: 8080,
        viewport: {
          width: 390,
          height: 844
        },
        delay: 3000,
        headless: true,
        outputDir: 'captures'
      };
      
      await fs.writeJson('capture-config.json', config, { spaces: 2 });
      console.log('✅ capture-config.json 생성됨');
      
      // 기본 routes.json 생성
      const defaultRoutes = [
        {
          "path": "/",
          "filename": "home.png",
          "description": "홈 페이지"
        }
      ];
      
      await fs.writeJson('routes.json', defaultRoutes, { spaces: 2 });
      console.log('✅ routes.json 생성됨');
      
      console.log('🎉 프로젝트 초기화 완료!');
      console.log('📝 다음 명령어로 캡처를 실행하세요:');
      console.log('   npm start');
      console.log('   또는');
      console.log('   node src/cli.js capture');
      
    } catch (error) {
      console.error('❌ 초기화 실패:', error.message);
      process.exit(1);
    }
  });

program.parse(); 