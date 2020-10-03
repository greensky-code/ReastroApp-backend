import { TotalEarningReportComponent } from './total-earning-report/total-earning-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { LoginVerificationComponent } from './login-verification/login-verification.component';
import { SubmitKycComponent } from './submit-kyc/submit-kyc.component';
import { AddNewRoleComponent } from './add-new-role/add-new-role.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ViewKycComponent } from './view-kyc/view-kyc.component';
import { ViewDriverKycComponent } from './view-driver-kyc/view-driver-kyc.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { ChangePasswordVerificationComponent } from './change-password-verification/change-password-verification.component';
import { CustomerManagmentComponent } from './customer-managment/customer-managment.component';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';
import { RegisterMerchantComponent } from './register-merchant/register-merchant.component';
import { AuthGuard } from './auth.guard';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { DriverSubmitKycComponent } from './driver-submit-kyc/driver-submit-kyc.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { StaffViewComponent } from './staff-view/staff-view.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { ManageSubscriptionComponent } from './manage-subscription/manage-subscription.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ManageSaleComponent } from './manage-sale/manage-sale.component';
import { ManageOfferComponent } from './manage-offer/manage-offer.component';
import { AddSalerepresentativeComponent } from './add-salerepresentative/add-salerepresentative.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import { ManageCousinsComponent } from './manage-cousins/manage-cousins.component';
import { AddCousinsComponent } from './add-cousins/add-cousins.component';
import { ManageAllergnComponent } from './manage-allergn/manage-allergn.component';
import { AddAllergnComponent } from './add-allergn/add-allergn.component';
import { EditCusineComponent } from './edit-cusine/edit-cusine.component';
import { PayoutDriverComponent } from './payout-driver/payout-driver.component';
import { PayoutDriverDetailsComponent } from './payout-driver-details/payout-driver-details.component';
import { ViewAllerganComponent } from './view-allergan/view-allergan.component';
import { EditAllerganComponent } from './edit-allergan/edit-allergan.component';
import { LegalTermComponent } from './legal-term/legal-term.component';
import { StaticContentComponent } from './static-content/static-content.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { DeliveryChargeComponent } from './delivery-charge/delivery-charge.component';
import { ChangeDeliveryChargesComponent } from './change-delivery-charges/change-delivery-charges.component';
import { ManageFaqComponent } from './manage-faq/manage-faq.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { EditFaqComponent } from './edit-faq/edit-faq.component';
import { TopicManagementComponent } from './topic-management/topic-management.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { HelpQuestionComponent } from './help-question/help-question.component';
import { AddHelpQuestionComponent } from './add-help-question/add-help-question.component';
import { EditHelpQuestionComponent } from './edit-help-question/edit-help-question.component';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { SupportSettingComponent } from './support-setting/support-setting.component';
import { ManageNewsComponent } from './manage-news/manage-news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { ReportSectionComponent } from './report-section/report-section.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { PayoutSaleReprentativePendingComponent } from './payout-sale-reprentative-pending/payout-sale-reprentative-pending.component';
import { PayoutSalesDetailsComponent } from './payout-sales-details/payout-sales-details.component';
import { ReportRestaurantComponent } from './report-restaurant/report-restaurant.component';
import { TaxSettingComponent } from './tax-setting/tax-setting.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { RestaurantReportDetailsComponent } from './restaurant-report-details/restaurant-report-details.component';
import { MasterManagementComponent } from './master-management/master-management.component';
import { WebsiteHomePageComponent } from './website-home-page/website-home-page.component';
import { BannerTextComponent } from './banner-text/banner-text.component';
import { HomePageHowItWorkComponent } from './home-page-how-it-work/home-page-how-it-work.component';
import { OpenRestaurantPageComponent } from './open-restaurant-page/open-restaurant-page.component';
import { OpenBannerTextComponent } from './open-banner-text/open-banner-text.component';
import { PartnerWithUsComponent } from './partner-with-us/partner-with-us.component';
import { PartnerComponent } from './partner/partner.component';
import { WebsiteRidePageComponent } from './website-ride-page/website-ride-page.component';
import { WebsiteRideBannerComponent } from './website-ride-banner/website-ride-banner.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ShippingChargeManagerComponent } from './shipping-charge-manager/shipping-charge-manager.component';
import { AddShippingChargeComponent } from './add-shipping-charge/add-shipping-charge.component';
import { EditShippingChargeComponent } from './edit-shipping-charge/edit-shipping-charge.component';
import { NightChargeManagementComponent } from './night-charge-management/night-charge-management.component';
import { AddNightChargeComponent } from './add-night-charge/add-night-charge.component';
import { EditNightChargeComponent } from './edit-night-charge/edit-night-charge.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { ViewCouponComponent } from './view-coupon/view-coupon.component';
import { ActivityLogManagementComponent } from './activity-log-management/activity-log-management.component';
import { ShippingAssignedZoneComponent } from './shipping-assigned-zone/shipping-assigned-zone.component';
import { PincodeManagementComponent } from './pincode-management/pincode-management.component';
import { AddPincodeZoneComponent } from './add-pincode-zone/add-pincode-zone.component';
import { EditPincodeZoneComponent } from './edit-pincode-zone/edit-pincode-zone.component';
import { ViewPincodeZoneComponent } from './view-pincode-zone/view-pincode-zone.component';
import { PenaltyManagementComponent } from './penalty-management/penalty-management.component';
import { AddPenaltyComponent } from './add-penalty/add-penalty.component';
import { ViewPenaltyComponent } from './view-penalty/view-penalty.component';
import { ClosePenaltyComponent } from './close-penalty/close-penalty.component';
import { RateCardManagementComponent } from './rate-card-management/rate-card-management.component';
import { RateAssiznedZoneComponent } from './rate-assizned-zone/rate-assizned-zone.component';
import { AddRateCardComponent } from './add-rate-card/add-rate-card.component';
import { EditRateCardComponent } from './edit-rate-card/edit-rate-card.component';
import { ReviewsManagementRestaurentComponent } from './reviews-management-restaurent/reviews-management-restaurent.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { ReviewsManagementDriverComponent } from './reviews-management-driver/reviews-management-driver.component';
import { MilestoneManagementComponent } from './milestone-management/milestone-management.component';
import { AddMilestoneComponent } from './add-milestone/add-milestone.component';
import { EditMilestoneComponent } from './edit-milestone/edit-milestone.component';
import { MilestoneAssiznedZoneComponent } from './milestone-assizned-zone/milestone-assizned-zone.component';
import { SelfieManagementComponent } from './selfie-management/selfie-management.component';
import { SelfieHistoryComponent } from './selfie-history/selfie-history.component';
import { DriverHistoryComponent } from './driver-history/driver-history.component';
import { PayoutManagementComponent } from './payout-management/payout-management.component';
import { ViewPayoutDriverDetailsComponent } from './view-payout-driver-details/view-payout-driver-details.component';
import { PayoutManagementRestaurentComponent } from './payout-management-restaurent/payout-management-restaurent.component';
import { RefundManagementComponent } from './refund-management/refund-management.component';
import { AddRefundComponent } from './add-refund/add-refund.component';
import { AccountLedgerManagementComponent } from './account-ledger-management/account-ledger-management.component';
import { ReportSettingManagementComponent } from './report-setting-management/report-setting-management.component';
import { ReportManagementOrdersComponent } from './report-management-orders/report-management-orders.component';
import { ReportManagementRestaurentRatingComponent } from './report-management-restaurent-rating/report-management-restaurent-rating.component';
import { ReportManagementDriverRatingComponent } from './report-management-driver-rating/report-management-driver-rating.component';
import { ReportManagementRestaurentEarningComponent } from './report-management-restaurent-earning/report-management-restaurent-earning.component';
import { ReportManagementRestaurantViewComponent } from './report-management-restaurant-view/report-management-restaurant-view.component';
import { ReportManagementDriverEarningComponent } from './report-management-driver-earning/report-management-driver-earning.component';
import { ReportManagementDriverEarningViewComponent } from './report-management-driver-earning-view/report-management-driver-earning-view.component';
import { PayoutHistoryDriverComponent } from './payout-history-driver/payout-history-driver.component';
import { BannerManagementComponent } from './banner-management/banner-management.component';
import { UpdateBannerComponent } from './update-banner/update-banner.component';
import { PayoutHistoryResturantComponent } from './payout-history-resturant/payout-history-resturant.component';
import { RestaurentPayoutHistoryComponent } from './restaurent-payout-history/restaurent-payout-history.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationManagementComponent } from './notification-management/notification-management.component';
import { NotificationHistoryComponent } from './notification-history/notification-history.component';
import { SessionHistoryDriverComponent } from './session-history-driver/session-history-driver.component';
import { SessionHistoryResturantComponent } from './session-history-resturant/session-history-resturant.component';
import { TipAndCharityComponent } from './tip-and-charity/tip-and-charity.component';
import { TipManagementComponent } from './tip-management/tip-management.component';
import { ReferFriendManagementComponent } from './refer-friend-management/refer-friend-management.component';
import { WalletUpdateRequestsComponent } from './wallet-update-requests/wallet-update-requests.component';
import { HelpAndSupportComponent } from './help-and-support/help-and-support.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { ReplyTicketComponent } from './reply-ticket/reply-ticket.component';
import { BadWeatherChargeManagementComponent } from './bad-weather-charge-management/bad-weather-charge-management.component';
import { ViewCustomerOrderDetailsComponent } from './view-customer-order-details/view-customer-order-details.component';
import { RestaurantManagementComponent } from './restaurant-management/restaurant-management.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { AddRestaurantDetailsComponent } from './add-restaurant-details/add-restaurant-details.component';
import { AddRestaurentItemDetailsComponent } from './add-restaurent-item-details/add-restaurent-item-details.component';
import { AddRestaurantBankDetailsComponent } from './add-restaurant-bank-details/add-restaurant-bank-details.component';
import { EditRestaurantCompanyDetailsComponent } from './edit-restaurant-company-details/edit-restaurant-company-details.component';

