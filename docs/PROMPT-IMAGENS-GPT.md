# Prompt único para o ChatGPT: todas as imagens da LUMÉA

Copie tudo abaixo da linha e cole no ChatGPT de uma vez (com acesso ao GitHub `ghbernardes/lumea-clinica-estetica`). Ele substitui o prompt anterior.

---

Você vai gerar e enviar **todas as fotografias definitivas** do site demonstrativo **LUMÉA — Clínica de Estética Avançada**, no repositório GitHub `ghbernardes/lumea-clinica-estetica`. São 42 imagens. Trabalhe em lotes, sem pular nenhuma.

## 1. Regras de trabalho no repositório

1. Use a branch `imagens-v2` (já existe; se estiver atrás de `main`, atualize-a a partir de `main` antes de começar).
2. Altere **somente** arquivos dentro de `public/images/`. Não mexa em HTML, CSS, JS, testes ou documentos.
3. Use **exatamente** os caminhos e nomes listados. O site já aponta para eles; enquanto um arquivo não existir, o site mostra uma imagem antiga no lugar.
4. Toda imagem tem **duas versões** no mesmo formato indicado (WebP qualidade ~80 ou JPEG qualidade ~82, sem metadados):
   - principal, no tamanho indicado;
   - versão leve com o mesmo nome terminado em `-sm` (ex.: `laser-sm.webp`), com **480 px de largura** e a mesma proporção.
5. Peso máximo: 240 KB na principal, 55 KB na `-sm`.
6. Um commit por lote (tratamentos, jornada, ambientes, equipe, rosto, resultados, compartilhamento). No fim, abra **um Pull Request** de `imagens-v2` para `main`, com o título "Imagens definitivas da LUMÉA" e uma tabela arquivo → descrição curta. **Não faça merge**; eu reviso antes.

## 2. Direção de arte (vale para todas)

- Fotografia editorial **realista** de uma clínica de estética premium e acolhedora no Brasil. Nada de banco de imagens genérico, render 3D, ilustração ou estética de anúncio.
- Paleta do site: linho `#EFE8DF`, areia `#D8CFC4`, pedra `#B3A596`, blush `#E7D1CB`, vinho `#5A1A2F` só como acento. Madeira clara, travertino, linho, vidro âmbar. Fundos neutros e quentes, nunca branco puro.
- Luz natural quente e lateral, sombras suaves de janela, profundidade de campo rasa, grão fino de filme.
- Ambiente consistente: paredes cor de areia com nicho em arco, bancadas de travertino, plantas pendentes (jiboia), galhos secos vinho em vaso de vidro, toalhas brancas e mantas vinho.
- Profissionais com uniforme **vinho** (gola padre) ou **linho/areia**. Mãos com luvas nitrílicas nude ou brancas quando houver contato com a pele.
- Pessoas brasileiras diversas (tons de pele, 25 a 60 anos, tipos de cabelo), expressões serenas e naturais. **Pele real com textura e poros visíveis, sem retoque plástico.**
- **Proibido:** texto, logotipos, marcas de produtos, marcas d'água, sangue, agulhas em close, nudez, corpos idealizados, ambiente hospitalar frio, pessoas reais ou famosas.
- Deixe respiro nas bordas: o site corta e aplica zoom leve. Sujeito principal no terço central.
- Sufixo de estilo para repetir em toda geração, para manter a série coerente: *"editorial photography, warm natural window light, sand and linen palette with deep wine accents, travertine and light oak, shallow depth of field, real skin texture, subtle film grain, calm luxurious Brazilian aesthetic clinic, no text, no logos"*.

### Personagens fixas (mesmo rosto em todas as fotos em que aparecerem)

- **Helena Duarte** — cuidados faciais. Mulher branca de ~40 anos, cabelo castanho escuro em coque baixo, uniforme vinho.
- **Marina Costa** — cuidados corporais. Mulher negra de ~38 anos, cachos curtos, uniforme linho.
- **Lia Tanaka** — tecnologias. Mulher nipo-brasileira de ~35 anos, cabelo preto preso, uniforme linho.
- **Cliente da jornada** — mulher parda de ~34 anos, cabelo cacheado longo, blusa cor de linho.

## 3. Lote 1 — Tratamentos (22 imagens)

Pasta `public/images/tratamentos/`, formato **WebP**, **1600 × 1200 px (4:3)**. Estas fotos aparecem como **fundo de tela cheia** atrás de um véu escuro no cardápio de cuidados, então cada uma precisa funcionar escurecida: composição limpa, sujeito no centro, sem detalhes miúdos nas bordas. Mostre o **momento do cuidado** ou o equipamento em uso, de forma elegante.

