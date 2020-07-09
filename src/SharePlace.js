import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords} from './Utility/Location';

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click');
    adressForm.addEventListener('submit', this.findUserHandler.bind(this));
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
      this.shareBtn.disabled = false;
      const sharedLinkInputElement = document.getElementById('share-link');
      sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
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
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        modal.show();
        const coordinates = {
          lat: successResul.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert(error)
        alert(
          'Could not locate you unfortunately.Please enter address manually!',
        );
      },
    );
  }

  async findUserHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input');
    if (!address || address.trim().lenght() === 0) {
        alert('Indvalid adress entered - please try again!');
        return;
    }
    const modal = new Modal('loading-modal-content','Loading location. Please wait.');
    modal.show();
      try {
          const coordinates = await getCoordsFromAddress(address);
          this.selectPlace(coordinates, address);
      } catch(err) {
          alert(err.message);
      }
      modal.hide();
}

sharePlaceHandler() {
    const sharedLinkInputElement = document.getElementById('share-link');
    if (!navigator.clipboard) {
        sharedLinkInputElement.select();
        return;
    }

    navigator.clipboard.writeText(sharedLinkInputElement.value).then(() => {alert('Copied to clipboard');}).catch(err => {console.log(err);sharedLinkInputElement.select();});


const placeFinder = new PlaceFinder();
