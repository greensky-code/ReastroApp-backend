import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { __values } from 'tslib';
declare var $: any;
@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.css']
})
export class MerchantDetailsComponent implements OnInit {
  id: any;
  selectedTab: any;
  serverurl: any;
  tablehide: boolean;
  itemdatainfo: any;
  item: any = 1;
  images: any;
  passbookImage: string;
  menu_category:any;
  searchbyName='';
  url: string;
  restaurantLocation: any=[];
  banckDetails: any=[];
  accountkDetails: any;
  order: any=[];
  itemsMerchat: any=[];
  merchantCategory: any=[];
  merchantRating: any=[];
  merchantDetai: any;
  totals: any;
  page: any;
  limit: number;
  totalbank: any;
  totalOrder: any;
  averageRating: any;
  order_id: any;
  trackOrder: any;
  totalRating: any;
  items_id: any;
  searchOrder: any;
  ratingLocation_id='';
  totalCategory: any;
  totalItems: any;
  imageUrl: any;
  searchItemsname: any;
  searchByCategory='';
  dropDownLocation: any;
  itemsLocation: any;
  itemsCategory: any;
  item_id='';
  ratingName='';
  orderStatus: any;
  restaurantLocationData: any;
  constructor(private router: Router, public route: ActivatedRoute,
    private service: ApiServiceService, public toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.selectedTab = '1a';
    this.tablehide = true
    this.route.params.subscribe((res) => {
      this.id = res.id
    })
    this.serverurl = "http://ec2-13-250-224-209.ap-southeast-1.compute.amazonaws.com:8009"
    this.getMerchantDetails()
    this.getAccountDetails() 
  
  }
getMerchantDetails(){
  this.service.getApi(`merchant/admin/account/${this.id}`,1).subscribe(res=>{
    if(res.status==200){
      this.merchantDetai=res.body
    }
  })
}
  getdata(item) {
    this.item = item;
  }

 


  getordertabel() {
    this.tablehide = true

  }


  viewOrderdata(id) {
    this.spinner.show()
  this.order_id=id
    this.tablehide = false
    this.service.getApi(`merchant/admin/order-detail/${this.id}/${this.order_id}`,1).subscribe(res=>{
        this.tablehide = false
        if(res.status==200){
          
          // setTimeout(function(){
          
          // },10);
          this.spinner.hide()
          
          this.trackOrder=res.body
          this.orderStatus=this.trackOrder.order_status
        }else{
          this.spinner.hide()
        }
    },error=>{
      this.spinner.hide()
    })
  }
 

  // ****************Items Details*****************
  itemsdetails(id) {
    this.items_id=id
    this.tablehide = false
    this.service.getApi(`merchant/admin/item-detail/${this.id}/${this.items_id}`,1).subscribe(res=>{
   
      if(res.status==200){
        this.tablehide = false
        this.itemdatainfo=res.body
        console.log('itemdatainfo',this.itemdatainfo)
      }

    })
  }

  bankdata(data) {
    $('#myModal').modal({ backdrop: 'static', keyboard: false })
    this.images = data
    this.passbookImage = "http://182.74.213.163:8008" + this.images
  }


// ----------------------------Selected Tabs Apis--------------------------//
  makeActive(tab: string,value) {
    this.selectedTab = tab;
    if(value=='Locations'){
      this.getLocation()
    }else if(value==='Bank Details'){
      this.getBankDetail()
    }else if(value==='Orders'){
      this.getOrder()
    }else if(value==='Rating'){
      this.getRating()
    }else if(value==='Category'){
      this.getCategory()
    }else if(value==='Items'){
      this.getItems()
    }else if(value==='Account Details'){
      this.getAccountDetails()
    }
  }


  reset() {
    this.searchByCategory='';
    this.item_id='';
    this.searchItemsname='';
    this.getItems();
   
  }







  // /////////////////////////////////////////////////////New Update sections ///////////////////////////////////////////

  orderFilter(value,search){
    if(search==="order"){
    
      this.searchOrder=value
      this.url =`merchant/admin/orders/${this.id}?location_id=${this.searchOrder}`
    }else if(search==='rating'){
      this.url =`merchant/admin/rating/${this.id}?location_id=${this.searchOrder}`
    }
   
  // this.locationNmes=value
  this.service.getApi(this.url,1).subscribe(res=>{
    if(res.status==200){
      this.order=res.body.results
    }
  })



 
  
  }
  itemsFilter(value){
    this.item_id=value
    
    this.service.getApi(`merchant/admin/items/${this.id}?location_id=${this.item_id}`,1).subscribe(res=>{
      if(res.status==200){
        this.itemsMerchat=res.body.results
      }
    })
  }
  


