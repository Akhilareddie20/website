import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderstatus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderstatus.component.html',
})
export class OrderstatusComponent {
  orders = [
    {
      id: 1,
      items: [
        { name: 'Product A', quantity: 2 },
        { name: 'Product B', quantity: 1 },
      ],
    },
  ];
}


