import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.component.html',
  styleUrls: ['./vista1.component.scss'],
})
export class Vista1Component implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart;
  @ViewChild('barChart2') barChart2;
  @ViewChild('barChart3') barChart3;
  @ViewChild('barChart4') barChart4;
  sections;
  array;
  object;
  generalsArray;
  name;
  date;
  copyAutoeficacia: String;
  copyControl: String;
  copyOptimismo: String;
  copyPersistencia: String;
  copyRiesgo: String;
  copyAutonomia: String;
  copyCreatividad: String;
  copyOportunidades: String;
  copyFlexibilidad: String;
  copyEstres: String;
  copyResiliencia: String;
  copyFrustracion: String;
  copyLogro: String;
  copyEmprender: String;
  copyPlanificacion: String;
  copyEvaluacion: String;
  copyEficiencia: String;
  copyEficacia: String;
  copyRelaciones: String;
  copyTrabajo: String;
  copyNegociacion: String;
  copyCapacidades: String;
  copyPlaneacion: String;
  copySocial: String;
  copyGlobal: String;
  positionCopyCapacidades = 0;
  positionCopyPlaneacion = 0;
  positionCopyHabilidades = 0;
  bars: any;
  bars2: any;
  bars3: any;
  bars4: any;

  copysCapacidades;
  dataCapacidades;
  copysPlaneacion;
  dataPlaneacion;
  copysHabilidades;
  dataHabilidades;
  dataGlobal;
  constructor(private router: Router) {
    this.groupObject();
    this.sections = 0;
  }

  ngOnInit() {
    this.name = sessionStorage.getItem('nameRepo');
    this.date = new Date(
      sessionStorage.getItem('dateRepo')
    ).toLocaleDateString();
    this.copyResults();
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.createBarChartPlanificacion();
    this.createBarChartHabilidades();
    this.createBarChartGlobal();
  }

  groupObject() {
    this.array = JSON.parse(sessionStorage.getItem('resultadosRepo'));
    console.log(this.array)
    this.array['Autoeficacia'] = this.array[0];
    this.array['Locus de control'] = this.array[1];
    this.array['Optimismo'] = this.array[2];
    this.array['Persistencia'] = this.array[3];
    this.array['Propension al Riesgo'] = this.array[4];
    this.array['Autonomia'] = this.array[5];
    this.array['Creatividad'] = this.array[6];
    this.array['Identificacion de Oportunidades'] = this.array[7];
    this.array['Flexibilidad'] = this.array[8];
    this.array['Manejo de estres'] = this.array[9];
    this.array['Resiliencia'] = this.array[10];
    this.array['Tolerancia a la frustracion'] = this.array[11];
    this.array['Orientacion al logro'] = this.array[12];
    this.array['Intencion de Emprender'] = this.array[13];
    this.array['Planificacion'] = this.array[14];
    this.array['Evaluacion'] = this.array[15];
    this.array['Eficiencia'] = this.array[16];
    this.array['Eficacia'] = this.array[17];
    this.array['Relaciones'] = this.array[18];
    this.array['Trabajo en equipo'] = this.array[19];
    this.array['Negociacion'] = this.array[20];
    this.array['Capacidades'] = this.array[21];
    this.array['Planeacion'] = this.array[22];
    this.array['Social'] = this.array[23];
    this.array['Global'] = this.array[24];
  }

  copyResults() {
    this.array['Autoeficacia'] >= 0 && this.array['Autoeficacia'] <= 1
      ? (this.copyAutoeficacia =
          'Siente que sus capacidades suelen estar fuera de lugar o que no cuenta con muchas fortalezas. No le es sencillo fortalecer o adquirir suficientes habilidades para realizar ciertas tareas. No siente que pueda organizarse y hacer lo necesario para cumplir sus metas. Para actividades que parecen complicadas puede creer que no quiere o no puede hacerlas, siendo éstas en las que debe esforzarse más. Su falta de conocimiento sobre las actividades le pueden llevar a evadir la tarea en próximas ocasiones.')
      : this.array['Autoeficacia'] >= 1.1 && this.array['Autoeficacia'] <= 2
      ? (this.copyAutoeficacia =
          'Siente que cuenta con capacidades para momentos concretos y que puede intentar mejorar aquellas en las que confía. Puede distinguir las acciones y competencias que requiere fortalecer para contribuir al cumplimiento de sus metas, pero siente que le tomaría demasiado esfuerzo para ello. Reconoce fácilmente las actividades que sobrepasan sus capacidades y establece límites en sus metas según su falta de familiaridad con la tarea. Los fracasos previos en actividades realizadas pueden restarle motivación para volverlo a intentar')
      : this.array['Autoeficacia'] >= 2.1 && this.array['Autoeficacia'] <= 3
      ? (this.copyAutoeficacia =
          'Sabe diferenciar claramente los campos y tareas de su competencia. Le interesan los beneficios de fortalecer sus habilidades y talentos. Siente que puede sacar provecho superando retos en los campos que le son familiares y es capaz de esforzarse en ellos si es necesario. Se permite explorar actividades que se relacionen con sus objetivos y le otorguen conocimiento y experiencia.')
      : this.array['Autoeficacia'] >= 3.1 && this.array['Autoeficacia'] <= 4
      ? (this.copyAutoeficacia =
          'Demuestra constantemente sus habilidades en los campos de su competencia. Busca experiencias en las que pueda complementar sus capacidades. Tiene disposición para fortalecer sus habilidades si lo requieren sus objetivos. Puede admitir una  tarea de alta dificultad y esforzarse en ella si sus resultados son provechosos. Es capaz de deducir las alternativas para mejorar sus resultados de acuerdo a las actividades previas en las que ha fracasado.')
      : (this.copyAutoeficacia =
          'Siente que cuenta con habilidades sólidas y pertinentes para realizar lo que se propone y tiene seguridad en los campos de su competencia. Es capaz de mantener un proceso de aprendizaje autónomo para fortalecer sus capacidades. Le entusiasma asumir tareas difíciles que le ofrezcan la oportunidad de mejorar. Asume con apertura y compromiso la identificación de mejoras a partir de sus fracasos para su aprendizaje constante.');

    this.array['Locus de control'] >= 0 && this.array['Locus de control'] <= 1
      ? (this.copyControl =
          'Persona con actitud pasiva frente al control que puede tomar para influir sobre su entorno. Siente poca responsabilidad sobre lo que le ocurre y atribuye sus resultados en mayor medida a causas externas. Tiene poca confianza sobre su propia capacidad para alcanzar sus metas y considera que su esfuerzo no le acerca a lograr lo que se propone. Prefiere las actividades que promuevan igualdad y colaboración, y que no impliquen comparación y competencia.')
      : this.array['Locus de control'] >= 1.1 &&
        this.array['Locus de control'] <= 2
      ? (this.copyControl =
          'Percibe que su esmero no suele ser suficiente para lograr lo que se propone. Así mismo, se abstiene de asumir responsabilidades sobre su entorno o de comprometer sus acciones con  actividades que no garanticen resultados positivos. Siente que rara vez puede intervenir en las consecuencias de los acontecimientos, ya que las circunstancias no se lo permiten o le exigen esfuerzos que no le corresponden. Casi nunca asume liderazgo en las actividades que participa.')
      : this.array['Locus de control'] >= 2.1 &&
        this.array['Locus de control'] <= 3
      ? (this.copyControl =
          'Tiene una visión clara sobre los límites de sus esfuerzos y es capaz de reconocer lo que no puede controlar. Asume con convicción la responsabilidad por las actividades de las que puede sacar provecho. Establece oportunamente cuando no le es posible comprometer sus acciones en objetivos que no le competen, donde no tiene cabida o donde considere que no puede ejercer una influencia considerable.')
      : this.array['Locus de control'] >= 3.1 &&
        this.array['Locus de control'] <= 4
      ? (this.copyControl =
          'Tiene determinación para que sus esfuerzos ejerzan influencia sobre su entorno. Se mantiene al tanto de sus responsabilidades en los resultados que obtiene y tiene disposición para participar en actividades en las que pueda realizar aportes. Raramente atribuye los resultados de sus actos a factores que no puede controlar. Puede reconocer tareas y situaciones en las que sus competencias son capaces de producir mejores resultados.')
      : (this.copyControl =
          'Analiza activamente la forma como sus propios actos tienen repercusión sobre su entorno. Verifica cómo las consecuencias de las situaciones en las que participa son producto de sus acciones u omisiones. Prioriza la identificación de su propia responsabilidad en los resultados de las actividades en las que se involucra, por lo que puede llegar a sentirse responsable del cumplimiento de objetivos que dependen de otros factores ajenos a su influencia.');

    this.array['Optimismo'] >= 0 && this.array['Optimismo'] <= 1
      ? (this.copyOptimismo =
          'Las expectativas negativas que genera sobre el futuro tienden a ser permanentes, personales, globales y en general infundadas. Subestima el resultado de sus acciones y busca explicar exahustivamente los resultados negativos que le ocurren. Se concentra en los aspectos negativos de lo que le ocurre, atribuyéndole mala suerte a sus inconvenientes e imprevistos y considera la posibilidad de que se presenten peores escenarios.')
      : this.array['Optimismo'] >= 1.1 && this.array['Optimismo'] <= 2
      ? (this.copyOptimismo =
          'Puede generar expectativas positivas en medio  perspectivas negativas sobre los acontecimientos futuros. Tiende a mostrar elevada autocompasión y sensibilidad respecto a las condiciones y resultados negativos de sí mismo y de otros. Puede enforcarse sobre las situaciones de injusticia que le han traído consecuencias negativas y magnificar la gravedad de los impases que se le presentan.')
      : this.array['Optimismo'] >= 2.1 && this.array['Optimismo'] <= 3
      ? (this.copyOptimismo =
          'Encuentra razones fundamentadas para generar expectativas negativas sobre el futuro. Es capaz de reconsiderar su pensamiento sobre los resultados negativos y de reevaluar la  irreversibilidad y permanencia de las consecuencias negativas o resultados injustos. Resalta aspectos negativos y defectos cuando cree que alguien debe hacerlo y siente que los resultados positivos o negativos que le ocurren es porque lo ha merecido.')
      : this.array['Optimismo'] >= 3.1 && this.array['Optimismo'] <= 4
      ? (this.copyOptimismo =
          'Concentra sus expectativas principalmente en las consecuencias positivas de los acontecimientos y no suele anticiparse a resultados negativos o injustos.Asocia pensamientos y resultados positivos a las actividades en que participa y tiende a retener en menor medida las consecuencias desafortunadas que ha sufrido. Es capaz de describir las acciones necesarias para mejorar su situación.')
      : (this.copyOptimismo =
          'Se mantiene a la expectativa de resultados positivos y a la espera de cada vez mejores oportunidades aunque no se encuentre en las mejores condiciones.  Le resta importancia a la influencia que pueden causarle los resultados negativos, mantiene perspectivas alentadoras sobre el futuro y realiza acciones que mejoren su situación. Siente que los pensamientos positivos atraen resultados positivos y previenen que sufra afectaciones en el estado de ánimo.');

    this.array['Persistencia'] >= 0 && this.array['Persistencia'] <= 1
      ? (this.copyPersistencia =
          'Se indispone cuando es necesario sobrellevar dificultades que superen sus capacidades. Puede mantener sus esfuerzos ininterrumpidamente mientras esto no le implique realizar actividades distintas de la idea previa que tiene de las tareas. Los obtáculos que se presentan en su trabajo tienen grán posibilidad de inhibir su voluntad por trabajar en los objetivos hasta el final.')
      : this.array['Persistencia'] >= 1.1 && this.array['Persistencia'] <= 2
      ? (this.copyPersistencia =
          'Es capaz de sobrellevar las  dificultades que le importunan para retornar a un estado de equilibrio. Puede focalizar y mantener sus esfuerzos en las actividades que le exigen cumplimiento obligatorio.  Admite tareas que le supongan obstáculos, pero puede presentar los impaces que interfieren en sus objetivos como motivos por los que no vale la pena mantener sus esfuerzos constantes.')
      : this.array['Persistencia'] >= 2.1 && this.array['Persistencia'] <= 3
      ? (this.copyPersistencia =
          'Se compromete con la superación de dificultades concretas y necesarias. Se mantiene constante en aquellos objetivos que le despiertan interés y le inspiran compromiso. Asume la superación de sus propios esfuerzos, pero puede impacientarse debido a cambios de ruta inesperados o intentos fallidos que le desalienten repetidamente.')
      : this.array['Persistencia'] >= 3.1 && this.array['Persistencia'] <= 4
      ? (this.copyPersistencia =
          'Demuestra dominio de las situaciones de dificultad e identifica los resultados en los que pudo invertir mayor esfuerzo. Los obstáculo que interrumpen su trabajo suelen ser en su mayoría aquellos sobre los que no puede hacer nada o aquellos que le indican definitivamente que está desperdiciando sus esfuerzos, lo cual puede llegar a hacerle sentir incapaz.')
      : (this.copyPersistencia =
          'Se cerciora de tener las dificultades bajo control, y llega a sentirse en deuda con lo que no puede remediar. Procura tener suficiente preparación paraenfrentar todos los impaces posibles y se mantiene constante hasta alcanzar sus objetivos. Es más probable que prefiera otra actividad por cuestiones de planeaciónque por los esfuerzos y los obstáculos que cueste.');

    this.array['Propension al Riesgo'] >= 0 &&
    this.array['Propension al Riesgo'] <= 1
      ? (this.copyRiesgo =
          'Prefiere asumir situaciones en ambientes de certeza y con bajo nivel de riesgo de fracaso. Al momento de abordar una nueva actividad, sobreestima la posibilidad de no obtener los resultados deseados,incluso con bajos niveles de riesgo, por lo que percibir alguna consecuencia negativa puede servirle de motivo para no actuar y así evitar posibles decepciones.')
      : this.array['Propension al Riesgo'] >= 1.1 &&
        this.array['Propension al Riesgo'] <= 2
      ? (this.copyRiesgo =
          'Siente plena seguridad para asumir situaciones en ambientes con niveles de riesgo controlado. Tiene disposición para asumir consecuencias menores como resultado de la incertidumbre y prefiere evitar las consecuencias grandes sin tener en cuenta la posibilidad de que le afecten. Puede juzgar la situaciones en mayor medida por los peores escenarios posibles que por la posibilidad de obtener el valor de los resultados.')
      : this.array['Propension al Riesgo'] >= 2.1 &&
        this.array['Propension al Riesgo'] <= 3
      ? (this.copyRiesgo =
          'Se pemite explorar las posibilidades de obtener resultados positivos en ambientes de incertidumbre y de riesgos de fracaso. Considera la posibilidad de obtener consecuencias negativas, pero prefiere asumir las situaciones donde pueda reducir en la medida de lo posible las pérdidas asociadas a los respectivos riesgos.')
      : this.array['Propension al Riesgo'] >= 3.1 &&
        this.array['Propension al Riesgo'] <= 4
      ? (this.copyRiesgo =
          'Acepta la participación en situaciones de incertidumbre en tanto mayor conciencia pueda tener sobre los riesgos y sus consecuencias. Considera en primer lugar los riesgos que puedan afectar su integridad o estabilidad. Se expone a los posibles fracasos si considera que puede maximizar sus beneficios y garantizar la obtención de los resultados convenientes.')
      : (this.copyRiesgo =
          'Asume abiertamente situaciones de alta incertidumbre que le supongan algún tipo de beneficio o progreso en el alcance de sus objetivos, siendo capaz de aceptar escenarios de grándes pérdidas, para los cuales determina actividades de recuperación. Puede realizar análisis y planeaciones detalladas para estimar tanto las posibilidades de éxito como de fracaso, dando prioridad a los resultados positivos y exponiéndose a grándes riesgos si el valor que puede obtener es significativo.');

    this.array['Autonomia'] >= 0 && this.array['Autonomia'] <= 1
      ? (this.copyAutonomia =
          'Su postura se ve influida por criterios ajenos, su punto de vista puede seder ante la presión de terceros, mostrando una posición flexible ante la aprobación en distintas situaciones y apoyándose en otros con impulsividad.')
      : this.array['Autonomia'] >= 1.1 && this.array['Autonomia'] <= 2
      ? (this.copyAutonomia =
          'A pesar de que su postura se ve influida por criterios ajenos, tiene cierta resistencia a la presión y puede actuar de manera independiente para mantener una posición regular, reconociendo claramente los puntos de vista de los que se distancia, pero requiriendo aprobación o validación de otros para tener seguridad sobre su propio punto de vista.')
      : this.array['Autonomia'] >= 2.1 && this.array['Autonomia'] <= 3
      ? (this.copyAutonomia =
          'Procura no permitir sugestión sobre su postura por criterios ajenos, actuando con estabilidad frente a la sugestión de terceros y mostrando una posición que llega a prescindir de la aprobación de otros en distintas situaciones, pero precisando de apoyo frente a las dificultades que en principio no parecen fáciles de resolver')
      : this.array['Autonomia'] >= 3.1 && this.array['Autonomia'] <= 4
      ? (this.copyAutonomia =
          'A pesar de que conserva una postura firme, con suficiente presión puede verse influida por criterios u opiniones ajenas, y es capaz de aceptar cambios en su punto de vista por alternativas razonables, lo que le hace reconsiderar la independencia de sus actos y la percepción sobre el apoyo que puede llegar a requerir de otros.')
      : (this.copyAutonomia =
          'Conserva una postura sólida, que apenas se ve influida por criterios ajenos, pudiendo actuar con firmeza pese a las sugestiones de terceros e incluso frente a los puntos de vista dominantes, mostrando una posición independiente de la aprobación y reconociendo asertivamente cuando requiere el apoyo de otros.');

    this.array['Creatividad'] >= 0 && this.array['Creatividad'] <= 1
      ? (this.copyCreatividad =
          'Resuelve problemas cotidianos mediante procesos secuenciales, confiables y comunes, no suele experimentar con ideas o perspectivas inusuales en la búsqueda de resultados originales orientados a la solución de problemas.')
      : this.array['Creatividad'] >= 1.1 && this.array['Creatividad'] <= 2
      ? (this.copyCreatividad =
          'Aunque en su mayoría acude a procesos secuenciales, confiables y comunes para resolver problemas, puede producir resultados que destaquen por su originalidad orientados a una solución elemental, basado en la experimentación con ideas o perspectivas inusuales.')
      : this.array['Creatividad'] >= 2.1 && this.array['Creatividad'] <= 3
      ? (this.copyCreatividad =
          'Acude tanto a procesos estructurados, confiables y comunes, como a procesos originales e inusuales para resolver problemas. Con la motivación adecuada puede experimentar con ideas o perspectivas sorprendentes en la búsqueda de resultados auténticos y dirigidos a solucionar problemas.')
      : this.array['Creatividad'] >= 3.1 && this.array['Creatividad'] <= 4
      ? (this.copyCreatividad =
          'En su mayoría, acude a procesos desestructurados y singulares al momento de resolver problemas, produciendo intencionadamente resultados originales orientados a la solución de problemas, basado en la experimentación con ideas o perspectivas auténticas.')
      : (this.copyCreatividad =
          'En grán parte de los procesos es capaz de resolver problemas mediante procesos desestructurados y novedosos, produciendo resultados  originales orientados al desarrollo de resultados o la solución de problemas, aprovechando los recursos de la experimentación con ideas o perspectivas auténticas.');

    this.array['Identificacion de Oportunidades'] >= 0 &&
    this.array['Identificacion de Oportunidades'] <= 1
      ? (this.copyOportunidades =
          'Tiene una posición pasiva respecto a la detección de oportunidades, con poco interés por estudiar las debilidades y fortalezas de competidores para plantear ventajas competitivas, al igual que poco interés por entender los factores contextuales que sirven para aprovechar oportunidades del entorno.')
      : this.array['Identificacion de Oportunidades'] >= 1.1 &&
        this.array['Identificacion de Oportunidades'] <= 2
      ? (this.copyOportunidades =
          'Logra identificar oportunidades de manera provisional, pudiendo distinguir algunas debilidades y fortalezas de competidores en la búsqueda de ventajas competitivas y siendo capaz de tener en cuenta los factores contextuales explícitos que sirven para aprovechar oportunidades o necesidades del entorno.')
      : this.array['Identificacion de Oportunidades'] >= 2.1 &&
        this.array['Identificacion de Oportunidades'] <= 3
      ? (this.copyOportunidades =
          'Tiene capacidad para identificar debilidades y fortalezas de competidores mediante la planeación y el análisis de información para proponer ventajas competitivas, al igual que capacidad de responder frente a los factores contextuales de los que sacar provecho, y con lo que aporta al cumplimiento de sus responsabilidades.')
      : this.array['Identificacion de Oportunidades'] >= 3.1 &&
        this.array['Identificacion de Oportunidades'] <= 4
      ? (this.copyOportunidades =
          'Puede asumir un estado de alerta para identificar debilidades y fortalezas cruciales de competidores en la búsqueda de sus propias ventajas. Al igual, es capaz de escanear y diferenciar los factores contextuales relevantes con los que puede sacar provecho de oportunidades o sugerir soluciones diferentes a necesidades comunes.')
      : (this.copyOportunidades =
          'Tiene habilidad para deducir asertivamente fortalezas y debilidades de competidores en búsqueda de sus propias ventajas, al igual que una constante y aguda sensibilidad sobre los factores contextuales con los que puede proponer acciones estratégicas a partir de nuevas ideas.');

    this.array['Flexibilidad'] >= 0 && this.array['Flexibilidad'] <= 1
      ? (this.copyFlexibilidad =
          'Prefiere seguir procesos concretos y acoplarse a situaciones con expectativas claras y poco novedosas, con las que esté previamente familiarizado, evitando el dinamismo y moderando los cambios que le exigen adaptación obligatoria')
      : this.array['Flexibilidad'] >= 1.1 && this.array['Flexibilidad'] <= 2
      ? (this.copyFlexibilidad =
          'Ocasionalmente enfrenta cambios inesperados y no suele reaccionar con dominio de la situación en medio del dinamismo, busca la estabilidad y evita cambios recurrentes, mostrando apenas disposición para resignarse a situaciones con un mínimo grado de incertidumbre.')
      : this.array['Flexibilidad'] >= 2.1 && this.array['Flexibilidad'] <= 3
      ? (this.copyFlexibilidad =
          'Asume con moderación los cambios inesperados y el dinamismo en el ambiente, mostrando apertura para acoplarse a situaciones novedosas con las que no se familiariza y que traen resultados positivos, aunque prefiere los cambios previstos a los repentinos y los superficiales a los estructurales.')
      : this.array['Flexibilidad'] >= 3.1 && this.array['Flexibilidad'] <= 4
      ? (this.copyFlexibilidad =
          'Acepta en buena medida los cambios inesperados y el dinamismo, mostrando facilidad de adaptación a situaciones novedosas y capacidad de respuesta frente a cambios estructurales y persistentes, encontrándo propósito en las nuevas condiciones tras un periodo de acoplamiento.')
      : (this.copyFlexibilidad =
          'Presenta amplia capacidad de adaptación, apertura a los cambios inesperados y al dinamismo en el ambiente, sacando provecho de ello y siendo competente, responsivo y productivo para acoplarse a situaciones novedosas que incluso cambien las condiciones y reglas de juego');

    this.array['Manejo de estres'] >= 0 && this.array['Manejo de estres'] <= 1
      ? (this.copyEstres =
          'Tiende a ser reactivo en situaciones de presión y preocupación, ignorando estrategias para afrontar la tensión y teniendo limitado control y reconocimiento emocional en respuesta del estrés, por lo que le pueden sobrepasar las situaciones estresantes y hacerle perder control personal sin percatarse de ello.')
      : this.array['Manejo de estres'] >= 1.1 &&
        this.array['Manejo de estres'] <= 2
      ? (this.copyEstres =
          'Consigue mostrar control y reconocimiento limitados de sus emociones, mostrando alguna capacidad para lidiar con situaciones difíciles y tensionantes por medio de la retención de la necesidad de desahogo como estrategia de afrontamiento del estrés.')
      : this.array['Manejo de estres'] >= 2.1 &&
        this.array['Manejo de estres'] <= 3
      ? (this.copyEstres =
          'Gestiona sus emociones con moderación, mostrando competencias básicas para lidiar con situaciones difíciles y tensionantes, por medio de la reducción o suspensión de las obligaciones y conseguir moderar los efectos y las reacciones del estrés.')
      : this.array['Manejo de estres'] >= 3.1 &&
        this.array['Manejo de estres'] <= 4
      ? (this.copyEstres =
          'Reconoce, acepta y regula sus emociones en situaciones tensionantes, mostrando intención de evitar niveles excesivos de estrés por medio de estrategias de afrontamiento, lo que resulta en un control de sí ante reacciones nocivas e involuntarias.')
      : (this.copyEstres =
          'Muestra suficiente capacidad para regular y autogestionar sus emociones, contando con estrategias para afrontar situaciones difíciles con intención de evitar niveles excesivos de estrés, siendo capaz de sobrellevar percances y anticipar sus reacciones ante situaciones estresantes previstas.');

    this.array['Resiliencia'] >= 0 && this.array['Resiliencia'] <= 1
      ? (this.copyResiliencia =
          'Percibe el fracaso como una experiencia aversiva, limitante y desmotivante, reduciendo su capacidad de acción y aprendizaje tras una situación adversa y enfocándose principalmente en los aspectos negativos, lo que le desmotiva para exponerse en el futuro a situaciones con posibilidad de fracaso y por lo que no le interesa identificar la causa de las adversidades pasadas.')
      : this.array['Resiliencia'] >= 1.1 && this.array['Resiliencia'] <= 2
      ? (this.copyResiliencia =
          'Experimenta el fracaso como un resultado intimidante, cuestionando su capacidad de acción y aprendizaje tras una situación adversa, enfocándose considerablemente en los aspectos negativos que se vieron afectados o que se perdieron tras un fracaso, y subestimando el valor de la experiencia y de los conocimientos de las causas del fracaso.')
      : this.array['Resiliencia'] >= 2.1 && this.array['Resiliencia'] <= 3
      ? (this.copyResiliencia =
          'Asume el fracaso como una experiencia esperable, siendo capaz de sostener su capacidad de acción tras situaciones adversas, procurando dejar pasar los aspectos negativos pero enfocándose tanto en lo negativo como en lo positivo, pudiendo distinguir mejor de los motivos previos de fracaso.')
      : this.array['Resiliencia'] >= 3.1 && this.array['Resiliencia'] <= 4
      ? (this.copyResiliencia =
          'Acepta el fracaso como una experiencia de aprendizaje, capaz de reconocer en las situaciones adversas una oportunidad para dejar que surjan novedades positivas, inesperadas e implementar mejoras a través de acciones que demuestren que se enfoca considerablemente en los aspectos positivos.')
      : (this.copyResiliencia =
          'Encuentra en el fracaso una experiencia provechosa, adopta perspectivas del fracaso como una oportunidad para mejorar y prevenir la reincidencia de las fallas, enfocándose principalmente en los aspectos positivos que pueden ser aprovechados en situaciones futuras con mayor cautela y conciencia de los motivos de los fracasos previos.');

    this.array['Tolerancia a la frustracion'] >= 0 &&
    this.array['Tolerancia a la frustracion'] <= 1
      ? (this.copyFrustracion =
          'Permite que la frustración afecte el dominio sobre sus actividades más fácilmente, centrándose en lo que pudo hacer mejor más que en lo que puede hacer para resolver la fuente de su frustración, lo que le implica menor paciencia y menor desempeño continuo de una actividad ante los posibles obstáculos.')
      : this.array['Tolerancia a la frustracion'] >= 1.1 &&
        this.array['Tolerancia a la frustracion'] <= 2
      ? (this.copyFrustracion =
          'Rechaza los errores y los resultados adversos en grán medida, permitiendo afectar su flujo de actividad frente a eventos desfavorables, en especial aquellos que son persistentes e inalterables. Puede desalentarse y permitir que  la frustración afecte su capacidad de acción.')
      : this.array['Tolerancia a la frustracion'] >= 2.1 &&
        this.array['Tolerancia a la frustracion'] <= 3
      ? (this.copyFrustracion =
          'Capaz de aceptar errores y situaciones adversas en respuesta al cumplimiento de obligaciones y responsabilidades. Puede mantener su flujo de actividad frente a eventos desfavorables y regular el desaliento, pero comprometiendo su funcionalidad si la fuente del fracaso le despierta mayor interés y le ha dedicado mayor esfuerzo.')
      : this.array['Tolerancia a la frustracion'] >= 3.1 &&
        this.array['Tolerancia a la frustracion'] <= 4
      ? (this.copyFrustracion =
          'Muestra capacidad de respuesta al momento de aceptar errores y situaciones adversas que se puedan presentar, así como disposición para mantener control en el flujo de actividad y mantener su motivación por cumplir objetivos frente a eventos desfavorables, lo que implica mayor capacidad para superar los obstáculos que se interpongan, asumiéndolos como desafíos.')
      : (this.copyFrustracion =
          'Se le facilita prever las fuentes de sus frustaciones, pudiendo aceptar errores y situaciones adversas que se presenten, y siendo consciente de cómo pueden afectarle en los progresos de sus objetivos. También posee competencia para mantener su flujo de actividad y reconsiderar la utilidad del desaliento frente a eventos desfavorables.');

    this.array['Orientacion al logro'] >= 0 &&
    this.array['Orientacion al logro'] <= 1
      ? (this.copyLogro =
          'Se interesa y enfoca en múltiples metas e invierte sus esfuerzos en distintas direcciones y con distintas intensidades, por lo que dispersa buena parte de su energía y disminuye la potencia de su trabajo, siendo capaz de alcanzar sus objetivos si no se presentan imprevistos.')
      : this.array['Orientacion al logro'] >= 1.1 &&
        this.array['Orientacion al logro'] <= 2
      ? (this.copyLogro =
          'Es capaz de orientar las acciones hacia logros determinados y enfocar los recursos disponibles para alcanzar resultados con calidad estándar, por lo que su energía se concentra para cumplir con las responsabilidades previstas, siendo capaz de analizar y resolver problemas concretos que se hayan anticipado.')
      : this.array['Orientacion al logro'] >= 2.1 &&
        this.array['Orientacion al logro'] <= 3
      ? (this.copyLogro =
          'Es capaz de progresar hacia metas exigentes que requieren enfoque y dedicación constante, por lo que su energía se direcciona para minimizar y resistir distintos imprevistos, siendo capaz de mejorar su  estrategia y ser más eficiente trabajando por sus objetivos en el ámbito de los riesgos controlados.')
      : this.array['Orientacion al logro'] >= 3.1 &&
        this.array['Orientacion al logro'] <= 4
      ? (this.copyLogro =
          'Buena parte de sus metas son ambiciosas, y están establecidas con la confianza, la claridad y el enfoque necesarios, por lo que es capaz de comprometer sus esfuerzos para para lograr sus objetivos, persiguiendo resultados que constantemente sobresalgan de la calidad estándar y siendo capaz de ajustar la intensidad de su trabajo en correspondencia con los imprevistos que se presenten.')
      : (this.copyLogro =
          'Demuestra rendimiento superior gracias a la claridad con la que determina sus objetivos y al enfoque con el que progresa hacia la obtención de resultados mediante la autodirección y la superación de retos e imprevistos, invirtiendo la energía suficiente para alcanzar los logros y optimizando en lo posible el aprovechamiento de sus esfuerzos para obtener la máxima calidad posible.');

    this.array['Intencion de Emprender'] >= 0 &&
    this.array['Intencion de Emprender'] <= 1
      ? (this.copyEmprender =
          'Sus propósitos no suelen relacionarse con la generación de ideas de negocio o emprendimiento, prefiriendo las formas convencionales de obtención de logros y desarrollo personal, y dándo mayor relevancia a las actividades familiares o pasatiempos.')
      : this.array['Intencion de Emprender'] >= 1.1 &&
        this.array['Intencion de Emprender'] <= 2
      ? (this.copyEmprender =
          'Siente curiosidad por generar acciones prácticas y en el corto plazo, que le aporten algún beneficio adicional, con pocas expectativas de mantener constancia en actividades emprendedoras, considerándolas como una alternativa provisional y prefiriendo la participación en proyectos que le ofrezcan mayor seguridad.')
      : this.array['Intencion de Emprender'] >= 2.1 &&
        this.array['Intencion de Emprender'] <= 3
      ? (this.copyEmprender =
          'Siente interés por las recompensas que conlleva el éxito en el emprendimiento, especialmente como solución a dificultades para devengar ingresos, alcanzar mayor independencia económica, o generar una entrada estable adicional, siendo capaz de generar aportes significativos en proyectos emprendedores.')
      : this.array['Intencion de Emprender'] >= 3.1 &&
        this.array['Intencion de Emprender'] <= 4
      ? (this.copyEmprender =
          'Capaz de elaborar ideas de cómo alcanzar la realización personal por medio de una actividad productiva consistente con las actividades que le apasionan, considerando al emprendimiento como una alternativa que eventualmente puede articularse con la realización de otros planes de vida.')
      : (this.copyEmprender =
          'Tiene alta motivación por ejecutar ideas de emprendimiento ambiciosas, que generen un efecto de transformación sobre las dinámicas del mercado o las personas, mantienendo amplias expectativas sobre los alcances de sus proyectos de emprendimiento.');

    this.array['Planificacion'] >= 0 && this.array['Planificacion'] <= 1
      ? (this.copyPlanificacion =
          'Puede establecer objetivos consistentes con el dominio de sus actividades, sin entrar en detalle al momento de definirlas o articularlas con tareas requeridas, y distinguiendo el flujo y las secuencias de trabajo sobre la marcha y mediante pruebas de ensayo y error.')
      : this.array['Planificacion'] >= 1.1 && this.array['Planificacion'] <= 2
      ? (this.copyPlanificacion =
          'Prefiere la ejecución secuencial y aprovechar el tiempo y los recursos disponibles para realizar tareas concretas y progresar en proporción a su trabajo con acciones específicas, definidas para una misma y única fase, y vinculando las acciones de manera oportuna para responder por los objetivos y las obligaciones requeridas.')
      : this.array['Planificacion'] >= 2.1 && this.array['Planificacion'] <= 3
      ? (this.copyPlanificacion =
          'Prefiere la planeación a corto plazo e inmediata que se vincule con sus objetivos, que la planeación formal y estructurada en el marco de un proyecto más amplio, siendo capaz de organizar sus tareas y responsabilidades con prioridades específicas para el cumplimiento de resultados.')
      : this.array['Planificacion'] >= 3.1 && this.array['Planificacion'] <= 4
      ? (this.copyPlanificacion =
          'Distingue con competencia todas las actividades, tareas y fases necesarias para alcanzar objetivos amplios y que requieran la coordinación de distintos procesos, sin exigirse en la articulación y la gestión detallada del tiempo, pero siendo capaz de ponerle un límite a cada proceso.')
      : (this.copyPlanificacion =
          'Prefiere establecer objetivos determinados por una estructura de actividades, tareas y tiempos concretos, administrando las labores para cumplir o adaptar sus objetivos, y de ser requerido puede establecer planes de respaldo que atiendan a las respectivas contingencias.');

    this.array['Evaluacion'] >= 0 && this.array['Evaluacion'] <= 1
      ? (this.copyEvaluacion =
          'Tiene poca inclinación por monitorear los procesos de desarrollo, y evalúa en mayor medida los resultados de los procesos a medida que realiza las acciones que intuitivamente le acercan a sus objetivos y a la vez satisfacen su necesidad de exploración.')
      : this.array['Evaluacion'] >= 1.1 && this.array['Evaluacion'] <= 2
      ? (this.copyEvaluacion =
          'Se enfoca en la producción de resultados concretos que no desperdicien su trabajo, realizándolo de manera constante y con el monitoreo requerido para señalar errores y garantizar un proceso adecuado y cumplido, identificando las mejoras que pueden implementarse.')
      : this.array['Evaluacion'] >= 2.1 && this.array['Evaluacion'] <= 3
      ? (this.copyEvaluacion =
          'Se aproxima al desarrollo de actividades mediante criterios de suficiencia para producir resultados de calidad estándar, garantizando la toma de decisión necesaria para adaptar los planes a los objetivos de cumplimiento, evitando inconsistencias y minimizando los errores.')
      : this.array['Evaluacion'] >= 3.1 && this.array['Evaluacion'] <= 4
      ? (this.copyEvaluacion =
          'Realiza los controles necesarios para demostrar que los procesos a su cargo pueden mejorar, y es capaz de marcar sus progresos y comparar sus resultados con estados previos del proceso, actualizando las acciones pertinentes para superar los alcances de la trayectoria de un proyecto.')
      : (this.copyEvaluacion =
          'Controla y verifica el desarrollo de un proyecto en el que identifica inconsistencia e implementa estrategias para lograr resultados con calidad dedicada, asegurando un amplio monitoreo sobre las actividades y agudeza para valorar el desarrollo del proceso.');

    this.array['Eficiencia'] >= 0 && this.array['Eficiencia'] <= 1
      ? (this.copyEficiencia =
          'Puede tomár más tiempos y recursos para garantizar la calidad planeada en los resultados, dando mayor espacio a la experimentación y a la comparación de distintos resultados antes de determinar los aspectos concretos del producto final.')
      : this.array['Eficiencia'] >= 1.1 && this.array['Eficiencia'] <= 2
      ? (this.copyEficiencia =
          'Suele ocuparse del cumplimiento de resultados empleando los recursos necesarios sin entrar a gestionar al detalle, y determina los requerimientos de calidad y los alcances de las actividades en función de los progresos de su trabajo y de la respuesta concreta a sus obligaciones.')
      : this.array['Eficiencia'] >= 2.1 && this.array['Eficiencia'] <= 3
      ? (this.copyEficiencia =
          'Aprovecha el tiempo y los recursos disponibles y se enfoca en cumplir el objetivo con precisión, incluso si requiere extender el uso de recursos para mejorar el resultado, pudiendo garantizar la optimización del tiempo cuando tiene suficiente dominio de la actividad.')
      : this.array['Eficiencia'] >= 3.1 && this.array['Eficiencia'] <= 4
      ? (this.copyEficiencia =
          'Optimiza el uso del tiempo y los recursos de modo que pueda cumplir sus objetivos lo más pronto posible, y mejorar la calidad de los resultados con el tiempo y los recursos ahorrados si los tiempos de entrega no son la prioridad.')
      : (this.copyEficiencia =
          'Es capaz de minimizar el uso de tiempo y recursos disponibles, analizando las ventajas o desventajas para el producto final, priorizando los tiempos de entrega y garantizando resultados de calidad.');

    this.array['Eficacia'] >= 0 && this.array['Eficacia'] <= 1
      ? (this.copyEficacia =
          'Se concentra en el cumplimiento del resultados mediante la utilización de los recursos necesarios, independiente del aprovechamiento exhaustivo de los medios disponibles y pudiendo mejorar la calidad del producto final con la implementación de otros recursos complementarios.')
      : this.array['Eficacia'] >= 1.1 && this.array['Eficacia'] <= 2
      ? (this.copyEficacia =
          'Utiliza distintos medios para detallar la calidad de los resultados y mantener la visibilidad de los recursos empleados, siendo capaz de alcanzar productos de calidad destacable y sin agotar la totalidad de recursos disponibles.')
      : this.array['Eficacia'] >= 2.1 && this.array['Eficacia'] <= 3
      ? (this.copyEficacia =
          'Es capaz de aprovechar tanto recursos disponibles como recursos adicionales para mejorar el cumplimiento de objetivos, obteniendo resultados con calidad competente y que demuestran un ejercicio práctico de administración de los medios para la entrega de productos consistentes.')
      : this.array['Eficacia'] >= 3.1 && this.array['Eficacia'] <= 4
      ? (this.copyEficacia =
          'Aprovecha los recursos disponibles y complementa la calidad de sus resultados con los medios suficientes para ello, reutilizando incluso recursos de otros procesos, demostrando un análisis del alcance y las oportunidades de los recursos y cumpliendo con las expectativas del producto final.')
      : (this.copyEficacia =
          'Maximiza la utilización de los recursos disponibles, valiéndose de referentes y procesos realizados previamente, y complementando con recursos adicionales para garantizar la consecución resultados ambiciosos que superen las expectativas iniciales del producto final.');

    this.array['Relaciones'] >= 0 && this.array['Relaciones'] <= 1
      ? (this.copyRelaciones =
          'Establece relaciones con corte transaccional, y sin distinguir aquellos aliados que puedan aportarle valor o las necesidades que tienen para establecer un vínculo  de interés mutuo, prefiriendo la formalidad y reservando los tratos personales para espacios de confianza sólida y prolongada.')
      : this.array['Relaciones'] >= 1.1 && this.array['Relaciones'] <= 2
      ? (this.copyRelaciones =
          'Tiene capacidad de mantener tratos personales para abordar el intercambio colaborativo, distinguiendo los aliados que le aportan valor, percatándose de sus necesidades, reconociendo sus intereses y comprendiendo las acciones requeridas para establecer un vínculo particular.')
      : this.array['Relaciones'] >= 2.1 && this.array['Relaciones'] <= 3
      ? (this.copyRelaciones =
          'Se le facilita conectar con aliados que sean accesibles empáticamente, tiene en cuenta aquellos con quienes comparte un nivel similar de influencia, identifica los vínculos potenciales con quienes establecer contactos colaborativos y puede dejar pasar aquellas oportunidades exigentes en el intercambio de intereses.')
      : this.array['Relaciones'] >= 3.1 && this.array['Relaciones'] <= 4
      ? (this.copyRelaciones =
          'Aborda la colaboración estratégica con confianza y amabilidad, actuando de manera consistente con las necesidades de sus aliados y en los momentos requeridos para mantener el contacto de aquellos que complementen la propia influencia, aporten con una trayectoria complementaria y le aporten mayor valor o sean fundamentales para el cumplimiento de sus responsabilidades.')
      : (this.copyRelaciones =
          'Cuenta con sensibilidad para identificar aliados con los que colaborar, así como sus habilidades particulares y el provecho que puede obtener, propendiendo por un trato que alinie los valores mutuos y que demuestre interés personal por conocer al otro y sus necesidades, determinando las formas de contacto a largo plazo  y comunicándose con competencia a nivel racional y emocional');

    this.array['Trabajo en equipo'] >= 0 && this.array['Trabajo en equipo'] <= 1
      ? (this.copyTrabajo =
          'No acude con frecuencia a la colaboración de otras personas y atiende en primer lugar sus objetivos antes que a los de un colectivo, por lo que puede responder debidamente a delegaciones de trabajo con límites de tiempo holgados u obligaciones anticipadas')
      : this.array['Trabajo en equipo'] >= 1.1 &&
        this.array['Trabajo en equipo'] <= 2
      ? (this.copyTrabajo =
          'Prefiere delegar el trabajo y participar en aquellas actividades que más le competan, contribuyendo al apoyo colaborativo para el cumplimiento de sus responsabilidades, dedicando más trabajo a objetivos individuales que comunes e involucrándose en la dinámica de grupo cuando se le solicita.')
      : this.array['Trabajo en equipo'] >= 2.1 &&
        this.array['Trabajo en equipo'] <= 3
      ? (this.copyTrabajo =
          'Distingue las capacidades de las personas y el aporte que pueden ofrecer a los equipos, reconoce cuando no es necesario intervenir en el equipo o cuando el trabajo lo puede resolver por su cuenta porque tiene mayor capacidad, siendo capaz de delegar funciones a otros miembros para alcanzar un objetivo común.')
      : this.array['Trabajo en equipo'] >= 3.1 &&
        this.array['Trabajo en equipo'] <= 4
      ? (this.copyTrabajo =
          'Maneja la articulación de los equipos de acuerdo al valor de las personas, alineando los intereses de los miembros con objetivos comunes debidamente establecidos, distribuyendo las distintas funciones de acuerdo a los requerimientos del trabajo y orientando los resultados asertivamente a través de la retroalimentación positiva.')
      : (this.copyTrabajo =
          'Motiva a las personas mejor capacitadas para el trabajo con carisma y empatía, tiene iniciativa para dinamizar la interacción entre los miembros del equipo para promover la colaboración y el trabajo por objetivos mutuos, aportando a la versatilidad del grupo y distribuyendo las funciones de acuerdo a los intereses de cada persona.');

    this.array['Negociacion'] >= 0 && this.array['Negociacion'] <= 1
      ? (this.copyNegociacion =
          'Puede negociar de manera intuitiva y a corto plazo, dándo prioridad a sus intereses y objetivos inmediatos, y prefiriendo los tratos del tipo ' +
          '"todo o nada"' +
          ' en comparación con acuerdos de punto medio.')
      : this.array['Negociacion'] >= 1.1 && this.array['Negociacion'] <= 2
      ? (this.copyNegociacion =
          'Reconoce a quienes puede ofrecer valor con el que negociar, expone sus intereses para determinar si es posible establecer un objetivo común y deja claro lo que pretende recibir a cambio, pero es capaz de conceder un punto medio validando el punto de vista del otro.')
      : this.array['Negociacion'] >= 2.1 && this.array['Negociacion'] <= 3
      ? (this.copyNegociacion =
          'Su interacción apunta a hacer notar los beneficios de la contraparte, establece los límites que enmarcan los acuerdos de manera amable y considerada, y lleva hasta el final las negociaciones más convenientes.')
      : this.array['Negociacion'] >= 3.1 && this.array['Negociacion'] <= 4
      ? (this.copyNegociacion =
          'Resalta las ganancias mutuas de los acuerdos, se comunica con prudencia y empatía, llevando hasta el final las negociaciones donde se promueve la confianza personal, se discuten, se justifican los puntos de vista y se gesta la reciprocidad.')
      : (this.copyNegociacion =
          'Solicita reciprocidad para progresar proporcionalmente en las negociaciones, se percata de que las motivaciones de la contraparte estén reflejadas en los objetivos, los acuerdos y en los resultados, y se interesa por el trasfondo emocional de los intereses  de los otros.');

    Number(this.array['Global']) >= 0 && Number(this.array['Global']) <= 1
      ? (this.copyGlobal =
          'Persona enfocada en conservar competencias funcionales elementales para el rendimiento en el contexto laboral. Con principal interés en resolver necesidades y responsabilidades básicas e inmediatas. Tiene oportunidadde fortalecer sus rasgos de desempeño para elaborar e implementar proyectos de emprendimiento y despertar un espíritu emprendedor como alternativa al empleo')
      : Number(this.array['Global']) >= 1.1 && Number(this.array['Global']) <= 2
      ? (this.copyGlobal =
          'Persona orientada en nociones básicas en relación a los procesos de emprendimiento. Con limitada competencia y conocimiento para la elaboración, implementación de proyectos emprendedores, pero con grán potencial para participar y   aprender efectivamente de proyectos de emprendimiento ya existentes')
      : Number(this.array['Global']) >= 2.1 && Number(this.array['Global']) <= 3
      ? (this.copyGlobal =
          'Persona interesada en atender constantemente su aprendizaje y desempeño tanto en el contexto laboral como en el empresarial. Con conocimientos y disposición para participar, elaborar e implementar proyectos de emprendimiento pese a tener oportunidad de agudizar sus competencias. Aún así, es capaz de producir aportes significativos en equipos de trabajo.')
      : Number(this.array['Global']) >= 3.1 && Number(this.array['Global']) <= 4
      ? (this.copyGlobal =
          'Persona con notable desempeño laboral y propensión a demostrar y desarrollar destrezas ejemplares relacionadas con el éxito de proyectos emprendedores, y con oportunidad de perfeccionar sus habilidades en materia de elaboración e implementación de proyectos emprendedores. Capaz de proponer aportes de impacto en equipos de trabajo.')
      : (this.copyGlobal =
          'Persona disciplinada, constate, autónoma y visionaria en el fortalecimiento y ejercicio de sus competencias para el emprendimiento, que le permiten sacar provecho tanto en contextos laborales como empresariales. Tiene oportunidad de impulsar, desarrollar y coordinar equipos de trabajo para generar impacto por medio de la articulación de los miembros.');
    this.arraysCopys();
  }

  arraysCopys() {
    this.copysCapacidades = [
      ['Autoeficacia', this.copyAutoeficacia],
      ['Locus de control', this.copyControl],
      ['Optimismo', this.copyOptimismo],
      ['Persistencia', this.copyPersistencia],
      ['Propensión al riesgo', this.copyRiesgo],
      ['Autonomía', this.copyAutonomia],
      ['Creatividad', this.copyCreatividad],
      ['Identificación de oportunidades', this.copyOportunidades],
      ['Flexibilidad', this.copyFlexibilidad],
      ['Manejo de estrés', this.copyEstres],
      ['Resiliencia', this.copyResiliencia],
      ['Frustración', this.copyFrustracion],
    ];
    this.copysPlaneacion = [
      ['Orientación al logro', this.copyLogro],
      ['Intención de Emprender', this.copyEmprender],
      ['Planificación', this.copyPlanificacion],
      ['Evaluación', this.copyEvaluacion],
      ['Eficiencia', this.copyEficiencia],
      ['Eficacia', this.copyEficacia],
    ];
    this.copysHabilidades = [
      ['Relaciones', this.copyRelaciones],
      ['Trabajo en equipo', this.copyTrabajo],
      ['Negociación', this.copyNegociacion],
    ];
  }

  prevCopy(copy) {
    if (copy == 'capacidades') {
      if (this.positionCopyCapacidades == 0) {
        this.positionCopyCapacidades = 0;
      } else if (this.positionCopyCapacidades >= 0) {
        this.positionCopyCapacidades = this.positionCopyCapacidades - 1;
      }
    } else if (copy == 'planeacion') {
      if (this.positionCopyPlaneacion == 0) {
        this.positionCopyPlaneacion = 0;
      } else if (this.positionCopyPlaneacion >= 0) {
        this.positionCopyPlaneacion = this.positionCopyPlaneacion - 1;
      }
    } else if (copy == 'habilidades') {
      if (this.positionCopyHabilidades == 0) {
        this.positionCopyHabilidades = 0;
      } else if (this.positionCopyHabilidades >= 0) {
        this.positionCopyHabilidades = this.positionCopyHabilidades - 1;
      }
    }
  }

  nextCopy(copy) {
    if (copy == 'capacidades') {
      if (
        this.positionCopyCapacidades >= 0 &&
        this.positionCopyCapacidades < 12
      ) {
        this.positionCopyCapacidades += 1;
      }
    } else if (copy == 'planeacion') {
      if (this.positionCopyPlaneacion >= 0 && this.positionCopyPlaneacion < 6) {
        this.positionCopyPlaneacion += 1;
      }
    } else if (copy == 'habilidades') {
      if (
        this.positionCopyHabilidades >= 0 &&
        this.positionCopyHabilidades < 3
      ) {
        this.positionCopyHabilidades += 1;
      }
    }
  }

  async createBarChart() {
    this.dataCapacidades = [
      this.array['Autoeficacia'],
      this.array['Locus de control'],
      this.array['Optimismo'],
      this.array['Persistencia'],
      this.array['Propension al Riesgo'],
      this.array['Autonomia'],
      this.array['Creatividad'],
      this.array['Identificacion de Oportunidades'],
      this.array['Flexibilidad'],
      this.array['Manejo de estres'],
      this.array['Resiliencia'],
      this.array['Tolerancia a la frustracion'],
    ];

    console.log(this.dataCapacidades)

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
            data: this.dataCapacidades,
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
            borderWidth: 2,
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
    this.dataPlaneacion = [
      this.array['Orientacion al logro'],
      this.array['Intencion de Emprender'],
      this.array['Planificacion'],
      this.array['Evaluacion'],
      this.array['Eficiencia'],
      this.array['Eficacia'],
    ];
    this.bars2 = new Chart(this.barChart2.nativeElement, {
      type: 'radar',
      data: {
        labels: [
          ['Orientación', 'al logro'],
          ['Intención', 'de Emprender'],
          'Planificación',
          'Evaluación',
          'Eficiencia',
          'Eficacia',
        ],
        datasets: [
          {
            label: 'Mi perfil',
            data: this.dataPlaneacion,
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
    this.dataHabilidades = [
      this.array['Relaciones'],
      this.array['Trabajo en equipo'],
      this.array['Negociacion'],
    ];
    this.bars3 = new Chart(this.barChart3.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Relaciones', ['Trabajo', 'en equipo'], 'Negociacion'],
        datasets: [
          {
            label: 'Mi perfil',
            data: this.dataHabilidades,
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
            data: [3.548, 4.105, 3.697],
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
    this.dataGlobal = [
      this.array['Capacidades'],
      this.array['Planeacion'],
      this.array['Social'],
    ];
    this.bars4 = new Chart(this.barChart4.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Capacidades', 'Planeación', ['Habilidades', 'Sociales']],
        datasets: [
          {
            label: 'Mi perfil',
            data: this.dataGlobal,
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
    this.router.navigate(['/results/vista2'])
  }
}
