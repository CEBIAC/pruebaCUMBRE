import { Average } from './../../../interfaces/average';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/interfaces/user';
import { PdfService } from 'src/app/services/pdf.service';
import { tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { LoadingController } from '@ionic/angular';

Chart.register(...registerables);

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.component.html',
  styleUrls: ['./vista1.component.scss'],
})
export class Vista1Component implements OnInit, AfterViewInit {
  @ViewChild('barChart', { static: true }) barChart: any;
  @ViewChild('barChart2', { static: true }) barChart2: any;
  @ViewChild('barChart3', { static: true }) barChart3: any;
  @ViewChild('barChart4', { static: true }) barChart4: any;
  promedios;
  name;
  date;
  copys: Average = {
    copyAutoeficacia: '',
    copyControl: '',
    copyOptimismo: '',
    copyPersistencia: '',
    copyRiesgo: '',
    copyAutonomia: '',
    copyCreatividad: '',
    copyOportunidades: '',
    copyFlexibilidad: '',
    copyEstres: '',
    copyResiliencia: '',
    copyFrustracion: '',
    copyLogro: '',
    copyEmprender: '',
    copyPlanificacion: '',
    copyEvaluacion: '',
    copyEficiencia: '',
    copyEficacia: '',
    copyRelaciones: '',
    copyTrabajo: '',
    copyNegociacion: '',
    copyCapacidades: '',
    copyPlaneacion: '',
    copySocial: '',
  };

  copyGlobal;
  copysCapacidades;
  copysPlaneacion = [];
  copysHabilidades;

  positionCopyCapacidades = 0;
  positionCopyPlaneacion = 0;
  positionCopyHabilidades = 0;

  bars: any;
  bars2: any;
  bars3: any;
  bars4: any;

