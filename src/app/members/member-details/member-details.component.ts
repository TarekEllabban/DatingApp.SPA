import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
   user: User;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsPercent: 25,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }
  getImages() {
    const imageUrls = [];
    for (let i = 0 ; i < this.user.photos.length; ++i) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description:  this.user.photos[i].description
      });
    }
    return imageUrls;
  }
}

