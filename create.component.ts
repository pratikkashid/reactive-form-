import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/shared/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  selectedIndex: number = 0;

  
   name!: string;
   firstname!: string;
   middlename!: string;
   lastname!: string;
  
  //  address variables 
  houseNo!: string;
  buildingName!: string;
  area!: string;
  landMark!: string;
  city!: string;
  state!: string;
  zip!: string;
  address!:string;
  user!: User;
  demoform!:FormGroup;
  createform!: FormGroup;

  constructor(private fb :FormBuilder, private userservice:UserService,private route :Router) { 
    this.createform=this.fb.group({
      name:new FormControl(""),
      dob:new FormControl(""),
      age:new FormControl(""),
      address:new FormControl("")
    });
    // this.demoform=this.fb.group({
    // name:this.fb.array([this.initname(),]),
    // dob:new FormControl(""),
    // age:new FormControl(""),
    // address:this.fb.array([this.initaddress(),])

    // });
    
    this.demoform=this.fb.group({
      name:this.fb.group({
         Firstname:new FormControl(""),
         Lastname:new FormControl(""),
      }),
      dob:new FormControl(""),
      age:new FormControl(""),
      address:this.fb.group({
        line1:new FormControl(""),
        city:new FormControl(""),
        zip:new FormControl("")
      })
    })
  }
   
  ngOnInit(): void {
    
  }

  // onSubmit(form :NgForm) we cant write here to post data from form to ag grid grid we have to map this form data to User type then use post method
onSubmit(form :User){
  console.log(form);
  this.userservice.addUser(form).subscribe((data)=>{
    console.log(data);
    this.route.navigate(['']);
  }
  );

}
generateName(){
const stringarray: string[]=[this.firstname,this.middlename,this.lastname];
console.log(stringarray);
const joinarr:string[]=[];
for(let i=0;i<stringarray.length;i++){
  if(stringarray[i]){
    joinarr.push(stringarray[i]);
  }
}
this.name=joinarr.join(" ");
console.log(this.name);

}

generateAddress(){
  const addressArr:string[]=[this.houseNo,this.buildingName,this.area,this.landMark,this.city,this.state,this.zip];
  // removing null element from array
  const newarr:string[]=[];
  for(let i=0;i<addressArr.length;i++){
    if(addressArr[i]){
      newarr.push(addressArr[i]);
    }
  }
  this.address=newarr.join(" , ");
  console.log(this.address);
}


nextStep() {
  if (this.selectedIndex != 1) {
    this.selectedIndex = this.selectedIndex + 1;
  }
  console.log(this.selectedIndex);
}

previousStep() {
  if (this.selectedIndex != 0) {
    this.selectedIndex = this.selectedIndex - 1;
  }
  console.log(this.selectedIndex);
}

savedata(){
  this.generateName();
  this.nextStep();
}

saveAddress(){
  this.generateAddress();
}
submit(form:User){
  
  this.userservice.addUser(form).subscribe(data=>{
    console.log(data);
  })
}

// name():FormArray{
//   return this.demoform.get("name")as FormArray;
//   }
//   address():FormArray{
//     return this.demoform.get("address")as FormArray;
//   }

// initname(){
//   return this.fb.group({
//     firstName:new FormControl(""),
//     middleName:new FormControl(""),
//     lastName:new FormControl(""),
//   })
  
// }
// initaddress(){
//   return this.fb.group({
//     houseNo:new FormControl(""),
//     buildingName:new FormControl(""),
//     area:new FormControl(""),
//     landMark:new FormControl(""),
//     city:new FormControl(""),
//     state:new FormControl(""),
//     zip:new FormControl("")
//   })
// }
// addUser(demo:User){
//   console.log(demo);
//   this.userservice.addUser(demo).subscribe((data)=>{
//     console.log(data);
//     this.route.navigate(['']);
//   }
//   );
// }

}
