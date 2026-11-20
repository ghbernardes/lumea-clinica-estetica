# LUMÉA — Clínica de Estética Avançada

Demonstração comercial da Gustavo Bernardes Digital. Site editorial e painel local, sem publicação externa, cobrança, API, login real ou dados clínicos.

## Abrir sem instalar

1. Extraia o ZIP inteiro, mantendo as pastas.
2. Abra **ABRIR-LUMEA.html** para visitar o site.
3. Use **Conhecer o painel**, ou abra **ABRIR-PAINEL.html**.

A versão portátil usa o mesmo arquivo `dist/index.html` para site e painel (`#painel`), para compartilhar o armazenamento no mesmo navegador. Não abra os arquivos diretamente dentro do ZIP. Se o navegador restringir armazenamento de arquivos locais, use o servidor abaixo. Os dados não sincronizam entre navegadores, computadores ou dispositivos.

## Trabalhar no código

Requer Node.js 20 ou superior. A aplicação não precisa de dependências npm.

```sh
npm run dev
```

Abra `http://127.0.0.1:4287` e `/admin.html`. Para uma porta diferente, defina `PORT` no seu ambiente. O servidor escuta somente a interface local.

```sh
npm run build
npm test
```

O build gera a pasta estática `dist/`, incluindo a versão portátil. Execute novamente depois de editar os fontes. Não existe deploy automático.

## Funcionalidades

- Site com narrativa institucional, 22 tratamentos, busca e categorias, detalhes, três especialistas, galeria, artigos e FAQ pesquisável.
- Avaliação em seis passos: objetivo, região, experiência, período, dados fictícios e revisão. A confirmação cria lead e solicitação na agenda em uma única gravação.
- Prevenção de sobreposição por profissional, respeitando o intervalo configurado. Cancelamentos e faltas liberam o horário.
- Comparador de imagens com mouse, toque e teclado. Conteúdo sintético identificado como ilustração.
- Depoimentos fictícios com controles manuais e galeria navegável.
- Painel com indicadores calculados, agenda diária/semanal/mensal, funil e lista de leads, arraste de cartões e seletor acessível de etapas.
- Cadastros comerciais de clientes, tratamentos, profissionais, pacotes, resultados, depoimentos, campanhas, artigos e FAQ.
- Histórico comercial de interações, tarefa de retorno, segmentação de recuperação por tempo, mensagens editáveis com cópia e abertura manual.
- Configuração de títulos e textos da home, cor, contatos, horários, política de cancelamento e intervalo da agenda.
- Relatórios por período, distribuição por origem/tratamento/status e exportação CSV. Restauração dos dados iniciais com confirmação.
- Dados persistidos em `localStorage`, com atualização entre abas na mesma origem. Sem senha demonstrativa: o painel abre diretamente e está claramente identificado como local.

## Estrutura

- `src/data/seed.js`: identidade, dados fictícios e conteúdo inicial.
- `src/services/repository.js`: leitura, gravação, CRUD, regras da agenda e CSV; ponto de substituição por API.
- `src/app.js`: site e fluxo de avaliação.
- `src/admin.js`: módulos de gestão e formulários.
- `src/ui.js`: imagens responsivas, modais, foco, escape de HTML e mensagens.
- `src/styles/`: tokens e estilos do site e painel.
- `public/images/`: WebP, versões menores e recorte mobile do hero.
- `public/icons/`: símbolo e variações consistentes da marca, em SVG.
- `assets-originals/`: imagens sintéticas originais utilizadas na composição dos ativos.
- `tests/`: verificações de regras de negócio e integridade dos ativos.
- `docs/`: decisões, limites e relatório de verificação.

## Personalizar para um cliente

Comece pelo conteúdo em `seed.js`; personalize textos, profissionais, tratamentos, contatos e imagens. Restaure os dados da demonstração para recarregar o seed em um navegador já usado. O painel permite editar os principais dados sem tocar no código. Arquivos de imagem podem usar caminhos relativos em `public/images/` ou URLs HTTPS.

Antes de uma operação real, implemente autenticação e permissões, API e banco, regras reais de disponibilidade, tratamento de concorrência e fuso horário, política de privacidade apropriada e revisão profissional dos conteúdos. Substitua todas as pessoas, fotos sintéticas, relatos e endereços fictícios. O armazenamento atual é comercial e não deve receber prontuários ou dados de saúde.

## Limites importantes

A clínica, profissionais, relatos, períodos e resultados são fictícios. O sistema não presta orientação médica, não confirma atendimento real e não processa pagamento. Os artigos são ilustrativos e não substituem orientação profissional.

Campanhas são cadastradas como demonstração de gestão; não têm motor de disparos ou rastreamento. Mensagens automáticas são apenas modelos editáveis. O relatório CSV exporta os registros de agendamentos do período; os outros indicadores permanecem no painel.

As fontes Google são uma melhoria opcional; sem rede o site usa Georgia e Arial. A interface não depende delas para funcionar. Não há auditoria Lighthouse nem validação visual em navegador concluída neste ambiente; consulte o relatório de testes. As fotografias de tratamentos são ilustrações editoriais e não documentação clínica dos procedimentos.

O projeto não foi publicado. `robots.txt` bloqueia indexação durante a demonstração. Na publicação real autorizada, configure domínio, metadados absolutos, sitemap e política de indexação adequados.

## Versão 1.1 (19/11/2026)

