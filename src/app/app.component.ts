import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'forms-app';
  introductions: any[] = [];
  currentIntroduction: any = {};
  isEditing: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadIntroductions();
  }

  loadIntroductions() {
    this.apiService.getIntroductions().subscribe(
      (data) => {
        this.introductions = data;
      },
      (error) => {
        console.error('Error fetching introductions:', error);
      }
    );
  }

  addIntroduction() {
    if (this.currentIntroduction.name && this.currentIntroduction.age && this.currentIntroduction.hobby && this.currentIntroduction.favouriteFood) {
      this.apiService.addIntroduction(this.currentIntroduction).subscribe(
        (response) => {
          this.loadIntroductions(); // Refresh the list
          this.resetForm();
        },
        (error) => {
          console.error('Error adding introduction:', error);
        }
      );
    } else {
      alert("All fields are required!");
    }
  }

  editIntroduction() {
    this.apiService.updateIntroduction(this.currentIntroduction.id, this.currentIntroduction).subscribe(
      () => {
        this.loadIntroductions();
        this.resetForm();
      },
      (error) => {
        console.error('Error updating introduction:', error);
      }
    );
  }

  deleteIntroduction() {
    if (confirm('Are you sure you want to delete this introduction?')) {
      this.apiService.deleteIntroduction(this.currentIntroduction.id).subscribe(
        () => {
          this.loadIntroductions();
          this.resetForm();
        },
        (error) => {
          console.error('Error deleting introduction:', error);
        }
      );
    }
  }

  selectIntroduction(introduction: any) {
    this.currentIntroduction = { ...introduction };
    this.isEditing = true;
  }

  resetForm() {
    this.currentIntroduction = {};
    this.isEditing = false;
  }
}
