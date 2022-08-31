import { ModalRepoComponent } from './../components/modal-repo/modal-repo.component';
import { Injectable } from '@angular/core';
import { User } from './../interfaces/user';
import { Router } from '@angular/router';
import {
  Firestore,
  setDoc,
  addDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  query,
  where,
} from '@angular/fire/firestore';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class SapiolabService {
  load;
  infoSapiolab = {
    coleccion: 'pruebasCUMBRE',
    uidDoc: '',
    tipo: '',
  };
  constructor(
    private router: Router,
    private db: Firestore,
    private alert: AlertController,
    private modal: ModalController,
    private loading: LoadingController
  ) {}

  verifyQuery(query) {
    if (query['d']) {
      this.presentLoad('Cargando prueba...');
      this.infoSapiolab.uidDoc = query['d'];
      let id = query['d'];
      this.checkRepoFromSapiolab(id);
    }
  }

  checkQuery(query) {
    // console.log(query);
    // Condicional para cuando el enlace es para presentar una prueba de cuenta tipo empresa
    if (query['e']) {
      this.presentLoad('Verificando...');
      this.infoSapiolab.tipo = 'empresas'; //Primera letra de URL despues de ? define si es empresa o persona
      this.infoSapiolab.uidDoc = query['e']; //UID de la cuenta de la emrpesas o persona que genero el enlace
      this.checkAvaibleTest();

      // Condicional para cuando el enlace es para presentar una prueba de cuenta tipo personal
    } else if (query['p']) {
      this.presentLoad('Verificando...');
      this.infoSapiolab.tipo = 'personas';
      this.infoSapiolab.uidDoc = query['e'];
    } else {
      alert('El enlace es incorrecto, por favor solicite uno nuevo');
    }
  }

  async checkAvaibleTest() {
    const docRef = doc(
      this.db,
      this.infoSapiolab.tipo,
      this.infoSapiolab.uidDoc
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let docData = docSnap.data();
      if (docData.pruebasCUNBRE.disponibles > 0) {
        sessionStorage.setItem(
          'infoSapiolab',
          JSON.stringify(this.infoSapiolab)
        );
        this.load.dismiss();
        this.router.navigateByUrl('/terms');
      } else {
        this.load.dismiss();
        alert('No hay pruebas CUMBRE disponibles');
      }
    } else {
      alert('El enlace es incorrecto, por favor solicite uno nuevo');
    }
  }

  async checkRepo(id) {
    let search = [];
    const q = query(
      collection(this.db, 'pruebasCUMBRE'),
      where('documento', '==', Number(id))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      search.push(doc.data());
    });

    if (search.length != 0) {
      if (search.length == 1) {
        sessionStorage.setItem('user', JSON.stringify(search[0]));
        sessionStorage.setItem('resultadosRepo', search[0].resultados);
        sessionStorage.setItem('nameRepo', search[0].nombre);
        sessionStorage.setItem('dateRepo', search[0].fecha);
        this.router.navigate(['/results']);
      } else {
        this.presentModalRepos(search);
      }
    } else {
      alert(
        'No existe una prueba realizada con este número de documento, por favor revisa los datos ingresados'
      );
    }
  }

  async checkRepoFromSapiolab(id) {
    const docRef = doc(this.db, 'pruebasCUMBRE', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();

      sessionStorage.setItem('user', JSON.stringify(data));
      sessionStorage.setItem('resultadosRepo', data.resultados);
      sessionStorage.setItem('nameRepo', data.nombre);
      sessionStorage.setItem('dateRepo', data.fecha);
      this.router.navigate(['/results']);
    } else {
      alert(
        'No existe una prueba realizada con este número de documento, por favor revisa los datos ingresados'
      );
    }
  }

  async saveResults(user: User) {
    let todayDate = new Date().toISOString();
    this.presentLoad('Guardando tus respuestas...');
    // console.log(todayDate);
    this.infoSapiolab = JSON.parse(sessionStorage.getItem('infoSapiolab'));
    await addDoc(collection(this.db, this.infoSapiolab.coleccion), {
      ...user,
      uid: this.infoSapiolab.uidDoc,
      fecha: todayDate,
    })
      .then(() => {
        this.load.dismiss();
      })
      .then(async () => {
        await updateDoc(
          doc(this.db, this.infoSapiolab.tipo, this.infoSapiolab.uidDoc),
          {
            ['pruebasCUNBRE.disponibles']: increment(-1),
          }
        );
        this.router.navigate(['/results']);
      });
  }

  async presentLoad(message) {
    this.load = await this.loading.create({
      message: message,
      spinner: 'circles',
    });
    this.load.present();
  }

  async presentModalRepos(repos) {
    // console.log(repos)
    const modal = await this.modal.create({
      component: ModalRepoComponent,
      cssClass: 'modal-repos',
      backdropDismiss: false,
      componentProps: { search: repos },
    });
    return await modal.present();
  }
}
