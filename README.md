# 实践图谱

独立整理的飞书与金山 WPS 企业协作、AI 业务场景展示网站。

- 纯静态 HTML/CSS/JavaScript，无账号、无数据库。
- 产品 → 行业 → 场景 → 统一格式摘要。
- 支持全站搜索、案例链接分享、手机访问。
- 案例集中于 `data.json`，页面从数据自动生成分类与数量。
- `main` 分支更新后通过 GitHub Actions 发布 GitHub Pages。

## 本地预览

```sh
python3 -m http.server 8765
```

访问 http://localhost:8765 。不要直接双击 HTML，因为浏览器可能阻止本地 JSON 读取。

## 检查

```sh
node tests/validate.mjs
node --check app.js
```

## 内容维护

编辑 `data.json` 对应记录。案例必须保留稳定唯一的 `id`，分类 ID 必须存在。
每条案例填写业务问题 `problem`、三条实践步骤 `steps`、业务价值 `value` 和材料来源 `source`。
`status` 区分实践、试用、演示与方案参考，不将预期指标写成已落地成效。
仓库与网站公开，仅提交经过脱敏、允许公开的内容。原材料和内部资料不存放在此仓库。
