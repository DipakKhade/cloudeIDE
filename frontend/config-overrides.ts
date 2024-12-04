import path from 'path';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export function override(config, env) {
  config.plugins.push(new MonacoWebpackPlugin())
  return config;
}
