import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, DashboardComponent, RouterLink, RouterLinkActive],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  selectedSection: string = 'perfil';

  selectSection(section: string) {
    this.selectedSection = section;
  }
}