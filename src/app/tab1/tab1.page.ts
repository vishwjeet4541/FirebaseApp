import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  Address: any;
  L_Name:any;
  F_Name:any;
  phone:any;
  List: any;
  itemlistId: any;
  elementarray: any;
  constructor(  public db: AngularFirestore,private afs: AngularFirestore, ) {

    const things = db.collection('TGC').valueChanges();
    things.subscribe(data =>{
      console.log(data)
   this.List = data
    });

    var collection = this.afs.collection("TGC")
     this.itemlistId = collection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id']
          console.log(id)
          return { id};
        }   )
      )
     );
   this.itemlistId.subscribe( element=>{
  this.elementarray = element
  console.log(this.elementarray)
   })

  }
  save(){
    var save = this.db.collection('TGC')
    save.add({
      FName: this.F_Name,
      LName:this.L_Name,
      phone:this.phone,
      Address:this.Address
    })
  }

  delete(i){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'deleted successfully',
      showConfirmButton: false,
      timer: 1500
    })
  var id =  this.elementarray[i]
  console.log(id)
  var collection = this.afs.collection("TGC")
  collection.doc(id.id).delete()

  }
}
