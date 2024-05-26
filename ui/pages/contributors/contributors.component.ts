import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contributors',
  standalone: true,
  imports: [],
  templateUrl: './contributors.component.html',
  styleUrl: './contributors.component.scss',
  providers: [HttpClient]
})
export class ContributorsComponent implements OnInit {
  // private apiUrl: string = environment.apiUrl;
  private apiUrl: string = 'http://localhost:3000/hot-takes-api-v1/contributors';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // this.httpClient.get(this.apiUrl) as Observable<any>;
    this.httpClient.get(this.apiUrl).subscribe((thing: any) => {
      console.log('subscriber');
      console.log(thing);
      
      
    });
  }
}
