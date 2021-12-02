import { useState } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { addPostAPI, postArticleAPI, uploadArticlesAPITestMultipleImages } from '../../Actions/index';

import styled from 'styled-components';
import ReactPlayer from 'react-player';

const PostModal = (props) =>{

    const [editorText, setEditorText] = useState("");
    const [shareImages, setShareImages] = useState([]);
    const [urls, setUrls]= useState([]);
    const [videoLink, setVideoLink] = useState("");
    const[assetArea, setAssetArea] = useState("");

    const handleImageChange = (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage['id']= Math.random();
            setShareImages((prevState) => [...prevState, newImage]);  
        }

//         const image = e.target.files[0];
// 
//         if(image === '' || image ===undefined){
//             alert(`not an image, the file is a ${typeof image }`);
// 
//             return;
//         }
// 
//         setShareImages(image);
    };

    const switchAssetArea = (area) =>{
        setShareImages("");
        setVideoLink("");
        setAssetArea(area);
    }

    const postArticle = (e) =>{

        // e.preventDefault();
        // if(e.target !== e.currentTarget){
        //     return;
        // }

        const payload = {
            images: shareImages,
            video : videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        }

        props.postArticle(payload);

        reset(e);
    }

    const reset= (e) =>{
        setEditorText('');
        setVideoLink("");
        setShareImages("");
        setAssetArea("");

        props.handleClick(e);
    }

    return(
     <>

        {props.showModal === 'open' && (
            <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button onClick={(event) => reset(event)}>
                            <img src="/img/close.png" alt="" />
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            {props.user.photoURL ? <img src={props.user.photoURL}/>
                            :
                            <img src="/img/user.svg" alt="" />
                            }
                            <span>{props.user.displayName}</span>
                        </UserInfo>

                        <Editor>
                            <textarea value={editorText} onChange={(e) => setEditorText(e.target.value)} placeholder='What do you want to talk about' autoFocus={true}></textarea>

                            { assetArea === 'image' ? (

                            <UploadImage>
                                <input type="file" 
                                    accept = 'image/gif, image/jpeg, image/png' 
                                    name='image'
                                    multiple
                                     id='fileInput'
                                    style={{display:"none"}}
                                    onChange={handleImageChange}
                                />
                                <p>
                                    <label htmlFor='fileInput'
                                        style={{cursor:'pointer'}}>  Select an image to share
                                    </label>
                                </p>
                                {shareImages[0] && <img src={URL.createObjectURL(shareImages[0])}/>
                                }
                                {shareImages[1]&& <img src={URL.createObjectURL(shareImages[1])}/>}
                            </UploadImage> 
                            ): (
                            assetArea ==='media' && (
                                <>
                                <input type="text" 
                                        placeholder='please input a video link' 
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}/>
                                {videoLink && (<ReactPlayer width = {'100%'} url={videoLink}/>)}
                                </>
                                )
                            )}
                        </Editor>

                    </SharedContent>
                    <SharedCreation>
                        <AttachAssets>
                            <AssetButton onClick={() => switchAssetArea('image')}>
                            <img src="/img/photo-icon.png" alt="" />
                            </AssetButton>
                            <AssetButton onClick={() => switchAssetArea('media')}>
                            <img src="/img/video-icon.png" alt="" />
                            </AssetButton>
                        </AttachAssets>
                        <ShareComment>
                            <AssetButton >
                            <img src="/img/comment-icon.png" alt="" />
                            Anyone
                            </AssetButton>
                        </ShareComment>
                        <PostButton 
                            disabled={!editorText ? true : false}
                            onClick={(event)=> postArticle(event)}
                        >Post
                        </PostButton>
                    </SharedCreation>
                </Content>
            </Container>
        )}
     </>
    )
};

const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:9999;
    color:black;
    background-color:rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`
    width:100%;
    max-width:552px;
    background-color:white;
    max-height:90%;
    overflow:initial;
    border-radius:5px;
    position: relative;
    display:flex;
    flex-direction:column;
    top:32px;
    margin: 0 auto;
`;

const Header = styled.div`
    display:block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0, 0.15);
    font-size:16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items:center;
    button{
        height:40px;
        width:40px;
        min-width:auto;
        color: rgba(0,0,0,0.15);
        background-color:transparent;
        border: none;
        cursor: pointer;
        &:hover{
            border-radius:50%;
            background-color: #aaa;
        }
        
    }
    img{
        width:20px;
        
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow:1;
    overflow-y:auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 12px;

    svg, img{
        width: 48px;
        height:48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const SharedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
    cursor: pointer;
    img{
        width: 20px;
    }
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton}{
        width:40px;
    }
`;

const ShareComment =styled.div`
    padding-left: 8px;
    margin-right:auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton}{
        svg{
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-wifth:60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => ( props.disabled ? "rgba(0,0,0,0.8)" : '#0a66c2')};
    color: ${(props)=> (props.disabled ? "#aaaa" : 'white')};
    cursor: pointer;
    &:hover{
        background: ${props => props.disabled ? '' : '#004182'};
        cursor: ${props => props.disabled ? 'not-allowed' :'pointer'}
    }
`;

const Editor = styled.div`
    padding: 12px 24px;

    textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
    }

    input{
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
    text-align:center;
    img{
        width:100%;
    }
`;

const mapStateToProps = (state)  => {
    return{
        user: state.userState.user,
    }
};

const mapDispatchToProps =(dispatch)=> ({
    postArticle : (payload)=>dispatch(addPostAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);