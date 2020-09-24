import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule} from 'ngx-pagination'; 
import { AppRoutingModule } from './app-routing.module';
import { MenubarComponent } from './menubar/menubar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RecaptchaModule} from 'ng-recaptcha';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgxPopoverImageModule} from 'ngx-popover-image';
import { RatingModule} from "ngx-rating";
import { NgOtpInputModule } from  'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule} from "ng-multiselect-dropdown"
// import { IntlInputPhoneModule } from 'intl-input-phone';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from 'ngx-ckeditor';
import { SimpleNotificationsModule } from 'angular2-notifications';
// #############################COMPONENT START ##############################//

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { AddMerchantComponent } from './add-merchant/add-merchant.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { LoginVerificationComponent } from './login-verification/login-verification.component';
import { SubmitKycComponent } from './submit-kyc/submit-kyc.component';
import { AddNewRoleComponent } from './add-new-role/add-new-role.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { ViewKycComponent } from './view-kyc/view-kyc.component';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { DriverApprovedKycComponent } from './driver-approved-kyc/driver-approved-kyc.component';
import { DriverRejectedKycComponent } from './driver-rejected-kyc/driver-rejected-kyc.component';
import { ViewDriverKycComponent } from './view-driver-kyc/view-driver-kyc.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { ChangePasswordVerificationComponent } from './change-password-verification/change-password-verification.component';
import { CustomerManagmentComponent } from './customer-managment/customer-managment.component';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';
import { RegisterMerchantComponent } from './register-merchant/register-merchant.component';
import { WithoutLoginHeaderComponent } from './without-login-header/without-login-header.component';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { DriverSubmitKycComponent } from './driver-submit-kyc/driver-submit-kyc.component';
import { ExcelService } from './services/excel.service';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { FooterComponent } from './footer/footer.component';
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
import { from } from 'rxjs';
import { ManageCousinsComponent } from './manage-cousins/manage-cousins.component';
import { AddCousinsComponent } from './add-cousins/add-cousins.component';
import { ManageAllergnComponent } from './manage-allergn/manage-allergn.component';
import { AddAllergnComponent } from './add-allergn/add-allergn.component';
import { EditCusineComponent } from './edit-cusine/edit-cusine.component';
import { PayoutDriverComponent } from './payout-driver/payout-driver.component';
import { PayoutDriverDetailsComponent } from './payout-driver-details/payout-driver-details.component';
import { PayoutSalesDetailsComponent } from './payout-sales-details/payout-sales-details.component';
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
import { ChatService } from './chat.service';
import { PayoutSaleReprentativePendingComponent } from './payout-sale-reprentative-pending/payout-sale-reprentative-pending.component';
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
import { WebSocketService } from './websocket.service';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ShippingChargeManagerComponent } from './shipping-charge-manager/shipping-charge-manager.component';
import { AddShippingChargeComponent } from './add-shipping-charge/add-shipping-charge.component';
import { EditShippingChargeComponent } from './edit-shipping-charge/edit-shipping-charge.component';
import { NightChargeManagementComponent } from './night-charge-management/night-charge-management.component';
import { ShippingAssignedZoneComponent } from './shipping-assigned-zone/shipping-assigned-zone.component';
import { AddNightChargeComponent } from './add-night-charge/add-night-charge.component';
import { EditNightChargeComponent } from './edit-night-charge/edit-night-charge.component';
import { CouponManagementComponent } from './coupon-management/coupon-management.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { ViewCouponComponent } from './view-coupon/view-coupon.component';
import { ActivityLogManagementComponent } from './activity-log-management/activity-log-management.component';
import { PincodeManagementComponent } from './pincode-management/pincode-management.component';
import { AddPincodeZoneComponent } from './add-pincode-zone/add-pincode-zone.component';
import { EditPincodeZoneComponent } from './edit-pincode-zone/edit-pincode-zone.component';
import { ViewPincodeZoneComponent } from './view-pincode-zone/view-pincode-zone.component';
import { PenaltyManagementComponent } from './penalty-management/penalty-management.component';
import { AddPenaltyComponent } from './add-penalty/add-penalty.component';
import { ViewPenaltyComponent } from './view-penalty/view-penalty.component';
import { ClosePenaltyComponent } from './close-penalty/close-penalty.component';
import { RateCardManagementComponent } from './rate-card-management/rate-card-management.component';
import { AddRateCardComponent } from './add-rate-card/add-rate-card.component';
import { EditRateCardComponent } from './edit-rate-card/edit-rate-card.component';
import { RateAssiznedZoneComponent } from './rate-assizned-zone/rate-assizned-zone.component';
import { ReviewsManagementRestaurentComponent } from './reviews-management-restaurent/reviews-management-restaurent.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { ReviewsManagementDriverComponent } from './reviews-management-driver/reviews-management-driver.component';


