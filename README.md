# 1-Instalação
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

# 2-Conhecendo a estrutura
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

# 3-Consumindo uma API
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