import { ViewCompanyDetailsComponent } from './view-company-details/view-company-details.component';
import { ViewRestaurantDetailsComponent } from './view-restaurant-details/view-restaurant-details.component';
import { ViewRestaurantItemDetailsComponent } from './view-restaurant-item-details/view-restaurant-item-details.component';
import { ViewBankDetailsComponent } from './view-bank-details/view-bank-details.component';
import { AddMenuItemsComponent } from './add-menu-items/add-menu-items.component';
import { EditRestaurantDetailsComponent } from './edit-restaurant-details/edit-restaurant-details.component';
import { EditRestaurantItemDetailsComponent } from './edit-restaurant-item-details/edit-restaurant-item-details.component';
import { EditRestaurantBankDetailsComponent } from './edit-restaurant-bank-details/edit-restaurant-bank-details.component';
import { EditBadWeatherChargeComponent } from './edit-bad-weather-charge/edit-bad-weather-charge.component';


const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'header', component: HeaderComponent ,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'manage-merchant', component: ManageMerchantComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'change-password-verification', component: ChangePasswordVerificationComponent },
  { path: 'merchant-details/:id', component: MerchantDetailsComponent, canActivate: [AuthGuard] },
  { path: 'register-merchant', component: RegisterMerchantComponent, canActivate: [AuthGuard] },
  { path: 'manage-drivers', component: ManageDriversComponent, canActivate: [AuthGuard] },
  { path: 'driver-details/:id', component: DriverDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login-verification/:id', component: LoginVerificationComponent },
  { path: 'submit-kyc/:id', component: SubmitKycComponent, canActivate: [AuthGuard] },
  { path: 'add-new-role', component: AddNewRoleComponent, canActivate: [AuthGuard] },
  { path: 'manage-role', component: ManageRoleComponent},
  { path: 'edit-role', component:EditRoleComponent},
  { path: 'view-kyc/:id', component: ViewKycComponent, canActivate: [AuthGuard] },
  { path: 'driver-view-kyc/:id', component: ViewDriverKycComponent, canActivate: [AuthGuard] },
  { path: "customer-mngt", component: CustomerManagmentComponent, canActivate: [AuthGuard] },
  { path: 'sale-representative-details/:id', component: ViewCustomerDetailsComponent, canActivate: [AuthGuard] },
  { path: "page-notfound", component: PageNotfoundComponent, canActivate: [AuthGuard] },
  { path: "customer-managment", component: CustomerManagmentComponent, canActivate: [AuthGuard] },
  { path: 'register-driver', component: RegisterDriverComponent, canActivate: [AuthGuard] },
  { path: 'driver-submit-kyc/:id', component: DriverSubmitKycComponent, canActivate: [AuthGuard] },
  { path: 'manage-staff', component: ManageStaffComponent, canActivate: [AuthGuard] },
  { path: 'add-staff', component: AddStaffComponent, canActivate: [AuthGuard] },
  { path: 'edit-staff/:id', component: EditStaffComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'customer-details/:id', component: CustomerDetailsComponent, canActivate: [AuthGuard] },
  { path: 'manage-report', component: ManageReportComponent , canActivate: [AuthGuard]},
  { path: 'staff-view/:id', component: StaffViewComponent, canActivate: [AuthGuard] },
  { path: 'role-permission/:id', component: RolePermissionComponent , canActivate: [AuthGuard]},
  { path: 'manage-subscription', component: ManageSubscriptionComponent , canActivate: [AuthGuard]},
  { path: 'order-history', component: OrderHistoryComponent , canActivate: [AuthGuard]},
  { path: 'manage-sale', component: ManageSaleComponent , canActivate: [AuthGuard]},
  { path: 'manage-offer', component: ManageOfferComponent , canActivate: [AuthGuard]},
  { path: 'add-offer', component: AddOfferComponent , canActivate: [AuthGuard]},
  { path: 'add-sale-representative', component: AddSalerepresentativeComponent },
  { path: 'view-offer-details/:id', component: ViewOfferComponent , canActivate: [AuthGuard]},
  { path: 'manage-cuisine', component: ManageCousinsComponent , canActivate: [AuthGuard]},
  { path: 'add-cuisine', component: AddCousinsComponent , canActivate: [AuthGuard]},
  { path: 'manage-allergen', component: ManageAllergnComponent , canActivate: [AuthGuard]},
  { path: 'add-allergen', component: AddAllergnComponent , canActivate: [AuthGuard]},
  { path: 'edit-cuisine/:id', component: EditCusineComponent },
  { path: 'payout-driver', component: PayoutDriverComponent , canActivate: [AuthGuard]},
  { path: 'payout-driver-details/:id', component: PayoutDriverDetailsComponent, canActivate: [AuthGuard] },
  { path: 'view-allergan/:id/:val', component: ViewAllerganComponent, canActivate: [AuthGuard]},
  { path: 'edit-allergan/:id/:language', component: EditAllerganComponent, canActivate: [AuthGuard]},
  { path: 'legal-terms', component: LegalTermComponent, canActivate: [AuthGuard]},
  { path: 'service/:type/:language/:id', component: StaticContentComponent, canActivate: [AuthGuard]},
  { path: 'order-view', component: OrderViewComponent, canActivate: [AuthGuard]},
  { path:'delivery-charge',component:DeliveryChargeComponent, canActivate: [AuthGuard]},
  { path:'change-delivery-charges',component:ChangeDeliveryChargesComponent, canActivate: [AuthGuard]},
  {path:'manage-faq',component:ManageFaqComponent, canActivate: [AuthGuard]},
  {path:'add-faq',component:AddFaqComponent, canActivate: [AuthGuard]},
  {path:'edit-faq',component:EditFaqComponent, canActivate: [AuthGuard]},
  {path:'topic-management',component:TopicManagementComponent},
  {path:'add-topic',component:AddTopicComponent, canActivate: [AuthGuard]},
  {path:'edit-topic',component:EditTopicComponent, canActivate: [AuthGuard]},
  {path:'help-question',component:HelpQuestionComponent, canActivate: [AuthGuard]},
  {path:'add-help-question',component:AddHelpQuestionComponent, canActivate: [AuthGuard]},
  {path:'edit-help-question',component:EditHelpQuestionComponent, canActivate: [AuthGuard]},
  {path:'blog-management',component:BlogManagementComponent, canActivate: [AuthGuard]},
  {path:'add-blog',component:AddBlogComponent, canActivate: [AuthGuard]},
  {path:'edit-blog',component:EditBlogComponent, canActivate: [AuthGuard]}, 
  {path:'support-setting',component:SupportSettingComponent, canActivate: [AuthGuard]},
  {path:'manage-news',component:ManageNewsComponent, canActivate: [AuthGuard]},
  {path:'add-news',component:AddNewsComponent, canActivate: [AuthGuard]},
  {path:'edit-news',component:EditNewsComponent, canActivate: [AuthGuard]},
  {path:'report-section',component:ReportSectionComponent, canActivate: [AuthGuard]},
  {path:'chat-room',component:ChatRoomComponent, canActivate: [AuthGuard]},
  {path:'payout-sale-reprentative-pending',component:PayoutSaleReprentativePendingComponent, canActivate: [AuthGuard]},
  {path:'payout-sales-details/:id',component:PayoutSalesDetailsComponent, canActivate: [AuthGuard]},
  {path:'report-restaurant',component:ReportRestaurantComponent, canActivate: [AuthGuard]},
  {path:'tax-setting',component:TaxSettingComponent,canActivate: [AuthGuard] },
  {path:'inquiries',component:InquiriesComponent,canActivate: [AuthGuard] },
  {path:'restaurant-report-details',component:RestaurantReportDetailsComponent,canActivate: [AuthGuard] },
  {path:'master-management',component:MasterManagementComponent,canActivate: [AuthGuard] },
  {path:"website-home-page",component:WebsiteHomePageComponent,canActivate: [AuthGuard] },
  {path:"banner-text",component:BannerTextComponent,canActivate: [AuthGuard] },
  {path:'home-page-how-it-work',component:HomePageHowItWorkComponent,canActivate: [AuthGuard] },
  {path:'open-restaurant-page',component:OpenRestaurantPageComponent,canActivate: [AuthGuard] },
  {path:'open-banner-text',component:OpenBannerTextComponent,canActivate: [AuthGuard] },
  {path:'partner-with-us',component:PartnerWithUsComponent,canActivate: [AuthGuard] },
  {path:'partner',component:PartnerComponent,canActivate: [AuthGuard] },
  {path:'category-management',component:CategoryManagementComponent },
  {path:'add-category',component:AddCategoryComponent },
  {path:'edit-category/:id',component:EditCategoryComponent },
  {path:'night-charge-management',component:NightChargeManagementComponent },
  {path:'add-night-charge',component:AddNightChargeComponent },
  {path:'edit-night-charge',component:EditNightChargeComponent },
  {path:'coupon-management',component:CouponManagementComponent },
   {path:'add-coupon',component:AddCouponComponent },
   {path:'view-coupon/:id',component:ViewCouponComponent },
   {path:'reviews-management-restaurent',component:ReviewsManagementRestaurentComponent },
   {path :'reviews-management-driver' ,component : ReviewsManagementDriverComponent},
   {path :'report-management-driver-earning-view' ,component : ReportManagementDriverEarningViewComponent},
   {path:'edit-review',component:EditReviewComponent },
   {path:'payout-management',component:PayoutManagementComponent },
   {path :'view-payout-driver-details',component: ViewPayoutDriverDetailsComponent},
   {path :'payout-management-restaurent',component: PayoutManagementRestaurentComponent},
   {path :'report-management-orders',component: ReportManagementOrdersComponent},
   {path :'report-management-restaurent-rating',component: ReportManagementRestaurentRatingComponent},
   {path :'report-management-driver-rating',component : ReportManagementDriverRatingComponent},
   {path :'total-earning-report',component : TotalEarningReportComponent},
   {path :"report-management-restaurent-earning",component: ReportManagementRestaurentEarningComponent},
   {path :"report-management-restaurant-view",component: ReportManagementRestaurantViewComponent},
   {path : 'report-management-driver-earning',component : ReportManagementDriverEarningComponent},
   {path : 'payout-history-driver' , component : PayoutHistoryDriverComponent},
   {path :'notifications' , component : NotificationsComponent},
   {path :'notification-management' , component : NotificationManagementComponent},
   {path : 'notification-history' , component : NotificationHistoryComponent},
   {path :"add-restaurant-details", component : AddRestaurantDetailsComponent},
   {path :"add-restaurent-item-details", component : AddRestaurentItemDetailsComponent},
   {path :'add-restaurant',component : AddRestaurantComponent},
   {path :'restaurant-management' , component : RestaurantManagementComponent},


  {path:'website-ride-page',component:WebsiteRidePageComponent,canActivate: [AuthGuard] },
  {path:'website-ride-banner',component:WebsiteRideBannerComponent,canActivate: [AuthGuard] }, 
  {path:'shipping-charge', component:ShippingChargeManagerComponent},
  {path:'activity-log-management', component:ActivityLogManagementComponent},
  {path:'add-shipping-charge', component:AddShippingChargeComponent},
  {path:'edit-shipping-charge', component:EditShippingChargeComponent},
  {path:'shipping-assigned-zone', component:ShippingAssignedZoneComponent},
  {path:'pincode-management',component:PincodeManagementComponent},
  {path:'add-pincode-zone', component:AddPincodeZoneComponent},
  {path:'edit-pincode-zone', component:EditPincodeZoneComponent},
  {path:'view-pincode-zone', component:ViewPincodeZoneComponent},
  {path:'penalty-management', component:PenaltyManagementComponent},
  {path:'add-penalty', component:AddPenaltyComponent},
  {path:'view-penalty', component:ViewPenaltyComponent},
  {path:'close-penalty',component:ClosePenaltyComponent},
  {path:'rate-card-management', component:RateCardManagementComponent},
  {path:'rate-assizned-zone', component:RateAssiznedZoneComponent},
  {path:'add-rate-card', component:AddRateCardComponent},
  {path:'edit-rate-card',component:EditRateCardComponent},
  {path:'milestone-management', component:MilestoneManagementComponent},
  {path:'add-milestone', component:AddMilestoneComponent},
  {path:'edit-milestone', component:EditMilestoneComponent},
  {path:'milestone-assizned',component:MilestoneAssiznedZoneComponent},
  {path:'selfie-management', component:SelfieManagementComponent, canActivate:[AuthGuard]},
  {path:'selfie-history', component:SelfieHistoryComponent},
  {path:'driver-history', component:DriverHistoryComponent},
  {path:'refund-management', component:RefundManagementComponent, canActivate:[AuthGuard]},
  {path:'add-refund', component:AddRefundComponent},
  {path:'account-ledger', component:AccountLedgerManagementComponent, canActivate:[AuthGuard]},
  {path:'report-setting-management', component:ReportSettingManagementComponent},
  {path:'banner-management',component:BannerManagementComponent, canActivate:[AuthGuard]},
  {path:'update-banner', component:UpdateBannerComponent},
  {path:'payout-history-driver', component:PayoutHistoryDriverComponent,canActivate:[AuthGuard]},
  {path :'restaurent-payout-history',component : RestaurentPayoutHistoryComponent},
  {path:'payout-history-resturant',component:PayoutHistoryResturantComponent, canActivate:[AuthGuard]},
  {path:'session-history-driver', component:SessionHistoryDriverComponent, canActivate:[AuthGuard]},
  {path:'session-history-resturant', component:SessionHistoryResturantComponent, canActivate:[AuthGuard]},
  {path:'tip-charity', component:TipAndCharityComponent, canActivate:[AuthGuard]},
  {path:'tip-management', component:TipManagementComponent},
  {path:'refer-friend', component:ReferFriendManagementComponent, canActivate:[AuthGuard]},
  {path:'wallet-update', component:WalletUpdateRequestsComponent, canActivate:[AuthGuard]},
  {path:'help-support', component:HelpAndSupportComponent, canActivate:[AuthGuard]},
  {path:'add-question', component:AddQuestionComponent},
  {path:'bad-weather-charge-management' ,component : BadWeatherChargeManagementComponent},
  {path:'edit-question', component:EditQuestionComponent},
  {path:'ticket-management', component:TicketManagementComponent, canActivate:[AuthGuard]},
  {path:'reply-ticket', component:ReplyTicketComponent},
  {path :'add-restaurant-bank-details' , component : AddRestaurantBankDetailsComponent},
  {path :'edit-restaurant-company-details',component : EditRestaurantCompanyDetailsComponent},
  {path :"add-restaurant-details", component : AddRestaurantDetailsComponent},
  {path :'edit-restaurant-details',component : EditRestaurantDetailsComponent},
  {path :'edit-restaurant-item-details',component : EditRestaurantItemDetailsComponent},
  {path :'edit-restaurant-bank-details',component : EditRestaurantBankDetailsComponent},
  {path :"add-restaurent-item-details", component : AddRestaurentItemDetailsComponent},
  {path : "edit-bad-weather-charge", component : EditBadWeatherChargeComponent},
  {path:'view-customer-order',component:ViewCustomerOrderDetailsComponent},
  {path:'view-company-details', component:ViewCompanyDetailsComponent},
  {path:'view-resturant-details', component:ViewRestaurantDetailsComponent},
  {path:'view-resturant-item-details', component:ViewRestaurantItemDetailsComponent},
  {path:'view-bank-details',component:ViewBankDetailsComponent},
  {path:'add-menu-item', component:AddMenuItemsComponent},
  {path: '**', redirectTo: 'page-notfound'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
