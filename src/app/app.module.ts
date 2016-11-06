import { NgModule }              from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp }                 from './app.component';
import { TabsPage }              from '../pages/tabs/tabs';

/* PAGES */
import { AboutPage }             from '../pages/about/about';
import { ContactPage }           from '../pages/contact/contact';
import { HomePage }              from '../pages/home/home';

/* COMPONENTS */
import { FriskyBits }            from '../components/friskybits/friskybits.component';

/* PROVIDERS */
import { Resource }              from '../providers/resource/resource.provider';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FriskyBits,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FriskyBits,
  ],
  providers: [
    Resource,
  ]
})
export class AppModule {}
