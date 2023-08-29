import IProductRepository from "../../../domain/product/repository/IProductRepository";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "../DTOs/update.product.dto";

export default class UpdateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);

    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
