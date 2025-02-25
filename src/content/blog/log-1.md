---
draft: false
title: log 1
description: resumo do que eu aprendi hoje
date: 05 Jan, 2025
tags:
  - log
  - data-structures
---

segui o livro Learn Rust With Entirely Too Many Linked Lists, terminei o capitulo 3 mas ao final decidi revisar o 2, algumas coisas ainda não estavam muito claras, senti que passei muito rápido por elas

o primeiro ponto foi sobre a [implementação do autor](https://rust-unofficial.github.io/too-many-lists/first-drop.html) para a trait `Drop`, eu havia entendido que ela foi feita daquela forma para evitar problemas na call stack quando uma lista com muitos itens saísse de escopo, mas eu precisava de um desenho no Excalidraw pra absorver melhor a implementação.

![drop_trait_linked_list.excalidraw.png](https://github.com/user-attachments/assets/4a2e9c23-836b-47ea-8e27-4cbc5fe86c0d)

Outro ponto foi que apesar de saber que essa implementação servia para evitar o stack overflow, diferente dos demais implementos ate aquele capitulo, para esse não houve uma demonstração de qual problema ele resolvia, tudo ficou bem mais claro quando eu comentei todo o `impl Drop` e criei uma linked list com 1 milhão de itens:

```rust
// https://github.com/bheisler/criterion.rs

fn benchmark_list_push_small(c: &mut Criterion) {
    let mut group = c.benchmark_group("1million_nodes_group");

    group.throughput(Throughput::Elements(1_000_000));
    group.bench_function("drop_1million", |b| {
        b.iter(|| {
            let mut list = List::new();
            for i in 0..1_000_000 {
                list.push(i);
            }
            //list dropped here
        });
    });

    group.finish();
}
```

```bash
 Running benches\criterion.rs (target\release\deps\criterion-4f47d19cc837ada1.exe)
Gnuplot not found or not usable, using plotters backend
`gnuplot --version` returned an unparseable version string: gnuplot 6.1 last modified 2024-12-07

Benchmarking 1million_nodes_group/drop_1million: Warming up for 3.0000 s
thread 'main' has overflowed its stack
```

acredito que foi um ponto que faltou no livro, seria bem melhor cair no problema e mostrar ao leitor como corrigi-lo do que corrigir de antemão e ficar por isso mesmo.

por fim ainda queria ver como a versão presente no livro se sairia em um benchmark contra a API presente na linguagem. Mesmo Rust tendo uma API propria de `LinkedList`, decidi fazer o benchmark direto contra o `Vec`, até porque na própria doc do `LinkedList` do std, é dito que o preferível seria usar o `Vec` que provavelmente deve atender a maioria dos casos. De qualquer forma, tenho quase certeza que independente do adversário, a surra seria a mesma 💀

os prints abaixo são os reports gerados pelo Criterion, usando o mesmo benchmark que coloquei mais acima para a questão do `Drop`.

pro `Vec`, os gráficos se mostraram bem mais estáveis e com tempos de execução com menos variações
![Captura de tela 2025-01-05 005428.png](https://github.com/user-attachments/assets/cab5c4aa-a841-41d3-aa80-91b97e3138ff)

enquanto isso, o `List` do livro esteve respirando por aparelhos
![Captura de tela 2025-01-05 005502.png](https://github.com/user-attachments/assets/c3c9ed43-1922-4380-b706-04d1af8d2b9f)

ChatGPT mandando a real sobre tudo isso
![Captura de tela 2025-01-05 005116.png](https://github.com/user-attachments/assets/2c3dacb5-045f-4a38-bd0b-9dfcdf624684)
