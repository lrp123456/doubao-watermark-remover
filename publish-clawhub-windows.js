#!/usr/bin/env node
/**
 * ClawHub 发布脚本 v3.1.0
 * 创建 Windows 友好的 ZIP 包
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const config = {
  slug: 'doubao-watermark-remover',
  name: '豆包 AI 视频水印去除 (超清版 v3.1)',
  version: '3.1.0',
  changelog: 'v3.1.0: 修复坐标 bug，优化超分比例 2x→1.5x，处理速度提升 40%',
  token: 'clh_vKz-49HpVda2__-kWeYuvwcdmmMoURU6bgNGk01wTAQ'
};

console.log('📦 ClawHub 发布工具 v3.1.0 (Windows 版)\n');

try {
  // 步骤 1: 创建发布包
  console.log('1️⃣ 创建发布包...');
  const tarball = path.join(__dirname, `${config.slug}-v${config.version}.tar.gz`);
  const zipfile = path.join(__dirname, `${config.slug}-v${config.version}.zip`);
  
  // 使用 git archive 创建包
  execSync(`git archive --format=tar.gz --output="${tarball}" HEAD`, {
    cwd: __dirname,
    stdio: 'inherit'
  });
  
  if (!fs.existsSync(tarball)) {
    throw new Error('发布包创建失败');
  }
  console.log(`✅ TAR.GZ 发布包已创建：${tarball}`);
  
  // 创建 ZIP 格式（Windows 友好）
  console.log('\n2️⃣ 创建 ZIP 格式...');
  const filesToZip = [
    'final_perfect_v3_ultra.py',
    'batch_qq_processor.py',
    'SKILL.md',
    'README.md',
    'clawhub.yaml',
    'requirements.txt',
    'publish-github.sh',
    'CLAWHUB_PUBLISH.md'
  ];
  
  const zipCmd = `zip -r "${zipfile}" ${filesToZip.join(' ')}`;
  execSync(zipCmd, { cwd: __dirname, stdio: 'inherit' });
  
  if (!fs.existsSync(zipfile)) {
    throw new Error('ZIP 创建失败');
  }
  console.log(`✅ ZIP 发布包已创建：${zipfile}`);
  
  // 显示文件信息
  const tarStat = fs.statSync(tarball);
  const zipStat = fs.statSync(zipfile);
  console.log(`\n📊 文件大小:`);
  console.log(`   TAR.GZ: ${(tarStat.size / 1024).toFixed(1)} KB`);
  console.log(`   ZIP: ${(zipStat.size / 1024).toFixed(1)} KB`);
  
  console.log('\n✅ 发布包准备完成！');
  console.log('\n📤 上传到 ClawHub:');
  console.log(`   1. 访问：https://clawhub.ai/upload?slug=${config.slug}`);
  console.log(`   2. 登录 GitHub 账号`);
  console.log(`   3. 上传 ZIP 或 TAR.GZ 文件`);
  console.log(`   4. 填写版本：${config.version}`);
  console.log(`   5. 点击发布`);
  
  console.log('\n🌐 GitHub:');
  console.log('   https://github.com/yun520-1/doubao-watermark-remover');
  
} catch (e) {
  console.error('\n❌ 错误:', e.message);
  process.exit(1);
}