| Arquivo | Cena |
|---|---|
| `limpeza-de-pele.webp` | Helena higienizando o rosto de uma cliente deitada com disco de algodão; luz lateral suave. |
| `hidratacao-facial.webp` | Máscara cremosa aplicada com pincel no rosto de uma cliente de olhos fechados. |
| `peeling-superficial.webp` | Pincel em leque aplicando solução transparente na bochecha; frasco âmbar desfocado. |
| `microagulhamento.webp` | Caneta dermatológica sobre a testa (sem agulha em close); profissional de luvas; plano médio, sereno. |
| `tratamento-para-manchas.webp` | Cliente de pele morena com sardas/manchas leves; profissional analisando com lupa iluminada. |
| `tratamento-para-acne.webp` | Jovem com pele acneica real, sem exagero, recebendo máscara de argila. |
| `rejuvenescimento.webp` | Mulher de ~58 anos, cabelo grisalho, recebendo massagem facial com as mãos da profissional. |
| `protocolos-faciais-personalizados.webp` | Bancada de travertino com frascos sem rótulo, ficha em branco e a profissional escolhendo produtos. |
| `drenagem-linfatica.webp` | Marina fazendo drenagem nas pernas de uma cliente coberta por toalha. |
| `massagem-modeladora.webp` | Mãos de Marina em massagem firme na lateral da cintura, cliente coberta por toalha. |
| `tratamento-para-celulite.webp` | Ventosa de vidro deslizando na coxa (cliente coberta, recorte discreto). |
| `tratamento-para-flacidez.webp` | Gel e ponteira aplicados no braço; equipamento branco ao fundo. |
| `gordura-localizada.webp` | Equipamento corporal branco com ponteira em uso no abdômen, cliente coberta. |
| `modelagem-corporal.webp` | Fita métrica e ficha sobre a maca; profissional conversando com cliente de roupão. |
| `cuidados-pos-operatorios.webp` | Drenagem delicada pós-operatória; cliente de roupão e faixa compressiva bege. |
| `protocolos-corporais-personalizados.webp` | Marina mostrando um plano em prancheta para cliente sentada; as duas sorrindo. |
| `radiofrequencia.webp` | Lia aplicando ponteira de radiofrequência no rosto; gel brilhando. |
| `ultrassom-estetico.webp` | Ponteira de ultrassom estético no abdômen; **não** pode parecer exame médico. |
| `laser.webp` | Lia de óculos de proteção operando laser estético; cliente também de óculos. |
| `luz-pulsada.webp` | Disparo suave de luz pulsada (brilho difuso) no antebraço; óculos de proteção. |
| `depilacao-a-laser.webp` | Ponteira de depilação a laser na perna, com gel; todos de óculos de proteção. |
| `tecnologia-de-rejuvenescimento.webp` | Máscara de LED vermelho no rosto de cliente relaxada; luz rosada no ambiente. |

## 4. Lote 2 — Jornada (4 imagens)

Pasta `public/images/jornada/`, **WebP**, **1200 × 1500 px (4:5, vertical)**. Aparecem grandes e fixas na tela enquanto a pessoa rola. Mesma cliente nas quatro; deixe área livre no **terço superior direito**, onde o site coloca um ponto com o nome da etapa.

| Arquivo | Cena |
|---|---|
| `escuta.webp` | Primeira conversa: cliente e Helena frente a frente, chá na mesa, risada leve. |
| `avaliacao.webp` | Helena observando a pele da cliente com lupa iluminada, explicando. |
| `plano.webp` | As duas olhando um plano escrito à mão; mãos e papel em destaque. |
| `acompanhamento.webp` | Cliente se olhando no espelho depois da sessão, satisfeita; profissional ao fundo. |

## 5. Lote 3 — Ambientes, áreas e equipe (12 imagens, substituem arquivos existentes)

Em `public/images/`, **WebP**, mesmo nome do arquivo atual.

