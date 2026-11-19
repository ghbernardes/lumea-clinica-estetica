# Prompt para o ChatGPT: imagens da LUMÉA

Copie tudo abaixo da linha e cole no ChatGPT (com acesso ao GitHub `ghbernardes/lumea-clinica-estetica`).

---

Você vai gerar e enviar as fotografias do site demonstrativo **LUMÉA — Clínica de Estética Avançada**, no repositório GitHub `ghbernardes/lumea-clinica-estetica`.

## Regras de trabalho no repositório

1. Crie a branch `imagens-v2` a partir de `main`.
2. Altere **somente** arquivos dentro de `public/images/`. Não mexa em HTML, CSS, JS, testes ou documentos.
3. Use **exatamente** os caminhos e nomes listados abaixo. O site já aponta para eles; enquanto um arquivo não existir, o site mostra uma imagem antiga no lugar.
4. Cada imagem precisa de **duas versões WebP** (qualidade ~80, sem metadados):
   - versão principal, com o tamanho indicado;
   - versão leve com o mesmo nome terminado em `-sm.webp`, com 480 px de largura (mesma proporção).
5. Tamanho máximo: 220 KB para a principal e 50 KB para a `-sm`.
6. Faça commits pequenos por grupo (tratamentos, jornada, ambientes, equipe, resultados) e abra um **Pull Request** de `imagens-v2` para `main` com o título "Imagens v2 da LUMÉA" e a lista de arquivos. **Não faça merge**; eu reviso antes.

## Direção de arte (vale para todas)

- Fotografia editorial realista de uma clínica de estética premium e acolhedora, no Brasil. Nada de aparência de banco de imagens genérico, render 3D ou ilustração.
- Paleta: vinho `#541C32`, nude `#D6A7A5`, champanhe `#C8A46A`, marfim `#F7F2EA`, madeira clara, pedra/travertino, linho. Luz natural quente e suave, sombras de janela, profundidade de campo rasa.
- Ambiente consistente em todas as fotos: paredes marfim com nicho em arco, bancadas de travertino, madeira clara, plantas pendentes (jiboia), galhos secos vinho em vaso de vidro, toalhas brancas e mantas vinho.
- Profissionais com uniforme **vinho** (gola padre) ou **marfim**. Mãos com luvas nitrílicas brancas ou nude quando houver contato com a pele.
- Pessoas brasileiras diversas (tons de pele, idades de 25 a 60, tipos de cabelo), expressões serenas e naturais, pele real com textura, **sem retoque exagerado**.
- **Proibido:** texto, logotipos, marcas de produtos, marcas d'água, sangue, agulhas em close, nudez, corpos idealizados, aparência médica/hospitalar fria, pessoas reais ou famosas.
- Enquadramentos com área de respiro (o site corta as bordas e aplica zoom leve). Sujeito principal no terço central.

### Personagens fixas (manter o mesmo rosto em todas as fotos em que aparecerem)

- **Helena Duarte** — cuidados faciais. Mulher branca de ~40 anos, cabelo castanho escuro preso em coque baixo, uniforme vinho.
- **Marina Costa** — cuidados corporais. Mulher negra de ~38 anos, cachos curtos, uniforme marfim.
- **Lia Tanaka** — tecnologias. Mulher nipo-brasileira de ~35 anos, cabelo preto preso, uniforme marfim.

## 1. Tratamentos — 22 imagens

Pasta `public/images/tratamentos/`. Tamanho **1200 × 900 px (4:3)**. Cada foto mostra **o momento do cuidado** ou o equipamento em uso, de forma elegante e não clínica.

