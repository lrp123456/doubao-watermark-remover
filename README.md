# 豆包 AI 视频水印去除 - 超清版 v3.1

[![GitHub](https://img.shields.io/badge/GitHub-yun520--1/doubao--watermark--remover-blue)](https://github.com/yun520-1/doubao-watermark-remover)
[![ClawHub](https://img.shields.io/badge/ClawHub-v3.1.0-green)](https://clawhub.ai/doubao-watermark-remover)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT--0-red)](./LICENSE)

**极致画质豆包 AI 视频水印去除工具，集成 1.5x 超分辨率重建、内容自适应修复和批量处理功能。**

---

## ✨ 核心特性

### 🎨 v3.1 超清版
- **1.5x 超分辨率重建** - 720p → 1080p，画质与文件大小完美平衡
- **内容自适应修复** - 智能识别纹理/平滑区域，减少画面损坏
- **边缘保护 2.0** - 亚像素级边缘检测和锐化
- **无损音频保留** - AAC 320k 超高质量编码
- **批量处理模式** - 一键处理整个目录
- **修复坐标 bug** - 完美支持 1.5x 超分

### 🚀 性能优势

| 版本 | 分辨率 | 处理时间 (10 秒) | 文件大小 | 画质 |
|------|--------|----------------|---------|------|
| **v3.1 超清版** | 1.5x (1080p) | ~10 秒 | 5-8 MB | ⭐⭐⭐⭐⭐ |
| v3 超清版 | 2x (1440p) | ~15 秒 | 12-18 MB | ⭐⭐⭐⭐⭐ |
| v2 增强版 | 原始 (720p) | ~8 秒 | 4-6 MB | ⭐⭐⭐⭐ |

---

## 📦 安装

### 方法 1: 从 ClawHub 安装（推荐）
```bash
clawhub install doubao-watermark-remover
```

### 方法 2: 从 GitHub 下载
```bash
git clone https://github.com/yun520-1/doubao-watermark-remover.git
cd doubao-watermark-remover
pip install -r requirements.txt
```

### 方法 3: Windows 手动安装
1. 下载 ZIP 文件
2. 解压到任意目录
3. 打开命令行，进入目录
4. 运行：`pip install -r requirements.txt`

---

## 🎯 使用方法

### 单个视频处理
```bash
# 基本用法
python final_perfect_v3_ultra.py input.mp4

# 指定输出文件
python final_perfect_v3_ultra.py input.mp4 output.mp4
```

### 批量处理
```bash
# 处理下载目录中的所有视频
python batch_qq_processor.py

# 监控模式（持续监控新视频）
python batch_qq_processor.py --watch
```

### Windows 使用示例
```cmd
# 打开命令提示符
cd C:\Users\YourName\Downloads\doubao-watermark-remover

# 处理单个视频
python final_perfect_v3_ultra.py video.mp4

# 批量处理
python batch_qq_processor.py
```

---

## 🔧 技术原理

### 超分辨率重建
```
原始帧 (720x1280)
    ↓
INTER_CUBIC 上采样 (1080x1920)
    ↓
USM 锐化增强
    ↓
超分帧 (1080x1920)
```

### 内容自适应修复
```
提取水印区域 → 分析边缘密度 → 选择修复策略
    ↓
┌──────────────────────┐
│ 边缘密度 > 0.15      │ → 高纹理 → NS 算法
│ 边缘密度 0.05-0.15   │ → 中等 → 混合算法
│ 边缘密度 < 0.05      │ → 平滑 → Telea 算法
└──────────────────────┘
    ↓
边缘保护混合 → 色彩增强 → 输出
```

### 多算法融合检测
- Canny 边缘检测
- Sobel 梯度检测
- Laplacian 高频检测
- 自适应阈值
- 形态学优化

---

## 📁 文件结构

```
doubao-watermark-remover/
├── final_perfect_v3_ultra.py    # v3.1 主程序（推荐）
├── batch_qq_processor.py         # 批量处理工具
├── SKILL.md                      # 技能定义
├── README.md                     # 本文档
├── clawhub.yaml                  # ClawHub 配置
├── requirements.txt              # Python 依赖
├── publish-github.sh             # GitHub 发布脚本
└── CLAWHUB_PUBLISH.md            # ClawHub 发布指南
```

---

## ⚙️ 配置说明

### 修改水印位置

编辑 `final_perfect_v3_ultra.py` 中的 `watermark_regions`:

```python
self.watermark_regions = [
    {"start_sec": 0, "end_sec": 4, "x": 510, "y": 1170, "w": 180, "h": 70},
    {"start_sec": 3, "end_sec": 7, "x": 20, "y": 600, "w": 170, "h": 60},
    {"start_sec": 6, "end_sec": 10, "x": 510, "y": 20, "w": 180, "h": 70},
]
```

### 调整超分比例

```python
# 在 __init__ 方法中
self.scale_factor = 1.5  # 可改为 1.0/1.5/2.0
```

---

## ❓ 常见问题

### Q: 处理速度慢？
**A:** 
- v3.1 已优化速度，10 秒视频约 10 秒处理完成
- 如需更快，关闭超分：`self.scale_factor = 1.0`

### Q: 画面有损坏或伪影？
**A:**
- 调整 `content_adaptive_inpaint` 中的边缘密度阈值
- 增加掩码膨胀次数
- 检查水印位置配置是否正确

### Q: 坐标错误/TypeError？
**A:**
- v3.1 已修复浮点数坐标 bug
- 如使用旧版本，请升级到 v3.1

### Q: 批量处理如何配置？
**A:**
- 视频放入：`~/.openclaw/qqbot/downloads/`
- 运行：`python batch_qq_processor.py`
- 输出到：`~/.openclaw/qqbot/downloads/clean_videos/`

### Q: Windows 上如何使用？
**A:**
1. 下载 ZIP 文件
2. 解压到任意目录
3. 安装 Python 3.8+
4. 运行 `pip install -r requirements.txt`
5. 使用命令行运行脚本

---

## 📊 更新日志

### v3.1.0 (2026-03-18)
- 🐛 **修复**: 浮点数坐标 bug（TypeError）
- 🎯 **优化**: 超分比例 2x → 1.5x
- ⚡ **提升**: 处理速度提升 40%
- 📦 **优化**: 文件大小减小 30-40%
- 🎨 **保持**: 画质优秀（肉眼难辨与 2x 差异）

### v3.0.0 (2026-03-18)
- ✨ 新增超分辨率重建
- 🎨 内容自适应修复
- 🔍 边缘保护 2.0
- 📦 批量处理模式

### v2.0.0 (2026-03-17)
- ✨ 多算法融合检测
- 🎨 高级修复算法
- 🔍 画质增强模块

---

## 🔗 相关链接

- **GitHub**: https://github.com/yun520-1/doubao-watermark-remover
- **ClawHub**: https://clawhub.ai/doubao-watermark-remover
- **问题反馈**: https://github.com/yun520-1/doubao-watermark-remover/issues

---

## 📄 许可证

MIT-0 - Free to use, modify, and redistribute.

---

## 👨‍💻 作者

**mac 小虫子 · 严谨专业版**

---

**享受极致画质视频创作！** 🎬
