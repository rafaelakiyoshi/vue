<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="scrolltable">
      <table class="header">
        <thead>
          <tr>
            <th v-for="column in columns">
              {{column}}
            </th>
          </tr>
        </thead>
      </table>
      <div class="body">
        <table>
          <tbody>
            <tr v-for="rowIndex in indexSize">
              <td v-for="(column, columnIndex) in columns">
                {{todos[rowIndex-1][column]}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Welcome to your Activities!',
      todos: [],
      columns: [
        'userId',
        'id',
        'title',
        'completed'
      ]
    }
  },
  created() {
    let promisse = this.$http.get('https://jsonplaceholder.typicode.com/todos');
    promisse
    .then(res => res.json())
    .then(todos => this.todos = todos)
    console.log(this.todos)
  },
  computed: {
    indexSize () {
      return this.todos.length
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}


th {
  min-width: 200px;
  font-size: 20px;
}
td {
  min-width: 360px;
  font-size: 15px;
}
tr:nth-child(even){background-color: #f2f2f2}

th {
  background-color: #4CAF50;
  color: white;
}
/* an outside constraint to react against */
</style>
