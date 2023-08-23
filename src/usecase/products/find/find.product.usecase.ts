import IProductRepository from "../../../domain/product/repository/IProductRepository";
import {
  InputFindProductDto,
  OutputFindProductDto,
} from "../DTOs/find.product.dto";

export default class FindProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(
    input: InputFindProductDto
  ): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
