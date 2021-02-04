import 'bootstrap';
import '../sass/main.scss';
import './vendor';

import {elements} from './views/base.js';
import * as listView from './views/listView.js'

const state = {};
const db = firebase.firestore();
const auth = firebase.default.auth();
const provider = new firebase.auth.GoogleAuthProvider();



auth.onAuthStateChanged((user) => {
    let unsubscribe;
    let prodsRef;
    let documentID;

    prodsRef = db.collection('products');

	if (user) {
        // signed in
        console.log(`Hola ${user.displayName}`);
        // Register user

       

        // ADDING
		elements.addProd.onclick = () => {
            // Check if valid input
            if (elements.newProd.elements.name.value != false && elements.newProd.elements.lab.value != false){
                const { serverTimestamp } = firebase.firestore.FieldValue;
                // Create newProd object
                const newProd = {
                    name: elements.newProd.elements.name.value,
                    lab: elements.newProd.elements.lab.value,
                    discount: elements.newProd.elements.discount.checked,
                    createdAt: serverTimestamp(),
                    uid: user.uid,
                }
                // Add to database
                prodsRef.add(newProd)
                .then(function(docRef) {
                    console.log("Document written sucessfully!");
                    documentID = docRef.id;
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        };
        
        // DELETING
        elements.selectProd.addEventListener('click', () => {
            if ( elements.selectProd.classList.contains('active')) {

                // Add btn btn-outline-danger classess
                elements.prodList.childNodes.forEach(child => {
                     child.childNodes.forEach(grandson => {
                        if (grandson.nodeName !== '#text'){
                            grandson.classList.add('btn')
                            grandson.classList.add('btn-outline-danger')
                        } 
                    })
                })
                // Select Product
                let productID;
                elements.prodList.addEventListener('click', function select(e) {
                    if (e.target.id == true) {
                        productID = e.target.id;
                    } else if (e.target.parentElement.id !== 'prodList') {
                        productID = e.target.parentElement.id
                    } else {
                        productID = e.target.id;
                    }
                    elements.prodList.removeEventListener('click', select)

                    // Add text-white bg-danger
                    // Remove btn btn-outline-danger
                    document.querySelector(`#${productID}`).childNodes.forEach(child => {
                        if (child.nodeName !== '#text'){
                            child.classList.add('text-white')
                            child.classList.add('bg-danger')
                            child.classList.remove('btn')
                            child.classList.remove('btn-outline-danger')
                        } 
                    })

                    elements.selectProd.disabled = true
                    elements.deleteProd.disabled = false
                })

                elements.deleteProd.addEventListener('click', () => {        
                    // Delete id from firebase
                    listView.deleteProduct(productID)
                    prodsRef.doc(productID).delete().then(() => {
                        console.warn(`Product ID ${productID} deleted`)
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });

                    elements.selectProd.classList.remove('active')
                    elements.selectProd.disabled = false
                    elements.deleteProd.disabled = true
                })
            }
        })


        // Fetch all products
        unsubscribe = prodsRef
        .orderBy('createdAt') // Requires a query
        .onSnapshot((querySnapshot) => {
            // Map results to an array of li elements
            const items = querySnapshot.docs.map((doc) => {
                return `    <ul class="list-group list-group-horizontal" id="${doc.id}">
                <li class="list-group-item w-100">${doc.data().name}</li>
                <li class="list-group-item w-100">${doc.data().lab}</li>
            </ul>`;
            });
            elements.prodList.innerHTML = items.join('');
        });

        elements.whenSignedIn.classList.remove('d-none');
        elements.controlPanel.classList.remove('d-none');
        elements.prodContainer.classList.add('row-cols-md-2');
		elements.whenSignedOut.classList.add('d-none');
	} else {
        prodsRef.get().then((querySnapshot) => {
           const items = querySnapshot.docs.map((doc) => {
                return `    <ul class="list-group list-group-horizontal" id="${doc.id}">
                <li class="list-group-item w-100">${doc.data().name}</li>
                <li class="list-group-item w-100">${doc.data().lab}</li>
            </ul>`;
            });
            elements.prodList.innerHTML = items.join('');
        });

        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
        
        elements.whenSignedIn.classList.add('d-none');
        elements.controlPanel.classList.add('d-none');
        elements.prodContainer.classList.remove('row-cols-md-2');
        elements.whenSignedOut.classList.remove('d-none');
	}
});

elements.signInBtn.onclick = () => auth.signInWithPopup(provider);
elements.signOutBtn.onclick = () => auth.signOut();