| Arquivo | Tamanho | Cena |
|---|---|---|
| `reception.webp` | 1600 × 1200 | Recepção: balcão ripado de madeira clara, nicho em arco vinho, poltrona vinho, luz da manhã. |
| `facial-room.webp` | 1600 × 1200 | Sala facial: maca com manta vinho, lupa iluminada, bancada de travertino. |
| `body-room.webp` | 1600 × 1200 | Sala corporal: maca larga, cortinas de linho, luminária quente. |
| `detail.webp` | 1600 × 1200 | Toalha enrolada, frascos sem rótulo, orquídea branca, vaso vinho. É o fundo do fechamento do site, com véu vinho por cima: composição calma, sem contraste forte. |
| `team.webp` | 1600 × 1200 | Helena, Marina e Lia juntas, sorrindo, na recepção. |
| `cleansing.webp` | 1600 × 1200 | Close de mãos com luvas aplicando creme em um rosto. |
| `body.webp` | 1600 × 1200 | Costas de cliente coberta por toalha; mãos em drenagem. |
| `technology.webp` | 1600 × 1200 | Equipamento estético branco em carrinho, dentro da clínica. |
| `consultation.webp` | 1200 × 1500 (4:5) | Helena conversando com cliente à mesa, anotando. Aparece em "Sinta-se em casa". |
| `professional-1.webp` | 1000 × 1250 (4:5) | Retrato de Helena, meio corpo, olhar para a câmera, sorriso natural, fundo da clínica desfocado. |
| `professional-2.webp` | 1000 × 1250 (4:5) | Retrato de Marina, mesmo padrão. |
| `professional-3.webp` | 1000 × 1250 (4:5) | Retrato de Lia, mesmo padrão. |

## 6. Lote 4 — Rosto do mapa interativo (1 imagem, a mais importante)

Arquivo `public/images/hero-face-v2.jpg` (**JPEG**) + `hero-face-v2-sm.jpg`, **1800 × 1800 px (quadrado)**. Esta foto fica no topo do site com uma malha de pontos e cinco áreas clicáveis por cima (testa, olhar, bochechas e contorno). **O enquadramento precisa seguir estas medidas**, porque os pontos são posicionados em porcentagem da foto:

- Rosto **de frente**, cabeça reta, olhar direto para a câmera, expressão serena com leve sorriso.
- Centro do rosto em **x = 50%**.
- Linha dos olhos em **y ≈ 36%**; olho esquerdo da foto em x ≈ 40%, direito em x ≈ 61%.
- Testa visível em **y ≈ 18–24%** (cabelo preso para trás ou partido, sem franja).
- Ponta do nariz em y ≈ 48%; boca em y ≈ 56%; queixo em **y ≈ 74%**.
- Ombros e colo com blusa canelada cor de linho; topo da cabeça a ~6% da borda superior.
- **Fundo liso e contínuo cor de areia `#D8CFC4`**, sem textura nem sombra marcada (o site funde as bordas da foto com o fundo da página).
- Mulher brasileira de ~40 anos, pele real com poros, sardas leves e linhas finas visíveis; maquiagem quase nenhuma. Luz suave e uniforme, de frente levemente lateral, sem brilho estourado.
- Pode ser a mesma pessoa das fotos de antes/depois existentes ou uma nova; se for nova, faça também o Lote 5 com ela.

## 7. Lote 5 — Resultados ilustrativos (2 imagens)

Sobrescreva `public/images/result2-before.webp` e `public/images/result2-after.webp`, **1600 × 1600 px (quadrado)**. Mesma pessoa, mesma luz, mesmo enquadramento frontal e fundo areia. Se você criou uma pessoa nova no Lote 4, use ela aqui. No "depois", a diferença é **sutil e realista** (pele um pouco mais uniforme e luminosa). Nada de transformação milagrosa.

## 8. Lote 6 — Compartilhamento (1 imagem)

`public/images/og-image.jpg`, **1200 × 630 px**, JPEG (sem versão `-sm`). É a imagem que aparece quando alguém compartilha o link no WhatsApp ou Instagram. Composição: rosto do Lote 4 à direita, fundo areia, metade esquerda livre e lisa (sem texto, o título vem do próprio link).

## 9. Checklist antes de abrir o PR

- [ ] 22 tratamentos + 4 jornada + 12 ambientes/equipe + 1 rosto + 2 resultados = 41 imagens com versão `-sm`, mais o `og-image.jpg`.
- [ ] Nomes exatamente iguais aos da lista (minúsculas, sem acento) e formatos certos (WebP ou JPEG conforme indicado).
- [ ] Enquadramento do rosto conferido com as medidas do Lote 4.
- [ ] Nenhuma imagem com texto, logotipo ou marca.
- [ ] Helena, Marina, Lia e a cliente da jornada reconhecíveis entre as fotos.
- [ ] Pesos dentro do limite.
