const { existsSync } = require('fs');
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const webpack = require("webpack")

let publicPath = 'public';
let viewsPath = 'views';

function build(name, node = true) {
  return new Promise((resolve, reject) => {

    // Setup webpack
    const defaultOptions = {
      mode: process.env.NODE_ENV || "production",
      entry: path.resolve(__dirname, 'src', viewsPath, name),
      output: {
        path: path.resolve(__dirname, publicPath),
        filename: name + '.js',
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    };

    // Compile module as browser app
    let options;
    if (!node) {
      options = {
        ...defaultOptions,
        output: {
          ...defaultOptions.output,
          publicPath: '/' + publicPath
        }
      }
    } else {
      options = {
        ...defaultOptions,
        target: 'node',
        output: {
          ...defaultOptions.output,
          libraryTarget: 'commonjs2'
        }
      }
    }
    
    // Ready to compile
    const compiler = webpack(options);
    compiler.run((err, stats) => {
      if (err) console.log(err);
      //console.log(stats.toJson());
      resolve();
    });
  });
}

async function render(ModuleName, props) {
  await build(ModuleName);
  let html = await renderComponent(ModuleName, props);
  let clientScript = '';
  const ModuleMountName = ModuleName + 'Mount';
  const filename = path.resolve(__dirname, 'src', viewsPath, ModuleMountName + '.js');
  console.log(filename);
  if (existsSync(filename)) {
    clientScript = ModuleMountName + '.js';
    await build(ModuleMountName, false);
  }
  return { html, clientScript }
}

function renderComponent(ModuleName, props) {
  const Component = require(path.resolve(__dirname, publicPath, ModuleName + '.js'))
  return  ReactDOMServer.renderToStaticMarkup(React.createElement(Component.default, props));
}

module.exports = {
  build,
  render,
  renderComponent,
  setPublicPath: pathname => publicPath = pathname,
  setViewsPath: pathname => viewsPath = pathname,
  setWatch: w => watch = w
}