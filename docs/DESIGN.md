# Direção de arte — LUMÉA 3

## Conceito

Clínica de estética com cara de estúdio editorial, não de template. A pele real é o centro: rostos com textura, olhar direto para a câmera, nada de retoque plástico. O site fala de escuta, tempo e expectativa real, e o desenho reforça isso com calma, respiro e detalhes táteis.

Referências usadas como direção (não copiadas): derm.ca (lista de serviços sobre foto em tela cheia, fotos sobrepostas), LUMI (serifa com itálico misturado, etiquetas em pílula), landing de HOF em vinho (cartões numerados, frase de fechamento forte) e um vídeo de hero com "contato visual" (rosto central, marcadores de leitura de pele, imagem fixa com etapas, frase com etiquetas flutuantes).

## Paleta

| Token | Cor | Uso |
|---|---|---|
| `--paper` | `#F4EFE8` | fundo geral |
| `--ivory` | `#EFE8DF` | seções alternadas, cartões |
| `--cream` | `#E9E1D6` | frase-manifesto, fundos de imagem |
| `--sand` | `#D8CFC4` | hero, cabeçalho, galeria (casa com o fundo da foto do rosto) |
| `--stone` | `#B3A596` | apoio |
| `--blush` | `#E7D1CB` | selos, itálicos sobre fundo escuro |
| `--wine` | `#5A1A2F` | acento: itálicos, botões, faixa, fechamento |
| `--ink` | `#1D1719` | texto, navegação ativa, botão flutuante |
| `--gold` | `#B8955E` | detalhes mínimos (estrelas, ✦) |

Vinho é acento, não fundo dominante. Fundo nunca é branco puro.

## Tipografia

- Títulos: **Cormorant Garamond** 400/500, mistura de romano e *itálico* (o trecho em itálico fica vinho). Sem caixa-alta em títulos.
- Texto e interface: **Manrope** 400–600.
- Rótulos (eyebrow): Manrope 600, 0,68 rem, espaçamento 0,22 em, caixa-alta.
- Números (estatísticas, contadores): Cormorant 500, `tabular-nums`.
- Reserva sem rede: Georgia e Arial.

## Formas

- Raio padrão 24 px; fotos de especialistas 28 px; cartões 20 px; botões e campos em pílula (999 px).
- Etiquetas em pílula translúcida (`backdrop-filter`) sobre fotos.
- Marcadores de leitura de pele: cantos de 12 px em branco, ponto central "respirando".

## Movimento (GSAP 3.15 local: ScrollTrigger, SplitText)

- Abertura: monograma desenhado sobre areia, uma vez por sessão (`?semintro` pula).
- Hero: rosto revelado em círculo a partir dos olhos; título letra a letra saindo do desfoque; marcadores se desenham; números contam; o rosto inclina seguindo o cursor (só mouse).
- Cardápio: linhas em cascata; foto de fundo troca em transição cruzada ao passar o mouse.
- Jornada: imagem fixa (`position: sticky`) troca por etapa, com ponto rotulado, contador e linha de progresso. A troca usa IntersectionObserver e funciona sem GSAP.
- Manifesto: palavras acendem com a rolagem; etiquetas flutuam em profundidades diferentes.
- Fotos com revelação por máscara e parallax leve; botões magnéticos; prévia de imagem seguindo o cursor nos artigos.
- `prefers-reduced-motion` ou falha do GSAP: tudo aparece completo e parado.
- Regra técnica: não usar transição CSS em `opacity`/`transform` de elementos animados pelo GSAP. Para hover, usar a propriedade `translate`.

## Imagens

- Rosto do hero: `public/images/hero-face.jpg` (recorte do lado "depois" de `assets-originals/results-source.png`, feito com `scripts/crop-image.ps1`).
- Tratamentos e jornada: arquivos novos com reserva automática para as imagens antigas (`imageFallback` em `src/data/seed.js`). As fotos definitivas estão descritas em `docs/PROMPT-IMAGENS-GPT.md`.
- Todas as pessoas e ambientes são sintéticos e fictícios.
