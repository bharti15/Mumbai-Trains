import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TrainDetailsPage } from '../train-details/train-details';
import { DatabasePage } from '../database/database';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /**
    *     Used to store returned PHP data
    */
   public items : Array<any> = [];

	@ViewChild('username') userName;
	@ViewChild('password') password;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http   : HttpClient) 
  {

  }

  /**
    * Triggered when template view is about to be entered
    * Returns and parses the PHP data through the load() method
    *
   ionViewWillEnter() : void
   {
      this.load();
   }

   /**
    * Retrieve the JSON encoded data from the remote server
    * Using Angular's Http class and an Observable - then
    * assign this to the items array for rendering to the HTML template
    *
    */
   load() : void
   {
      this.http
      .get('http://www.localhost:81/ionic-php-mysql/retrieve-data.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   /**
    * Assign the navigation retrieved data to properties
    * used as models on the page's HTML form
    *
    */
   selectEntry(item : any) : void
   {
      this.userName     = item.userName;
      this.password   = item.password;
      //this.recordID     = item.id;
      
   }

   /**
    * Allow navigation to the AddTechnologyPage for creating a new entry
    *
    
   addEntry() : void
   {
      this.navCtrl.push('DatabasePage');
   }
   */

   /**
    * Allow navigation to the AddTechnologyPage for amending an existing entry
    * (We supply the actual record to be amended, as this method's parameter,
    * to the AddTechnologyPage
    *
    */
   viewEntry(param : any) : void
   {
      this.navCtrl.push('DatabasePage', param);
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
  	if(this.userName.value =="admin" && this.password.value=="admin"){
  		let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'You are logged in!',
      buttons: ['OK']
    });
    alert.present();
    // this.navCtrl.push(DatabasePage);
    this.navCtrl.push(TrainDetailsPage);
  	}
  }

}
