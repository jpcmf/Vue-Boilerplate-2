export default class PicService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}')
  }

  list() {
    return this._resource
      .query()
      .then(res => res.json())
  }

  register(foto) {
    return this._resource
      .save(foto)
  }

  removed(id) {
    return this._resource.delete({ id })
  }
}
