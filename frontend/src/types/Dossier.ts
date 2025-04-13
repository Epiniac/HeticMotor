export interface Dossier {

  id: number;

  client: string;

  vehicle: string;

  type: string;

  status: 'en attente' | 'validé' | 'refusé';

}