  user: User;
  isPrinting = false;
  loading;

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.name = sessionStorage.getItem('nameRepo');
    this.date = new Date(
      sessionStorage.getItem('dateRepo')
    ).toLocaleDateString();

    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));

      this.promedios = JSON.parse(this.user.resultados);
      console.log(this.promedios);

      this.setCopyResults();
    } else {
      alert('Error con los datos almacenados');
    }
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.createBarChartPlanificacion();
    this.createBarChartHabilidades();
    this.createBarChartGlobal();
  }

  setCopyResults() {
    this.promedios['Autoeficacia'] >= 0 && this.promedios['Autoeficacia'] <= 1
      ? (this.copys.copyAutoeficacia =
          'Siente que sus capacidades suelen estar fuera de lugar o que no cuenta con muchas fortalezas. No le es sencillo fortalecer o adquirir suficientes habilidades para realizar ciertas tareas. No siente que pueda organizarse y hacer lo necesario para cumplir sus metas. Para actividades que parecen complicadas puede creer que no quiere o no puede hacerlas, siendo ??stas en las que debe esforzarse m??s. Su falta de conocimiento sobre las actividades le pueden llevar a evadir la tarea en pr??ximas ocasiones.')
      : this.promedios['Autoeficacia'] >= 1.1 &&
        this.promedios['Autoeficacia'] <= 2
      ? (this.copys.copyAutoeficacia =
          'Siente que cuenta con capacidades para momentos concretos y que puede intentar mejorar aquellas en las que conf??a. Puede distinguir las acciones y competencias que requiere fortalecer para contribuir al cumplimiento de sus metas, pero siente que le tomar??a demasiado esfuerzo para ello. Reconoce f??cilmente las actividades que sobrepasan sus capacidades y establece l??mites en sus metas seg??n su falta de familiaridad con la tarea. Los fracasos previos en actividades realizadas pueden restarle motivaci??n para volverlo a intentar')
      : this.promedios['Autoeficacia'] >= 2.1 &&
        this.promedios['Autoeficacia'] <= 3
      ? (this.copys.copyAutoeficacia =
          'Sabe diferenciar claramente los campos y tareas de su competencia. Le interesan los beneficios de fortalecer sus habilidades y talentos. Siente que puede sacar provecho superando retos en los campos que le son familiares y es capaz de esforzarse en ellos si es necesario. Se permite explorar actividades que se relacionen con sus objetivos y le otorguen conocimiento y experiencia.')
      : this.promedios['Autoeficacia'] >= 3.1 &&
        this.promedios['Autoeficacia'] <= 4
      ? (this.copys.copyAutoeficacia =
          'Demuestra constantemente sus habilidades en los campos de su competencia. Busca experiencias en las que pueda complementar sus capacidades. Tiene disposici??n para fortalecer sus habilidades si lo requieren sus objetivos. Puede admitir una  tarea de alta dificultad y esforzarse en ella si sus resultados son provechosos. Es capaz de deducir las alternativas para mejorar sus resultados de acuerdo a las actividades previas en las que ha fracasado.')
      : (this.copys.copyAutoeficacia =
          'Siente que cuenta con habilidades s??lidas y pertinentes para realizar lo que se propone y tiene seguridad en los campos de su competencia. Es capaz de mantener un proceso de aprendizaje aut??nomo para fortalecer sus capacidades. Le entusiasma asumir tareas dif??ciles que le ofrezcan la oportunidad de mejorar. Asume con apertura y compromiso la identificaci??n de mejoras a partir de sus fracasos para su aprendizaje constante.');

    this.promedios['Locus de control'] >= 0 &&
    this.promedios['Locus de control'] <= 1
      ? (this.copys.copyControl =
          'Persona con actitud pasiva frente al control que puede tomar para influir sobre su entorno. Siente poca responsabilidad sobre lo que le ocurre y atribuye sus resultados en mayor medida a causas externas. Tiene poca confianza sobre su propia capacidad para alcanzar sus metas y considera que su esfuerzo no le acerca a lograr lo que se propone. Prefiere las actividades que promuevan igualdad y colaboraci??n, y que no impliquen comparaci??n y competencia.')
      : this.promedios['Locus de control'] >= 1.1 &&
        this.promedios['Locus de control'] <= 2
      ? (this.copys.copyControl =
          'Percibe que su esmero no suele ser suficiente para lograr lo que se propone. As?? mismo, se abstiene de asumir responsabilidades sobre su entorno o de comprometer sus acciones con  actividades que no garanticen resultados positivos. Siente que rara vez puede intervenir en las consecuencias de los acontecimientos, ya que las circunstancias no se lo permiten o le exigen esfuerzos que no le corresponden. Casi nunca asume liderazgo en las actividades que participa.')
      : this.promedios['Locus de control'] >= 2.1 &&
        this.promedios['Locus de control'] <= 3
      ? (this.copys.copyControl =
          'Tiene una visi??n clara sobre los l??mites de sus esfuerzos y es capaz de reconocer lo que no puede controlar. Asume con convicci??n la responsabilidad por las actividades de las que puede sacar provecho. Establece oportunamente cuando no le es posible comprometer sus acciones en objetivos que no le competen, donde no tiene cabida o donde considere que no puede ejercer una influencia considerable.')
      : this.promedios['Locus de control'] >= 3.1 &&
        this.promedios['Locus de control'] <= 4
      ? (this.copys.copyControl =
          'Tiene determinaci??n para que sus esfuerzos ejerzan influencia sobre su entorno. Se mantiene al tanto de sus responsabilidades en los resultados que obtiene y tiene disposici??n para participar en actividades en las que pueda realizar aportes. Raramente atribuye los resultados de sus actos a factores que no puede controlar. Puede reconocer tareas y situaciones en las que sus competencias son capaces de producir mejores resultados.')
      : (this.copys.copyControl =
          'Analiza activamente la forma como sus propios actos tienen repercusi??n sobre su entorno. Verifica c??mo las consecuencias de las situaciones en las que participa son producto de sus acciones u omisiones. Prioriza la identificaci??n de su propia responsabilidad en los resultados de las actividades en las que se involucra, por lo que puede llegar a sentirse responsable del cumplimiento de objetivos que dependen de otros factores ajenos a su influencia.');

    this.promedios['Optimismo'] >= 0 && this.promedios['Optimismo'] <= 1
      ? (this.copys.copyOptimismo =
          'Las expectativas negativas que genera sobre el futuro tienden a ser permanentes, personales, globales y en general infundadas. Subestima el resultado de sus acciones y busca explicar exahustivamente los resultados negativos que le ocurren. Se concentra en los aspectos negativos de lo que le ocurre, atribuy??ndole mala suerte a sus inconvenientes e imprevistos y considera la posibilidad de que se presenten peores escenarios.')
      : this.promedios['Optimismo'] >= 1.1 && this.promedios['Optimismo'] <= 2
      ? (this.copys.copyOptimismo =
          'Puede generar expectativas positivas en medio  perspectivas negativas sobre los acontecimientos futuros. Tiende a mostrar elevada autocompasi??n y sensibilidad respecto a las condiciones y resultados negativos de s?? mismo y de otros. Puede enforcarse sobre las situaciones de injusticia que le han tra??do consecuencias negativas y magnificar la gravedad de los impases que se le presentan.')
      : this.promedios['Optimismo'] >= 2.1 && this.promedios['Optimismo'] <= 3
      ? (this.copys.copyOptimismo =
          'Encuentra razones fundamentadas para generar expectativas negativas sobre el futuro. Es capaz de reconsiderar su pensamiento sobre los resultados negativos y de reevaluar la  irreversibilidad y permanencia de las consecuencias negativas o resultados injustos. Resalta aspectos negativos y defectos cuando cree que alguien debe hacerlo y siente que los resultados positivos o negativos que le ocurren es porque lo ha merecido.')
      : this.promedios['Optimismo'] >= 3.1 && this.promedios['Optimismo'] <= 4
      ? (this.copys.copyOptimismo =
          'Concentra sus expectativas principalmente en las consecuencias positivas de los acontecimientos y no suele anticiparse a resultados negativos o injustos.Asocia pensamientos y resultados positivos a las actividades en que participa y tiende a retener en menor medida las consecuencias desafortunadas que ha sufrido. Es capaz de describir las acciones necesarias para mejorar su situaci??n.')
      : (this.copys.copyOptimismo =
          'Se mantiene a la expectativa de resultados positivos y a la espera de cada vez mejores oportunidades aunque no se encuentre en las mejores condiciones.  Le resta importancia a la influencia que pueden causarle los resultados negativos, mantiene perspectivas alentadoras sobre el futuro y realiza acciones que mejoren su situaci??n. Siente que los pensamientos positivos atraen resultados positivos y previenen que sufra afectaciones en el estado de ??nimo.');

    this.promedios['Persistencia'] >= 0 && this.promedios['Persistencia'] <= 1
      ? (this.copys.copyPersistencia =
          'Se indispone cuando es necesario sobrellevar dificultades que superen sus capacidades. Puede mantener sus esfuerzos ininterrumpidamente mientras esto no le implique realizar actividades distintas de la idea previa que tiene de las tareas. Los obt??culos que se presentan en su trabajo tienen gr??n posibilidad de inhibir su voluntad por trabajar en los objetivos hasta el final.')
      : this.promedios['Persistencia'] >= 1.1 &&
        this.promedios['Persistencia'] <= 2
      ? (this.copys.copyPersistencia =
          'Es capaz de sobrellevar las  dificultades que le importunan para retornar a un estado de equilibrio. Puede focalizar y mantener sus esfuerzos en las actividades que le exigen cumplimiento obligatorio.  Admite tareas que le supongan obst??culos, pero puede presentar los impaces que interfieren en sus objetivos como motivos por los que no vale la pena mantener sus esfuerzos constantes.')
      : this.promedios['Persistencia'] >= 2.1 &&
        this.promedios['Persistencia'] <= 3
      ? (this.copys.copyPersistencia =
          'Se compromete con la superaci??n de dificultades concretas y necesarias. Se mantiene constante en aquellos objetivos que le despiertan inter??s y le inspiran compromiso. Asume la superaci??n de sus propios esfuerzos, pero puede impacientarse debido a cambios de ruta inesperados o intentos fallidos que le desalienten repetidamente.')
      : this.promedios['Persistencia'] >= 3.1 &&
        this.promedios['Persistencia'] <= 4
      ? (this.copys.copyPersistencia =
          'Demuestra dominio de las situaciones de dificultad e identifica los resultados en los que pudo invertir mayor esfuerzo. Los obst??culo que interrumpen su trabajo suelen ser en su mayor??a aquellos sobre los que no puede hacer nada o aquellos que le indican definitivamente que est?? desperdiciando sus esfuerzos, lo cual puede llegar a hacerle sentir incapaz.')
      : (this.copys.copyPersistencia =
          'Se cerciora de tener las dificultades bajo control, y llega a sentirse en deuda con lo que no puede remediar. Procura tener suficiente preparaci??n paraenfrentar todos los impaces posibles y se mantiene constante hasta alcanzar sus objetivos. Es m??s probable que prefiera otra actividad por cuestiones de planeaci??nque por los esfuerzos y los obst??culos que cueste.');

    this.promedios['Propension al Riesgo'] >= 0 &&
    this.promedios['Propension al Riesgo'] <= 1
      ? (this.copys.copyRiesgo =
          'Prefiere asumir situaciones en ambientes de certeza y con bajo nivel de riesgo de fracaso. Al momento de abordar una nueva actividad, sobreestima la posibilidad de no obtener los resultados deseados,incluso con bajos niveles de riesgo, por lo que percibir alguna consecuencia negativa puede servirle de motivo para no actuar y as?? evitar posibles decepciones.')
      : this.promedios['Propension al Riesgo'] >= 1.1 &&
        this.promedios['Propension al Riesgo'] <= 2
      ? (this.copys.copyRiesgo =
          'Siente plena seguridad para asumir situaciones en ambientes con niveles de riesgo controlado. Tiene disposici??n para asumir consecuencias menores como resultado de la incertidumbre y prefiere evitar las consecuencias grandes sin tener en cuenta la posibilidad de que le afecten. Puede juzgar la situaciones en mayor medida por los peores escenarios posibles que por la posibilidad de obtener el valor de los resultados.')
      : this.promedios['Propension al Riesgo'] >= 2.1 &&
        this.promedios['Propension al Riesgo'] <= 3
      ? (this.copys.copyRiesgo =
          'Se pemite explorar las posibilidades de obtener resultados positivos en ambientes de incertidumbre y de riesgos de fracaso. Considera la posibilidad de obtener consecuencias negativas, pero prefiere asumir las situaciones donde pueda reducir en la medida de lo posible las p??rdidas asociadas a los respectivos riesgos.')
      : this.promedios['Propension al Riesgo'] >= 3.1 &&
        this.promedios['Propension al Riesgo'] <= 4
      ? (this.copys.copyRiesgo =
          'Acepta la participaci??n en situaciones de incertidumbre en tanto mayor conciencia pueda tener sobre los riesgos y sus consecuencias. Considera en primer lugar los riesgos que puedan afectar su integridad o estabilidad. Se expone a los posibles fracasos si considera que puede maximizar sus beneficios y garantizar la obtenci??n de los resultados convenientes.')
      : (this.copys.copyRiesgo =
          'Asume abiertamente situaciones de alta incertidumbre que le supongan alg??n tipo de beneficio o progreso en el alcance de sus objetivos, siendo capaz de aceptar escenarios de gr??ndes p??rdidas, para los cuales determina actividades de recuperaci??n. Puede realizar an??lisis y planeaciones detalladas para estimar tanto las posibilidades de ??xito como de fracaso, dando prioridad a los resultados positivos y exponi??ndose a gr??ndes riesgos si el valor que puede obtener es significativo.');

    this.promedios['Autonomia'] >= 0 && this.promedios['Autonomia'] <= 1
      ? (this.copys.copyAutonomia =
          'Su postura se ve influida por criterios ajenos, su punto de vista puede seder ante la presi??n de terceros, mostrando una posici??n flexible ante la aprobaci??n en distintas situaciones y apoy??ndose en otros con impulsividad.')
      : this.promedios['Autonomia'] >= 1.1 && this.promedios['Autonomia'] <= 2
      ? (this.copys.copyAutonomia =
          'A pesar de que su postura se ve influida por criterios ajenos, tiene cierta resistencia a la presi??n y puede actuar de manera independiente para mantener una posici??n regular, reconociendo claramente los puntos de vista de los que se distancia, pero requiriendo aprobaci??n o validaci??n de otros para tener seguridad sobre su propio punto de vista.')
      : this.promedios['Autonomia'] >= 2.1 && this.promedios['Autonomia'] <= 3
      ? (this.copys.copyAutonomia =
          'Procura no permitir sugesti??n sobre su postura por criterios ajenos, actuando con estabilidad frente a la sugesti??n de terceros y mostrando una posici??n que llega a prescindir de la aprobaci??n de otros en distintas situaciones, pero precisando de apoyo frente a las dificultades que en principio no parecen f??ciles de resolver')
      : this.promedios['Autonomia'] >= 3.1 && this.promedios['Autonomia'] <= 4
      ? (this.copys.copyAutonomia =
          'A pesar de que conserva una postura firme, con suficiente presi??n puede verse influida por criterios u opiniones ajenas, y es capaz de aceptar cambios en su punto de vista por alternativas razonables, lo que le hace reconsiderar la independencia de sus actos y la percepci??n sobre el apoyo que puede llegar a requerir de otros.')
      : (this.copys.copyAutonomia =
          'Conserva una postura s??lida, que apenas se ve influida por criterios ajenos, pudiendo actuar con firmeza pese a las sugestiones de terceros e incluso frente a los puntos de vista dominantes, mostrando una posici??n independiente de la aprobaci??n y reconociendo asertivamente cuando requiere el apoyo de otros.');

    this.promedios['Creatividad'] >= 0 && this.promedios['Creatividad'] <= 1
      ? (this.copys.copyCreatividad =
          'Resuelve problemas cotidianos mediante procesos secuenciales, confiables y comunes, no suele experimentar con ideas o perspectivas inusuales en la b??squeda de resultados originales orientados a la soluci??n de problemas.')
      : this.promedios['Creatividad'] >= 1.1 &&
        this.promedios['Creatividad'] <= 2
      ? (this.copys.copyCreatividad =
          'Aunque en su mayor??a acude a procesos secuenciales, confiables y comunes para resolver problemas, puede producir resultados que destaquen por su originalidad orientados a una soluci??n elemental, basado en la experimentaci??n con ideas o perspectivas inusuales.')
      : this.promedios['Creatividad'] >= 2.1 &&
        this.promedios['Creatividad'] <= 3
      ? (this.copys.copyCreatividad =
          'Acude tanto a procesos estructurados, confiables y comunes, como a procesos originales e inusuales para resolver problemas. Con la motivaci??n adecuada puede experimentar con ideas o perspectivas sorprendentes en la b??squeda de resultados aut??nticos y dirigidos a solucionar problemas.')
      : this.promedios['Creatividad'] >= 3.1 &&
        this.promedios['Creatividad'] <= 4
      ? (this.copys.copyCreatividad =
          'En su mayor??a, acude a procesos desestructurados y singulares al momento de resolver problemas, produciendo intencionadamente resultados originales orientados a la soluci??n de problemas, basado en la experimentaci??n con ideas o perspectivas aut??nticas.')
      : (this.copys.copyCreatividad =
          'En gr??n parte de los procesos es capaz de resolver problemas mediante procesos desestructurados y novedosos, produciendo resultados  originales orientados al desarrollo de resultados o la soluci??n de problemas, aprovechando los recursos de la experimentaci??n con ideas o perspectivas aut??nticas.');

    this.promedios['Identificacion de Oportunidades'] >= 0 &&
    this.promedios['Identificacion de Oportunidades'] <= 1
      ? (this.copys.copyOportunidades =
          'Tiene una posici??n pasiva respecto a la detecci??n de oportunidades, con poco inter??s por estudiar las debilidades y fortalezas de competidores para plantear ventajas competitivas, al igual que poco inter??s por entender los factores contextuales que sirven para aprovechar oportunidades del entorno.')
      : this.promedios['Identificacion de Oportunidades'] >= 1.1 &&
        this.promedios['Identificacion de Oportunidades'] <= 2
      ? (this.copys.copyOportunidades =
          'Logra identificar oportunidades de manera provisional, pudiendo distinguir algunas debilidades y fortalezas de competidores en la b??squeda de ventajas competitivas y siendo capaz de tener en cuenta los factores contextuales expl??citos que sirven para aprovechar oportunidades o necesidades del entorno.')
      : this.promedios['Identificacion de Oportunidades'] >= 2.1 &&
        this.promedios['Identificacion de Oportunidades'] <= 3
      ? (this.copys.copyOportunidades =
          'Tiene capacidad para identificar debilidades y fortalezas de competidores mediante la planeaci??n y el an??lisis de informaci??n para proponer ventajas competitivas, al igual que capacidad de responder frente a los factores contextuales de los que sacar provecho, y con lo que aporta al cumplimiento de sus responsabilidades.')
      : this.promedios['Identificacion de Oportunidades'] >= 3.1 &&
        this.promedios['Identificacion de Oportunidades'] <= 4
      ? (this.copys.copyOportunidades =
          'Puede asumir un estado de alerta para identificar debilidades y fortalezas cruciales de competidores en la b??squeda de sus propias ventajas. Al igual, es capaz de escanear y diferenciar los factores contextuales relevantes con los que puede sacar provecho de oportunidades o sugerir soluciones diferentes a necesidades comunes.')
      : (this.copys.copyOportunidades =
          'Tiene habilidad para deducir asertivamente fortalezas y debilidades de competidores en b??squeda de sus propias ventajas, al igual que una constante y aguda sensibilidad sobre los factores contextuales con los que puede proponer acciones estrat??gicas a partir de nuevas ideas.');

    this.promedios['Flexibilidad'] >= 0 && this.promedios['Flexibilidad'] <= 1
      ? (this.copys.copyFlexibilidad =
          'Prefiere seguir procesos concretos y acoplarse a situaciones con expectativas claras y poco novedosas, con las que est?? previamente familiarizado, evitando el dinamismo y moderando los cambios que le exigen adaptaci??n obligatoria')
      : this.promedios['Flexibilidad'] >= 1.1 &&
        this.promedios['Flexibilidad'] <= 2
      ? (this.copys.copyFlexibilidad =
          'Ocasionalmente enfrenta cambios inesperados y no suele reaccionar con dominio de la situaci??n en medio del dinamismo, busca la estabilidad y evita cambios recurrentes, mostrando apenas disposici??n para resignarse a situaciones con un m??nimo grado de incertidumbre.')
      : this.promedios['Flexibilidad'] >= 2.1 &&
        this.promedios['Flexibilidad'] <= 3
      ? (this.copys.copyFlexibilidad =
          'Asume con moderaci??n los cambios inesperados y el dinamismo en el ambiente, mostrando apertura para acoplarse a situaciones novedosas con las que no se familiariza y que traen resultados positivos, aunque prefiere los cambios previstos a los repentinos y los superficiales a los estructurales.')
      : this.promedios['Flexibilidad'] >= 3.1 &&
        this.promedios['Flexibilidad'] <= 4
      ? (this.copys.copyFlexibilidad =
          'Acepta en buena medida los cambios inesperados y el dinamismo, mostrando facilidad de adaptaci??n a situaciones novedosas y capacidad de respuesta frente a cambios estructurales y persistentes, encontr??ndo prop??sito en las nuevas condiciones tras un periodo de acoplamiento.')
      : (this.copys.copyFlexibilidad =
          'Presenta amplia capacidad de adaptaci??n, apertura a los cambios inesperados y al dinamismo en el ambiente, sacando provecho de ello y siendo competente, responsivo y productivo para acoplarse a situaciones novedosas que incluso cambien las condiciones y reglas de juego');

    this.promedios['Manejo de estres'] >= 0 &&
    this.promedios['Manejo de estres'] <= 1
      ? (this.copys.copyEstres =
          'Tiende a ser reactivo en situaciones de presi??n y preocupaci??n, ignorando estrategias para afrontar la tensi??n y teniendo limitado control y reconocimiento emocional en respuesta del estr??s, por lo que le pueden sobrepasar las situaciones estresantes y hacerle perder control personal sin percatarse de ello.')
      : this.promedios['Manejo de estres'] >= 1.1 &&
        this.promedios['Manejo de estres'] <= 2
      ? (this.copys.copyEstres =
          'Consigue mostrar control y reconocimiento limitados de sus emociones, mostrando alguna capacidad para lidiar con situaciones dif??ciles y tensionantes por medio de la retenci??n de la necesidad de desahogo como estrategia de afrontamiento del estr??s.')
      : this.promedios['Manejo de estres'] >= 2.1 &&
        this.promedios['Manejo de estres'] <= 3
      ? (this.copys.copyEstres =
          'Gestiona sus emociones con moderaci??n, mostrando competencias b??sicas para lidiar con situaciones dif??ciles y tensionantes, por medio de la reducci??n o suspensi??n de las obligaciones y conseguir moderar los efectos y las reacciones del estr??s.')
      : this.promedios['Manejo de estres'] >= 3.1 &&
        this.promedios['Manejo de estres'] <= 4
      ? (this.copys.copyEstres =
          'Reconoce, acepta y regula sus emociones en situaciones tensionantes, mostrando intenci??n de evitar niveles excesivos de estr??s por medio de estrategias de afrontamiento, lo que resulta en un control de s?? ante reacciones nocivas e involuntarias.')
      : (this.copys.copyEstres =
          'Muestra suficiente capacidad para regular y autogestionar sus emociones, contando con estrategias para afrontar situaciones dif??ciles con intenci??n de evitar niveles excesivos de estr??s, siendo capaz de sobrellevar percances y anticipar sus reacciones ante situaciones estresantes previstas.');

    this.promedios['Resiliencia'] >= 0 && this.promedios['Resiliencia'] <= 1
      ? (this.copys.copyResiliencia =
          'Percibe el fracaso como una experiencia aversiva, limitante y desmotivante, reduciendo su capacidad de acci??n y aprendizaje tras una situaci??n adversa y enfoc??ndose principalmente en los aspectos negativos, lo que le desmotiva para exponerse en el futuro a situaciones con posibilidad de fracaso y por lo que no le interesa identificar la causa de las adversidades pasadas.')
      : this.promedios['Resiliencia'] >= 1.1 &&
        this.promedios['Resiliencia'] <= 2
      ? (this.copys.copyResiliencia =
          'Experimenta el fracaso como un resultado intimidante, cuestionando su capacidad de acci??n y aprendizaje tras una situaci??n adversa, enfoc??ndose considerablemente en los aspectos negativos que se vieron afectados o que se perdieron tras un fracaso, y subestimando el valor de la experiencia y de los conocimientos de las causas del fracaso.')
      : this.promedios['Resiliencia'] >= 2.1 &&
        this.promedios['Resiliencia'] <= 3
      ? (this.copys.copyResiliencia =
          'Asume el fracaso como una experiencia esperable, siendo capaz de sostener su capacidad de acci??n tras situaciones adversas, procurando dejar pasar los aspectos negativos pero enfoc??ndose tanto en lo negativo como en lo positivo, pudiendo distinguir mejor de los motivos previos de fracaso.')
      : this.promedios['Resiliencia'] >= 3.1 &&
        this.promedios['Resiliencia'] <= 4
      ? (this.copys.copyResiliencia =
          'Acepta el fracaso como una experiencia de aprendizaje, capaz de reconocer en las situaciones adversas una oportunidad para dejar que surjan novedades positivas, inesperadas e implementar mejoras a trav??s de acciones que demuestren que se enfoca considerablemente en los aspectos positivos.')
      : (this.copys.copyResiliencia =
          'Encuentra en el fracaso una experiencia provechosa, adopta perspectivas del fracaso como una oportunidad para mejorar y prevenir la reincidencia de las fallas, enfoc??ndose principalmente en los aspectos positivos que pueden ser aprovechados en situaciones futuras con mayor cautela y conciencia de los motivos de los fracasos previos.');

    this.promedios['Tolerancia a la frustracion'] >= 0 &&
    this.promedios['Tolerancia a la frustracion'] <= 1
      ? (this.copys.copyFrustracion =
          'Permite que la frustraci??n afecte el dominio sobre sus actividades m??s f??cilmente, centr??ndose en lo que pudo hacer mejor m??s que en lo que puede hacer para resolver la fuente de su frustraci??n, lo que le implica menor paciencia y menor desempe??o continuo de una actividad ante los posibles obst??culos.')
      : this.promedios['Tolerancia a la frustracion'] >= 1.1 &&
        this.promedios['Tolerancia a la frustracion'] <= 2
      ? (this.copys.copyFrustracion =
          'Rechaza los errores y los resultados adversos en gr??n medida, permitiendo afectar su flujo de actividad frente a eventos desfavorables, en especial aquellos que son persistentes e inalterables. Puede desalentarse y permitir que  la frustraci??n afecte su capacidad de acci??n.')
      : this.promedios['Tolerancia a la frustracion'] >= 2.1 &&
        this.promedios['Tolerancia a la frustracion'] <= 3
      ? (this.copys.copyFrustracion =
          'Capaz de aceptar errores y situaciones adversas en respuesta al cumplimiento de obligaciones y responsabilidades. Puede mantener su flujo de actividad frente a eventos desfavorables y regular el desaliento, pero comprometiendo su funcionalidad si la fuente del fracaso le despierta mayor inter??s y le ha dedicado mayor esfuerzo.')
      : this.promedios['Tolerancia a la frustracion'] >= 3.1 &&
        this.promedios['Tolerancia a la frustracion'] <= 4
      ? (this.copys.copyFrustracion =
          'Muestra capacidad de respuesta al momento de aceptar errores y situaciones adversas que se puedan presentar, as?? como disposici??n para mantener control en el flujo de actividad y mantener su motivaci??n por cumplir objetivos frente a eventos desfavorables, lo que implica mayor capacidad para superar los obst??culos que se interpongan, asumi??ndolos como desaf??os.')
      : (this.copys.copyFrustracion =
          'Se le facilita prever las fuentes de sus frustaciones, pudiendo aceptar errores y situaciones adversas que se presenten, y siendo consciente de c??mo pueden afectarle en los progresos de sus objetivos. Tambi??n posee competencia para mantener su flujo de actividad y reconsiderar la utilidad del desaliento frente a eventos desfavorables.');

    this.promedios['Orientacion al logro'] >= 0 &&
    this.promedios['Orientacion al logro'] <= 1
      ? (this.copys.copyLogro =
          'Se interesa y enfoca en m??ltiples metas e invierte sus esfuerzos en distintas direcciones y con distintas intensidades, por lo que dispersa buena parte de su energ??a y disminuye la potencia de su trabajo, siendo capaz de alcanzar sus objetivos si no se presentan imprevistos.')
      : this.promedios['Orientacion al logro'] >= 1.1 &&
        this.promedios['Orientacion al logro'] <= 2
      ? (this.copys.copyLogro =
          'Es capaz de orientar las acciones hacia logros determinados y enfocar los recursos disponibles para alcanzar resultados con calidad est??ndar, por lo que su energ??a se concentra para cumplir con las responsabilidades previstas, siendo capaz de analizar y resolver problemas concretos que se hayan anticipado.')
      : this.promedios['Orientacion al logro'] >= 2.1 &&
        this.promedios['Orientacion al logro'] <= 3
      ? (this.copys.copyLogro =
          'Es capaz de progresar hacia metas exigentes que requieren enfoque y dedicaci??n constante, por lo que su energ??a se direcciona para minimizar y resistir distintos imprevistos, siendo capaz de mejorar su  estrategia y ser m??s eficiente trabajando por sus objetivos en el ??mbito de los riesgos controlados.')
      : this.promedios['Orientacion al logro'] >= 3.1 &&
        this.promedios['Orientacion al logro'] <= 4
      ? (this.copys.copyLogro =
          'Buena parte de sus metas son ambiciosas, y est??n establecidas con la confianza, la claridad y el enfoque necesarios, por lo que es capaz de comprometer sus esfuerzos para para lograr sus objetivos, persiguiendo resultados que constantemente sobresalgan de la calidad est??ndar y siendo capaz de ajustar la intensidad de su trabajo en correspondencia con los imprevistos que se presenten.')
      : (this.copys.copyLogro =
          'Demuestra rendimiento superior gracias a la claridad con la que determina sus objetivos y al enfoque con el que progresa hacia la obtenci??n de resultados mediante la autodirecci??n y la superaci??n de retos e imprevistos, invirtiendo la energ??a suficiente para alcanzar los logros y optimizando en lo posible el aprovechamiento de sus esfuerzos para obtener la m??xima calidad posible.');

    this.promedios['Intencion de Emprender'] >= 0 &&
    this.promedios['Intencion de Emprender'] <= 1
      ? (this.copys.copyEmprender =
          'Sus prop??sitos no suelen relacionarse con la generaci??n de ideas de negocio o emprendimiento, prefiriendo las formas convencionales de obtenci??n de logros y desarrollo personal, y d??ndo mayor relevancia a las actividades familiares o pasatiempos.')
      : this.promedios['Intencion de Emprender'] >= 1.1 &&
        this.promedios['Intencion de Emprender'] <= 2
      ? (this.copys.copyEmprender =
          'Siente curiosidad por generar acciones pr??cticas y en el corto plazo, que le aporten alg??n beneficio adicional, con pocas expectativas de mantener constancia en actividades emprendedoras, consider??ndolas como una alternativa provisional y prefiriendo la participaci??n en proyectos que le ofrezcan mayor seguridad.')
      : this.promedios['Intencion de Emprender'] >= 2.1 &&
        this.promedios['Intencion de Emprender'] <= 3
      ? (this.copys.copyEmprender =
          'Siente inter??s por las recompensas que conlleva el ??xito en el emprendimiento, especialmente como soluci??n a dificultades para devengar ingresos, alcanzar mayor independencia econ??mica, o generar una entrada estable adicional, siendo capaz de generar aportes significativos en proyectos emprendedores.')
      : this.promedios['Intencion de Emprender'] >= 3.1 &&
        this.promedios['Intencion de Emprender'] <= 4
      ? (this.copys.copyEmprender =
          'Capaz de elaborar ideas de c??mo alcanzar la realizaci??n personal por medio de una actividad productiva consistente con las actividades que le apasionan, considerando al emprendimiento como una alternativa que eventualmente puede articularse con la realizaci??n de otros planes de vida.')
      : (this.copys.copyEmprender =
          'Tiene alta motivaci??n por ejecutar ideas de emprendimiento ambiciosas, que generen un efecto de transformaci??n sobre las din??micas del mercado o las personas, mantienendo amplias expectativas sobre los alcances de sus proyectos de emprendimiento.');

    this.promedios['Planificacion'] >= 0 && this.promedios['Planificacion'] <= 1
      ? (this.copys.copyPlanificacion =
          'Puede establecer objetivos consistentes con el dominio de sus actividades, sin entrar en detalle al momento de definirlas o articularlas con tareas requeridas, y distinguiendo el flujo y las secuencias de trabajo sobre la marcha y mediante pruebas de ensayo y error.')
      : this.promedios['Planificacion'] >= 1.1 &&
        this.promedios['Planificacion'] <= 2
      ? (this.copys.copyPlanificacion =
          'Prefiere la ejecuci??n secuencial y aprovechar el tiempo y los recursos disponibles para realizar tareas concretas y progresar en proporci??n a su trabajo con acciones espec??ficas, definidas para una misma y ??nica fase, y vinculando las acciones de manera oportuna para responder por los objetivos y las obligaciones requeridas.')
      : this.promedios['Planificacion'] >= 2.1 &&
        this.promedios['Planificacion'] <= 3
      ? (this.copys.copyPlanificacion =
          'Prefiere la planeaci??n a corto plazo e inmediata que se vincule con sus objetivos, que la planeaci??n formal y estructurada en el marco de un proyecto m??s amplio, siendo capaz de organizar sus tareas y responsabilidades con prioridades espec??ficas para el cumplimiento de resultados.')
      : this.promedios['Planificacion'] >= 3.1 &&
        this.promedios['Planificacion'] <= 4
      ? (this.copys.copyPlanificacion =
          'Distingue con competencia todas las actividades, tareas y fases necesarias para alcanzar objetivos amplios y que requieran la coordinaci??n de distintos procesos, sin exigirse en la articulaci??n y la gesti??n detallada del tiempo, pero siendo capaz de ponerle un l??mite a cada proceso.')
      : (this.copys.copyPlanificacion =
          'Prefiere establecer objetivos determinados por una estructura de actividades, tareas y tiempos concretos, administrando las labores para cumplir o adaptar sus objetivos, y de ser requerido puede establecer planes de respaldo que atiendan a las respectivas contingencias.');

    this.promedios['Evaluacion'] >= 0 && this.promedios['Evaluacion'] <= 1
      ? (this.copys.copyEvaluacion =
          'Tiene poca inclinaci??n por monitorear los procesos de desarrollo, y eval??a en mayor medida los resultados de los procesos a medida que realiza las acciones que intuitivamente le acercan a sus objetivos y a la vez satisfacen su necesidad de exploraci??n.')
      : this.promedios['Evaluacion'] >= 1.1 && this.promedios['Evaluacion'] <= 2
      ? (this.copys.copyEvaluacion =
          'Se enfoca en la producci??n de resultados concretos que no desperdicien su trabajo, realiz??ndolo de manera constante y con el monitoreo requerido para se??alar errores y garantizar un proceso adecuado y cumplido, identificando las mejoras que pueden implementarse.')
      : this.promedios['Evaluacion'] >= 2.1 && this.promedios['Evaluacion'] <= 3
      ? (this.copys.copyEvaluacion =
          'Se aproxima al desarrollo de actividades mediante criterios de suficiencia para producir resultados de calidad est??ndar, garantizando la toma de decisi??n necesaria para adaptar los planes a los objetivos de cumplimiento, evitando inconsistencias y minimizando los errores.')
      : this.promedios['Evaluacion'] >= 3.1 && this.promedios['Evaluacion'] <= 4
      ? (this.copys.copyEvaluacion =
          'Realiza los controles necesarios para demostrar que los procesos a su cargo pueden mejorar, y es capaz de marcar sus progresos y comparar sus resultados con estados previos del proceso, actualizando las acciones pertinentes para superar los alcances de la trayectoria de un proyecto.')
      : (this.copys.copyEvaluacion =
          'Controla y verifica el desarrollo de un proyecto en el que identifica inconsistencia e implementa estrategias para lograr resultados con calidad dedicada, asegurando un amplio monitoreo sobre las actividades y agudeza para valorar el desarrollo del proceso.');

    this.promedios['Eficiencia'] >= 0 && this.promedios['Eficiencia'] <= 1
      ? (this.copys.copyEficiencia =
          'Puede tom??r m??s tiempos y recursos para garantizar la calidad planeada en los resultados, dando mayor espacio a la experimentaci??n y a la comparaci??n de distintos resultados antes de determinar los aspectos concretos del producto final.')
      : this.promedios['Eficiencia'] >= 1.1 && this.promedios['Eficiencia'] <= 2
      ? (this.copys.copyEficiencia =
          'Suele ocuparse del cumplimiento de resultados empleando los recursos necesarios sin entrar a gestionar al detalle, y determina los requerimientos de calidad y los alcances de las actividades en funci??n de los progresos de su trabajo y de la respuesta concreta a sus obligaciones.')
      : this.promedios['Eficiencia'] >= 2.1 && this.promedios['Eficiencia'] <= 3
      ? (this.copys.copyEficiencia =
          'Aprovecha el tiempo y los recursos disponibles y se enfoca en cumplir el objetivo con precisi??n, incluso si requiere extender el uso de recursos para mejorar el resultado, pudiendo garantizar la optimizaci??n del tiempo cuando tiene suficiente dominio de la actividad.')
      : this.promedios['Eficiencia'] >= 3.1 && this.promedios['Eficiencia'] <= 4
      ? (this.copys.copyEficiencia =
          'Optimiza el uso del tiempo y los recursos de modo que pueda cumplir sus objetivos lo m??s pronto posible, y mejorar la calidad de los resultados con el tiempo y los recursos ahorrados si los tiempos de entrega no son la prioridad.')
      : (this.copys.copyEficiencia =
          'Es capaz de minimizar el uso de tiempo y recursos disponibles, analizando las ventajas o desventajas para el producto final, priorizando los tiempos de entrega y garantizando resultados de calidad.');

    this.promedios['Eficacia'] >= 0 && this.promedios['Eficacia'] <= 1
      ? (this.copys.copyEficacia =
          'Se concentra en el cumplimiento del resultados mediante la utilizaci??n de los recursos necesarios, independiente del aprovechamiento exhaustivo de los medios disponibles y pudiendo mejorar la calidad del producto final con la implementaci??n de otros recursos complementarios.')
      : this.promedios['Eficacia'] >= 1.1 && this.promedios['Eficacia'] <= 2
      ? (this.copys.copyEficacia =
          'Utiliza distintos medios para detallar la calidad de los resultados y mantener la visibilidad de los recursos empleados, siendo capaz de alcanzar productos de calidad destacable y sin agotar la totalidad de recursos disponibles.')
      : this.promedios['Eficacia'] >= 2.1 && this.promedios['Eficacia'] <= 3
      ? (this.copys.copyEficacia =
          'Es capaz de aprovechar tanto recursos disponibles como recursos adicionales para mejorar el cumplimiento de objetivos, obteniendo resultados con calidad competente y que demuestran un ejercicio pr??ctico de administraci??n de los medios para la entrega de productos consistentes.')
      : this.promedios['Eficacia'] >= 3.1 && this.promedios['Eficacia'] <= 4
      ? (this.copys.copyEficacia =
          'Aprovecha los recursos disponibles y complementa la calidad de sus resultados con los medios suficientes para ello, reutilizando incluso recursos de otros procesos, demostrando un an??lisis del alcance y las oportunidades de los recursos y cumpliendo con las expectativas del producto final.')
      : (this.copys.copyEficacia =
          'Maximiza la utilizaci??n de los recursos disponibles, vali??ndose de referentes y procesos realizados previamente, y complementando con recursos adicionales para garantizar la consecuci??n resultados ambiciosos que superen las expectativas iniciales del producto final.');

    this.promedios['Relaciones'] >= 0 && this.promedios['Relaciones'] <= 1
      ? (this.copys.copyRelaciones =
          'Establece relaciones con corte transaccional, y sin distinguir aquellos aliados que puedan aportarle valor o las necesidades que tienen para establecer un v??nculo  de inter??s mutuo, prefiriendo la formalidad y reservando los tratos personales para espacios de confianza s??lida y prolongada.')
      : this.promedios['Relaciones'] >= 1.1 && this.promedios['Relaciones'] <= 2
      ? (this.copys.copyRelaciones =
          'Tiene capacidad de mantener tratos personales para abordar el intercambio colaborativo, distinguiendo los aliados que le aportan valor, percat??ndose de sus necesidades, reconociendo sus intereses y comprendiendo las acciones requeridas para establecer un v??nculo particular.')
      : this.promedios['Relaciones'] >= 2.1 && this.promedios['Relaciones'] <= 3
      ? (this.copys.copyRelaciones =
          'Se le facilita conectar con aliados que sean accesibles emp??ticamente, tiene en cuenta aquellos con quienes comparte un nivel similar de influencia, identifica los v??nculos potenciales con quienes establecer contactos colaborativos y puede dejar pasar aquellas oportunidades exigentes en el intercambio de intereses.')
      : this.promedios['Relaciones'] >= 3.1 && this.promedios['Relaciones'] <= 4
      ? (this.copys.copyRelaciones =
          'Aborda la colaboraci??n estrat??gica con confianza y amabilidad, actuando de manera consistente con las necesidades de sus aliados y en los momentos requeridos para mantener el contacto de aquellos que complementen la propia influencia, aporten con una trayectoria complementaria y le aporten mayor valor o sean fundamentales para el cumplimiento de sus responsabilidades.')
      : (this.copys.copyRelaciones =
          'Cuenta con sensibilidad para identificar aliados con los que colaborar, as?? como sus habilidades particulares y el provecho que puede obtener, propendiendo por un trato que alinie los valores mutuos y que demuestre inter??s personal por conocer al otro y sus necesidades, determinando las formas de contacto a largo plazo  y comunic??ndose con competencia a nivel racional y emocional');

    this.promedios['Trabajo en equipo'] >= 0 &&
    this.promedios['Trabajo en equipo'] <= 1
      ? (this.copys.copyTrabajo =
          'No acude con frecuencia a la colaboraci??n de otras personas y atiende en primer lugar sus objetivos antes que a los de un colectivo, por lo que puede responder debidamente a delegaciones de trabajo con l??mites de tiempo holgados u obligaciones anticipadas')
      : this.promedios['Trabajo en equipo'] >= 1.1 &&
        this.promedios['Trabajo en equipo'] <= 2
      ? (this.copys.copyTrabajo =
          'Prefiere delegar el trabajo y participar en aquellas actividades que m??s le competan, contribuyendo al apoyo colaborativo para el cumplimiento de sus responsabilidades, dedicando m??s trabajo a objetivos individuales que comunes e involucr??ndose en la din??mica de grupo cuando se le solicita.')
      : this.promedios['Trabajo en equipo'] >= 2.1 &&
        this.promedios['Trabajo en equipo'] <= 3
      ? (this.copys.copyTrabajo =
          'Distingue las capacidades de las personas y el aporte que pueden ofrecer a los equipos, reconoce cuando no es necesario intervenir en el equipo o cuando el trabajo lo puede resolver por su cuenta porque tiene mayor capacidad, siendo capaz de delegar funciones a otros miembros para alcanzar un objetivo com??n.')
      : this.promedios['Trabajo en equipo'] >= 3.1 &&
        this.promedios['Trabajo en equipo'] <= 4
      ? (this.copys.copyTrabajo =
          'Maneja la articulaci??n de los equipos de acuerdo al valor de las personas, alineando los intereses de los miembros con objetivos comunes debidamente establecidos, distribuyendo las distintas funciones de acuerdo a los requerimientos del trabajo y orientando los resultados asertivamente a trav??s de la retroalimentaci??n positiva.')
      : (this.copys.copyTrabajo =
          'Motiva a las personas mejor capacitadas para el trabajo con carisma y empat??a, tiene iniciativa para dinamizar la interacci??n entre los miembros del equipo para promover la colaboraci??n y el trabajo por objetivos mutuos, aportando a la versatilidad del grupo y distribuyendo las funciones de acuerdo a los intereses de cada persona.');

    this.promedios['Negociacion'] >= 0 && this.promedios['Negociacion'] <= 1
      ? (this.copys.copyNegociacion =
          'Puede negociar de manera intuitiva y a corto plazo, d??ndo prioridad a sus intereses y objetivos inmediatos, y prefiriendo los tratos del tipo ' +
          '"todo o nada"' +
          ' en comparaci??n con acuerdos de punto medio.')
      : this.promedios['Negociacion'] >= 1.1 &&
        this.promedios['Negociacion'] <= 2
      ? (this.copys.copyNegociacion =
          'Reconoce a quienes puede ofrecer valor con el que negociar, expone sus intereses para determinar si es posible establecer un objetivo com??n y deja claro lo que pretende recibir a cambio, pero es capaz de conceder un punto medio validando el punto de vista del otro.')
      : this.promedios['Negociacion'] >= 2.1 &&
        this.promedios['Negociacion'] <= 3
      ? (this.copys.copyNegociacion =
          'Su interacci??n apunta a hacer notar los beneficios de la contraparte, establece los l??mites que enmarcan los acuerdos de manera amable y considerada, y lleva hasta el final las negociaciones m??s convenientes.')
      : this.promedios['Negociacion'] >= 3.1 &&
        this.promedios['Negociacion'] <= 4
      ? (this.copys.copyNegociacion =
          'Resalta las ganancias mutuas de los acuerdos, se comunica con prudencia y empat??a, llevando hasta el final las negociaciones donde se promueve la confianza personal, se discuten, se justifican los puntos de vista y se gesta la reciprocidad.')
      : (this.copys.copyNegociacion =
          'Solicita reciprocidad para progresar proporcionalmente en las negociaciones, se percata de que las motivaciones de la contraparte est??n reflejadas en los objetivos, los acuerdos y en los resultados, y se interesa por el trasfondo emocional de los intereses  de los otros.');

    Number(this.promedios['Global']) >= 0 &&
    Number(this.promedios['Global']) <= 1
      ? (this.copyGlobal =
          'Persona enfocada en conservar competencias funcionales elementales para el rendimiento en el contexto laboral. Con principal inter??s en resolver necesidades y responsabilidades b??sicas e inmediatas. Tiene oportunidadde fortalecer sus rasgos de desempe??o para elaborar e implementar proyectos de emprendimiento y despertar un esp??ritu emprendedor como alternativa al empleo')
      : Number(this.promedios['Global']) >= 1.1 &&
        Number(this.promedios['Global']) <= 2
      ? (this.copyGlobal =
          'Persona orientada en nociones b??sicas en relaci??n a los procesos de emprendimiento. Con limitada competencia y conocimiento para la elaboraci??n, implementaci??n de proyectos emprendedores, pero con gr??n potencial para participar y   aprender efectivamente de proyectos de emprendimiento ya existentes')
      : Number(this.promedios['Global']) >= 2.1 &&
        Number(this.promedios['Global']) <= 3
      ? (this.copyGlobal =
          'Persona interesada en atender constantemente su aprendizaje y desempe??o tanto en el contexto laboral como en el empresarial. Con conocimientos y disposici??n para participar, elaborar e implementar proyectos de emprendimiento pese a tener oportunidad de agudizar sus competencias. A??n as??, es capaz de producir aportes significativos en equipos de trabajo.')
      : Number(this.promedios['Global']) >= 3.1 &&
        Number(this.promedios['Global']) <= 4
      ? (this.copyGlobal =
          'Persona con notable desempe??o laboral y propensi??n a demostrar y desarrollar destrezas ejemplares relacionadas con el ??xito de proyectos emprendedores, y con oportunidad de perfeccionar sus habilidades en materia de elaboraci??n e implementaci??n de proyectos emprendedores. Capaz de proponer aportes de impacto en equipos de trabajo.')
      : (this.copyGlobal =
          'Persona disciplinada, constate, aut??noma y visionaria en el fortalecimiento y ejercicio de sus competencias para el emprendimiento, que le permiten sacar provecho tanto en contextos laborales como empresariales. Tiene oportunidad de impulsar, desarrollar y coordinar equipos de trabajo para generar impacto por medio de la articulaci??n de los miembros.');
    this.arraysCopys();
  }

  arraysCopys() {
    this.copysCapacidades = [
      ['Autoeficacia', this.copys.copyAutoeficacia],
      ['Locus de control', this.copys.copyControl],
      ['Optimismo', this.copys.copyOptimismo],
      ['Persistencia', this.copys.copyPersistencia],
      ['Propensi??n al riesgo', this.copys.copyRiesgo],
      ['Autonom??a', this.copys.copyAutonomia],
      ['Creatividad', this.copys.copyCreatividad],
      ['Identificaci??n de oportunidades', this.copys.copyOportunidades],
      ['Flexibilidad', this.copys.copyFlexibilidad],
      ['Manejo de estr??s', this.copys.copyEstres],
      ['Resiliencia', this.copys.copyResiliencia],
      ['Frustraci??n', this.copys.copyFrustracion],
    ];

    this.copysPlaneacion = [
      ['Orientaci??n al logro', this.copys.copyLogro],
      ['Intenci??n de Emprender', this.copys.copyEmprender],
      ['Planificaci??n', this.copys.copyPlanificacion],
      ['Evaluaci??n', this.copys.copyEvaluacion],
      ['Eficiencia', this.copys.copyEficiencia],
      ['Eficacia', this.copys.copyEficacia],
    ];

    this.copysHabilidades = [
      ['Relaciones', this.copys.copyRelaciones],
      ['Trabajo en equipo', this.copys.copyTrabajo],
      ['Negociaci??n', this.copys.copyNegociacion],
    ];
  }

  prevCopy(copy) {
    if (copy == 'capacidades') {
      if (this.positionCopyCapacidades == 0) {
        this.positionCopyCapacidades = 11;
      } else {
        this.positionCopyCapacidades -= 1;
      }
    }

    if (copy == 'planeacion') {
      if (this.positionCopyPlaneacion == 0) {
        this.positionCopyPlaneacion = 5;
      } else {
        this.positionCopyPlaneacion -= 1;
      }
    }

    if (copy == 'habilidades') {
      if (this.positionCopyHabilidades == 0) {
        this.positionCopyHabilidades = 2;
      } else {
        this.positionCopyHabilidades -= 1;
      }
    }
  }

  nextCopy(copy) {
    if (copy == 'capacidades') {
      if (this.positionCopyCapacidades == 11) {
        this.positionCopyCapacidades = 0;
      } else {
        this.positionCopyCapacidades += 1;
      }
    }

    if (copy == 'planeacion') {
      if (this.positionCopyPlaneacion == 5) {
        this.positionCopyPlaneacion = 0;
      } else {
        this.positionCopyPlaneacion += 1;
      }
    }

    if (copy == 'habilidades') {
      if (this.positionCopyHabilidades == 2) {
        this.positionCopyHabilidades = 0;
      } else {
        this.positionCopyHabilidades += 1;
      }
    }
  }

  async createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'radar',
      data: {
        labels: [
          'Autoeficacia',
          'Locus de control',
          'Optimismo',
          'Persistencia',
          ['Propension al', 'Riesgo'],
          'Autonomia',
          'Creatividad',
          ['Identificacion', 'de Oportunidades'],
          'Flexibilidad',
          ['Manejo', 'de estres'],
          'Resiliencia',
          ['Tolerancia a', ' la frustracion'],
        ],
        datasets: [
          {
            label: 'Mi perfil',
            data: [
              this.promedios['Autoeficacia'],
              this.promedios['Locus de control'],
              this.promedios['Optimismo'],
              this.promedios['Persistencia'],
              this.promedios['Propension al Riesgo'],
              this.promedios['Autonomia'],
              this.promedios['Creatividad'],
              this.promedios['Identificacion de Oportunidades'],
              this.promedios['Flexibilidad'],
              this.promedios['Manejo de estres'],
              this.promedios['Resiliencia'],
              this.promedios['Tolerancia a la frustracion'],
            ],
            fill: true,
            backgroundColor: 'rgba(24,36, 62, 0.2)',
            borderColor: 'rgb(24,36, 62)',
            pointBackgroundColor: 'rgb(96, 137, 198)',
            pointBorderColor: 'rgb(96, 137, 198)',
            pointHoverBackgroundColor: '#E73B3B',
            pointHoverBorderColor: '#E73B3B',
            pointHoverRadius: 6,
          },
          {
            label: 'Perfil promedio',
            data: [
              4.275, 3.968, 4.146, 3.694, 3.511, 3.423, 3.195, 4.095, 3.035,
              3.606, 4.145, 3.874,
            ],
            fill: true,
            backgroundColor: 'rgba(18,173, 137, 0.2)',
            borderColor: 'rgb(18,173, 137)',
            pointBackgroundColor: 'rgb(5, 45, 34)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(5, 45, 34)',
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgb(24, 36, 62)',
            },
            grid: {
              color: 'rgb(24, 36, 62)',
            },
            pointLabels: {
              color: 'rgb(29, 29, 27)',
              font: {
                family: 'Montserrat',
                size: 11,
              },
            },
            ticks: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 11,
              },
              stepSize: 1,
            },
            suggestedMin: 0.5,
            suggestedMax: 5,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 15,
              },
            },
          },
        },
        animation: {
          duration: 0,
        },
      },
    });
  }

  async createBarChartPlanificacion() {
    this.bars2 = new Chart(this.barChart2.nativeElement, {
      type: 'radar',
      data: {
        labels: [
          ['Orientaci??n', 'al logro'],
          ['Intenci??n', 'de', 'emprender'],
          'Planificaci??n',
          'Evaluaci??n',
          'Eficiencia',
          'Eficacia',
        ],
        datasets: [
          {
            label: 'Mi perfil',
            data: [
              this.promedios['Orientacion al logro'],
              this.promedios['Intencion de Emprender'],
              this.promedios['Planificacion'],
              this.promedios['Evaluacion'],
              this.promedios['Eficiencia'],
              this.promedios['Eficacia'],
            ],
            fill: true,
            backgroundColor: 'rgba(24,36, 62, 0.2)',
            borderColor: 'rgb(24,36, 62)',
            pointBackgroundColor: 'rgb(96, 137, 198)',
            pointBorderColor: 'rgb(96, 137, 198)',
            pointHoverBackgroundColor: '#E73B3B',
            pointHoverBorderColor: '#E73B3B',
            pointHoverRadius: 6,
          },
          {
            label: 'Perfil promedio',
            fill: true,
            backgroundColor: 'rgba(18,173, 137, 0.2)',
            borderColor: 'rgb(18,173, 137)',
            pointBackgroundColor: 'rgb(5, 45, 34)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(5, 45, 34)',
            pointHoverRadius: 6,
            data: [4.257, 3.504, 2.622, 3.856, 4.033, 3.706],
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgb(24, 36, 62)',
            },
            grid: {
              color: 'rgb(24, 36, 62)',
            },
            pointLabels: {
              color: 'rgb(29, 29, 27)',
              font: {
                family: 'Montserrat',
                size: 11,
              },
            },
            ticks: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 12,
              },
              stepSize: 1,
            },
            suggestedMin: 0.5,
            suggestedMax: 5,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 15,
              },
            },
          },
        },
        animation: {
          duration: 0,
        },
      },
    });
  }

  async createBarChartHabilidades() {
    this.bars3 = new Chart(this.barChart3.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Relaciones', ['Trabajo', 'en equipo'], 'Negociacion'],
        datasets: [
          {
            label: 'Mi perfil',
            data: [
              this.promedios['Relaciones'],
              this.promedios['Trabajo en equipo'],
              this.promedios['Negociacion'],
            ],
            fill: true,
            backgroundColor: 'rgba(24,36, 62, 0.2)',
            borderColor: 'rgb(24,36, 62)',
            pointBackgroundColor: 'rgb(96, 137, 198)',
            pointBorderColor: 'rgb(96, 137, 198)',
            pointHoverBackgroundColor: '#E73B3B',
            pointHoverBorderColor: '#E73B3B',
            pointHoverRadius: 6,
          },
          {
            label: 'Perfil promedio',
            data: [3.548, 4.105, 3.697],
            fill: true,
            backgroundColor: 'rgba(18,173, 137, 0.2)',
            borderColor: 'rgb(18,173, 137)',
            pointBackgroundColor: 'rgb(5, 45, 34)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(5, 45, 34)',
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgb(24, 36, 62)',
            },
            grid: {
              color: 'rgb(24, 36, 62)',
            },
            pointLabels: {
              color: 'rgb(29, 29, 27)',
              font: {
                family: 'Montserrat',
                size: 11,
              },
            },
            ticks: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 12,
              },
              stepSize: 1,
            },
            suggestedMin: 0.5,
            suggestedMax: 5,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 15,
              },
            },
          },
        },
        animation: {
          duration: 0,
        },
      },
    });
  }

  async createBarChartGlobal() {
    this.bars4 = new Chart(this.barChart4.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Capacidades', 'Planeaci??n', ['Habilidades', 'Sociales']],
        datasets: [
          {
            label: 'Mi perfil',
            data: [
              this.promedios['Capacidades'],
              this.promedios['Planeacion'],
              this.promedios['Social'],
            ],
            fill: true,
            backgroundColor: 'rgba(24,36, 62, 0.2)',
            borderColor: 'rgb(24,36, 62)',
            pointBackgroundColor: 'rgb(96, 137, 198)',
            pointBorderColor: 'rgb(96, 137, 198)',
            pointHoverBackgroundColor: '#E73B3B',
            pointHoverBorderColor: '#E73B3B',
            pointHoverRadius: 6,
          },
          {
            label: 'Perfil promedio',
            data: [3.548, 4.105, 3.697],
            fill: true,
            backgroundColor: 'rgba(18,173, 137, 0.2)',
            borderColor: 'rgb(18,173, 137)',
            pointBackgroundColor: 'rgb(5, 45, 34)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#E73B3B',
            pointHoverBorderColor: '#E73B3B',
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        elements: {
          line: {
            borderWidth: 3,
          },
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgb(24, 36, 62)',
            },
            grid: {
              color: 'rgb(24, 36, 62)',
            },
            pointLabels: {
              color: 'rgb(29, 29, 27)',
              font: {
                family: 'Montserrat',
                size: 11,
              },
            },
            ticks: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 12,
              },
              stepSize: 1,
            },
            suggestedMin: 0.5,
            suggestedMax: 5,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: 'rgb(0, 0, 0)',
              font: {
                family: 'Montserrat',
                size: 15,
              },
            },
          },
        },
        animation: {
          duration: 0,
        },
      },
    });
  }

  //Metodo para enviar a results
  goNext() {
    this.router.navigate(['/results/vista2']);
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Generando PDF...',
      spinner: 'circles',
      cssClass: 'loading-pdf',
    });

    this.loading.present();
  }

  getScreenshots() {
    this.showLoading().then(() => {
      document
        .querySelector('app-vista1')
        .querySelector('ion-content')
        .scrollToTop();
      this.isPrinting = true;
      setTimeout(() => {
        const node = document.getElementById('resultado');

        html2canvas(node, {
          width: node.scrollWidth,
          height: node.scrollHeight,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          backgroundColor: 'rgb(225,225,251)',
          ignoreElements: (element: any) => {
            if ('btnResult' == element.id) {
              return true;
            }
          },
        }).then((canvas: any) => {
          const imgWidth = 210;
          const pageHeight = 290;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;

          const doc = new jsPDF('p', 'mm');
          let position = 0;
          const pageData = canvas.toDataURL('image/jpeg', 1.0);

          const imgData = encodeURIComponent(pageData);
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          doc.setDrawColor(255, 255, 255);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          doc.save('Resultados prueba CUMBRE - ' + this.user.nombre + '.pdf');
          this.loading.dismiss();
        });
      }, 1000);
    });

    // let base64 = [];
    // const sc = [
    //   document.getElementById('containerResults'),
    //   document.getElementById('chart2'),
    //   document.getElementById('chart3'),
    //   document.getElementById('chart4'),
    // ];

    // sc.forEach((element) => {
    //   html2canvas(element, {
    //     width: element.scrollWidth,
    //     height: element.scrollHeight,
    //     scrollX: -window.scrollX,
    //     scrollY: -window.scrollY,
    //     scale: 3,
    //     imageTimeout: 1500,
    //     backgroundColor: 'rgb(255, 255, 255)',
    //   }).then((canvas: any) => {
    //     const pageData = canvas.toDataURL('image/jpeg', 1.0);
    //     base64[base64.length] = pageData;
    //     console.log(base64);

    //     if (base64.length == 4) {
    //       this.descargarPDF(base64)
    //     }
    //   });
    // });
  }

  descargarPDF(screenShots: Array<any>) {
    // this.pdfService.generarPDF(
    //   this.name,
    //   this.date,
    //   this.copys,
    //   this.copyGlobal,
    //   screenShots
    // );

    this.pdfService.generarPDF();
  }
}
