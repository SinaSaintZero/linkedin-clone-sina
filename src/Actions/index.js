import { auth, provider, storage } from '../firebase/Firebase';
import db from '../firebase/Firebase';
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './ActionType';


export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
}) ;

export const getArticles = (payload) =>({
    type: GET_ARTICLES,
    payload: payload,
})

export function signInAPI(){
    return (dispatch) =>{
        auth.signInWithPopup(provider).then((payload)=>{
            dispatch(setUser(payload.user));
        })
        .catch((error) => alert(error.message));
        
    }
}

export function getUserAuth() {
    return(dispatch) =>{
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(setUser(user));
            }
        })
    }
}

export function signOutAPI(){
    return(dispatch) =>{
        auth.signOut()
            .then(()=> {
             dispatch(setUser(null));
            })
             .catch((error) => {
            console.log(error.message);
        });
    };
}


export function postArticleAPI (payload){
    return (dispatch) => {

        dispatch(setLoading(true));

        if(payload.image !== ''){

            const upload = storage.ref(`images/${payload.images.name}`).put(payload.images);
            
            upload.on('state_changed' , 
            snapshot=> {
                const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;

                    console.log(`Progress : ${progress} %`);
                    if(snapshot.state=== 'RUNNING'){
                        console.log(`Progress: ${progress}%`)
                    }
            }, error => console.log(error.code), 
            async () => {
                const downloadURL = await upload.snapshot.ref.getDownloadURL();
                // adding to the database (firestore)
                db.collection('articles').add({
                    actor: {
                        user_email_address: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL
                    },
                    video: payload.video,
                    sharedImg: downloadURL,
                    comments: 0,
                    description: payload.description,
                });
                dispatch(setLoading(false));
            }
            );
        } else if(payload.video){
            db.collection('articles').add({
                actor: {
                    user_email_address: payload.user.email,
                    description: payload.description,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL,
                },
                video: payload.video,
                sharedImg: '',
                comments: 0,
                description: payload.description,
            });
            dispatch(setLoading(false));
        }
    };
};

//--------------------------

export function addPostAPI(payload){
        return (dispatch) => {

            dispatch(setLoading(true));

        if(payload.image !== ''){

            const promises = payload.images.map((image) =>{
                const ref = storage.ref().child(`images/${image.name}`)
                return ref.put(image)
                .then(()=> ref.getDownloadURL())
  
            });

            Promise.all(promises)
            .then((fileDownloadURLs)=> {
                db.collection("articles").add({

                    actor: {
                        user_email_address: payload.user.email,
                        title: payload.user.displayName,
                        date: payload.timestamp,
                        image: payload.user.photoURL
                    },
                    video: payload.video,
                    comments: 0,
                    description: payload.description,
                    sharedImg: fileDownloadURLs,

                });
            }).catch(err => console.log(err));
            
        dispatch(setLoading(false));
        }
    }
}

export function getArticleAPI() {
    return (dispatch) => {
        let payload;
        
        db.collection('articles').orderBy('actor.date', "desc")
        .onSnapshot((snapshot) => {
            payload= snapshot.docs.map((doc) => doc.data());

            dispatch(getArticles(payload));
        })
        ;
    }
}