  // -------------------------Get Restaurant location----------------------------//


  getLocation(){
    this.spinner.show()
  this.service.getApi(`merchant/admin/locations/${this.id}?pagination=true`,1).subscribe(res=>{
    if(res.status==200){

      this.spinner.hide()
      this.restaurantLocationData=res
      console.log('restaurantLocation==>>',this.restaurantLocation)
      this.restaurantLocation=res.body.results
      this.totals=res.body.count
      this.limit = 10

    }
  }, err => {
    console.log('eeeeeeee==>>',err)

    if (err.status == 500) {
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    } else if (err.status == 403 || err.status == 401) {
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.error.message)
    } 
    this.spinner.hide()
  })
  }

  // --------------------Dropdown location -------------------//

  getLocationDropdown(){
  this.service.getApi(`merchant/admin/locations/${this.id}?pagination=false`,1).subscribe(res=>{
    if(res.status==200){
      this.dropDownLocation=res.body
      this.totals=res.body.count
      this.limit = 10

    }
  })
  }
  getmarchantdetail(page,value){

    this.page=page
    this.restaurantLocation=[]
    this.merchantRating=[]
    if(value==='Location'){
      this.getLocation()
      
    }else if(value==='banckDetail'){
      this.getBankDetail()
    }else if(value==='Order'){
      this.getOrder()
      
    }else if(value==='Rating'){
      this.getRating()
    }
    else if(value==='items'){
      this.getItems()
    }
    
   
  }
  categoryPagination(page){
    this.page=page
    this.getCategory()
  }
  


    // -------------------------Get Bank Details----------------------------//


    getBankDetail(){
      this.spinner.show()
      this.service.getApi(`merchant/admin/bank-details/${this.id}`,1).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.banckDetails=res.body.results
          this.totalbank=res.body.count
          this.limit=10;
    
        }
      }, err => {
        if (err.status == 500) {
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        } else if (err.status == 403 || err.status == 401) {
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        } 
        this.spinner.hide()
      })
      }




    // -------------------------Get Account Details----------------------------//


    getAccountDetails(){
      this.spinner.show()
      this.service.getApi(`merchant/admin/account/${this.id}`,1).subscribe(res=>{
        if(res.status==200){
 
          this.spinner.hide()
          this.accountkDetails=res.body
          console.log('accountkDetails==>>',this.accountkDetails)
    
        }
      }, err => {
        if (err.status == 500) {
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        } else if (err.status == 403 || err.status == 401) {
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        } else if (err.status == 400) {
          this.spinner.hide()
          this.service.toastErr(err.error.message)
        }
        this.spinner.hide()
      })
      }




    // -------------------------Get Order ----------------------------//


    getOrder(){
      this.spinner.show()
      this.service.getApi(`merchant/admin/orders/${this.id}`,1).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.order=res.body.results
          this.totalOrder=res.body.count
          this.limit=10
    
        }
      }, err => {
        if (err.status == 500) {
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        } else if (err.status == 403 || err.status == 401) {
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        } 
        this.spinner.hide()
      })
      }
 

       // -------------------------Get Items ----------------------------//


    getItems(){
      this.spinner.show()
      this.service.getApi(`merchant/admin/items/${this.id}`,1).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.itemsMerchat=res.body.results
          this.totalItems=res.body.count
          this.limit=10
    
        }
      }, err => {
        if (err.status == 500) {
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        } else if (err.status == 403 || err.status == 401) {
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        } 
        this.spinner.hide()
      })
      }


          // -------------------------Get Category ----------------------------//


    getCategory(){
      this.spinner.show()
      this.service.getApi(`merchant/admin/categories/${this.id}?pagination=true`,1).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.merchantCategory=res.body.results
          this.totalCategory=res.body.count
          this.limit=10;
    
        }
      }, err => {
        if (err.status == 500) {
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        } else if (err.status == 403 || err.status == 401) {
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        }
        this.spinner.hide()
      })
      }


         // -------------------------Get Rating ----------------------------//


    getRating(){
      this.spinner.show()
      this.service.getApi(`merchant/admin/rating/${this.id}`,1).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.merchantRating=res.body.results.data
          this.averageRating=res.body.results.avg_rating
          this.totalRating=res.body.count
          this.limit=10
    
        }
      }, err => {
        if (err.status == 500) {
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        } else if (err.status == 403 || err.status == 401) {
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        } 
        this.spinner.hide()
      })
      }
 

         // -------------------------Search Rating ----------------------------//


    SearchRating(){
      this.spinner.show()
      this.service.getApi(`merchant/admin/rating/${this.id}`,1).subscribe(res=>{
        this.spinner.hide()
        if(res.status==200){
          this.spinner.hide()
          this.merchantRating=res.body.results.data
        }
      }, err => {
        if (err.status == 500) {
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        } else if (err.status == 403 || err.status == 401) {
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        } else if (err.status == 400) {
          this.spinner.hide()
          this.service.toastErr(err.error.message)
        }
        this.spinner.hide()
      })
      }




