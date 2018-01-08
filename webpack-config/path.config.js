const path = require('path');
const Exports = {};

Exports.Root = path.resolve(__dirname, '../');
Exports.Output = path.resolve(Exports.Root, './public');
Exports.Build = path.resolve(Exports.Root, './build');
Exports.Static = path.resolve(Exports.Root, './static');
Exports.Entry = path.resolve(Exports.Root, './webpack-test');
Exports.Dll = path.resolve(Exports.Root, './webpack-config');
Exports.Manifest = path.resolve(Exports.Root, './manifest.json');

//模块别名路径设置
Exports.Style = path.resolve(Exports.Entry, './css');
Exports.Template = path.resolve(Exports.Entry, './component');
Exports.Container = path.resolve(Exports.Entry, './container');
Exports.Router = path.resolve(Exports.Entry, './router');
Exports.Common = path.resolve(Exports.Entry, './common');
Exports.Api = path.resolve(Exports.Entry, './api');
Exports.BaseComponent = path.resolve(Exports.Entry, './baseComponent');
Exports.Reduxd = path.resolve(Exports.Entry, './reduxd');
Exports.HightComponent = path.resolve(Exports.Entry, './hightComponent');

module.exports = Exports;