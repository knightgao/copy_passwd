# 密码复制助手

一个安全便捷的 Chrome 扩展程序，提供多种密码复制方式，让密码复制更简单、更安全。

## 功能特点

- 支持多种复制方式，适应不同场景
- 兼容所有网站，无需特殊配置
- 安全可靠，不存储任何密码信息
- 优雅的操作反馈，清晰直观
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

插件提供三种便捷的复制方式，您可以根据使用习惯选择：

1. 右键复制
   - 在密码输入框上点击右键
   - 选择"复制密码"选项

2. 双击复制
   - 直接双击密码输入框即可复制

3. 快捷键复制
   - Windows：在密码框中按 Ctrl+C
   - Mac：在密码框中按 Command+C

所有操作都会有清晰的成功/失败提示。

## 隐私说明

我们高度重视用户隐私：
- 不收集任何用户数据
- 不存储任何密码信息
- 所有操作在本地完成
- 无需任何网络权限
- 源代码完全开源

## 权限说明

扩展程序仅需要最小必要的权限：
- `activeTab`: 用于检测当前页面的密码输入框
- `clipboardWrite`: 用于执行复制操作

这些权限仅在必要时使用，不会在后台运行。

## 技术实现

- 使用原生 JavaScript 开发，无外部依赖
- 采用 MutationObserver 实时检测密码框
- 多种复制方案保证最大兼容性：
  - 优先使用现代 Clipboard API
  - 降级使用 execCommand
- 优雅的轻提示反馈机制

## 贡献代码

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 开源协议

本项目采用 MIT 协议开源，详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，欢迎：
1. 提交 [Issue](https://github.com/knightgao/copy_passwd/issues)
2. 给我发邮件（邮箱待添加）

## 致谢

感谢所有贡献者和用户的支持！ 