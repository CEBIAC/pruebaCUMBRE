import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoeficaciaComponent } from '../../components/Capacidades/autoeficacia/autoeficacia.component';
import { AutonomiaComponent } from '../../components/Capacidades/autonomia/autonomia.component';
import { CreatividadComponent } from '../../components/Capacidades/creatividad/creatividad.component';
import { FlexibilidadComponent } from '../../components/Capacidades/flexibilidad/flexibilidad.component';
import { IdentificacionOportunidadesComponent } from '../../components/Capacidades/identificacion-oportunidades/identificacion-oportunidades.component';
import { LocusControlComponent } from '../../components/Capacidades/locus-control/locus-control.component';
import { ManejoEstresComponent } from '../../components/Capacidades/manejo-estres/manejo-estres.component';
import { OptimismoComponent } from '../../components/Capacidades/optimismo/optimismo.component';
import { PersistenciaComponent } from '../../components/Capacidades/persistencia/persistencia.component';
import { PropensionRiesgoComponent } from '../../components/Capacidades/propension-riesgo/propension-riesgo.component';
import { ResilienciaComponent } from '../../components/Capacidades/resiliencia/resiliencia.component';
import { ToleranciaFrustracionComponent } from '../../components/Capacidades/tolerancia-frustracion/tolerancia-frustracion.component';
import { EficaciaComponent } from '../../components/Planeacion/eficacia/eficacia.component';
import { EficienciaComponent } from '../../components/Planeacion/eficiencia/eficiencia.component';
import { EvaluacionComponent } from '../../components/Planeacion/evaluacion/evaluacion.component';
import { IntencionEmprenderComponent } from '../../components/Planeacion/intencion-emprender/intencion-emprender.component';
import { OlogroComponent } from '../../components/Planeacion/ologro/ologro.component';
import { PlanificacionComponent } from '../../components/Planeacion/planificacion/planificacion.component';
import {NegociacionComponent} from '../../components/Social/negociacion/negociacion.component'
import {RelacionesComponent} from '../../components/Social/relaciones/relaciones.component'
import {TrabajoEquipoComponent} from '../../components/Social/trabajo-equipo/trabajo-equipo.component'

import { QuestionaryPage } from './questionary.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionaryPage,
    children: [
      {
        path: 'autoeficacia',
        component: AutoeficaciaComponent,
      },
      {
        path: 'autonomia',
        component: AutonomiaComponent,
      },
      {
        path: 'creatividad',
        component: CreatividadComponent,
      },
      {
        path: 'flexibilidad',
        component: FlexibilidadComponent,
      },
      {
        path: 'oportunidades',
        component: IdentificacionOportunidadesComponent,
      },
      {
        path: 'control',
        component: LocusControlComponent,
      },
      {
        path: 'estres',
        component: ManejoEstresComponent,
      },
      {
        path: 'optimismo',
        component: OptimismoComponent,
      },
      {
        path: 'persistencia',
        component: PersistenciaComponent,
      },
      {
        path: 'riesgo',
        component: PropensionRiesgoComponent,
      },
      {
        path: 'resiliencia',
        component: ResilienciaComponent,
      },
      {
        path: 'tolerancia',
        component: ToleranciaFrustracionComponent,
      },
      {
        path: 'eficacia',
        component: EficaciaComponent,
      },
      {
        path: 'eficiencia',
        component: EficienciaComponent,
      },
      {
        path: 'evaluacion',
        component: EvaluacionComponent,
      },
      {
        path: 'emprender',
        component: IntencionEmprenderComponent,
      },
      {
        path: 'logro',
        component: OlogroComponent,
      },
      {
        path: 'planicacion',
        component: PlanificacionComponent,
      },
      {
        path: 'negociacion',
        component: NegociacionComponent,
      },
      {
        path: 'relaciones',
        component: RelacionesComponent,
      },
      {
        path: 'equipo',
        component: TrabajoEquipoComponent,
      },
      {
        path: '',
        redirectTo: '/questionary/autoeficacia',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionaryPageRoutingModule {}
