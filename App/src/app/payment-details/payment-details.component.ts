import { Component,OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit{
  constructor(public service:PaymentDetailService,private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.service.refreshList()
  }
  populateForm(selectedRecord:PaymentDetail){
    this.service.formData = Object.assign({},selectedRecord)
  }
  onDelete(id:number){
    if(confirm('Are you sure to delete this record?')){
      this.service.deletePaymentDetail(id)
      .subscribe({
        next:res=>{
          this.service.list = res as PaymentDetail[]
          this.toastr.error('Delete successfully','Payment Detail Register')
        },
        error:err=>{
          console.error(err)
          this.toastr.error('Inserted error','Payment Detail Register')
        }
      })
    }
  }
}
