import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the DatabasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-database',
  templateUrl: 'database.html',
})
export class DatabasePage {

	/**
    *      Define FormGroup property for managing form validation / data retrieval
    */
   public form                   : FormGroup;




   /**
    *      Model for managing technologyName field
    */
   public userName         : any; //technology/name

    /**
    *      Model for managing technologyDescription field
    */
   public password  : any;




   /**
    *      Flag to be used for checking whether we are adding/editing an entry
    */
   public isEdited               : boolean = false;




   /**
    *    Flag to hide the form upon successful completion of remote operation
    */
   public hideForm               : boolean = false;




   /**
    *    Property to help set the page title
    */
   public pageTitle              : string;




   /**
    *     Property to store the recordID for when an existing entry is being edited
    */
   //public recordID               : any      = null;




   /**
    *      Remote URI for retrieving data from and sending data to
    */
   private baseURI               : string  = "http://localhost:81/ionic-php-mysql/";


  constructor(public navCtrl    : NavController,
               public http       : HttpClient,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController) {
  	// Create form builder validation rules
      this.form = fb.group({
         "userName"                  : ["", Validators.required],
         "password"           : ["", Validators.required]
      });
  }

  /**
    * Triggered when template view is about to be entered
    * Determine whether we adding or editing a record
    * based on any supplied navigation parameters
    *
    */
   ionViewWillEnter() : void
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Sign Up';
      }
   }




   /**
    * Assign the navigation retrieved data to properties
    * used as models on the page's HTML form
    *
    */
   selectEntry(item : any) : void
   {
      this.userName     = item.userName;
      this.password 	= item.password;
      //this.recordID     = item.id;
   }




   /**
    * Save a new record that has been added to the page's HTML form
    * Use angular's http post method to submit the record data
    *
    */
   createEntry(userName : string, password : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "create", "userName" : userName, "password" : password },
          url       : any      	= this.baseURI + "manage-data.php";

      this.http.post(url, JSON.stringify(options), headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.hideForm   = true;
         this.sendNotification(`Congratulations: ${userName} was successfully added`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }




   /**
    * Update an existing record that has been edited in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    */
   updateEntry(userName : string, password : string) : void
   {
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "update", "userName" : userName, "password" : password/*, "recordID" : this.recordID*/},
          url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         this.hideForm  =  true;
         this.sendNotification(`Congratulations: ${userName} was successfully updated`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }




   /**
    * Remove an existing record that has been selected in the page's HTML form
    * Use angular's http post method to submit the record data
    * to our remote PHP script
    *
    */
   deleteEntry() : void
   {
      let userName      : string 	= this.form.controls["userName"].value,
          headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "delete"/*, "recordID" : this.recordID*/},
          url       : any      	= this.baseURI + "manage-data.php";

      this.http
      .post(url, JSON.stringify(options), headers)
      .subscribe(data =>
      {
         this.hideForm     = true;
         this.sendNotification(`Congratulations: ${userName} was successfully deleted`);
      },
      (error : any) =>
      {
         this.sendNotification('Something went wrong!');
      });
   }




   /**
    * Handle data submitted from the page's HTML form
    * Determine whether we are adding a new record or amending an
    * existing record
    *
    */
   saveEntry() : void
   {
      let userName          : string = this.form.controls["userName"].value,
          password   : string    = this.form.controls["password"].value;

      if(this.isEdited)
      {
         this.updateEntry(userName, password);
      }
      else
      {
         this.createEntry(userName, password);
      }
   }




   /**
    * Clear values in the page's HTML form fields
    *
    */
   resetFields() : void
   {
      this.userName           = "";
      this.password    = "";
   }




   /**
    * Manage notifying the user of the outcome of remote operations
    *
    */
   sendNotification(message : string)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatabasePage');
  }

}

/**
 
 <ion-item *ngIf="isEdited && !hideForm">
         <button
            ion-button
            item-right
            color="secondary"
            text-center
            block
            (click)="deleteEntry()">Remove this Entry?</button>
      </ion-item>


      <div *ngIf="hideForm">
         <ion-item class="post-entry-message" text-wrap>
            <h2>Success!</h2>
            <p>Maybe you'd like to edit an existing entry or add a new record?</p>
            <p>Simply go back to the home page and select the option you want to pursue.</p>
         </ion-item>
      </div>

*/