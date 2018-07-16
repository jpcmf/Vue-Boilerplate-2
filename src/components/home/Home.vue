<template lang="html">
  <div>
    <h1 class="title">{{ title }}</h1>
    <p v-show="message" class="centered">{{ message }}</p>

    <!-- <div class="">
      {{objects}}
    </div> -->

    <input type="search" class="filter" v-on:input="filter = $event.target.value" placeholder="Filter">

    <!-- <ul>
      <li v-for="object of objectsFiltered">
        {{object.title}} <br>
        {{object.description}} <br>
        {{object.location.city}} <br>
        {{object.team}}
      </li>
    </ul> -->

    <ul class="pics">
      <li class="pics__item" v-for="foto of fotosFiltered">
        <my-panel :titulo="foto.titulo">
          <img-responsive v-my-transform:scale.animate="1.5" :url="foto.url" :titulo="foto.titulo"/>
          <my-button type="button" label="alterar"/>
          <my-button
            type="button"
            label="remover"
            @buttonActive="remove(foto)"
            :confirm="true"
            stylecss="danger"/>
        </my-panel>

        <!-- <div class="panel">
          <h2 class="panel__title">{{ foto.titulo }}</h2>
          <div class="panel__content">
            <img :src="foto.url" :alt="foto.titulo">
          </div>
        </div> -->

      </li>
    </ul>

    <!-- <ul>
      <li v-for="picture of picture">
        <img :src="picture.url" :alt="picture.title">
      </li>
    </ul> -->

  </div>
</template>

<script>
import Panel from '../shared/panel/Panel.vue';
import ImgResponsive from '../shared/img-responsive/ImgResponsive.vue';
import Button from '../shared/button/Button.vue';
import PicService from '../../domain/pic/PicService.js'


export default {
  components: {
    'my-panel': Panel,
    'img-responsive': ImgResponsive,
    'my-button': Button
  },

  data() {
    return {
      title: 'Compacto Records',
      fotos: [],
      filter: '',
      message: '',

      // outra api
      objects: []
      // picture: [
      //   {
      //     url: 'https://f4.bcbits.com/img/a3329342855_10.jpg',
      //     title: '[CR006] Various Artists - Compactos Volume 1',
      //   },
      //   {
      //     url: 'https://f4.bcbits.com/img/a3417347468_2.jpg',
      //     title: '[CR006] Various Artists - Compactos Volume 1',
      //   }
      // ]
    }
  },

  computed: {
    fotosFiltered() {
      if (this.filter) {
        let exp =  new RegExp(this.filter.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
        // return [];
      } else {
        return this.fotos;
      }
    },

    // objectsFiltered() {
    //   if (this.filter) {
    //     let exp = new RegExp(this.filter.trim(), 'i');
    //     return this.objects.filter(object => exp.test(object.title));
    //   } else {
    //     return this.objects;
    //   }
    // }

  },

  methods: {
    remove(foto) {
      // alert('Remove: ' + foto.titulo)

      this.service.removed(foto._id)
        .then(() => {
          let index = this.fotos.indexOf(foto) // position of pic in array
          this.fotos.splice(index, 1) // the instruction change array
          console.log(index);
          this.message = 'Picture removed'
        },
        err => {
          this.message = 'Can not remove the picture'
          console.log(err);
        })

      // this.resource
      //   .delete({ id: foto._id })
      //   .then(() => {
      //     let index = this.fotos.indexOf(foto) // position of pic in array
      //     this.fotos.splice(index, 1) // the instruction change array
      //     console.log(index);
      //     this.message = 'Picture removed'
      //   },
      //   err => {
      //     this.message = 'Can not remove the picture'
      //     console.log(err);
      //   })

      // this.$http
      //   .delete('v1/fotos/' + foto._id)
      //   .then(() => {
      //     let index = this.fotos.indexOf(foto) // position of pic in array
      //     this.fotos.splice(index, 1) // the instruction change array
      //     console.log(index);
      //     this.message = 'Picture removed'
      //   },
      //   err => {
      //     this.message = 'Can not remove the picture'
      //     console.log(err);
      //   })
    }
  },

  created() {

    this.service = new PicService(this.$resource)
    this.service
      .list()
      .then(fotos => this.fotos = fotos, err => console.log(err))

    // this.resource = this.$resource('v1/fotos{/id}')
    // this.resource
    //   .query()
    //   .then(res => res.json())
    //   .then(fotos => this.fotos = fotos, err => console.log(err))

    // this.$http.get('v1/fotos')
    //   .then(res => res.json())
    //   .then(fotos => this.fotos = fotos, err => console.log(err))

    // outra api
    // this.$http.get('https://jsapi.recruiterbox.com/v1/openings?client_name=ebanx')
      // .then(res => res.json())
      // .then(objects => this.objects = objects.objects, err => console.log(err))

      // .then(res => {
      //   console.log(res.json())
      //   res.json()
      // })
      // .then(objects => {
      //   this.objects = objects
      // })
  }
}
</script>

<style lang="scss">
  // @import url('https://fonts.googleapis.com/css?family=Varela+Round');

  // .container {
  //   font-family: 'Varela Round', Helvetica, Arial, sans-serif;
  //   margin: auto;
  //   max-width: 1200px;
  // }

  .centered {
    text-align: center;
  }

  .filter {
    border: 1px solid gray;
    font-size: 15px;
    width: 100%;
    padding: 10px;
    /* margin: 0 5px; */
  }

  .pics {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    list-style: none;
    padding: 0;

    .pics__item {
      display: inline-block;
    }
  }
</style>
