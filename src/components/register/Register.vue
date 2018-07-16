<template lang="html">
  <div>
    <h1 class="centered">Cadastro</h1>
    <h2 class="centered">{{ foto.titulo }}</h2>

    <form @submit.prevent="record()">
      <div class="form-group">
        <label for="titulo">TÍTULO</label>
        <!-- <input id="titulo" autocomplete="off"
          @input="foto.titulo = $event.target.value" :value="foto.titulo"> -->
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo">
      </div>

      <div class="form-group">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url">
        <img-responsive v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="form-group">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao">
        </textarea>
      </div>

      <div class="centered">
        <my-button label="GRAVAR" type="submit"/>
        <router-link :to="{ name: 'home' }"><my-button label="VOLTAR" type="button"/></router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImgResponsive from '../shared/img-responsive/ImgResponsive.vue';
import Button from '../shared/button/Button.vue';
import Pic from '../../domain/pic/Pic.js';
import PicService from '../../domain/pic/PicService.js'

export default {
  components: {
    'img-responsive': ImgResponsive,
    'my-button': Button
  },

  data() {
    return {
      foto: new Pic()

      // foto: {
      //   titulo: '',
      //   url: '',
      //   descricao: ''
      // }

    }
  },

  methods: {
    record() {

      this.service
        .register(this.foto)
        .then(() => this.foto = new Pic(), err => console.log(err))

      // this.resource
      //   .save(this.foto)
      //   .then(() => this.foto = new Pic(), err => console.log(err))

      // this.$http
      //   .post('v1/fotos', this.foto)
      //   .then(() => this.foto = new Pic(), err => console.log(err))

      // clear form after submit
      // this.foto = {
      //   titulo: '',
      //   url: '',
      //   descricao: ''
      // }

    }
  },

  created() {
    this.service = new PicService(this.$resource)
    // this.resource = this.$resource('v1/fotos')
  }
}
</script>

<style scoped>

  .centered {
    text-align: center;
  }

  .form-group {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .form-group label {
    display: block;
    font-weight: bold;
  }

  .form-group label + input, .form-group textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centered {
    text-align: center;
  }

</style>
