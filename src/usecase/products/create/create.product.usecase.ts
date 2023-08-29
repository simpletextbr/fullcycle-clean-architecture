import ProductFactory from "../../../domain/product/factory/product.factory";
import IProductRepository from "../../../domain/product/repository/IProductRepository";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "../DTOs/create.product.dto";

export default class CreateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const productFactory = ProductFactory.create(input.name, input.price);

    await this.productRepository.create(productFactory);

    return {
      id: productFactory.id,
      name: productFactory.name,
      price: productFactory.price,
    };
  }
}
