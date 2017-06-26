![d](https://travis-ci.org/rafaelakiyoshi/vue.svg?branch=master)

# Base para Vue + Docker + Travis CI
-----------------------
### 1-Instalação
Primeiramente, e supondo que já tenha instalado o **NODE** em seu computador, instale o vue-cli
```bash
$ npm install vue-cli -g
```
Após isso, vá em sua pasta e inicie um template do vue, no nosso caso **webpack-simple.**
```bash
$ vue init webpack-simple nome-do-projeto
```
Preencha as informações requeridas, entre na pasta criada e para baixar todas as dependencias, digite:
```bash
$ npm install
```
Concluindo todas as instalações, digite o comando abaixo para iniciar a aplicação:
```bash
$ npm run dev
```
Se tudo ocorrer bem, o navegador abrirá exibindo a tela abaixo:
![dew](https://cdn-images-1.medium.com/max/1600/1*GuIRPERP01oedu0iIAtqyA.png)

### 2-Conhecendo a estrutura
Abra, no seu projeto, o arquivo chamado App.vue. Nele você conhecerá a estrutura básica de um compnente vue, que são:
```html
<template></template>
<script></script>
<style></style>
```
Ou seja, cada componente é independente, reutilizável e acoplável a todos os outros, pois nele ja se encontram seus métodos, sua aparência e sua apresentação.

Abra o arquivo chamado **main.js** e repare que, neste arquivo fazemos a chamada do **Global vue object** e setamos como atributo em 'el'(element) um **css selector** do id do arquivo chamado **index.html**.

Mas uma vez, no arquivo App.vue, repare no seguinte trecho, pertencente à <template>:
```html
<h1> {{ msg }}</h1>
```
Mas **msg** não é a mensagem que aparece na aplicação. Isso por que acontece uma **Interpolação** e a "variável" {{ msg }} é substituida **em tempo de execução** pelo trecho:
```javascript
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
```
Sumarizando, você está tornando exportável um componente chamado app, no qual possui um dado 'msg'. Se você mudar o conteúdo dessa variável, sem precisar recompilar ou até mesmo de um F5, a página mudará automaticamente para o novo conteúdo, pois o servidor vue possui livereload!

Paralelo à função **data()** há os **methods: {}** que conterão todos os métodos javascript inerente àquele componente.
Um exemplo disso seria.
```javascript
 methods: {
      itemClicked (event, item, index) {
        this.selectedIndex = index
        if (event) {
          this.$emit('itemClicked', item, index)
        }
      },
```

Para a exibição no HTML, sempre se levará em consideração os objetos descritos em **data()** Com o data binding, você poderá mostrar, atualizar, requisitar e enviar um objeto de **data()** Como já mostrado, o Interpolador **{{ }}** Exibe Atributos String. Porém, existe uma infinidade de tags do vue, além das tradicionas que podem te auxiliar. Exemplos:
```html
<h1 v-if="isTrue()">Aparecerá se o retorno da função isTrue() Descrita em methods: {} for true</h1>
<h1 v-else>Aparecerá se o de cima nao aparecer</h1>
<h1 v-for="item in items">
    {{ item.name }}
</h1>
```

### 3-Consumindo uma API de Tarefas.
Para realizar requisições, é necessário a instalação de um módulo chamado vue-resource
```bash
$ npm install vue-resource --save
```

Após a instalação, seu código da main.js deve se adequar para a devida utilização deste módulo. Modifique-o para que fique assim:

```javascript
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
new Vue({
  el: '#app',
  render: h => h(App)
})
```

Pronto, agora com o vue-resource você conseguirá realizar requisições http. Vamos no **App.vue** e criaremos nossas variáveis, que serão populadas mais tarde. Lembre-se que quem cuida diso é a função **data() **.

```javascript
export default {
  name: 'app',
  data () {
    return {
      title: 'Welcome to your Activities!!!',
      items: [],
      fields: {}
  }
})
```
Pronto. Agora temos um Array de itens e um Objeto de campos. O objeto de campos, preencheremos na mão, pois trata-se dos títulos da tabela que iremos montar. Ela será montada baseada tanto nos itens que retornarão pela API quanto pela biblioteca que utilizaremos: **Bootstrap-Vue** E ficará mais ou menos assim:
```javascript
fields: {
        userId: {
          label: 'Id do Usuario',
          sortable: true
        },
        id: {
          label: 'Id da Tarefa',
          sortable: true
        },
        title: {
          label: 'Titulo',
          sortable: false
        },
        completed: {
          label: 'Tarefa Completada?',
          sortable: false
        }
      },
      currentPage: 1,
      perPage: 5,
      filter: null
    }
})
```
Agora vem a parte legal. Devemos exibir o Array Items em uma tabela (quem cuidará disso para nós será o Bootstrap-vue). Porém, este array está vazio. Como preencherei ele antes da página ser exibida: **Com os chamados Lifecycles Hooks**
Por exemplo, o método **created()** é realizado assim que o componente é criado, e é nele que iremos implementar o método de requisição. Ficará mais ou menos assim:
```javascript
  created() {
    let promisse = this.$http.get('https://jsonplaceholder.typicode.com/todos');
    promisse
    .then(res => res.json())
    .then(items => this.items = items)
    console.log(this.items)
  }
})
```
Lembre-se que **created()** é uma função de mesmo nível que **data()**

Agora Basta colocar o **HTML** para exibir os Items! veja [AQUI](https://bootstrap-vue.github.io/docs/components/table) como. fazê-lo.

### 3-Dockerizando
Já existe uma [Imagem](https://hub.docker.com/r/ebiven/vue-cli/) do Vue-Cli no DockerHub, e é com ela que iremos trabalhar.
Crie uma receita docker-compose.yml e adicione o seguinte:
```yml
version: '2'
services:
  web:
    image: ebiven/vue-cli
    command: npm run dev
    volumes:
      - .:/code
    ports:
      - "8080:8080"

```
Agora basta digitar **docker-compose up** no diretório do arquivo. Lembre-se de criar o yml na raíz do seu projeto Vue.

### 4-CI com Travis
Uma vez dockerizado, você deve apenas colocar o seu container em execução no travis para que ele possa testá-lo. Uma configuração básica do Travis para este projeto seria o seguinte: crie um arquivo chamado **.travis.yml** Também na raiz do projeto, com o seguinte:
```yml
sudo: required

language: node_js

services:
  - docker

script:
  - docker-compose up

```
Repare que o sudo é necessário para levantar o container. Dentro da sua receita docker-compose já existe o script de inicialização do vue "npm run dev" então o proprio compose up é o script do travis.

Claro, essa é a versão básica do Travis, há outras possibilidades, como rodar os testes, rodar análise estática etc.

