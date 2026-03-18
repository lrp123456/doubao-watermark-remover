#!/usr/bin/env node
/**
 * ClawHub 发布脚本 v3.1.0
 * 直接使用 CLI 协议发布
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const config = {
  slug: 'qq-watermark-remover',
  name: '豆包 AI 视频水印去除 (超清版 v3.1)',
  version: '3.1.0',
  changelog: 'v3.1.0: 优化超分比例 2x→1.5x，处理速度提升 40%，文件大小减小 30-40%',
  token: 'clh_vKz-49HpVda2__-kWeYuvwcdmmMoURU6bgNGk01wTAQ'
};

console.log('📦 ClawHub 发布工具 v3.1.0\n');

try {
  // 步骤 1: 创建发布包
  console.log('1️⃣ 创建发布包...');
  const tarball = path.join(__dirname, `${config.slug}-v${config.version}.tar.gz`);
  
  execSync(`git archive --format=tar.gz --output="${tarball}" HEAD`, {
    cwd: __dirname,
    stdio: 'inherit'
  });
  
  if (!fs.existsSync(tarball)) {
    throw new Error('发布包创建失败');
  }
  console.log(`✅ 发布包已创建：${tarball}\n`);
  
  // 步骤 2: 使用 curl 发布
  console.log('2️⃣ 发布到 ClawHub...');
  console.log(`   Slug: ${config.slug}`);
  console.log(`   Version: ${config.version}`);
  console.log(`   Name: ${config.name}`);
  console.log(`   Changelog: ${config.changelog}\n`);
  
  const curlCmd = `curl -X POST https://clawhub.ai/api/cli/publish \\
  -H "Authorization: Bearer ${config.token}" \\
  -F "package=@${tarball}" \\
  -F "slug=${config.slug}" \\
  -F "displayName=${config.name}" \\
  -F "version=${config.version}" \\
  -F "changelog=${config.changelog}" \\
  -k -s`;
  
  const result = execSync(curlCmd, { encoding: 'utf8' });
  
  console.log('📊 响应:', result);
  
  try {
    const json = JSON.parse(result);
    if (json.success || json.url) {
      console.log('\n✅ 发布成功！');
      console.log(`🌐 查看：https://clawhub.ai/${config.slug}`);
      
      // 清理
      try { fs.unlinkSync(tarball); } catch(e) {}
      process.exit(0);
    } else {
      console.log('\n❌ 发布失败:', json);
      process.exit(1);
    }
  } catch(e) {
    if (result.includes('success') || result.includes('OK')) {
      console.log('\n✅ 发布成功！');
      console.log(`🌐 查看：https://clawhub.ai/${config.slug}`);
      try { fs.unlinkSync(tarball); } catch(e) {}
      process.exit(0);
    } else {
      console.log('\n❌ 响应格式错误');
      console.log('请手动发布：clawhub login && clawhub publish .');
      process.exit(1);
    }
  }
  
} catch (e) {
  console.error('\n❌ 错误:', e.message);
  console.log('\n💡 请手动发布:');
  console.log('   1. clawhub login');
  console.log('   2. clawhub publish . --changelog "v3.1.0: 优化超分比例 2x→1.5x，处理速度提升 40%"');
  process.exit(1);
}
