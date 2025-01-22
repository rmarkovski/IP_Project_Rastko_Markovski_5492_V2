import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shen-lore',
  imports: [RouterModule, CommonModule],
  templateUrl: './shen-lore.component.html',
  styleUrl: './shen-lore.component.css'
})
export class ShenLoreComponent implements OnInit {
  shenData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getShenData();
  }


  
  getShenData(): void {
    this.http.get('http://localhost:3000/api/champions/shen').subscribe(data => {
      this.shenData = data;
    }, error => {
      console.error('Failed to fetch Shen data:', error);
    });
  }
}