| Arquivo | Cena |
|---|---|
| `limpeza-de-pele.webp` | Helena higienizando o rosto de uma cliente deitada com disco de algodão; luz lateral suave. |
| `hidratacao-facial.webp` | Máscara cremosa sendo aplicada com pincel no rosto de uma cliente de olhos fechados. |
| `peeling-superficial.webp` | Pincel em leque aplicando solução transparente na bochecha; frasco âmbar desfocado. |
| `microagulhamento.webp` | Caneta dermatológica (sem agulha visível em close) sobre a testa; profissional de luvas; plano médio, sereno. |
| `tratamento-para-manchas.webp` | Cliente de pele morena com sardas/manchas leves, profissional analisando com lupa iluminada. |
| `tratamento-para-acne.webp` | Jovem com pele acneica real (sem exagero) recebendo aplicação de máscara de argila. |
| `rejuvenescimento.webp` | Mulher de ~58 anos, cabelo grisalho, recebendo massagem facial com as mãos da profissional. |
| `protocolos-faciais-personalizados.webp` | Bancada de travertino com frascos sem rótulo, ficha em branco e a profissional escolhendo produtos. |
| `drenagem-linfatica.webp` | Marina fazendo drenagem nas pernas de uma cliente coberta por toalha; movimentos suaves. |
| `massagem-modeladora.webp` | Mãos de Marina em massagem firme na lateral do abdômen/cintura, cliente coberta por toalha. |
| `tratamento-para-celulite.webp` | Ventosa de vidro sendo deslizada na coxa (cliente coberta, recorte discreto). |
| `tratamento-para-flacidez.webp` | Aplicação de gel e ponteira em braço/abdômen; equipamento branco ao fundo. |
| `gordura-localizada.webp` | Equipamento estético corporal branco com ponteira em uso no abdômen, cliente coberta. |
| `modelagem-corporal.webp` | Fita métrica e ficha sobre a maca, profissional conversando com cliente vestida com roupão. |
| `cuidados-pos-operatorios.webp` | Drenagem delicada pós-operatória, cliente de roupão/faixa compressiva bege, atmosfera de cuidado. |
| `protocolos-corporais-personalizados.webp` | Marina mostrando um plano em prancheta para cliente sentada, ambos sorrindo. |
| `radiofrequencia.webp` | Lia aplicando ponteira de radiofrequência no rosto de cliente; gel brilhando. |
| `ultrassom-estetico.webp` | Ponteira de ultrassom estético na região do abdômen; **não** pode parecer exame médico. |
| `laser.webp` | Lia de óculos de proteção operando laser estético; cliente com óculos de proteção. |
| `luz-pulsada.webp` | Disparo suave de luz pulsada (brilho difuso) no antebraço; óculos de proteção. |
| `depilacao-a-laser.webp` | Ponteira de depilação a laser na perna, com gel; cliente e profissional de óculos de proteção. |
| `tecnologia-de-rejuvenescimento.webp` | Máscara de LED vermelho no rosto de cliente relaxada, luz rosada no ambiente. |

## 2. Jornada — 4 imagens

Pasta `public/images/jornada/`. Tamanho **1000 × 1250 px (4:5, vertical)**. Mesma cliente nas quatro (mulher parda, ~34 anos, cabelo cacheado longo, blusa marfim).

| Arquivo | Cena |
|---|---|
| `escuta.webp` | Primeira conversa: cliente e Helena sentadas frente a frente, chá na mesa, risada leve. |
| `avaliacao.webp` | Helena observando a pele da cliente com lupa iluminada, explicando. |
| `plano.webp` | As duas olhando uma ficha/plano escrito à mão; mãos e papel em destaque. |
| `acompanhamento.webp` | Cliente se olhando no espelho após a sessão, satisfeita, profissional ao fundo. |

## 3. Ambientes, áreas e equipe — substituir arquivos existentes

Sobrescreva os arquivos abaixo em `public/images/` (mesmo nome). Tamanho **1600 × 1200 px (4:3)** e `-sm` com 480 px.

| Arquivo | Cena |
|---|---|
| `reception.webp` | Recepção: balcão ripado de madeira clara, nicho em arco vinho, poltrona vinho, luz da manhã. |
| `facial-room.webp` | Sala facial: maca com manta vinho, lupa iluminada, bancada de travertino. |
| `body-room.webp` | Sala corporal: maca larga, cortinas de linho, luminária quente. |
| `detail.webp` | Detalhe: toalha enrolada, frascos sem rótulo, orquídea branca, vaso vinho. |
| `team.webp` | Helena, Marina e Lia juntas, sorrindo, na recepção. |
| `cleansing.webp` | Área "Rosto e pele": close de mãos de luva aplicando creme no rosto. |
| `body.webp` | Área "Corpo e contorno": costas de cliente coberta por toalha, mãos em drenagem. |
| `technology.webp` | Área "Tecnologias": equipamento estético branco em carrinho, ambiente da clínica. |
| `consultation.webp` | Helena conversando com cliente à mesa, anotando (usada na seção "Nossa filosofia"). |

Retratos (sobrescrever, **1000 × 1250 px, 4:5**): `professional-1.webp` (Helena), `professional-2.webp` (Marina), `professional-3.webp` (Lia). Meio corpo, fundo da clínica desfocado, olhar para a câmera, sorriso natural.

## 4. Resultado ilustrativo 2

Sobrescreva `result2-before.webp` e `result2-after.webp` (**1600 × 800 px, 2:1**, e `-sm`). Mesma pessoa, mesma luz, mesmo enquadramento frontal, fundo marfim liso: mulher negra de ~45 anos. No "depois", a diferença deve ser **sutil e realista** (pele um pouco mais uniforme e luminosa). Nada de transformação milagrosa.

## Checklist antes de abrir o PR

- [ ] 22 + 4 + 12 + 2 imagens principais, todas com a versão `-sm`.
- [ ] Nomes exatamente iguais aos da lista (minúsculas, sem acento).
- [ ] Nenhuma imagem com texto, logotipo ou marca.
- [ ] Personagens Helena, Marina e Lia reconhecíveis entre as fotos.
- [ ] Pesos dentro do limite.
