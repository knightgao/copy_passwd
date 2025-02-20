# 密码复制助手

一个简单易用的 Chrome 扩展程序，为密码输入框添加右键快捷复制功能。

## 功能特点

- 自动识别页面中的密码输入框
- 提供便捷的右键菜单复制功能
- 支持所有网站，无需配置
- 复制操作安全可靠
- 优雅的轻提示反馈
- 完全开源，代码透明

## 安装方法

### 从 Chrome 网上应用店安装（推荐）

1. 访问 Chrome 网上应用店（链接待添加）
2. 点击"添加到 Chrome"
3. 确认安装

### 手动安装（开发版）

1. 下载本仓库代码
   ```bash
   git clone https://github.com/knightgao/copy_passwd.git
   ```
   或者下载 ZIP 压缩包并解压

2. 打开 Chrome 浏览器，进入扩展程序页面
   - 在地址栏输入：`chrome://extensions/`
   - 或者通过菜单：更多工具 -> 扩展程序

3. 开启"开发者模式"（右上角开关）

4. 点击"加载已解压的扩展程序"

5. 选择项目文件夹

## 使用说明

1. 安装完成后，在任何密码输入框上点击右键
2. 在弹出的菜单中选择"复制密码"选项
3. 复制结果会有优雅的轻提示反馈：
   - 绿色提示：复制成功
   - 红色提示：复制失败或密码为空

## 隐私说明

- 不收集任何用户数据
- 源代码完全开源
- 仅在用户主动右键操作时执行复制
- 不需要任何网络权限
- 所有操作都在本地完成

## 权限说明

- `activeTab`: 用于在当前标签页中检测密码输入框
- `clipboardWrite`: 用于执行复制操作
- 这些权限仅在必要时使用，不会在后台运行

## 技术实现

- 使用原生 JavaScript 开发
- 采用 MutationObserver 监听动态加载的内容
- 支持多种复制方式（Clipboard API 和 execCommand）
- 优雅降级，确保最大兼容性
- 现代化的轻提示反馈机制

## 贡献代码

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，欢迎：
1. 提交 [Issue](https://github.com/knightgao/copy_passwd/issues)
2. 给我发邮件（邮箱待添加）

## 致谢

感谢所有贡献者和用户的支持！ 