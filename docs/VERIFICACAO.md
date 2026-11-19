# Verificação — 19/11/2026

## Executado

- Verificação sintática de `app.js`, `admin.js` e `ui.js` pelo Node.js: sem erros.
- Build estático e portátil, sem dependências de execução: concluído.
- Onze testes automatizados de dados e regras de negócio: onze aprovados, zero falhas.
- Integridade de caminhos locais de imagens de tratamentos, profissionais, resultados, galeria e hero: aprovada.
- 22 tratamentos com IDs e caminhos de imagens próprios.
- Integração e exportação WebP das fotografias, versões menores e recorte mobile do hero.

Os testes cobrem criação conjunta de contato/agendamento, persistência, intervalos conflitantes, horários com profissionais diferentes, liberação por cancelamento, CRUD, restauração, edição de conteúdo, CSV, rejeição de dados inválidos e recuperação diante de armazenamento corrompido.

## Limitações da verificação

A tentativa de prévia HTTP não pôde ser acessada neste ambiente. A revisão pela interface do navegador foi interrompida pela ferramenta porque não conseguiu identificar com segurança a URL atual no Windows. A ferramenta não foi usada novamente após o bloqueio.

Não foi concluída inspeção visual desktop/mobile, navegação real por teclado, console do navegador, teste de todos os botões, medição de contraste automatizada, auditoria Lighthouse ou verificação das nove larguras solicitadas. Os breakpoints, controles de foco, rótulos, mensagens e redução de movimento estão implementados, mas não equivalem a certificação de acessibilidade ou desempenho.

## Conferência manual recomendada

1. Extrair o ZIP e abrir `ABRIR-LUMEA.html`.
2. Testar busca, categorias, detalhes, FAQ, comparador e galeria.
3. Completar avaliação com os dados fictícios de exemplo e uma data válida.
4. Abrir o painel e conferir o contato e o agendamento criados.
5. Editar o hero, um tratamento e uma profissional; voltar ao site.
6. Reagendar, cancelar, mover lead, registrar interação e criar tarefa.
7. Exportar o CSV e restaurar a demonstração.
8. Inspecionar em 320, 360, 390, 430, 768, 1024, 1280 e 1440 px, além de ultrawide, e testar teclado e redução de movimento.

A versão portátil mantém site e painel no mesmo arquivo para compartilhar os registros locais. Se seu navegador bloquear armazenamento de arquivos, use o servidor Node descrito no README.

O bundle portátil também foi compilado isoladamente, sem importações externas de JavaScript; as referências estáticas e as variantes responsivas de imagem foram verificadas.

## Verificação v1.1 — 19/11/2026

- 15 testes automatizados aprovados (4 novos: funcionamento, disponibilidade, backup/restauração, correção de imagens e `.ics`).
- Build portátil verificado por `scripts/check-build.mjs` e aberto via `file://` no Edge.
- No navegador (servidor local): fluxo completo de agendamento, domingo bloqueado, horário ocupado marcado como indisponível após reserva, botão `.ics` e efeito de confirmação, busca "luz" e contagem.
- Capturas em 1440 px (site e painel) e 390 px (site e painel via iframe). Continua pendente: navegação completa por teclado, leitor de tela e Lighthouse.
