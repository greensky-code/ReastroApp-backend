import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  public restaurantdata = new FormData();
  public companyFormData;
  public restaurantFormData;
  public menuItemFormData;
  public bankFormData;
  public countryMasterData;
  public menuMasterData;
  public bankMasterData;

  constructor() { }

  validateData() {
    console.log(this);
    return true;
  }
}
