import { Modal } from './UI/Modal';
import { Map } from './UI/Map';

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    adressForm.addEventListener('submit', this.findUserHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Your browser is to old. Please try modern browser!');
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location. Please wait.',
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        this.selectPlace(coordinates);
      },
      (error) => {
        modal.hide();
        alert(
          'Could not locate you unfortunately.Please enter address manually!',
        );
      },
    );
  }

  findUserHandler() {}
}

const placeFinder = new PlaceFinder();
