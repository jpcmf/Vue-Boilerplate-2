<template lang="html">
  <div>
    <h1 class="centered">Cadastro</h1>
    <h2 class="centered">{{ foto.titulo }}</h2>

    <h3 v-if="foto._id" class="centered">Modify</h3>
    <h3 v-else class="centered">Add</h3>

    <form @submit.prevent="record()">
      <div class="form-group">
        <label for="titulo">TÍTULO</label>
        <!-- <input id="titulo" autocomplete="off"
          @input="foto.titulo = $event.target.value" :value="foto.titulo"> -->
        <input class="form-control" name="titulo" v-model="foto.titulo" v-validate data-vv-rules="required|min:3|max:30" data-vv-as="título"  id="titulo" autocomplete="off">
        <span class="error" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
      </div>

      <div class="form-group">
        <label for="url">URL</label>
        <!-- <input id="url" autocomplete="off" v-model.lazy="foto.url"> -->
        <input class="form-control" name="url" v-model="foto.url" v-validate data-vv-rules="required" id="url" autocomplete="off">
        <span class="error" v-show="errors.has('url')">{{ errors.first('url') }}</span>
        <img-responsive v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
      </div>

      <div class="form-group">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea class="form-control" id="descricao" autocomplete="off" v-model="foto.descricao">
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
      foto: new Pic(),
      id: this.$route.params.id

      // foto: {
      //   titulo: '',
      //   url: '',
      //   descricao: ''
      // }

    }
  },

  methods: {
    record() {

      this.$validator
        .validateAll()
        .then(success => {

          if (success) {
            this.service
              .register(this.foto)
              .then(() => {
                if (this.id) this.$router.push({name: 'home'})
                this.foto = new Pic()
                this.$validator.reset()
              }, err => console.log(err))
          }

        })

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

    if (this.id) {
      this.service
        .search(this.id)
        .then(foto => this.foto = foto)
    }
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

  .error {
    color: coral;
    font-size: 12px;
  }

</style>
