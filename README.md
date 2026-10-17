# Oficina 47 — Barbearia & Ritual

Site de demonstração responsivo feito com HTML, CSS e JavaScript puro. Não requer instalação de dependências, build ou backend.

## Executar localmente

Abra `index.html` no navegador. Para servir por HTTP local, a partir desta pasta execute `python -m http.server 8000` e visite `http://localhost:8000`.

## Personalizar para um estabelecimento

Edite `config.js`: nome da marca, número WhatsApp, endereço, telefone, Instagram, link de mapa, horário, equipe e lista de serviços/preços ficam centralizados ali. O telefone do WhatsApp deve conter apenas dígitos com código do país e DDD (exemplo de formato: `55DDDNXXXXXXXX`). Troque também o título, descrição e textos demonstrativos em `index.html`.

O formulário valida os campos, o telefone e a data mínima, cria uma mensagem organizada e abre o link oficial `wa.me` com o texto codificado. A pessoa revisa e envia a mensagem. Isso é um **pedido**, não uma reserva confirmada: disponibilidade e conflitos são verificados pela equipe depois do contato. Horários listados no formulário são sugestões para a solicitação, não uma agenda consultada em tempo real.

## Imagens e conteúdo

As fotos são referências visuais externas do Unsplash e requerem conexão com a internet; não representam trabalhos reais da marca fictícia. Textura de madeira e acabamento visual são feitos em CSS. Os depoimentos estão marcados como demonstrativos. Substitua imagens, textos, preços, perfil e dados de contato por conteúdo autorizado do estabelecimento antes de publicar.

## Limites

Não há backend, banco de dados, gestão de agenda, bloqueio de horários, integração de pagamentos nem incorporação de mapa até que os respectivos dados/serviços sejam configurados. O número padrão do WhatsApp é um placeholder e não aponta para um negócio real. Links de Instagram e mapa ficam inativos até preencher `config.js`.