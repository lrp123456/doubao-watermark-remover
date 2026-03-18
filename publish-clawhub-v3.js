const FormData = require('form-data');
const fetch = require('node-fetch').default;
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const agent = new https.Agent({ rejectUnauthorized: false });

// 配置
const config = {
  slug: 'qq-watermark-remover',
  displayName: '豆包 AI 视频水印去除 (超清版 v3.1)',
  version: '3.1.0',
  changelog: 'v3.1.0: 优化超分比例 2x→1.5x，处理速度提升 40%，文件大小减小 30-40%',
  token: 'clh_vKz-49HpVda2__-kWeYuvwcdmmMoURU6bgNGk01wTAQ'
};

// 创建临时 tar.gz 包
const tarball = path.join(__dirname, `../${config.slug}-v${config.version}.tar.gz`);
const exclude = [
  'node_modules',
  '*.log',
  '.git',
  'clean_videos',
  '*.mp4'
];

console.log(`📦 创建发布包 ${config.slug}@v${config.version}...`);

// 使用 git archive 创建干净的包
try {
  execSync(`git archive --format=tar.gz --output=${tarball} HEAD`, { 
    cwd: __dirname,
    stdio: 'inherit' 
  });
  console.log('✅ 发布包创建完成');
} catch (e) {
  console.error('❌ 创建发布包失败:', e.message);
  process.exit(1);
}

// 构建 FormData
const form = new FormData();
form.append('package', fs.createReadStream(tarball));
form.append('slug', config.slug);
form.append('displayName', config.displayName);
form.append('version', config.version);
form.append('changelog', config.changelog);

console.log('\n📤 发布到 ClawHub...');
console.log(`   Slug: ${config.slug}`);
console.log(`   Version: ${config.version}`);
console.log(`   Changelog: ${config.changelog}`);

// 发布
fetch('https://clawhub.ai/api/cli/publish', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${config.token}`,
    ...form.getHeaders()
  },
  body: form,
  agent
}).then(async r => {
  console.log('\nStatus:', r.status);
  const text = await r.text();
  
  try {
    const json = JSON.parse(text);
    if (r.ok) {
      console.log('\n✅ 发布成功！');
      console.log(`🌐 查看：https://clawhub.ai/${config.slug}`);
      console.log('\n响应:', JSON.stringify(json, null, 2));
      
      // 清理临时文件
      try { fs.unlinkSync(tarball); } catch(e) {}
    } else {
      console.log('\n❌ 发布失败');
      console.log('错误:', json);
    }
  } catch(e) {
    console.log('\n响应内容:', text);
    if (r.ok) {
      console.log('✅ 发布成功！');
      console.log(`🌐 查看：https://clawhub.ai/${config.slug}`);
      try { fs.unlinkSync(tarball); } catch(e) {}
    } else {
      console.log('❌ 发布失败');
    }
  }
}).catch(e => {
  console.error('\n❌ 网络错误:', e.message);
  process.exit(1);
});
