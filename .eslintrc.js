module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi':['error','always'], // 允许使用分号
    'one-var': 0, // 不限制变量一起声明
    "quotes": [1, "double"], //引号类型
    "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格

    "no-multiple-empty-lines": [0, {"max": 100}], //空行最多不能超过100行
    "no-mixed-spaces-and-tabs": [0],//关闭禁止混用tab和空格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
