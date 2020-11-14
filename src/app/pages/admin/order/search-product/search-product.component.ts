import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductBean } from 'src/app/_model/ProductBean';
import { RestService } from 'src/app/_service/rest.service';
import { SharedService } from 'src/app/_service/shared.service';
import { ProductSalesBean } from '../../../../_model/ProductSalesBean';
import { FarmerAndProductsDTO } from '../../../../_DTO/FarmerAndProductsDTO';
import { OrderDetailBean} from '../../../../_model/OrderDetailBean';
import { OrderService } from 'src/app/_service/order.service';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  @Input() productSales: ProductSalesBean;
  quantity:number;
  productSearch: ProductSalesBean;
  farmerList: any;
  productList: any;
  param: any;
  flag: any;
  farmerWithProductsList: FarmerAndProductsDTO[] = [];

  constructor(private orderService: OrderService, private sharedData:SharedService, private sharedService: SharedService, private restService: RestService, private _activatedRoute:ActivatedRoute, private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    this.productSearch = new ProductSalesBean();
    this.productSearch.product = new ProductBean();
    this._activatedRoute.params.subscribe(params=>{
      this.productSearch.product.name=params['nameProduct'];
      const param = {
        data: this.productSearch
      }
      this.restService.requestApiRestData('productsales/glsps',param).subscribe(result=>{
          for(let [farmer,products] of Object.entries(result.dataMap)){
            this.activatedPhoto(products);
          }
          for(let [farmer, products] of Object.entries(result.dataMap)){
            let dto = new FarmerAndProductsDTO();
            dto._listOfProductsShowed = [];
            for(let [key,value] of Object.entries(products)){
              dto._listOfProductsShowed.push(value);
            }
            this.farmerWithProductsList.push(dto);
          }
      })
    })

  }


  activatedPhoto(data:any){
    for(const m of data){
      this.restService.getPhotoById(m.product.id).subscribe(photo=>{
        const reader = new FileReader();
        reader.readAsDataURL(photo);
        reader.onloadend = () =>{
          const base64 = reader.result;
          m.product._foto = this.setterPhoto(base64);
          m.product._isFoto = true;
        };

      });
    }
  }

 public setterPhoto(data:any){
    return this.sanitization.bypassSecurityTrustResourceUrl(data);
  }

  addProduct(){
    if(this.productSales.quantitySelect>this.productSales.totalQuantity){
      this.sharedData.messageChange.next("La cantidad ingresada supera a la cantidad disponible")
      this.productSales.quantitySelect=null;
    }else{
      let orderDetailSelect= new OrderDetailBean();
    if(this.productSales.quantitySelect == null)
      this.productSales.quantitySelect=1;
    orderDetailSelect.quantity=Number(this.productSales.quantitySelect);
    orderDetailSelect.productSales=new ProductSalesBean();
    orderDetailSelect.productSales.id=this.productSales.id;
    orderDetailSelect.productSales.availableQuantity=this.productSales.availableQuantity;

    orderDetailSelect.productSales.product=new ProductBean();
    orderDetailSelect.productSales.product.id=this.productSales.product.id;
    orderDetailSelect.productSales.product.name=this.productSales.product.name;
    orderDetailSelect.price=this.productSales.price;
    orderDetailSelect.total=this.productSales.quantitySelect*this.productSales.price;
    this.orderService.addProductToCar(orderDetailSelect);
    this.sharedData.messageChange.next("Se agrego "+this.productSales.quantitySelect+" unidades al carrito");
    this.productSales.quantitySelect=null;

    }

  }

}