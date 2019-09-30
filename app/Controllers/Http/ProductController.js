'use strict'

const Product = use('App/Models/Product')

const { validate } = use('Validator')

class ProductController {
  rulesProduct = {
    title: 'required|string',
    description: 'required|string',
    slug: 'required|string',
    price: 'required',
    active: 'required|boolean'
  }


  async validator(request,rules){
    const validation = await validate(request,rules)
    return (validation.fails()) ? validation.messages() : null;
  }


  async store({request,response}){
    const inputs = request.only(['title', 'description','slug', 'price','active'])

    const validation = await this.validator(inputs,this.rulesProduct)

    if(validation != null){
      return response.status(400).send(validation)
    }


    const product = await Product.create(inputs)
    return product
  }


  async index({request,response}){
    const products = await Product.all();
    return products;
  }


  async getBySlug({params,request,response}){
    const {slug} = params;

    const product = await Product.findByOrFail('slug',slug)
    return product
  }
}

module.exports = ProductController
