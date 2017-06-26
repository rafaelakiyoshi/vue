<template>
  <div id="app">
    <h1>{{ title }}</h1>

    <div class="justify-content-centermy-1 row">
      <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
        <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
        </b-form-select>
      </b-form-fieldset>

      <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
      </b-form-fieldset>
    </div>

    <!-- Main table element -->
    <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
      <template slot="name" scope="item">
        {{item.value.first}} {{item.value.last}}
      </template>
      <template slot="isActive" scope="item">
        {{item.value?'Yes :)':'No :('}}
      </template>
      <template slot="actions" scope="item">
        <b-btn size="sm" @click="details(item.item)">Details</b-btn>
      </template>
    </b-table>

    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.items.length" :per-page="perPage" v-model="currentPage" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Welcome to your Activities!!!',
      items: [],
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
  },
  created() {
    let promisse = this.$http.get('https://jsonplaceholder.typicode.com/todos');
    promisse
    .then(res => res.json())
    .then(items => this.items = items)
    console.log(this.items)
  },
  computed: {
    indexSize () {
      return this.items.length
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

table, td, th {
    border: 1px solid #ddd;
    text-align: center;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    padding: 15px;
}
</style>
