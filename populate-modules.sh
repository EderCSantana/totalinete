#!/bin/bash

declare -A linters=(
  [c]="norminette"
  [cpp]="clang-tidy"
  [csharp]="dotnet format"
  [go]="golint"
  [java]="checkstyle"
  [javascript]="eslint"
  [php]="phpcs"
  [python]="flake8"
  [r]="lintr"
  [rust]="clippy"
  [lua]="luacheck"
  [bash]="shellcheck"
)

declare -A formatters=(
  [c]="clang-format -i"
  [cpp]="clang-format -i"
  [csharp]="dotnet format"
  [go]="gofmt -w"
  [java]="google-java-format -i"
  [javascript]="prettier --write"
  [php]="php-cs-fixer fix"
  [python]="black"
  [r]="Rscript -e \"styler::style_file('%s')\""
  [rust]="rustfmt"
  [lua]="stylua"
  [bash]="shfmt -w"
)

echo "Populando arquivos de linter..."
for lang in "${!linters[@]}"; do
  file="src/linters/${lang}.ts"
  command="${linters[$lang]}"
  cat > "$file" <<EOF
import * as cp from 'child_process';

export function lint${lang^}(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec('${command} ' + filePath, (err, stdout, stderr) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
EOF
done

echo "Populando arquivos de formatador..."
for lang in "${!formatters[@]}"; do
  file="src/formatters/${lang}.ts"
  command="${formatters[$lang]}"
  cat > "$file" <<EOF
import * as cp from 'child_process';

export function format${lang^}(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec('${command} ' + filePath, (err, stdout, stderr) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
EOF
done

# Extras: Norminette e Object Calisthenics
cat > src/linters/norminette.ts <<EOF
import * as cp from 'child_process';

export function runNorminette(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec('norminette ' + filePath, (err, stdout, stderr) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
EOF

cat > src/linters/objectCalisthenics.ts <<EOF
import * as cp from 'child_process';

export function runObjectCalisthenics(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Exemplo com Java: checkstyle com regras customizadas
    cp.exec('checkstyle -c /path/to/object-calisthenics.xml ' + filePath, (err, stdout, stderr) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
EOF

echo "✅ Linters e formatadores gerados com sucesso!"
