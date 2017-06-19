pwa-news
==

## icon的使用方法

使用 Icon 组件，传入图标名称，最终在页面中输出对应的`<svg>`：

`<icon name="bars"></icon>`

目前在项目中引入`svg`有两种方式：
1. 自带[fontawesome](http://fontawesome.io/icons/)图标，使用时需要在`config/icon.js`中声明。
2. 自定义svg图标，放入`src/assets/svg`文件夹中即可，为了避免命名冲突，使用时图标名称为`前缀+svg文件名`。以上文件夹路径和前缀均可在`config/icon.js`中配置。

## 主题配置

在`config/theme.js`中配置`vuetify`，配置项分为两部分：
1. themeColor 主题颜色
2. materialDesign 包含material的一些基础变量，例如背景色，文字颜色等。另外，vuetify内置了两种material主题(light/dark)，使用`useBuiltInMaterialDesign`可指定，此时会忽略`materialDesign`。

``` js
vuetify: {
    themeColor: {
        primary: '#4DBA87',
        accent: '$blue.accent-2',
        ...
    },
    materialDesign: {
        'bg-color': '#fff',
        'fg-color': '#000',
        ...
    },
    useBuiltInMaterialDesign: 'dark'
}
```

配置完成后，在组件样式中引用这些变量：
* 使用`themeColor`：`background: $theme.primary`
* 使用`materialDesign`：`color: $material-theme.bg-color`

需要注意的是，使用主题相关的变量时，`:`不能够省略，原因是[省略冒号的情况下，stylus编译器无法区分hash和选择器](https://github.com/stylus/stylus/issues/1405)
