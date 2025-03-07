---
draft: false
title: Migrando do esbuild para o rspack em Funções AWS Lambda
description: Guia Prático com AWS SAM e Makefile
date: 07 Mar, 2025
tags:
  - aws
  - nodejs
---

Nos últimos anos, o ecossistema de ferramentas para desenvolvimento em JavaScript e TypeScript tem evoluído rapidamente, oferecendo opções cada vez mais eficientes para construir e otimizar aplicações. Uma dessas ferramentas que tem ganhado destaque é o `rspack` , um bundler moderno baseado em Rust que combina desempenho excepcional com compatibilidade com o Webpack, permitindo aproveitar plugins e configurações já conhecidas no mercado.

Recentemente, ao trabalhar em uma função AWS Lambda utilizando o AWS SAM, decidi migrar o processo de build do `esbuild` para o `rspack`. Essa mudança não foi motivada por limitações do `esbuild` , que continua sendo uma excelente escolha, mas sim pela busca por padronização e flexibilidade em meus projetos.

Neste tutorial, compartilho o passo a passo dessa migração, desde a instalação do `rspack` até a configuração do AWS SAM para utilizar um Makefile personalizado. O objetivo é fornecer um guia prático para quem deseja explorar essa ferramenta em seus próprios projetos, seja para funções Lambda ou outras aplicações baseadas em Node.js.

---

### Substituindo o esbuild pelo rspack

A primeira etapa da migração é substituir o `esbuild` pelo `rspack` no projeto

```bash
yarn add -D @rspack/cli @rspack/core terser-webpack-plugin
yarn remove esbuild
```

Para facilitar o processo de build, adicionaremos um script ao `package.json`. Esse script será responsável por executar o comando de build do `rspack` sempre que necessário:

```json
"scripts": {
    ...
    ...
    "build": "rspack build",
    ...
    ...
  },
```

Com isso, você poderá rodar `yarn build` para gerar o bundle da função Lambda diretamente a partir do terminal, simplificando o fluxo de trabalho.

---

### Configurando o rspack

O próximo passo é criar o arquivo de configuração do `rspack`, o `rspack.config.cjs`. Esse arquivo define como o código será empacotado, incluindo entradas, saídas, regras de processamento e otimizações.

```js
const path = require('path');
const minify = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './app.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'builtin:swc-loader',
                options: {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                        },
                    },
                },
                type: 'javascript/auto',
            },
        ],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'commonjs',
        }
    },
    optimization: {
        minimize: true,
        minimizer: [new minify()],
    }
};
```

---

### Atualizando o AWS SAM

No arquivo `template.yaml` do AWS SAM, precisamos ajustar a configuração da função Lambda para usar um Makefile personalizado em vez do `esbuild`. Isso nos dá maior controle sobre o processo de build.

```diff
Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
-      CodeUri: hello-world/
+      CodeUri: src/ # deve apontar para o diretório do Makefile
      Handler: app.lambdaHandler
      Runtime: nodejs20.x
      Architectures:
      - x86_64
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /increment
            Method: post
    Metadata:
+      BuildMethod: makefile  
-      BuildMethod: esbuild
-      BuildProperties:
-        Minify: true
-        Target: es2020
-        Sourcemap: true
-        EntryPoints:
-        - app.ts
```

---

### Criando o Makefile

Finalmente, criamos um `Makefile` para definir o processo de build. O Makefile é uma ferramenta que permite automatizar tarefas, como instalação de dependências, execução de scripts e cópia de arquivos.

```Makefile
build-VisitCounterFunction:
	yarn install --force && yarn build
	cp dist/app.js $(ARTIFACTS_DIR) # variável gerida pelo AWS SAM
```

