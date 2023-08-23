import Product from "../../../domain/product/entity/product";
import IProductRepository from "../../../domain/product/repository/IProductRepository";
import {
  InputListProductDto,
  OutputListProductDto,
} from "../DTOs/list.product.dto";

export default class ListProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toDTO(products);
  }
}

class OutputMapper {
  static toDTO(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
