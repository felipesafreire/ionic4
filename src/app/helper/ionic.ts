import { AlertController, LoadingController } from '@ionic/angular';

export async function criarAlertaIonic(mensagem, titulo = null, subtitulo = null) {

  let alerta = new AlertController();
  const alert = await alerta.create({
    header: titulo || 'Aviso',
    subHeader: subtitulo || '',
    message: mensagem || '',
    buttons: ['OK']
  });
  await alert.present();

}


export async function criarLoading(mensagem = null) {
  
  let load = new LoadingController();
  const loading = await load.create({
    message: mensagem || '',
    //duration: 2000
  });
  return await loading.present();
  
}