# Rick and Morty Catalog

Rick and Morty Catalog é uma aplicação que consome a [Rick and Morty API](https://rickandmortyapi.com/) para disponibilizar um catálogo de personagens e episódios da série. A aplicação permite filtrar e pesquisar personagens por nome, espécie ou tipo, além de oferecer opções de filtragem por status (alive, dead, unknown) e gênero (male, female, genderless, unknown). Também é possível pesquisar episódios por nome ou código do episódio (padrão S01E02 para temporada 1, episódio 2).

## Funcionalidades Principais

- **Catálogo de Personagens**: Pesquise e filtre personagens por nome, espécie, tipo, status e gênero.
- **Catálogo de Episódios**: Pesquise episódios por nome ou código do episódio.
- **Detalhes dos Personagens**: Clique em um card de personagem para ver mais detalhes.
- **Detalhes dos Episódios**: Clique em um card de episódio para ver mais detalhes.
- **Versão Mobile**: Implementação futura da versão mobile.

## Tecnologias Utilizadas

- [Angular 19](https://angular.dev/)
- [Server-Side Rendering (SSR)](https://angular.dev/guide/ssr)
- [Rick and Morty API](https://rickandmortyapi.com/)

## Instalação

Siga os passos abaixo para instalar e executar a aplicação:

1. Clone o repositório:
```bash
git clone https://github.com/VinnyPine/rick-and-morty-catalog.git
```

2. Navegue até o diretório do projeto:
```bash
cd rick-and-morty-catalog
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie a aplicação:
```bash
npm start
```
5. Para rodar os testes:
```bash
npm test
```


## Como Usar
### 1. Página de Personagens (Characters):

- Use a barra de pesquisa para selecionar uma das opções de pesquisa (name, species, type) e digite a pesquisa.

- Use o menu à esquerda para selecionar os filtros de status e gênero.

- A lista de personagens aparecerá à direita. Clique em um card de personagem para ver mais detalhes.

### 2. Página de Episódios (Episodes):

- Use a barra de pesquisa para selecionar uma das opções de pesquisa (name, episode) e digite a pesquisa.

- A lista de episódios aparecerá centralizada abaixo. Clique em um card de episódio para ver mais detalhes.