- Agendamento mostra só horários livres por profissional, data e período. Domingo fechado, sábado só de manhã, horários já passados de hoje ficam indisponíveis. A regra também vale em `book()`.
- Confirmação com botão **Adicionar à minha agenda** (arquivo `.ics`) e brilho champanhe discreto.
- Busca de tratamentos ignora acentos, procura também no resumo e na categoria e mostra a contagem de resultados.
- Depoimentos trocam sozinhos a cada 7 s, com pausa ao passar o mouse, ao focar ou com a aba oculta, e indicadores clicáveis.
- Menu destaca a seção visível. Parallax leve no hero. O comparador antes/depois faz uma demonstração do arraste ao aparecer na tela.
- Painel: saudação pelo horário, números que sobem nos indicadores, atalho `/` para a busca, **backup e importação** de todos os dados em JSON (Configurações).
- Correções: ☰ aparecia no desktop; selo do hero cortado pelo arco; cinco fotos de tratamento trocadas para combinar com o nome (Radiofrequência, Laser, Luz pulsada, Depilação a laser, Gordura localizada). Navegadores já usados recebem a correção automaticamente.
- Tudo continua sem dependências; movimentos respeitam `prefers-reduced-motion`.
- Observação: `result2-before/after` são cópias do primeiro resultado (fonte única). Fica oculto até existir um segundo par de imagens.

## Versão 2.0 (19/11/2026): redesign editorial

- Nova estrutura focada em clínica estética: abertura com monograma, hero com próxima avaliação livre real, faixa de tratamentos, manifesto, áreas de cuidado expansíveis, tratamentos com filtro animado, jornada em 4 etapas, resultados, especialistas, galeria deslizável, depoimentos, artigos, FAQ e CTA final.
- Animações com GSAP 3.15 (ScrollTrigger, SplitText, Flip) em `public/vendor/gsap/`, sem CDN, para funcionar também offline. Código em `src/motion.js`. Sem GSAP ou com `prefers-reduced-motion`, o site aparece completo e parado; se o motor falhar, o site continua funcionando.
- Estilos separados: `src/styles/site.css` (base compartilhada com o painel) e `src/styles/home.css` (site público).
- Imagens novas em `public/images/tratamentos/` e `public/images/jornada/` com reserva automática para as antigas (`imageFallback` em `seed.js`). Prompt para gerar as fotos: `docs/PROMPT-IMAGENS-GPT.md`.
- Parâmetros de teste: `?semintro` pula a abertura; `?semraf` simula quadros de animação em abas ocultas.
- Correção: o padrão do campo de WhatsApp era uma expressão regular inválida nos navegadores atuais.

## Versão 3.0 (20/11/2026): identidade própria

- Nova direção visual, documentada em `docs/DESIGN.md`: linho e areia, Cormorant Garamond com itálico + Manrope, cantos de 24 px, pílulas.
- Hero com rosto em "contato visual", marcadores de leitura de pele, números e próxima avaliação livre.
- Cardápio de cuidados em colunas sobre foto, com troca de fundo ao passar o mouse e busca que esmaece o que não combina.
- Jornada com imagem fixa e etapas, manifesto com etiquetas flutuantes, seis compromissos numerados, resultados lado a lado, especialistas com pílulas, FAQ com coluna fixa e fechamento em cartão vinho.
- `scripts/crop-image.ps1` recorta imagens-fonte em JPEG (usa o .NET do Windows, sem dependências).

## Versão 3.1 (20/11/2026): mapa do rosto 2.0 e painel mais útil

Site:
- **Mapa do rosto 2.0:** linha de varredura revela uma malha de pontos que se liga; cinco áreas clicáveis (Testa e textura, Olhar, Tom e manchas, Hidratação e viço, Contorno e firmeza). Cada área abre um card com lente de aumento sobre a foto, explicação, cuidados indicados (abrem o detalhe) e "Agendar com este foco". As áreas se alternam sozinhas até a pessoa interagir, e uma varredura leve se repete a cada 9 s enquanto o hero está visível.
- **Minha lista:** coração em cada cuidado e no detalhe; o coração "voa" até o botão "Minha lista", que mostra os itens e agenda com a lista anexada.
- **Aberto agora / Fechado** ao vivo no cabeçalho e no rodapé, com as mesmas regras da agenda.
- O agendamento leva o foco do rosto e a lista para o lead e para a observação do agendamento.
- Animações extras: traço desenhado nos rótulos das seções e inclinação 3D nos cartões de compromisso e nas fotos das especialistas (só com mouse).

Painel:
- **Busca rápida (Ctrl+K ou botão "Buscar"):** módulos, leads, clientes, agendamentos, tratamentos, profissionais e ações (novo agendamento, novo lead, baixar backup), com navegação por setas.
- **Ações rápidas na agenda:** Confirmar, Realizado e Faltou direto no cartão (a confirmação checa conflito de horário).
- **Visão geral:** gráfico dos próximos 7 dias (clicar abre a agenda do dia) e "Vindo do site", com os focos do mapa do rosto e as listas de interesse.
- **Novidades:** selo "N novos" em Leads para solicitações que chegaram desde a última visita.
- Cartões de lead (lista e funil) mostram foco e lista.

Imagens: `docs/PROMPT-IMAGENS-GPT.md` agora é um prompt único com as 42 imagens, incluindo `hero-face-v2.jpg` com enquadramento medido para o mapa do rosto.

## Versão 3.2 (20/11/2026): fotografias definitivas

- 41 fotografias definitivas (com versão leve) + imagem de compartilhamento, geradas pelo GPT a partir de `docs/PROMPT-IMAGENS-GPT.md` (PR #1).
- Mapa do rosto trocado para `hero-face-v2.jpg` (1800 px) com áreas e malha recalibradas para a nova foto; a lente usa a mesma imagem.
- `og-image.jpg` como imagem de compartilhamento; segundo resultado ilustrativo publicado por padrão para novas visitas.
- Rótulo da jornada em pílula, legível sobre fotos claras.
