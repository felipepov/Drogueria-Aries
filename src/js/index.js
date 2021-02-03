import 'bootstrap';
import '../sass/main.scss';
import './vendor';

// Delete row-cols-md-2 class of #prodContainer when #controlPanel is displaying none 
import {elements} from './views/base.js';

const state = {};
const user = firebase.auth().currentUser;
const db = firebase.firestore();
const auth = firebase.default.auth();

const provider = new firebase.auth.GoogleAuthProvider();

let prodsRef;
let unsubscribe;
let userData;

auth.onAuthStateChanged((user) => {
	if (user) {
        // signed in
        console.log(`Hola ${user.displayName}`);
        prodsRef = db.collection('products');
        userData = db.collection('users').doc(user.uid);

        
		elements.addProd.onclick = () => {
            // Check if valid input
            // Create newProd object
            // Push newProd to prodsRef
            // Render newProd
		};

        elements.whenSignedIn.classList.remove('d-none');
        elements.controlPanel.classList.remove('d-none');
        elements.prodContainer.classList.remove('row-cols-md-2');
		elements.whenSignedOut.classList.add('d-none');
	} else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
        console.log(`Adios ${user.displayName}`);
        
        elements.whenSignedIn.classList.add('d-none');
        elements.controlPanel.classList.add('d-none');
        elements.prodContainer.classList.add('row-cols-md-2');
		elements.whenSignedOut.classList.remove('d-none');
	}
});

elements.signInBtn.onclick = () => auth.signInWithPopup(provider);
elements.signOutBtn.onclick = () => auth.signOut();