// ---------------------------------Search by Name---------------------------------//
      searchRatingReviews(){
        this.spinner.show()
        this.service.getApi(`merchant/admin/rating/${this.id}?search=${this.searchbyName}`,1).subscribe(res=>{
         
          if(res.status==200){
            this.spinner.hide()
            this.merchantRating=res.body.results.data
          }
        }, err => {
          if (err.status == 500) {
            this.spinner.hide()
            this.service.toastErr('Internal server error.')
          } else if (err.status == 403 || err.status == 401) {
            this.spinner.hide()
            this.service.logout()
            this.service.toastErr(err.error.message)
          } else if (err.status == 400) {
            this.spinner.hide()
            this.service.toastErr(err.error.message)
          }
          this.spinner.hide()
        })
      }


  // ----------------------------------Rating filter-------------------------------//

  ratingFilter(value){
    
     this.ratingLocation_id=value
     this.searchRatings()
     
  }

 searchRatings(){
  this.spinner.show()
  this.service.getApi(`merchant/admin/rating/${this.id}?location_id=${this.ratingLocation_id}`,1).subscribe(res=>{
         
    if(res.status==200){
      this.spinner.hide()
      this.merchantRating=res.body.results.data
    }
  }, err => {
    if (err.status == 500) {
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    } else if (err.status == 403 || err.status == 401) {
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.error.message)
    } 
    this.spinner.hide()
  })
 }




  



imagesUrl(image){
  this.imageUrl=image

}  

// --------------------Items Search api-----------------------//

submitItems(){
  this.spinner.show()
   this.service.getApi(`merchant/admin/items/${this.id}?search=${this.searchItemsname}`,1).subscribe(res=>{
    if(res.status==200){
      this.spinner.hide()
      this.itemsMerchat=res.body.results
 

    }
   },err => {
    if (err.status == 500) {
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    } else if (err.status == 403 || err.status == 401) {
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.error.message)
    } 
    this.spinner.hide()
  })
}

menuCategory(){
  this.spinner.show()
  this.service.getApi(`merchant/admin/categories/${this.id}`,1).subscribe(res=>{
    if(res.status==200){
      this.spinner.hide()
      this.menu_category=res.body.results
    }

  },err => {
    if (err.status == 500) {
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    } else if (err.status == 403 || err.status == 401) {
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.error.message)
    } 
    this.spinner.hide()
  })
}


getsCategory(){
  this.spinner.show()
  this.service.getApi(`merchant/admin/categories/${this.id}?pagination=false`,1).subscribe(res=>{
    if(res.status==200){
      this.spinner.hide()
       this.itemsCategory=res.body
       // this.totalItems=res.body.count
       // this.limit=10
 
     }
  
 },err => {
  if (err.status == 500) {
    this.spinner.hide()
    this.service.toastErr('Internal server error.')
  } else if (err.status == 403 || err.status == 401) {
    this.spinner.hide()
    this.service.logout()
    this.service.toastErr(err.error.message)
  } else if (err.status == 400) {
    this.spinner.hide()
    this.service.toastErr(err.error.message)
  }
  this.spinner.hide()
})
}


SearchByCatogery(value){
  this.spinner.show()
  this.searchByCategory=value
    this.service.getApi(`merchant/admin/items/${this.id}?search=${this.searchByCategory}`,1).subscribe(res=>{
       if(res.status==200){
        this.spinner.hide()
          this.itemsMerchat=res.body.results
          // this.totalItems=res.body.count
          // this.limit=10
    
        }
     
    },err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.error.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.error.message)
      }
      this.spinner.hide()
    })
}

resetRatings(){
  this.ratingName='';
  this.searchbyName='';
  this.getRating();
}
viewAllrecord(){
  this.getOrder()
}
}


