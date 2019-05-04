export class BaseComponent {

  rows = [];
  loadingIndicator: boolean = false;
  reorderable: boolean = true;

  tamanhos = [
    { value: 'PP', title: 'PP' },
    { value: 'P', title: 'P' },
    { value: 'M', title: 'M' },
    { value: 'G', title: 'G' },
    { value: 'GG', title: 'GG' },
    { value: 'XG', title: 'XG' }
  ]

}