import { MilestoneAssiznedZoneComponent } from './milestone-assizned-zone/milestone-assizned-zone.component';
import { MilestoneManagementComponent } from './milestone-management/milestone-management.component';
import { AddMilestoneComponent } from './add-milestone/add-milestone.component';
import { EditMilestoneComponent } from './edit-milestone/edit-milestone.component';
import { SelfieManagementComponent } from './selfie-management/selfie-management.component';
import { SelfieHistoryComponent } from './selfie-history/selfie-history.component';
import { DriverHistoryComponent } from './driver-history/driver-history.component';
import { ReportSettingComponent } from './report-setting/report-setting.component';
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
import { TotalEarningReportComponent } from './total-earning-report/total-earning-report.component';
import { ReportManagementRestaurentEarningComponent } from './report-management-restaurent-earning/report-management-restaurent-earning.component';
import { ReportManagementRestaurantViewComponent } from './report-management-restaurant-view/report-management-restaurant-view.component';
import { ReportManagementDriverEarningComponent } from './report-management-driver-earning/report-management-driver-earning.component';
import { ReportManagementDriverEarningViewComponent } from './report-management-driver-earning-view/report-management-driver-earning-view.component';
import { PayoutHistoryDriverComponent } from './payout-history-driver/payout-history-driver.component';
import { UpdateBannerComponent } from './update-banner/update-banner.component';
import { PayoutHistoryResturantComponent } from './payout-history-resturant/payout-history-resturant.component';
import { BannerManagementComponent } from './banner-management/banner-management.component';
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
export function HttpLoaderFactory(http: HttpClient) {
  // console.log('httppp==>>',http) 
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    MenubarComponent,
    ManageMerchantComponent,
    ChangePasswordComponent,
    MerchantDetailsComponent,
    AddMerchantComponent,
    ManageDriversComponent,
    DriverDetailsComponent,
    LoginVerificationComponent,
    SubmitKycComponent,
    AddNewRoleComponent,
    ManageRoleComponent,
    ViewKycComponent,
    DriverApprovedKycComponent,
    DriverRejectedKycComponent,
    ViewDriverKycComponent,
    PageNotfoundComponent,
    ChangePasswordVerificationComponent,
    CustomerManagmentComponent,
    ViewCustomerDetailsComponent,
    RegisterMerchantComponent,
    WithoutLoginHeaderComponent,
    RegisterDriverComponent,
    DriverSubmitKycComponent,
    ManageStaffComponent,
    FooterComponent,
    AddStaffComponent,
    EditStaffComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CustomerDetailsComponent,
    ManageReportComponent,
    StaffViewComponent,
    RolePermissionComponent,
    ManageSubscriptionComponent,
    OrderHistoryComponent,
    ManageSaleComponent,
    ManageOfferComponent,
     

    AddSalerepresentativeComponent,

    AddOfferComponent,

    ViewOfferComponent,

    ManageCousinsComponent,

    AddCousinsComponent,

    ManageAllergnComponent,

    AddAllergnComponent,

    EditCusineComponent,

    PayoutDriverComponent,

    PayoutDriverDetailsComponent,

    PayoutSalesDetailsComponent,

    ViewAllerganComponent,

    EditAllerganComponent,

    LegalTermComponent,

    StaticContentComponent,

    OrderViewComponent,

    DeliveryChargeComponent,
  ChangeDeliveryChargesComponent,
  ManageFaqComponent,
  AddFaqComponent,
  EditFaqComponent,
  TopicManagementComponent,
  AddTopicComponent,
  EditTopicComponent,
  HelpQuestionComponent,
  AddHelpQuestionComponent,
  EditHelpQuestionComponent,
  BlogManagementComponent,
  AddBlogComponent,
  EditBlogComponent,
  SupportSettingComponent,
  ManageNewsComponent,
  AddNewsComponent,
  EditNewsComponent,
  ReportSectionComponent,
  ChatRoomComponent,
  PayoutSaleReprentativePendingComponent,
  ReportRestaurantComponent,
  TaxSettingComponent,
  InquiriesComponent,
  RestaurantReportDetailsComponent,
  MasterManagementComponent,
  WebsiteHomePageComponent,
  BannerTextComponent,
  HomePageHowItWorkComponent,
  OpenRestaurantPageComponent,
  OpenBannerTextComponent,
  PartnerWithUsComponent,
  PartnerComponent,
  WebsiteRidePageComponent,
  WebsiteRideBannerComponent,
  EditRoleComponent,
  CategoryManagementComponent,
  AddCategoryComponent,
  EditCategoryComponent,
  ShippingChargeManagerComponent,
  AddShippingChargeComponent,
  EditShippingChargeComponent,
  ShippingAssignedZoneComponent,
  NightChargeManagementComponent,
  AddNightChargeComponent,
  EditNightChargeComponent,
  CouponManagementComponent,
  AddCouponComponent,
  ViewCouponComponent,
  ActivityLogManagementComponent,
  PincodeManagementComponent,
  AddPincodeZoneComponent,
  EditPincodeZoneComponent,
  ViewPincodeZoneComponent,
  PenaltyManagementComponent,
  AddPenaltyComponent,
  ViewPenaltyComponent,
  ClosePenaltyComponent,
  RateCardManagementComponent,
  AddRateCardComponent,
  EditRateCardComponent,
  RateAssiznedZoneComponent,
  ReviewsManagementRestaurentComponent,
  EditReviewComponent,
  ReviewsManagementDriverComponent,
  MilestoneAssiznedZoneComponent,
  MilestoneManagementComponent,
  AddMilestoneComponent,
  EditMilestoneComponent,
  SelfieManagementComponent,
  SelfieHistoryComponent,
  DriverHistoryComponent,
  ReportSettingComponent,
  PayoutManagementComponent,
  ViewPayoutDriverDetailsComponent,
  PayoutManagementRestaurentComponent,
  RefundManagementComponent,
  AddRefundComponent,
  AccountLedgerManagementComponent,
  ReportSettingManagementComponent,
  ReportManagementOrdersComponent,
  ReportManagementRestaurentRatingComponent,
  ReportManagementDriverRatingComponent,
  TotalEarningReportComponent,
  ReportManagementRestaurentEarningComponent,
  ReportManagementRestaurantViewComponent,
  ReportManagementDriverEarningComponent,
  ReportManagementDriverEarningViewComponent,
  PayoutHistoryDriverComponent,
  BannerManagementComponent,
  UpdateBannerComponent,
  PayoutHistoryDriverComponent,
  PayoutHistoryResturantComponent,
  RestaurentPayoutHistoryComponent,
  NotificationsComponent,
  NotificationManagementComponent,
  NotificationHistoryComponent,
  SessionHistoryDriverComponent,
  SessionHistoryResturantComponent,
  TipAndCharityComponent,
  TipManagementComponent,
  ReferFriendManagementComponent,
  WalletUpdateRequestsComponent,
  HelpAndSupportComponent,
  TicketManagementComponent,
  AddQuestionComponent,
  EditQuestionComponent,
  ReplyTicketComponent,
  BadWeatherChargeManagementComponent,
  ViewCustomerOrderDetailsComponent,
  RestaurantManagementComponent,
  AddRestaurantComponent,
  AddRestaurantDetailsComponent,
  AddRestaurentItemDetailsComponent,
  AddRestaurantBankDetailsComponent,
  EditRestaurantCompanyDetailsComponent,
  ViewCompanyDetailsComponent,
  ViewRestaurantDetailsComponent,
  ViewRestaurantItemDetailsComponent,
  ViewBankDetailsComponent,
  AddMenuItemsComponent,
  EditRestaurantDetailsComponent,
  EditRestaurantItemDetailsComponent,
  EditRestaurantBankDetailsComponent,
  EditBadWeatherChargeComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxCaptchaModule,
    NgxSpinnerModule,
    RecaptchaModule,
    NgxPopoverImageModule,
    InternationalPhoneNumberModule,
    NgOtpInputModule,
    SimpleNotificationsModule.forRoot(),
    
    // CKEditorModule,
    CKEditorModule,
    ToastrModule.forRoot({
      maxOpened :1,
      preventDuplicates: true,
    }),
    RatingModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // NgSelectModule,
    
  ],
  providers: [ExcelService,ChatService,WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
